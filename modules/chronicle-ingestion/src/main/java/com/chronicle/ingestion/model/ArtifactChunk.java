package com.chronicle.ingestion.model;

import java.util.List;
import java.util.UUID;

public record ArtifactChunk(
        UUID id,
        UUID artifactId,
        String fileName,
        Integer pageNumber,
        Integer chunkNumber,
        String text,
        List<ProvenanceReference> provenanceReferences) {
}
