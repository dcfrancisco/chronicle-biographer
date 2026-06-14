# Chronicle — Product Requirements Document (PRD)

Version: 0.1
Date: 2026-06-14
Author: Product Team (initial draft)

---

## 1. Executive Summary

Chronicle is an AI Biographer: a long-term witness that helps a person discover meaning, patterns, contradictions, and legacy from their lifetime of memories and artifacts. Chronicle is not a chatbot — it is an active biographical intelligence system combining two complementary memories: Subject Memory (facts, artifacts, timeline) and Biographer Memory (interpretations, observations, questions, hypotheses).

Primary user outcomes:
- Discover recurring themes and life patterns.
- Surface contradictions and unpack beliefs.
- Preserve voice and produce legacy artifacts (memoirs, manifestos, letters).
- Guide reflective interviews that fill gaps and deepen meaning.

Audience: Individuals who want to document and reflect on their life (founders, leaders, creatives, elders, historians), families preserving legacy, and professional biographers.

Non-goals: therapy, medical advice, general productivity tool.

## 2. Core Principles
- Push Back: AI challenges and questions, not simply validate.
- Themes Over Events: biography emerges from themes and patterns.
- Preserve Original Voice: learn and reproduce user's voice.
- Ask Better Questions: adaptive, prioritized interview flows.
- Build Legacy: produce exportable, well-cited artifacts.
- The AI Is A Witness: maintain long-term continuity and internal beliefs (Biographer Memory).

## 3. Personas (AI roles)
- Historian — facts, dates, timeline.
- Interviewer — adaptive questioning to fill gaps.
- Skeptic — identifies contradictions and cognitive biases.
- Editor — polishes while preserving voice.
- Philosopher — extracts principles and meta-lessons.
- Biographer — integrates and composes narratives.

## 4. Major Capabilities
1. Memory Engine (multi-modal): ingest text, audio, images, video, social posts, emails.
2. Timeline Engine: extract events, align fuzzy dates, show periods and gaps.
3. Theme Engine: discover and summarize recurring themes with evidence.
4. Contradiction Engine: detect conflicting claims, changed beliefs, and repeated patterns.
5. Interview Engine: generate dynamic, prioritized questions; support scheduled interviews and follow-ups.
6. Book Engine: generate memoirs, manifestos, lessons learned, and curated legacy editions.
7. RAG-enabled queries: grounded answers with provenance.

## 5. Deliverables (this PRD covers)
- Product vision
- Architecture overview
- Domain model and event model
- Database design (logical)
- Memory architecture (Subject/Biographer/Relationship/Narrative)
- AI architecture and persona orchestration
- RAG strategy
- Engines (Interview, Contradiction, Timeline, Book)
- MVP and future roadmaps
- API design (docs-level)
- UI/UX concepts
- Implementation plan and privacy/ethics guidance

## 6. Technical Architecture (Overview)
- Frontend: Next.js (React) with PWA support for capture.
- Backend: Spring Boot (Kotlin/Java) or Node.js/TypeScript alternative.
- Database: PostgreSQL + `pgvector` for vector embeddings.
- Object storage: S3-compatible for media and original artifacts.
- Vector index: `pgvector` (MVP), optional Weaviate/Milvus for scale.
- LLM adapter: model abstraction layer (OpenAI, Anthropic, Ollama/local) with persona prompt templates.
- Workers: ingestion, preprocessing (ASR, OCR), extraction, embedding, summarization.
- Auth & Security: OIDC + per-user encryption keys, audit logs.

## 7. Domain Model (concise)
- UserProfile
- Artifact (type, uri, metadata)
- Memory (canonicalized semantic record)
- Event (timeline node)
- Theme (name, evidence refs)
- Claim (extracted assertion)
- Contradiction (linked claims)
- InterviewSession
- BookDraft

## 8. Event Model (lifecycle)
- CapturedEvent: raw user artifact.
- ExtractedEvent: NER/time-resolved event.
- ValidatedEvent: user-corrected.
- MergedEvent: aggregated timeline node.
- AnnotationEvent: notes/AI annotations.
- ArchivalEvent: exported or locked snapshot.

## 9. Database Design (logical)
Core tables (high level):
- `users` — profiles and settings
- `artifacts` — original uploaded items
- `memories` — canonical summaries + embeddings
- `events` — timeline nodes
- `themes` — theme records
- `claims` — extracted assertions
- `contradictions` — grouped conflicts
- `interview_sessions` — Q/A history
- `book_drafts` — saved drafts

Implementation notes:
- Use `pgvector` column types for embeddings.
- Store binary/media in object store with URI references in `artifacts`.
- Use JSONB for flexible metadata and provenance fields.

## 10. Memory Architecture (detailed)
Chronicle supports multiple memory layers:

Subject Memory (factual):
- Timeline events, jobs, achievements, failures, journal entries, photos, documents, recordings.
- Canonicalized and timestamped.

Biographer Memory (interpretive):
- Observations, hypotheses, contradictions, open questions, confidence scores, citations.
- Evolves as the AI learns and the user confirms/updates.

Relationship Memory (network):
- Person nodes, roles, first mention, narrative role, sentiment.

Narrative Memory (story-in-progress):
- Draft chapters, arcs, unresolved themes, prioritized storylines.

