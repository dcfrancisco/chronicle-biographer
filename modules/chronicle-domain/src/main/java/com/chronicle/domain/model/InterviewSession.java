package com.chronicle.domain.model;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "interview_sessions")
public class InterviewSession {
    @Id
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "persona")
    private String persona;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "session_id")
    private List<InterviewAnswer> answers = new ArrayList<>();

    @Column(name = "created_at")
    private Instant createdAt;

    public InterviewSession() {
        this.id = UUID.randomUUID();
        this.createdAt = Instant.now();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getPersona() {
        return persona;
    }

    public void setPersona(String persona) {
        this.persona = persona;
    }

    public List<InterviewAnswer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<InterviewAnswer> answers) {
        this.answers = answers;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
