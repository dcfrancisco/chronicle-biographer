package com.chronicle.ingestion.model;

import java.util.List;
import java.util.UUID;

public record ExtractionResult(
        UUID artifactId,
        String fileName,
        String text,
        List<ArtifactChunk> chunks,
        List<MemoryCandidate> memories,
        List<ObservationCandidate> observations,
        List<HypothesisCandidate> hypotheses) {
}
