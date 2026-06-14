package com.chronicle.infrastructure.adapter;

import com.chronicle.application.port.repository.OpenQuestionRepositoryPort;
import com.chronicle.domain.model.OpenQuestion;
import com.chronicle.infrastructure.repository.OpenQuestionJpaRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class OpenQuestionRepositoryAdapter implements OpenQuestionRepositoryPort {
    private final OpenQuestionJpaRepository jpa;

    public OpenQuestionRepositoryAdapter(OpenQuestionJpaRepository jpa) { this.jpa = jpa; }

    @Override
    public OpenQuestion save(OpenQuestion question) { return jpa.save(question); }

    @Override
    public List<OpenQuestion> saveAll(Iterable<OpenQuestion> questions) {
        List<OpenQuestion> out = new ArrayList<>();
        jpa.saveAll(questions).forEach(out::add);
        return out;
    }
}
