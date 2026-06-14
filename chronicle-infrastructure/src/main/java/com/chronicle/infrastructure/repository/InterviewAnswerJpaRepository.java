package com.chronicle.infrastructure.repository;

import com.chronicle.domain.model.InterviewAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface InterviewAnswerJpaRepository extends JpaRepository<InterviewAnswer, UUID> {
}
