 # API Design (Product Overview)

This document describes Chronicle's public API intent and the core endpoints supporting ingestion, memory retrieval, interviews, themes, and book generation.

Design principles
- RESTful JSON APIs under `/api/v1`.
- All AI-generated objects include `confidence`, `provenance`, and `evidence` fields.
- Use UUIDs for resources and standard pagination patterns.

Core endpoints (examples)
- `POST /api/v1/artifacts` — upload artifact
- `GET /api/v1/artifacts/{id}` — fetch artifact metadata and signed URL
- `POST /api/v1/memories/search` — semantic memory search
- `GET /api/v1/observations` — list biographer observations
- `POST /api/v1/interviews` — start interview session
- `POST /api/v1/interviews/{id}/answer` — submit an answer
- `POST /api/v1/books/generate` — request book/chapter generation
- `POST /api/v1/query` — general RAG query with persona and provenance

Security & privacy
- OAuth2/OIDC for authentication.
- Per-user encryption keys or tenant-scoped encryption for private data.

Versioning
- Use `/api/v1/` as the MVP surface; reserve breaking changes for major versions.

