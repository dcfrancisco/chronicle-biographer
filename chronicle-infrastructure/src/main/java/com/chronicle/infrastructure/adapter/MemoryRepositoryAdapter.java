package com.chronicle.infrastructure.adapter;

import com.chronicle.application.port.repository.MemoryRepositoryPort;
import com.chronicle.domain.model.Memory;
import com.chronicle.infrastructure.repository.MemoryJpaRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
public class MemoryRepositoryAdapter implements MemoryRepositoryPort {
    private final MemoryJpaRepository jpa;

    public MemoryRepositoryAdapter(MemoryJpaRepository jpa) { this.jpa = jpa; }

    @Override
    public Memory save(Memory memory) { return jpa.save(memory); }

    @Override
    public Optional<Memory> findById(UUID id) { return jpa.findById(id); }
}
