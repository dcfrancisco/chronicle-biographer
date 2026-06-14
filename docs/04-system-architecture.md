 # System Architecture

This doc captures Chronicle's system-level design from a product perspective: how capture, memory, reasoning, and composition components interact to surface life stories.

Product components
- Capture & Ingestion: connectors and upload pathways for documents, photos, audio, chat exports, and social media archives.
- Extraction & Preprocessing: OCR, ASR, language detection, chunking, and metadata normalization that produce `Artifact` and `ArtifactChunk` records.
- Memory Store: Subject Memory and Biographer Memory persisted with provenance and embeddings (Postgres + `pgvector` for MVP).
- Biographer Engine: reasoning layer that generates `Observation`s, proposes `Hypothesis` candidates, detects contradictions, and promotes `Theme`s.
- Writing Studio & Notebook: UI surfaces for authorship, evidence citation, and researcher-style notes.
- API & Orchestration: REST endpoints, async jobs, and worker fleet that connect frontend actions to background processing.

High-level data flow
1. User uploads or captures artifact → capture service stores `Artifact` in object store and metadata in DB.
2. Extraction workers perform OCR/ASR → emit `ArtifactChunk`s and `Observation`s.
3. Embedding workers compute vector representations; vectors stored in `pgvector`.
4. Biographer workers generate `Hypothesis` candidates and `InvestigationPlan`s.
5. Themes and BookDrafts are surfaced in Writing Studio for user curation.

Infrastructure pieces (MVP)
- Frontend: Next.js PWA for capture + writing
- API: Spring Boot (or equivalent) serving REST endpoints and webhooks
- Workers: Kubernetes-backed workers for ingestion, ASR, OCR, extraction, and embeddings
- DB: PostgreSQL + `pgvector` (MVP), optional external vector DB later
- Storage: S3-compatible object store for artifacts
- Models: adapter layer to route to cloud or local LLMs (OpenAI, Anthropic, Ollama)

Provenance & Trust
- All interpretive results (claims, hypotheses, themes, chapters) must include provenance: artifact IDs, snippets, extraction method, and model metadata.
- Implement audit logs for model calls, prompt templates, and user actions.

