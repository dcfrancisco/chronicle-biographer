# Chronicle — API Design (MVP)

This document describes the MVP API surface for Chronicle. It focuses on the core, first-usable workflow:

1. User records a memory (artifact upload)
2. Chronicle stores the artifact and creates subject memory
3. Biographer analyzes the memory and creates observations/hypotheses
4. Biographer generates follow-up interview questions
5. User answers questions (interview)
6. Chronicle updates memories and generates a chapter draft (book)

Design principles
- RESTful JSON APIs under `/api/v1`.
- UUID primary identifiers for all resources.
- Pagination via `page` / `per_page` and cursor-compatible `next_cursor` in responses.
- All AI-generated objects include `confidence` (0..1), `provenance` (structured JSON), and `evidence` (list of artifact/memory references and snippets).
- Standard error model with `code`, `message`, `details`.
- Security: bearer token (OAuth2/OIDC) expected; `user_id` inferred from token.
- Minimal surface for MVP — only endpoints required for primary flow.

Key endpoints (MVP)
- Artifacts: upload and retrieve
  - `POST /api/v1/artifacts` (multipart/form-data) — upload media or text
  - `GET /api/v1/artifacts/{id}` — fetch artifact metadata and signed URL

- Memories: create, list, retrieve, semantic search
  - `POST /api/v1/memories` — create canonical memory (usually produced by ingestion worker)
  - `GET /api/v1/memories` — list memories (pagination, filters)
  - `GET /api/v1/memories/{id}` — get single memory with provenance
  - `POST /api/v1/memories/search` — semantic search (returns ranked memories)

- Biographer (read-only in MVP)
  - `GET /api/v1/observations`
  - `GET /api/v1/hypotheses`
  - `GET /api/v1/open-questions`
  - `GET /api/v1/contradictions`

- Interviews
  - `POST /api/v1/interviews` — start session and return first question
  - `GET /api/v1/interviews/{id}` — get session state
  - `POST /api/v1/interviews/{id}/answer` — submit answer (text or reference to artifact)

- Timeline
  - `GET /api/v1/timeline` — return life events (range filters)

- Themes
  - `GET /api/v1/themes` — list detected themes

- Books
  - `POST /api/v1/books/generate` — request chapter/book generation (returns draft id)
  - `GET /api/v1/books/{id}` — fetch book draft metadata
  - `GET /api/v1/books/{id}/chapters` — list chapters for draft

- RAG
  - `POST /api/v1/query` — ask a general RAG question; returns grounded answer with confidence and sources

Provenance model (summary)
- Every AI-generated record must include `provenance` JSON with at least one evidence link. Minimal structure:

```json
{ "evidence": [{"artifact_id":"uuid","snippet":"...","offset":{}}], "generated_by": {"model":"openai-gpt", "model_version":"...","prompt_id":"..."}, "created_at":"..." }
```

Pagination pattern
- Responses that return lists include:
  - `items` array
  - `page` (int)
  - `per_page` (int)
  - `total` (int, optional)
  - `next_cursor` (string, optional for cursor-based continuation)

Examples and usage
- Typical flow: client uploads `artifact` (audio or text) → backend returns `artifactId` → ingestion workers create `memories` and `memory_embeddings` → biographer notes appear via `GET /api/v1/observations` → client starts interview with `POST /api/v1/interviews` → answers via `POST /api/v1/interviews/{id}/answer` → book generation via `POST /api/v1/books/generate` produces chapters accessible at `GET /api/v1/books/{id}/chapters`.

Next steps
- Implement OpenAPI spec (`openapi/chronicle-api.yaml`) to drive server and client code generation.

Document created: docs/API_DESIGN.md
