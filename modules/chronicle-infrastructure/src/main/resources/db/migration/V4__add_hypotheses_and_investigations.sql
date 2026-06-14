-- V4: add hypotheses, hypothesis_evidence, and investigation_plans

CREATE TABLE IF NOT EXISTS hypotheses (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  text text NOT NULL,
  confidence float DEFAULT 0.0,
  provenance jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  deleted boolean NOT NULL DEFAULT false
);
CREATE INDEX IF NOT EXISTS idx_hypotheses_user ON hypotheses(user_id);

CREATE TABLE IF NOT EXISTS hypothesis_evidence (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  hypothesis_id uuid NOT NULL REFERENCES hypotheses(id) ON DELETE CASCADE,
  evidence_type text NOT NULL,
  evidence_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_hypothesis_evidence_hypothesis ON hypothesis_evidence(hypothesis_id);

CREATE TABLE IF NOT EXISTS investigation_plans (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title text,
  steps jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'open',
  provenance jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