Pipeline phases:
1. Capture connectors
2. Preprocessing (OCR, ASR, metadata extraction)
3. Segmentation and claim extraction
4. Embedding + vector index
5. Canonicalization + summarization
6. Biographer updates (observations, contradictions)

## 11. AI Architecture (persona orchestration)
- Model Adapter Layer: single interface for multiple LLM providers.
- Persona Modules: prompt templates, chain-of-thought orchestration, and role-specific post-processing.
- Memory-Aware Context Assembly: retrieval of subject memory + biographer memory + temporal context before calls.
- Verification Pass: `Skeptic` persona cross-checks generated claims against source evidence.
- VoiceProfile: a compact representation of user's writing style used by `Editor` persona.

## 12. RAG Strategy
- Hybrid retrieval: dense (vector) + sparse (BM25) to assemble context.
- Temporal weighting: decay or amplify memories based on query intent.
- Source quoting: require outputs to include explicit artifact references.
- Multi-stage generation: retrieve → synthesize → verify with Skeptic → finalize.

## 13. Interview Engine
Key behaviors:
- Prioritize by gaps, contradictions, low-evidence themes.
- Question types: clarifying, counterfactual, deep-dive, reflection, influence.
- Adaptive follow-ups based on immediate answers.
- Schedule and persistence: queue follow-ups across sessions.
- Persona and tone controls for user comfort.

## 14. Contradiction Engine
- Claim extraction with provenance and confidence.
- Semantic conflict detection using entailment or contradiction models.
- Temporal cross-checks and severity scoring.
- Explainable UI: paired claims, evidence, suggested probes.
- Gentle framing: present as curiosity-driven, not judgmental.

## 15. Timeline Engine
- Extract dated events, normalize fuzzy dates, merge duplicates.
- Create granular buckets (life-phase, decade, project-level).
- Overlays for themes, people, and contradictions.
- Gap detection and auto-question generation.

## 16. Book Generation Engine
- Draft templates: Memoir (chronological), Thematic, Manifesto, Lessons Learned, Legacy Edition.
- Persona mixing (Historian/Philosopher/Editor) with weight controls.
- Voice preservation using `voiceProfile` + exemplar prompts.
- Inline provenance footnotes linking to artifacts.
- Draft iteration workflow: auto-draft → user edit → verification → export (PDF/EPUB).

## 17. API Design (docs-level)
Key endpoints (summary):
- `POST /v1/artifacts` — upload artifact
- `GET /v1/timeline` — fetch timeline
- `GET /v1/memories` — search memories
- `POST /v1/query` — RAG query (persona + voiceProfile)
- `POST /v1/interview/start` — start interview
- `POST /v1/interview/:id/answer` — submit answer
- `GET /v1/contradictions` — list detected contradictions
- `POST /v1/books/draft` — generate book draft

All generation endpoints accept `persona`, `voiceProfileId`, and `provenance=true` flags to include source citations.

## 18. UI/UX Concepts (summary)
- Onboarding: import and voice sample + privacy settings.
- Capture Center: quick-capture (text/photo/audio) and bulk upload.
- Timeline: interactive with evidence drilldown and theme overlays.
- Themes dashboard: theme cards with representative stories.
- Interview Console: live Q/A with follow-ups queue.
- Contradiction Review: respectful presentation of conflicts with links to evidence.
- Book Editor: chapter editor with persona sliders and citation sidebar.

## 19. MVP Roadmap (high level)
Phase 0 (0–4 weeks): scaffolding, Postgres + `pgvector`, basic Next.js UI, LLM adapter, text ingestion + embedding.
Phase 1 (1–3 months): ASR, event extraction, timeline UI, interview engine v1, book draft text export.
Phase 2 (4–6 months): theme engine, contradiction detection, voiceProfile, persona orchestration, provenance quoting.
Phase 3 (7–12 months): scale vector infra, family sharing, print-ready exports, optional local-model support.

## 20. Future Roadmap (ideas)
- On-device privacy-first mode
- Merge multi-user timelines (relationship weaving)
- Continuous learning and fine-tuning of voiceProfile
- Publisher integrations and print services

## 21. Privacy, Security & Ethics
- User ownership and exportability.
- At-rest encryption and optional client-side encryption for sensitive users.
- Human-in-the-loop for sensitive claims and high-severity contradictions.
- Consent flows for family-sharing and posthumous access.
- Audit logs for provenance and model versions.

## 22. Implementation Plan (first 90 days)
Week 0–2:
- Finalize PRD, provision infra, create repos, initial Next.js + API stub.
Week 3–6:
- Ingest pipeline: `POST /v1/artifacts`, text preprocessing, embeddings.
- Implement vector storage with `pgvector` and basic retrieval.
Week 7–12:
- Timeline extraction, interview engine with static prompts, book draft export.
- Basic UI: capture center, timeline view, interview console.

## 23. Metrics & Success Criteria
- Onboarding conversion (imports completed).
- Ingestion rate and indexing latency.
- Retrieval latency and citation accuracy.
- User-corrected-to-suggested change ratio (quality signal).
- Engagement: interview sessions / month, draft generations.

---

### Appendix: Questions for you
- Priorities: which deliverable should I expand next (OpenAPI spec, architecture diagram, UX flows, or detailed DB schema)?
- Any existing data sources or integrations you want supported in MVP (e.g., Gmail, iCloud photos)?


---

End of PRD (initial draft).
