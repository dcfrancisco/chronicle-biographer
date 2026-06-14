package com.chronicle.infrastructure.adapter;

import com.chronicle.application.port.repository.InterviewSessionRepositoryPort;
import com.chronicle.domain.model.InterviewSession;
import com.chronicle.infrastructure.repository.InterviewSessionJpaRepository;
import org.springframework.stereotype.Component;

@Component
public class InterviewSessionRepositoryAdapter implements InterviewSessionRepositoryPort {
    private final InterviewSessionJpaRepository jpa;

    public InterviewSessionRepositoryAdapter(InterviewSessionJpaRepository jpa) { this.jpa = jpa; }

    @Override
    public InterviewSession save(InterviewSession session) { return jpa.save(session); }
}
