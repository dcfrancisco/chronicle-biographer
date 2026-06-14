import type {
  AboutSection,
  ProviderConfigurationResponse,
  ProviderDefinition,
  SettingsResponse,
  SettingsSection,
  StorageSection
} from "@/generated/openapi";

export type {
  AboutSection,
  ProviderConfigurationResponse,
  ProviderDefinition,
  SettingsResponse,
  SettingsSection,
  StorageSection
} from "@/generated/openapi";

const baseProviderRegistry: ProviderDefinition[] = [
  {
    provider: "OPENAI",
    label: "OpenAI",
    defaultModel: "gpt-5.5",
    defaultEmbeddingModel: "text-embedding-3-large",
    baseUrlPlaceholder: "https://api.openai.com/v1",
    disabled: false,
    description: "Chronicle's default provider today."
  },
  {
    provider: "ANTHROPIC",
    label: "Anthropic",
    defaultModel: "claude-sonnet-4-0",
    defaultEmbeddingModel: "embedding-3-large",
    baseUrlPlaceholder: "https://api.anthropic.com",
    disabled: false,
    description: "Ready for future support."
  },
  {
    provider: "GEMINI",
    label: "Gemini",
    defaultModel: "gemini-2.5-pro",
    defaultEmbeddingModel: "text-embedding-004",
    baseUrlPlaceholder: "https://generativelanguage.googleapis.com",
    disabled: false,
    description: "Ready for future support."
  },
  {
    provider: "OLLAMA",
    label: "Ollama",
    defaultModel: "llama3.1",
    defaultEmbeddingModel: "nomic-embed-text",
    baseUrlPlaceholder: "http://localhost:11434",
    disabled: false,
    description: "Local model hosting."
  },
  {
    provider: "OIP",
    label: "OIP",
    defaultModel: "disabled",
    defaultEmbeddingModel: "disabled",
    baseUrlPlaceholder: "",
    disabled: true,
    description: "Disabled placeholder for future Chronicle compatibility."
  }
];

const general: SettingsSection = {
  title: "General",
  description: "Core Chronicle settings.",
  value: "Chronicle Biographer"
};

const aiProvider: ProviderConfigurationResponse = {
  purpose: "AI",
  provider: "OPENAI",
  apiKey: "",
  model: "gpt-5.5",
  embeddingModel: "text-embedding-3-large",
  baseUrl: "https://api.openai.com/v1",
  validationStatus: "VALID",
  selected: true
};

const embeddingProvider: ProviderConfigurationResponse = {
  purpose: "EMBEDDING",
  provider: "OPENAI",
  apiKey: "",
  model: "gpt-5.5",
  embeddingModel: "text-embedding-3-large",
  baseUrl: "https://api.openai.com/v1",
  validationStatus: "VALID",
  selected: true
};

const storage: StorageSection = {
  title: "Storage",
  description: "Persistence layer and artifact storage.",
  value: "PostgreSQL + pgvector",
  detail: "Local demo uses Postgres for configuration and Chronicle artifacts."
};

const about: AboutSection = {
  title: "About",
  description: "Chronicle settings surface.",
  version: "0.1.0",
  note: "AI Biographer prototype"
};

export const settingsMock: SettingsResponse = {
  general,
  aiProvider,
  embeddingProvider,
  storage,
  about,
  providerRegistry: baseProviderRegistry
};
