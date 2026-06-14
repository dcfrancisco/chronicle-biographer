# API Design (overview)

Keep APIs RESTful and focused on model primitives.

Key endpoints:
- `POST /api/v1/ingest` — submit an artifact for processing
- `POST /api/v1/observations` — submit or create observations
- `GET /api/v1/hypotheses` — list or search hypotheses
- `POST /api/v1/investigations` — start an investigation workflow
- `GET /api/v1/themes` — list promoted themes

Authentication & privacy:
- OAuth2 for user accounts.
- Per-user encryption keys or tenant-based encryption for private data.

Versioning:
- Use `/api/v1/` and keep breaking changes for major versions.
