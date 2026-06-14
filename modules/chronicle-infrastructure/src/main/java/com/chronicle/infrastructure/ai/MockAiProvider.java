package com.chronicle.infrastructure.ai;

import com.chronicle.application.ai.AiProvider;
import com.chronicle.domain.model.BookDraft;
import com.chronicle.domain.model.Memory;
import com.chronicle.domain.model.OpenQuestion;
import com.chronicle.domain.model.Observation;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Primary
public class MockAiProvider implements AiProvider {
    @Override
    public List<Observation> analyzeMemory(Memory memory) {
        List<Observation> out = new ArrayList<>();
        Observation o = new Observation();
        o.setMemoryId(memory.getId());
        o.setText("Mock observation: key detail extracted from memory.");
        o.setConfidence(0.9);
        out.add(o);
        return out;
    }

    @Override
    public List<OpenQuestion> generateQuestions(Memory memory) {
        List<OpenQuestion> qs = new ArrayList<>();
        OpenQuestion q = new OpenQuestion();
        q.setMemoryId(memory.getId());
        q.setQuestionText("Can you tell me more about the emotions in this event?");
        qs.add(q);
        return qs;
    }

    @Override
    public java.util.List<com.chronicle.domain.model.Hypothesis> generateHypotheses(Memory memory, java.util.List<Observation> observations) {
        java.util.List<com.chronicle.domain.model.Hypothesis> out = new ArrayList<>();
        com.chronicle.domain.model.Hypothesis h = new com.chronicle.domain.model.Hypothesis();
        h.setUserId(memory.getUserId());
        h.setText("The subject values independence more than recognition.");
        h.setConfidence(0.74);
        // build simple provenance linking observation ids
        StringBuilder prov = new StringBuilder();
        prov.append("{\"evidence\":[");
        for (int i = 0; i < observations.size(); i++) {
            Observation o = observations.get(i);
            prov.append("{\"observation_id\":\"").append(o.getId()).append("\"}");
            if (i < observations.size() - 1) prov.append(',');
        }
        prov.append("]}");
        h.setProvenance(prov.toString());
        out.add(h);
        return out;
    }

    @Override
    public Observation generateObservation(Memory memory) {
        Observation o = new Observation();
        o.setMemoryId(memory.getId());
        o.setText("Mock single observation generated.");
        o.setConfidence(0.85);
        return o;
    }

    @Override
    public BookDraft generateChapter(Memory memory, List<Observation> observations) {
        BookDraft draft = new BookDraft();
        draft.setTitle("Chapter draft for: " + (memory.getTitle() == null ? "untitled" : memory.getTitle()));
        StringBuilder sb = new StringBuilder();
        sb.append("This chapter reflects on: \n");
        sb.append(memory.getCanonicalText()).append("\n\n");
        for (Observation o : observations) {
            sb.append("- ").append(o.getText()).append("\n");
        }
        draft.setContent(sb.toString());
        draft.setStatus("GENERATED");
        return draft;
    }
}
