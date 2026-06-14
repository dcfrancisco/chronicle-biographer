package com.chronicle.application.port.repository;

import com.chronicle.domain.model.InterviewAnswer;

public interface InterviewAnswerRepositoryPort {
    InterviewAnswer save(InterviewAnswer answer);
}
