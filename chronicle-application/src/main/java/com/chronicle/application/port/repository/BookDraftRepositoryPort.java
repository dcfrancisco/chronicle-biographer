package com.chronicle.application.port.repository;

import com.chronicle.domain.model.BookDraft;

import java.util.Optional;

public interface BookDraftRepositoryPort {
    BookDraft save(BookDraft draft);
    Optional<BookDraft> findById(java.util.UUID id);
}
