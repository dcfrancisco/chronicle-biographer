package com.chronicle.infrastructure.ai;

import com.chronicle.application.ai.AiProvider;
import com.chronicle.domain.model.BookDraft;
import com.chronicle.domain.model.Memory;
import com.chronicle.domain.model.OpenQuestion;
import com.chronicle.domain.model.Observation;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@ConditionalOnProperty(prefix = "ai.provider.openai", name = "enabled", havingValue = "true")
public class OpenAiProvider implements AiProvider {
    @Override
    public List<Observation> analyzeMemory(Memory memory) {
        throw new UnsupportedOperationException("OpenAI provider not implemented yet");
    }

    @Override
    public List<OpenQuestion> generateQuestions(Memory memory) {
        throw new UnsupportedOperationException("OpenAI provider not implemented yet");
    }

    @Override
    public Observation generateObservation(Memory memory) {
        throw new UnsupportedOperationException("OpenAI provider not implemented yet");
    }

    @Override
    public java.util.List<com.chronicle.domain.model.Hypothesis> generateHypotheses(Memory memory, java.util.List<Observation> observations) {
        throw new UnsupportedOperationException("OpenAI provider not implemented yet");
    }

    @Override
    public BookDraft generateChapter(Memory memory, List<Observation> observations) {
        throw new UnsupportedOperationException("OpenAI provider not implemented yet");
    }
}
