package com.chronicle.application.port.repository;

import com.chronicle.domain.model.Memory;

import java.util.Optional;
import java.util.UUID;

public interface MemoryRepositoryPort {
    Memory save(Memory memory);
    Optional<Memory> findById(UUID id);
}
