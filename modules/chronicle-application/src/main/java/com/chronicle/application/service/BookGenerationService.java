package com.chronicle.application.service;

import com.chronicle.application.ai.AiProvider;
import com.chronicle.application.port.repository.BookDraftRepositoryPort;
import com.chronicle.domain.model.BookDraft;
import com.chronicle.domain.model.Memory;
import com.chronicle.domain.model.Observation;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BookGenerationService {
    private final AiProvider aiProvider;
    private final BookDraftRepositoryPort bookDraftRepository;

    public BookGenerationService(AiProvider aiProvider, BookDraftRepositoryPort bookDraftRepository) {
        this.aiProvider = aiProvider;
        this.bookDraftRepository = bookDraftRepository;
    }

    @Transactional
    public BookDraft generateChapter(Memory memory, List<Observation> observations) {
        BookDraft draft = aiProvider.generateChapter(memory, observations);
        return bookDraftRepository.save(draft);
    }
}
