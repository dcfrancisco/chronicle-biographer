package com.chronicle.infrastructure.repository;

import com.chronicle.domain.model.BookDraft;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface BookDraftJpaRepository extends JpaRepository<BookDraft, UUID> {
}
