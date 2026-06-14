package com.chronicle.api.controller;

import com.chronicle.application.service.BookGenerationService;
import com.chronicle.application.service.BiographerService;
import com.chronicle.application.service.MemoryService;
import com.chronicle.domain.model.BookDraft;
import com.chronicle.domain.model.Memory;
import com.chronicle.domain.model.Observation;
import com.chronicle.domain.model.OpenQuestion;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class MemoryController {
    private final MemoryService memoryService;
    private final BiographerService biographerService;
    private final BookGenerationService bookGenerationService;

    public MemoryController(MemoryService memoryService, BiographerService biographerService, BookGenerationService bookGenerationService) {
        this.memoryService = memoryService;
        this.biographerService = biographerService;
        this.bookGenerationService = bookGenerationService;
    }

    @PostMapping("/memories")
    public ResponseEntity<Memory> createMemory(@RequestBody Memory memory) {
        Memory saved = memoryService.createMemory(memory);
        return ResponseEntity.status(201).body(saved);
    }

    @PostMapping("/memories/{id}/analyze")
    public ResponseEntity<List<Observation>> analyzeMemory(@PathVariable("id") String id) {
        java.util.UUID uuid = java.util.UUID.fromString(id);
        List<Observation> obs = memoryService.analyzeMemoryById(uuid);
        return ResponseEntity.ok(obs);
    }

    @PostMapping("/memories/{id}/questions")
    public ResponseEntity<List<OpenQuestion>> createQuestions(@PathVariable("id") String id) {
        java.util.UUID uuid = java.util.UUID.fromString(id);
        Memory memory = memoryService.getMemoryById(uuid);
        List<OpenQuestion> qs = biographerService.createOpenQuestions(memory);
        return ResponseEntity.status(201).body(qs);
    }

    @PostMapping("/memories/{id}/hypotheses")
    public ResponseEntity<List<com.chronicle.domain.model.Hypothesis>> createHypotheses(@PathVariable("id") String id) {
        java.util.UUID uuid = java.util.UUID.fromString(id);
        Memory memory = memoryService.getMemoryById(uuid);
        java.util.List<Observation> obs = memoryService.analyzeMemoryById(uuid);
        java.util.List<com.chronicle.domain.model.Hypothesis> hs = biographerService.createHypotheses(memory, obs);
        return ResponseEntity.status(201).body(hs);
    }

    @PostMapping("/memories/{id}/chapter")
    public ResponseEntity<BookDraft> generateChapter(@PathVariable("id") String id) {
        java.util.UUID uuid = java.util.UUID.fromString(id);
        java.util.List<Observation> obs = memoryService.analyzeMemoryById(uuid);
        com.chronicle.domain.model.Memory mem = memoryService.getMemoryById(uuid);
        BookDraft draft = bookGenerationService.generateChapter(mem, obs);
        return ResponseEntity.status(202).body(draft);
    }
}
