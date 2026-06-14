package com.chronicle.ingestion.model;

import java.util.List;
import java.util.UUID;

public record ObservationCandidate(
        UUID id,
        String text,
        double confidence,
        List<ProvenanceReference> provenanceReferences) {
}
