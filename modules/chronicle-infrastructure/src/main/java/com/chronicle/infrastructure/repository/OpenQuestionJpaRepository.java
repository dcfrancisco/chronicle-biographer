package com.chronicle.infrastructure.repository;

import com.chronicle.domain.model.OpenQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface OpenQuestionJpaRepository extends JpaRepository<OpenQuestion, UUID> {
}
