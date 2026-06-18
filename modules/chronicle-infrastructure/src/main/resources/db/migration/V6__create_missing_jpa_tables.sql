CREATE TABLE IF NOT EXISTS observations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  memory_id uuid NOT NULL REFERENCES memories(id) ON DELETE CASCADE,
  text text,
  confidence double precision DEFAULT 0.0,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_observations_memory ON observations(memory_id);

CREATE TABLE IF NOT EXISTS open_questions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  memory_id uuid NOT NULL REFERENCES memories(id) ON DELETE CASCADE,
  question_text text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_open_questions_memory ON open_questions(memory_id);

CREATE TABLE IF NOT EXISTS interview_sessions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  persona text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_interview_sessions_user ON interview_sessions(user_id);

CREATE TABLE IF NOT EXISTS interview_answers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id uuid REFERENCES interview_sessions(id) ON DELETE CASCADE,
  question_id uuid,
  answer_text text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_interview_answers_session ON interview_answers(session_id);

CREATE TABLE IF NOT EXISTS book_drafts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  title text,
  content text,
  status text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_book_drafts_user ON book_drafts(user_id);
