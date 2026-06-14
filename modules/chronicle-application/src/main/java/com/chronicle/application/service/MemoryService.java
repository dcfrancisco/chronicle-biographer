package com.chronicle.application.service;

import com.chronicle.application.ai.AiProvider;
import com.chronicle.application.port.repository.MemoryRepositoryPort;
import com.chronicle.application.port.repository.ObservationRepositoryPort;
import com.chronicle.domain.model.Memory;
import com.chronicle.domain.model.Observation;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MemoryService {
    private final MemoryRepositoryPort memoryRepository;
    private final ObservationRepositoryPort observationRepository;
    private final AiProvider aiProvider;

    public MemoryService(MemoryRepositoryPort memoryRepository,
                         ObservationRepositoryPort observationRepository,
                         AiProvider aiProvider) {
        this.memoryRepository = memoryRepository;
        this.observationRepository = observationRepository;
        this.aiProvider = aiProvider;
    }

    @Transactional
    public Memory createMemory(Memory memory) {
        return memoryRepository.save(memory);
    }

    @Transactional
    public List<Observation> analyzeMemory(Memory memory) {
        List<Observation> observations = aiProvider.analyzeMemory(memory);
        observationRepository.saveAll(observations);
        return observations;
    }

    @Transactional
    public java.util.List<Observation> analyzeMemoryById(java.util.UUID id) {
        Memory memory = memoryRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Memory not found: " + id));
        return analyzeMemory(memory);
    }

    @Transactional(readOnly = true)
    public Memory getMemoryById(java.util.UUID id) {
        return memoryRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Memory not found: " + id));
    }
}
