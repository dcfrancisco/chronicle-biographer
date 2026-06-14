package com.chronicle.api.controller;

import com.chronicle.ingestion.model.Artifact;
import com.chronicle.ingestion.model.ArtifactChunk;
import com.chronicle.ingestion.model.ExtractionResult;
import com.chronicle.ingestion.service.ArtifactIngestionService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/artifacts")
public class ArtifactController {
    private final ArtifactIngestionService ingestionService;

    public ArtifactController(ArtifactIngestionService ingestionService) {
        this.ingestionService = ingestionService;
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Artifact> upload(@RequestPart("file") MultipartFile file) {
        try {
            return ResponseEntity.status(201).body(
                    ingestionService.registerArtifact(
                            file.getOriginalFilename(),
                            file.getContentType(),
                            file.getBytes()));
        } catch (IOException e) {
            throw new IllegalArgumentException("Unable to read uploaded file: " + file.getOriginalFilename(), e);
        }
    }

    @GetMapping
    public ResponseEntity<List<Artifact>> listArtifacts() {
        return ResponseEntity.ok(ingestionService.listArtifacts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Artifact> getArtifact(@PathVariable("id") String id) {
        return ResponseEntity.ok(ingestionService.getArtifact(UUID.fromString(id)));
    }

    @PostMapping("/{id}/ingest")
    public ResponseEntity<ExtractionResult> ingest(@PathVariable("id") String id) {
        return ResponseEntity.accepted().body(ingestionService.ingestArtifact(UUID.fromString(id)));
    }

    @GetMapping("/{id}/chunks")
    public ResponseEntity<List<ArtifactChunk>> chunks(@PathVariable("id") String id) {
        return ResponseEntity.ok(ingestionService.getChunks(UUID.fromString(id)));
    }
}
