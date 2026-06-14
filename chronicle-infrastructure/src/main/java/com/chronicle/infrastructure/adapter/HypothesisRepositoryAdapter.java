package com.chronicle.infrastructure.adapter;

import com.chronicle.application.port.repository.HypothesisRepositoryPort;
import com.chronicle.domain.model.Hypothesis;
import com.chronicle.infrastructure.repository.HypothesisJpaRepository;
import org.springframework.stereotype.Component;

@Component
public class HypothesisRepositoryAdapter implements HypothesisRepositoryPort {
    private final HypothesisJpaRepository jpa;

    public HypothesisRepositoryAdapter(HypothesisJpaRepository jpa) { this.jpa = jpa; }

    @Override
    public Hypothesis save(Hypothesis hypothesis) { return jpa.save(hypothesis); }
}
