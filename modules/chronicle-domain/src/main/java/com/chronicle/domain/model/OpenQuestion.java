package com.chronicle.domain.model;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "open_questions")
public class OpenQuestion {
    @Id
    private UUID id;

    @Column(name = "memory_id", nullable = false)
    private UUID memoryId;

    @Column(name = "question_text", columnDefinition = "text")
    private String questionText;

    @Column(name = "created_at")
    private Instant createdAt;

    public OpenQuestion() {
        this.id = UUID.randomUUID();
        this.createdAt = Instant.now();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getMemoryId() {
        return memoryId;
    }

    public void setMemoryId(UUID memoryId) {
        this.memoryId = memoryId;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
