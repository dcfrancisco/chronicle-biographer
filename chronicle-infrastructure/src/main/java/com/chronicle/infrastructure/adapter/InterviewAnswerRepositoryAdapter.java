package com.chronicle.infrastructure.adapter;

import com.chronicle.application.port.repository.InterviewAnswerRepositoryPort;
import com.chronicle.domain.model.InterviewAnswer;
import com.chronicle.infrastructure.repository.InterviewAnswerJpaRepository;
import org.springframework.stereotype.Component;

@Component
public class InterviewAnswerRepositoryAdapter implements InterviewAnswerRepositoryPort {
    private final InterviewAnswerJpaRepository jpa;

    public InterviewAnswerRepositoryAdapter(InterviewAnswerJpaRepository jpa) { this.jpa = jpa; }

    @Override
    public InterviewAnswer save(InterviewAnswer answer) { return jpa.save(answer); }
}
