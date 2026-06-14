CREATE TABLE IF NOT EXISTS provider_configurations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  purpose text NOT NULL,
  provider_type text NOT NULL,
  api_key text,
  model text,
  embedding_model text,
  base_url text,
  validation_status text NOT NULL DEFAULT 'PENDING',
  selected boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_provider_configurations_purpose_provider
  ON provider_configurations(purpose, provider_type);

INSERT INTO provider_configurations (purpose, provider_type, api_key, model, embedding_model, base_url, validation_status, selected)
SELECT 'AI', 'OPENAI', '', 'gpt-5.5', 'text-embedding-3-large', 'https://api.openai.com/v1', 'VALID', true
WHERE NOT EXISTS (
  SELECT 1 FROM provider_configurations WHERE purpose = 'AI' AND provider_type = 'OPENAI'
);

INSERT INTO provider_configurations (purpose, provider_type, api_key, model, embedding_model, base_url, validation_status, selected)
SELECT 'EMBEDDING', 'OPENAI', '', 'gpt-5.5', 'text-embedding-3-large', 'https://api.openai.com/v1', 'VALID', true
WHERE NOT EXISTS (
  SELECT 1 FROM provider_configurations WHERE purpose = 'EMBEDDING' AND provider_type = 'OPENAI'
);
