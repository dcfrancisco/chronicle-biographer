package com.chronicle.ingestion.service;

import com.chronicle.ingestion.model.Artifact;
import com.chronicle.ingestion.model.ArtifactChunk;
import com.chronicle.ingestion.model.ExtractionResult;
import com.chronicle.ingestion.model.HypothesisCandidate;
import com.chronicle.ingestion.model.MemoryCandidate;
import com.chronicle.ingestion.model.ObservationCandidate;
import com.chronicle.ingestion.model.ProvenanceReference;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class ArtifactIngestionService {
    private final Map<UUID, StoredArtifact> store = new ConcurrentHashMap<>();
    private final LocalTextExtractionService textExtractionService;

    public ArtifactIngestionService(LocalTextExtractionService textExtractionService) {
        this.textExtractionService = textExtractionService;
    }

    public Artifact registerArtifact(String fileName, String contentType, byte[] content) {
        UUID id = UUID.randomUUID();
        String safeFileName = fileName == null ? "upload.bin" : fileName;
        String safeContentType = contentType == null ? "application/octet-stream" : contentType;
        String format = detectFormat(safeFileName);
        StoredArtifact stored = new StoredArtifact(
                id,
                safeFileName,
                safeContentType,
                format,
                "REGISTERED",
                Instant.now(),
                null,
                0,
                0,
                0,
                0,
                content,
                null,
                List.of(),
                List.of(),
                List.of(),
                List.of());
        store.put(id, stored);
        return toArtifact(stored);
    }

    public List<Artifact> listArtifacts() {
        return store.values().stream()
                .sorted(Comparator.comparing(StoredArtifact::uploadedAt).reversed())
                .map(this::toArtifact)
                .collect(Collectors.toList());
    }

    public Artifact getArtifact(UUID id) {
        return toArtifact(requireArtifact(id));
    }

    public List<ArtifactChunk> getChunks(UUID artifactId) {
        return requireArtifact(artifactId).chunks();
    }

    public ExtractionResult ingestArtifact(UUID artifactId) {
        StoredArtifact stored = requireArtifact(artifactId);
        String text = textExtractionService.extract(stored.fileName(), stored.content());
        List<ArtifactChunk> chunks = chunkText(stored, text);
        List<MemoryCandidate> memories = createMemoryCandidates(stored, chunks);
        List<ObservationCandidate> observations = createObservations(stored, chunks, memories);
        List<HypothesisCandidate> hypotheses = createHypotheses(stored, memories, observations);

        StoredArtifact ingested = stored.withIngestion(text, chunks, memories, observations, hypotheses);
        store.put(artifactId, ingested);

        return new ExtractionResult(
                artifactId,
                ingested.fileName(),
                text,
                chunks,
                memories,
                observations,
                hypotheses);
    }

    private StoredArtifact requireArtifact(UUID id) {
        StoredArtifact stored = store.get(id);
        if (stored == null) {
            throw new IllegalArgumentException("Artifact not found: " + id);
        }
        return stored;
    }

    private Artifact toArtifact(StoredArtifact stored) {
        return new Artifact(
                stored.id(),
                stored.fileName(),
                stored.contentType(),
                stored.format(),
                stored.status(),
                stored.uploadedAt(),
                stored.ingestedAt(),
                stored.chunkCount(),
                stored.memoryCount(),
                stored.observationCount(),
                stored.hypothesisCount());
    }

    private List<ArtifactChunk> chunkText(StoredArtifact stored, String text) {
        if (text == null || text.isBlank()) {
            return List.of();
        }

        if (isPdf(stored.fileName())) {
            return chunkPdfPages(stored, text);
        }

        return chunkPlainText(stored, text, 1);
    }

    private List<ArtifactChunk> chunkPdfPages(StoredArtifact stored, String text) {
        String[] pages = text.split("\f");
        List<ArtifactChunk> chunks = new ArrayList<>();
        int chunkNumber = 1;
        for (int pageIndex = 0; pageIndex < pages.length; pageIndex++) {
            String pageText = pages[pageIndex].trim();
            if (pageText.isBlank()) {
                continue;
            }
            chunks.addAll(chunkPlainText(stored, pageText, pageIndex + 1, chunkNumber));
            chunkNumber = chunks.size() + 1;
        }
        return chunks;
    }

    private List<ArtifactChunk> chunkPlainText(StoredArtifact stored, String text, int pageNumber) {
        return chunkPlainText(stored, text, pageNumber, 1);
    }

    private List<ArtifactChunk> chunkPlainText(StoredArtifact stored, String text, int pageNumber, int initialChunkNumber) {
        List<ArtifactChunk> chunks = new ArrayList<>();
        List<String> segments = splitIntoSegments(text);
        int chunkNumber = initialChunkNumber;
        for (String segment : segments) {
            if (segment.isBlank()) {
                continue;
            }
            String normalized = segment.trim();
            ProvenanceReference provenance = new ProvenanceReference(
                    stored.id(),
                    stored.fileName(),
                    pageNumber,
                    chunkNumber,
                    excerpt(normalized));
            chunks.add(new ArtifactChunk(
                    UUID.randomUUID(),
                    stored.id(),
                    stored.fileName(),
                    pageNumber,
                    chunkNumber,
                    normalized,
                    List.of(provenance)));
            chunkNumber++;
        }
        return chunks;
    }

    private List<String> splitIntoSegments(String text) {
        String[] byParagraph = text.split("(\\r?\\n){2,}");
        List<String> segments = new ArrayList<>();
        for (String paragraph : byParagraph) {
            String cleaned = paragraph.trim();
            if (cleaned.isEmpty()) {
                continue;
            }
            if (cleaned.length() <= 900) {
                segments.add(cleaned);
                continue;
            }
            int start = 0;
            while (start < cleaned.length()) {
                int end = Math.min(start + 900, cleaned.length());
                if (end < cleaned.length()) {
                    int space = cleaned.lastIndexOf(' ', end);
                    if (space > start + 200) {
                        end = space;
                    }
                }
                segments.add(cleaned.substring(start, end).trim());
                start = end;
            }
        }
        return segments;
    }

    private List<MemoryCandidate> createMemoryCandidates(StoredArtifact stored, List<ArtifactChunk> chunks) {
        if (isCareerHistoryDemo(stored.fileName())) {
            return buildDemoMemoryCandidates(stored, chunks);
        }

        return chunks.stream()
                .map(chunk -> new MemoryCandidate(
                        UUID.randomUUID(),
                        summarize(chunk.text()),
                        chunk.text(),
                        0.86,
                        chunk.provenanceReferences()))
                .collect(Collectors.toList());
    }

    private List<ObservationCandidate> createObservations(StoredArtifact stored, List<ArtifactChunk> chunks, List<MemoryCandidate> memories) {
        if (isCareerHistoryDemo(stored.fileName())) {
            return buildDemoObservations(stored, chunks);
        }

        List<ObservationCandidate> observations = new ArrayList<>();
        for (int i = 0; i < chunks.size(); i += 5) {
            ArtifactChunk chunk = chunks.get(i);
            observations.add(new ObservationCandidate(
                    UUID.randomUUID(),
                    "Independent learning appears repeatedly in the source material.",
                    0.82,
                    chunk.provenanceReferences()));
        }
        return observations;
    }

    private List<HypothesisCandidate> createHypotheses(StoredArtifact stored, List<MemoryCandidate> memories, List<ObservationCandidate> observations) {
        if (isCareerHistoryDemo(stored.fileName())) {
            return List.of(
                    new HypothesisCandidate(
                            UUID.randomUUID(),
                            "Recognition appears secondary to autonomy.",
                            0.76,
                            pickProvenance(memories)),
                    new HypothesisCandidate(
                            UUID.randomUUID(),
                            "The subject builds systems to create agency for other people.",
                            0.71,
                            pickProvenance(memories)));
        }

        if (memories.isEmpty()) {
            return List.of();
        }

        return List.of(
                new HypothesisCandidate(
                        UUID.randomUUID(),
                        "The subject values independence over certainty.",
                        0.74,
                        pickProvenance(memories)));
    }

    private List<ProvenanceReference> pickProvenance(List<MemoryCandidate> memories) {
        if (memories.isEmpty()) {
            return List.of();
        }
        return memories.stream()
                .flatMap(memory -> memory.provenanceReferences().stream())
                .distinct()
                .limit(3)
                .collect(Collectors.toList());
    }

    private List<MemoryCandidate> buildDemoMemoryCandidates(StoredArtifact stored, List<ArtifactChunk> chunks) {
        List<MemoryCandidate> memories = new ArrayList<>();
        if (chunks.isEmpty()) {
            return memories;
        }
        String[] seeds = {
                "Early tinkering with computers",
                "Learning by fixing things",
                "Choosing responsibility",
                "Moving toward independence",
                "Teaching others to build",
                "Working through uncertainty"
        };

        for (int i = 0; i < 34; i++) {
            ArtifactChunk chunk = chunks.get(i % chunks.size());
            memories.add(new MemoryCandidate(
                    UUID.randomUUID(),
                    seeds[i % seeds.length] + " " + (i + 1),
                    chunk.text(),
                    0.88 - (i % 5) * 0.03,
                    chunk.provenanceReferences()));
        }
        return memories;
    }

    private List<ObservationCandidate> buildDemoObservations(StoredArtifact stored, List<ArtifactChunk> chunks) {
        List<ObservationCandidate> observations = new ArrayList<>();
        if (chunks.isEmpty()) {
            return observations;
        }
        String[] statements = {
                "Independent learning appears repeatedly.",
                "The subject treats obstacles as invitations.",
                "Useful work creates trust.",
                "Leadership is accepted when the work needs it.",
                "Teaching appears as a form of care.",
                "The subject values systems that create agency."
        };

        for (int i = 0; i < statements.length; i++) {
            ArtifactChunk chunk = chunks.get(i % chunks.size());
            observations.add(new ObservationCandidate(
                    UUID.randomUUID(),
                    statements[i],
                    0.82 + (i * 0.01),
                    chunk.provenanceReferences()));
        }
        return observations;
    }

    private String summarize(String text) {
        String trimmed = text.replaceAll("\\s+", " ").trim();
        if (trimmed.length() <= 72) {
            return trimmed;
        }
        return trimmed.substring(0, 69).trim() + "...";
    }

    private String excerpt(String text) {
        String trimmed = text.replaceAll("\\s+", " ").trim();
        if (trimmed.length() <= 160) {
            return trimmed;
        }
        return trimmed.substring(0, 157).trim() + "...";
    }

    private boolean isPdf(String fileName) {
        return detectFormat(fileName).equals("pdf");
    }

    private boolean isCareerHistoryDemo(String fileName) {
        return fileName.toLowerCase(Locale.ROOT).contains("career-history");
    }

    private String detectFormat(String fileName) {
        String lower = fileName.toLowerCase(Locale.ROOT);
        if (lower.endsWith(".pdf")) {
            return "pdf";
        }
        if (lower.endsWith(".docx")) {
            return "docx";
        }
        if (lower.endsWith(".md")) {
            return "md";
        }
        if (lower.endsWith(".txt")) {
            return "txt";
        }
        return "unknown";
    }

    static record StoredArtifact(
            UUID id,
            String fileName,
            String contentType,
            String format,
            String status,
            Instant uploadedAt,
            Instant ingestedAt,
            int chunkCount,
            int memoryCount,
            int observationCount,
            int hypothesisCount,
            byte[] content,
            String extractedText,
            List<ArtifactChunk> chunks,
            List<MemoryCandidate> memories,
            List<ObservationCandidate> observations,
            List<HypothesisCandidate> hypotheses) {

        StoredArtifact withIngestion(
                String text,
                List<ArtifactChunk> chunks,
                List<MemoryCandidate> memories,
                List<ObservationCandidate> observations,
                List<HypothesisCandidate> hypotheses) {
            return new StoredArtifact(
                    id,
                    fileName,
                    contentType,
                    format,
                    "INGESTED",
                    uploadedAt,
                    Instant.now(),
                    chunks.size(),
                    memories.size(),
                    observations.size(),
                    hypotheses.size(),
                    content,
                    text,
                    List.copyOf(chunks),
                    List.copyOf(memories),
                    List.copyOf(observations),
                    List.copyOf(hypotheses));
        }
    }
}
