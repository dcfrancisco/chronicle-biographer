# Database Design (Current State)

Chronicle uses PostgreSQL for the current demo, but not every table in the migration history is part of the MVP story.

Used by the current flow
- `artifacts`
- `artifact_chunks`
- `memories`
- `observations`
- `open_questions`
- `hypotheses`
- `book_drafts`
- `provider_configurations`

Present in the schema but not part of the truthful MVP narrative
- `users`
- `memory_embeddings`
- `life_events`
- `claims`
- `biographer_notes`
- `contradictions`
- `interview_sessions`
- `interview_answers`

Current guidance
- Keep the MVP database story focused on artifact ingestion and draft generation.
- Treat embeddings, interviews, contradictions, and narrative expansion as deferred work.
- Do not describe object storage or vector-search infrastructure as shipped product capability.
