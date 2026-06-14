package com.chronicle.infrastructure.repository;

import com.chronicle.domain.model.Memory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface MemoryJpaRepository extends JpaRepository<Memory, UUID> {
}
