# Database Design (summary)

This is a brief index of the core tables/collections used by Chronicle.

Core models:
- artifacts: id, type, uri, size, created_at, source
- observations: id, artifact_id, timestamp, text, metadata
- hypotheses: id, summary, confidence_score, status, linked_observations
- contradictions: id, hypothesis_id, observation_id, note
- themes: id, title, hypothesis_ids, summary
- users: id, name, visibility_preferences

Notes:
- Store `extractionMetadata` as JSON for flexibility.
- Consider using a vector index for `observation` embeddings to support semantic search and clustering.
