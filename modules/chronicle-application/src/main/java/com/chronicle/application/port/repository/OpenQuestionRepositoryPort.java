package com.chronicle.application.port.repository;

import com.chronicle.domain.model.OpenQuestion;

import java.util.List;

public interface OpenQuestionRepositoryPort {
    OpenQuestion save(OpenQuestion question);
    List<OpenQuestion> saveAll(Iterable<OpenQuestion> questions);
}
