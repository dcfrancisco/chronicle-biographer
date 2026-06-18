# System Architecture

This document describes Chronicle as it exists now, not as a future platform.

Current implementation
- Frontend: Next.js prototype app.
- Primary flow: Upload, then mock/prototype review surfaces.
- API: Spring Boot service.
- Ingestion: local, synchronous, in-memory artifact processing.
- AI: primary mock provider with a placeholder OpenAI adapter.
- Persistence: PostgreSQL-backed artifact, memory, and repository data.

Current data flow
1. Upload an artifact.
2. Register it in the API.
3. Extract text locally.
4. Chunk the content.
5. Create memory candidates.
6. Generate observations.
7. Generate hypotheses.
8. Generate open questions.
9. Generate a chapter draft.

What is not part of the MVP yet
- Object storage
- OCR
- ASR
- Vector search
- Workers
- Kubernetes
- Timeline and relationship systems
- Workspace architecture

Guiding rule
- If a component does not support the current tested flow, it belongs in the roadmap, not the core architecture narrative.
