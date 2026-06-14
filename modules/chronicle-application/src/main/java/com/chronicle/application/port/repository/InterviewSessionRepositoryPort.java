package com.chronicle.application.port.repository;

import com.chronicle.domain.model.InterviewSession;

public interface InterviewSessionRepositoryPort {
    InterviewSession save(InterviewSession session);
}
