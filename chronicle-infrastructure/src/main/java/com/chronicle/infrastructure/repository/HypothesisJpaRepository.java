package com.chronicle.infrastructure.repository;

import com.chronicle.domain.model.Hypothesis;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface HypothesisJpaRepository extends JpaRepository<Hypothesis, UUID> {
}
