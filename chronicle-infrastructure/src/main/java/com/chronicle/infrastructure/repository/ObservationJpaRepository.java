package com.chronicle.infrastructure.repository;

import com.chronicle.domain.model.Observation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ObservationJpaRepository extends JpaRepository<Observation, UUID> {
}
