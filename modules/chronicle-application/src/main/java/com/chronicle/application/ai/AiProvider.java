package com.chronicle.application.ai;

import com.chronicle.domain.model.BookDraft;
import com.chronicle.domain.model.Memory;
import com.chronicle.domain.model.OpenQuestion;
import com.chronicle.domain.model.Observation;

import java.util.List;

public interface AiProvider {
    List<Observation> analyzeMemory(Memory memory);
    List<OpenQuestion> generateQuestions(Memory memory);
    Observation generateObservation(Memory memory);
    java.util.List<com.chronicle.domain.model.Hypothesis> generateHypotheses(Memory memory, java.util.List<Observation> observations);
    BookDraft generateChapter(Memory memory, List<Observation> observations);
}
