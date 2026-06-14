package com.chronicle.application.service;

import com.chronicle.application.port.repository.InterviewAnswerRepositoryPort;
import com.chronicle.application.port.repository.InterviewSessionRepositoryPort;
import com.chronicle.domain.model.InterviewAnswer;
import com.chronicle.domain.model.InterviewSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class InterviewService {
    private final InterviewSessionRepositoryPort sessionRepository;
    private final InterviewAnswerRepositoryPort answerRepository;

    public InterviewService(InterviewSessionRepositoryPort sessionRepository, InterviewAnswerRepositoryPort answerRepository) {
        this.sessionRepository = sessionRepository;
        this.answerRepository = answerRepository;
    }

    @Transactional
    public InterviewSession startSession(InterviewSession session) {
        return sessionRepository.save(session);
    }

    @Transactional
    public InterviewAnswer submitAnswer(InterviewAnswer answer) {
        return answerRepository.save(answer);
    }
}
