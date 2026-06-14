-- V2__create_memory_and_pgvector.sql
-- Create subject memory tables, embeddings, and timeline nodes

-- memories: canonical subject memory records (subject memory)
CREATE TABLE IF NOT EXISTS memories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  artifact_ids uuid[] DEFAULT '{}', -- origin artifacts
  title text,
  canonical_text text,
  summary text,
  top_entities jsonb,
  topics jsonb,
  confidence float DEFAULT 0.0,
  provenance jsonb DEFAULT '{}'::jsonb,
  embedding vector(1536),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz,
  deleted_at timestamptz,
  deleted boolean NOT NULL DEFAULT false
);
CREATE INDEX IF NOT EXISTS idx_memories_user ON memories(user_id);
-- ivfflat index for semantic search on memories.embedding
CREATE INDEX IF NOT EXISTS idx_memories_embedding ON memories USING ivfflat (embedding) WITH (lists = 100);
CREATE INDEX IF NOT EXISTS idx_memories_topics ON memories USING gin (topics jsonb_path_ops);

-- memory_embeddings: optional fine-grained embeddings for chunked retrieval
CREATE TABLE IF NOT EXISTS memory_embeddings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  memory_id uuid NOT NULL REFERENCES memories(id) ON DELETE CASCADE,
  chunk_id uuid, -- optional link to artifact_chunks
  embedding vector(1536) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_memory_embeddings_memory ON memory_embeddings(memory_id);
CREATE INDEX IF NOT EXISTS idx_memory_embeddings_embedding ON memory_embeddings USING ivfflat (embedding) WITH (lists = 200);

-- life_events: timeline canonical nodes referencing subject memories/artifacts
CREATE TABLE IF NOT EXISTS life_events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  start_date date,
  end_date date,
  evidence_ids uuid[] DEFAULT '{}', -- refs to memories/artifacts
  confidence float DEFAULT 0.0,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz,
  deleted_at timestamptz,
  deleted boolean NOT NULL DEFAULT false
);
CREATE INDEX IF NOT EXISTS idx_life_events_user_dates ON life_events(user_id, start_date, end_date);
