-- V1__create_core_identity_and_artifacts.sql
-- Create core identity and artifact tables
-- Requirements: uuid-ossp, pgvector (vector)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS vector;

-- users: root of per-subject data (single-subject MVP but multi-subject ready)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  username text NOT NULL,
  email text UNIQUE,
  settings jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz,
  deleted_at timestamptz,
  deleted boolean NOT NULL DEFAULT false
);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- artifacts: immutable originals stored in object storage; append-only
CREATE TABLE IF NOT EXISTS artifacts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  source_type text NOT NULL, -- 'upload','email','social','import'
  media_type text NOT NULL,  -- 'text','audio','image','video','email'
  uri text NOT NULL,         -- S3 or object store pointer
  metadata jsonb DEFAULT '{}'::jsonb, -- EXIF, duration, language, source id
  immutable boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  uploaded_at timestamptz,
  checksum text,
  deleted_at timestamptz,
  deleted boolean NOT NULL DEFAULT false
);
CREATE INDEX IF NOT EXISTS idx_artifacts_user ON artifacts(user_id);
CREATE INDEX IF NOT EXISTS idx_artifacts_media_type ON artifacts(media_type);

-- artifact_chunks: text/transcript chunks for long artifacts; supports chunk-level embeddings
CREATE TABLE IF NOT EXISTS artifact_chunks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  artifact_id uuid NOT NULL REFERENCES artifacts(id) ON DELETE CASCADE,
  chunk_index int NOT NULL,
  text text,
  start_offset_ms int,
  end_offset_ms int,
  metadata jsonb DEFAULT '{}'::jsonb,
  embedding vector(1536),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_artifact_chunks_artifact ON artifact_chunks(artifact_id);
-- IVFFLAT index for chunk embeddings; tune lists parameter after seeding data
CREATE INDEX IF NOT EXISTS idx_artifact_chunks_embedding ON artifact_chunks USING ivfflat (embedding) WITH (lists = 100);

-- notes:
-- 1) artifacts are intended to be immutable: do not update the `uri` or original binary bytes.
-- 2) corrections should be performed by ingesting new artifact rows and linking via metadata (e.g. metadata->"supersedes").
