package com.chronicle.application.port.repository;

import com.chronicle.domain.model.Hypothesis;

public interface HypothesisRepositoryPort {
    Hypothesis save(Hypothesis hypothesis);
}
