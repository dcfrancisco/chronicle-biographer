-- V3__create_biographer_and_narrative_tables.sql
-- Create biographer (interpretive) memory tables and narrative artifacts

-- claims: extracted assertions (biographer memory)
CREATE TABLE IF NOT EXISTS claims (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  text text NOT NULL,
  polarity text,
  confidence float DEFAULT 0.0,
  source_ids uuid[] DEFAULT '{}', -- references to artifacts/memories
  embedding vector(1536),
  provenance jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  deleted boolean NOT NULL DEFAULT false
);
CREATE INDEX IF NOT EXISTS idx_claims_user ON claims(user_id);
CREATE INDEX IF NOT EXISTS idx_claims_embedding ON claims USING ivfflat (embedding) WITH (lists = 100);

-- contradictions: linked claims that conflict
CREATE TABLE IF NOT EXISTS contradictions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  claim_ids uuid[] NOT NULL,
  description text,
  severity int DEFAULT 1,
  resolved boolean DEFAULT false,
  resolution_note text,
  provenance jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz
);
CREATE INDEX IF NOT EXISTS idx_contradictions_user ON contradictions(user_id);

-- biographer_notes: observations, hypotheses, open_questions, plans
CREATE TABLE IF NOT EXISTS biographer_notes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  note_type text NOT NULL, -- 'observation','hypothesis','question','plan'
  title text,
  body text,
  confidence float DEFAULT 0.0,
  related_ids uuid[] DEFAULT '{}',
  provenance jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz,
  deleted_at timestamptz,
  deleted boolean NOT NULL DEFAULT false
);
CREATE INDEX IF NOT EXISTS idx_biographer_notes_user ON biographer_notes(user_id);

-- simplified book_drafts/table exists in V3 as well
