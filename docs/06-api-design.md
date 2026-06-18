# API Design (Current Surface)

This document lists the API that is actually implemented today.

Implemented endpoints
- `POST /api/v1/artifacts/upload` - register a file upload
- `GET /api/v1/artifacts` - list uploaded artifacts
- `GET /api/v1/artifacts/{id}` - fetch an artifact
- `POST /api/v1/artifacts/{id}/ingest` - run local extraction and chunking
- `GET /api/v1/artifacts/{id}/chunks` - list chunks for an artifact
- `POST /api/v1/memories` - create a memory
- `POST /api/v1/memories/{id}/analyze` - generate observations from a memory
- `POST /api/v1/memories/{id}/questions` - generate open questions from a memory
- `POST /api/v1/memories/{id}/hypotheses` - generate hypotheses from a memory
- `POST /api/v1/memories/{id}/chapter` - generate a chapter draft from a memory

Not implemented yet
- Interviews
- Timeline
- Themes
- Search
- General RAG query
- Book library management

Rule
- Keep the OpenAPI spec and the controller surface in sync. If an endpoint is not in code, it should not appear as product truth in the docs.
