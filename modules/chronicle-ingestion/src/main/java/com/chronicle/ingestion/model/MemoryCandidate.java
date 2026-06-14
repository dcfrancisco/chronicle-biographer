package com.chronicle.ingestion.model;

import java.util.List;
import java.util.UUID;

public record MemoryCandidate(
        UUID id,
        String title,
        String text,
        double confidence,
        List<ProvenanceReference> provenanceReferences) {
}
