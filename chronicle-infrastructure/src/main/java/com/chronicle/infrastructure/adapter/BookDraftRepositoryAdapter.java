package com.chronicle.infrastructure.adapter;

import com.chronicle.application.port.repository.BookDraftRepositoryPort;
import com.chronicle.domain.model.BookDraft;
import com.chronicle.infrastructure.repository.BookDraftJpaRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
public class BookDraftRepositoryAdapter implements BookDraftRepositoryPort {
    private final BookDraftJpaRepository jpa;

    public BookDraftRepositoryAdapter(BookDraftJpaRepository jpa) { this.jpa = jpa; }

    @Override
    public BookDraft save(BookDraft draft) { return jpa.save(draft); }

    @Override
    public Optional<BookDraft> findById(UUID id) { return jpa.findById(id); }
}
