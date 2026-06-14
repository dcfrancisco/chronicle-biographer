package com.chronicle.ingestion.model;

import java.time.Instant;
import java.util.UUID;

public record Artifact(
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
        int hypothesisCount) {
}
