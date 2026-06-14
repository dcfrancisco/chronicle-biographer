package com.chronicle.ingestion.model;

import java.util.UUID;

public record ProvenanceReference(
        UUID artifactId,
        String fileName,
        Integer pageNumber,
        Integer chunkNumber,
        String excerpt) {
}
