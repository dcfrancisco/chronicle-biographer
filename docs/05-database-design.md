
# Database Design (PostgreSQL + pgvector)

This document explains the recommended DB schema for Chronicle, focused on PostgreSQL with the `pgvector` extension for semantic search. It captures Subject Memory, Biographer Memory, Relationship Memory, and Narrative Memory models.

Guiding rules
- Use Postgres as the authoritative store and an S3-compatible object store for raw media.
- Use `vector` (pgvector) columns for embeddings and nearest-neighbor search.
- Artifacts are append-only and must include provenance and metadata.
- Interpretive records must link back to source artifacts via structured `provenance` JSONB.

Core tables (high-level)
- `users`
- `artifacts` and `artifact_chunks`
- `memories` and optional `memory_embeddings`
- `life_events`
- `claims`, `biographer_notes`, `hypotheses`, `contradictions`
- `themes`, `narrative_arcs`, `chapters`, `book_drafts`

Indexing & strategies
- Use IVFFLAT indexes for vector columns and GIN indexes for JSONB fields used in filters.
- Partition or archive older artifacts to keep hot tables performant.

Migration & DDL notes
- Use Flyway migration files (V1__extensions.sql, V2__users_and_artifacts.sql, ...).
- Prefer UUID PKs and snake_case naming to match typical Java/Spring conventions.

Provenance model
- Store provenance as structured JSONB linking to `artifact_id`, `memory_id`, offsets, `extractionMethod`, and `model_meta`.
- Record `confidenceHistory` for auditability.

Security & operational considerations
- Soft-delete with `deleted` and `deleted_at` fields.
- Audit logs and `generation_audit` table for model calls.
- Tune `pgvector` index `lists` parameter post-seed.

