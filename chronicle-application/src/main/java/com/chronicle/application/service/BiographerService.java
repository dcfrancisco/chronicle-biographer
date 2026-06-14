package com.chronicle.application.service;

import com.chronicle.application.ai.AiProvider;
import com.chronicle.application.port.repository.OpenQuestionRepositoryPort;
import com.chronicle.application.port.repository.HypothesisRepositoryPort;
import com.chronicle.domain.model.Memory;
import com.chronicle.domain.model.OpenQuestion;
import com.chronicle.domain.model.Observation;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BiographerService {
    private final AiProvider aiProvider;
    private final OpenQuestionRepositoryPort openQuestionRepository;
    private final com.chronicle.application.port.repository.HypothesisRepositoryPort hypothesisRepository;

    public BiographerService(AiProvider aiProvider, OpenQuestionRepositoryPort openQuestionRepository, HypothesisRepositoryPort hypothesisRepository) {
        this.aiProvider = aiProvider;
        this.openQuestionRepository = openQuestionRepository;
        this.hypothesisRepository = hypothesisRepository;
    }

    @Transactional
    public List<OpenQuestion> createOpenQuestions(Memory memory) {
        List<OpenQuestion> qs = aiProvider.generateQuestions(memory);
        openQuestionRepository.saveAll(qs);
        return qs;
    }

    @Transactional
    public java.util.List<com.chronicle.domain.model.Hypothesis> createHypotheses(Memory memory, java.util.List<Observation> observations) {
        java.util.List<com.chronicle.domain.model.Hypothesis> hs = aiProvider.generateHypotheses(memory, observations);
        for (com.chronicle.domain.model.Hypothesis h : hs) {
            hypothesisRepository.save(h);
        }
        return hs;
    }
}
