"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  BadgeCheck,
  BrainCircuit,
  CloudCog,
  Database,
  LibraryBig,
  Loader2,
  NotebookPen,
  Save,
  Settings2,
  Sparkles,
  ServerCog,
  ShieldCheck,
  TerminalSquare
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Configuration,
  SettingsApi,
  type ProviderConfigurationRequest,
  type ProviderConfigurationResponse,
  type ProviderDefinition,
  type SettingsResponse
} from "@/generated/openapi";
import { settingsMock } from "@/lib/settings-mock-data";
import { cn } from "@/lib/utils";

type ValidationState = ProviderConfigurationResponse["validationStatus"];

type ProviderFormState = ProviderConfigurationResponse & {
  saving: boolean;
  saveState: "idle" | "saving" | "saved" | "error";
};

const API_BASE_URL = (process.env.NEXT_PUBLIC_CHRONICLE_API_URL ?? "http://localhost:8080").replace(
  /\/$/,
  ""
);

const apiConfiguration = new Configuration({ basePath: API_BASE_URL });

function statusTone(status: ValidationState) {
  switch (status) {
    case "VALID":
      return "success";
    case "INVALID":
      return "warning";
    case "DISABLED":
      return "neutral";
    default:
      return "accent";
  }
}

function statusCopy(status: ValidationState) {
  switch (status) {
    case "VALID":
      return "Validated";
    case "INVALID":
      return "Needs attention";
    case "DISABLED":
      return "Disabled";
    default:
      return "Pending";
  }
}

function getProviderDefaults(provider: string, registry: ProviderDefinition[]) {
  return registry.find((item) => item.provider === provider) ?? registry[0];
}

function createForm(config: ProviderConfigurationResponse): ProviderFormState {
  return {
    ...config,
    saving: false,
    saveState: "idle"
  };
}

function ProviderPill({ provider }: { provider: string }) {
  return (
    <Badge tone="neutral" className="text-[10px]">
      {provider}
    </Badge>
  );
}

function ProviderFormCard({
  title,
  description,
  config,
  registry,
  onChange,
  onSave
}: {
  title: string;
  description: string;
  config: ProviderFormState;
  registry: ProviderDefinition[];
  onChange: (next: ProviderFormState) => void;
  onSave: () => Promise<void>;
}) {
  const selectedProvider = getProviderDefaults(config.provider, registry);

  return (
    <Card className="overflow-hidden border-white/8 bg-[#11150f]/86">
      <CardHeader className="border-b border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Badge tone="accent">{title}</Badge>
            <CardTitle className="mt-3 text-2xl font-semibold tracking-tight">{title}</CardTitle>
            <CardDescription className="mt-2 max-w-2xl text-base">{description}</CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={statusTone(config.validationStatus)}>{statusCopy(config.validationStatus)}</Badge>
            {config.selected ? <Badge tone="success">Selected</Badge> : null}
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:p-6">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="text-paper/72">Provider</span>
              <Select
                value={config.provider}
                onChange={(event) =>
                  onChange({
                    ...config,
                    provider: event.target.value as ProviderFormState["provider"],
                    saveState: "idle"
                  })
                }
              >
                {registry.map((item) => (
                  <option key={item.provider} value={item.provider} disabled={item.disabled}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </label>

            <label className="space-y-2 text-sm">
              <span className="text-paper/72">Validation Status</span>
              <Select
                value={config.validationStatus}
                onChange={(event) =>
                  onChange({
                    ...config,
                    validationStatus: event.target.value as ValidationState,
                    saveState: "idle"
                  })
                }
              >
                <option value="PENDING">Pending</option>
                <option value="VALID">Valid</option>
                <option value="INVALID">Invalid</option>
                <option value="DISABLED">Disabled</option>
              </Select>
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="text-paper/72">API Key</span>
              <Input
                type="password"
                value={config.apiKey}
                onChange={(event) =>
                  onChange({
                    ...config,
                    apiKey: event.target.value,
                    saveState: "idle"
                  })
                }
                placeholder="sk-..."
              />
            </label>

            <label className="space-y-2 text-sm">
              <span className="text-paper/72">Base URL</span>
              <Input
                value={config.baseUrl}
                onChange={(event) =>
                  onChange({
                    ...config,
                    baseUrl: event.target.value,
                    saveState: "idle"
                  })
                }
                placeholder={selectedProvider.baseUrlPlaceholder}
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="text-paper/72">Model</span>
              <Input
                value={config.model}
                onChange={(event) =>
                  onChange({
                    ...config,
                    model: event.target.value,
                    saveState: "idle"
                  })
                }
                placeholder={selectedProvider.defaultModel}
              />
            </label>

            <label className="space-y-2 text-sm">
              <span className="text-paper/72">Embedding Model</span>
              <Input
                value={config.embeddingModel}
                onChange={(event) =>
                  onChange({
                    ...config,
                    embeddingModel: event.target.value,
                    saveState: "idle"
                  })
                }
                placeholder={selectedProvider.defaultEmbeddingModel}
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/4 px-4 py-3">
            <div className="flex items-center gap-3">
              <ProviderPill provider={config.provider} />
              <div className="text-sm text-paper/70">
                {selectedProvider.description}
              </div>
            </div>
            <Button
              type="button"
              size="lg"
              onClick={onSave}
              disabled={config.saving}
              className="min-w-[140px]"
            >
              {config.saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {config.saveState === "saved" ? "Saved" : "Save settings"}
            </Button>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-white/8 bg-black/18 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-paper">
            <ShieldCheck className="h-4 w-4 text-[#9fd3af]" />
            Provider notes
          </div>
          <div className="space-y-3 text-sm leading-6 text-paper/68">
            <p>
              Chronicle stores provider configuration in the database and keeps provider switching
              behavior out of this experience for now.
            </p>
            <div className="rounded-2xl border border-white/8 bg-white/4 p-3">
              <div className="text-xs uppercase tracking-[0.24em] text-paper/40">Default provider</div>
              <div className="mt-2 flex items-center gap-2">
                <Badge tone="accent">{selectedProvider.label}</Badge>
                <span>{selectedProvider.defaultModel}</span>
              </div>
              <p className="mt-2 text-paper/56">{selectedProvider.description}</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/4 p-3">
              <div className="text-xs uppercase tracking-[0.24em] text-paper/40">Persistence</div>
              <p className="mt-2 text-paper/62">
                ProviderConfiguration, ProviderRegistry, and ProviderSelectionService keep the
                settings model ready for future providers.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function SettingsPage() {
  const [snapshot, setSnapshot] = useState<SettingsResponse>(settingsMock);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"api" | "mock">("mock");
  const [aiConfig, setAiConfig] = useState(() => createForm(settingsMock.aiProvider));
  const [embeddingConfig, setEmbeddingConfig] = useState(() => createForm(settingsMock.embeddingProvider));
  const settingsApi = useMemo(() => new SettingsApi(apiConfiguration), []);

  useEffect(() => {
    let mounted = true;

    async function loadSettings() {
      try {
        const data = await settingsApi.getSettings();
        if (!mounted) {
          return;
        }
        setSnapshot(data);
        setAiConfig(createForm(data.aiProvider));
        setEmbeddingConfig(createForm(data.embeddingProvider));
        setSource("api");
      } catch {
        if (!mounted) {
          return;
        }
        setSnapshot(settingsMock);
        setAiConfig(createForm(settingsMock.aiProvider));
        setEmbeddingConfig(createForm(settingsMock.embeddingProvider));
        setSource("mock");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadSettings();
    return () => {
      mounted = false;
    };
  }, []);

  const providerRegistry = snapshot.providerRegistry;

  async function saveConfiguration(
    purpose: ProviderConfigurationResponse["purpose"],
    config: ProviderFormState,
    setConfig: (next: ProviderFormState) => void
  ) {
    setConfig({ ...config, saving: true, saveState: "saving" });

    try {
      const saved = await settingsApi.saveProviderConfiguration({
        purpose: purpose as ProviderConfigurationResponse["purpose"],
        provider: config.provider as ProviderConfigurationResponse["provider"],
        providerConfigurationRequest: {
          apiKey: config.apiKey,
          model: config.model,
          embeddingModel: config.embeddingModel,
          baseUrl: config.baseUrl,
          validationStatus: config.validationStatus,
          selected: config.selected
        } satisfies ProviderConfigurationRequest
      });
      setConfig({ ...saved, saving: false, saveState: "saved" });

      setSnapshot((current) => {
        const next = {
          ...current,
          aiProvider:
            purpose === "AI"
              ? {
                  ...saved,
                  purpose: "AI" as ProviderConfigurationResponse["purpose"]
                }
              : current.aiProvider,
          embeddingProvider:
            purpose === "EMBEDDING"
              ? {
                  ...saved,
                  purpose: "EMBEDDING" as ProviderConfigurationResponse["purpose"]
                }
              : current.embeddingProvider
        };
        return next;
      });
    } catch {
      setConfig({ ...config, saving: false, saveState: "error" });
    }
  }

  const storageSummary = snapshot.storage;

  return (
    <div className="space-y-5">
      <Card className="overflow-hidden border-white/8 bg-[#11150f]/84">
        <CardHeader className="border-b border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <Badge tone="accent">Settings</Badge>
              <CardTitle className="mt-3 text-4xl font-semibold tracking-tight">
                Chronicle Settings
              </CardTitle>
              <CardDescription className="mt-3 text-base leading-7">
                Configure the biographer&apos;s runtime and storage assumptions. This page keeps
                Chronicle ready for future providers while only OpenAI is active today.
              </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="neutral">{loading ? "Loading" : source === "api" ? "API connected" : "Mock preview"}</Badge>
              <Badge tone="neutral">Database backed</Badge>
              <Badge tone="neutral">Future-ready providers</Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
          <div className="flex flex-wrap items-center gap-3 text-sm text-paper/72">
            <span className="inline-flex items-center gap-2">
              <ServerCog className="h-4 w-4 text-[#d8c08b]" />
              Provider registry loaded
            </span>
            <span className="inline-flex items-center gap-2">
              <Database className="h-4 w-4 text-[#9fd3af]" />
              Settings stored in PostgreSQL
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#9fd3af]" />
              Flyway bootstrap remains the source of truth
            </span>
          </div>
          <div className="text-xs uppercase tracking-[0.26em] text-paper/40">
            {API_BASE_URL}/api/v1/settings
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="general" className="space-y-5">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="ai">AI Provider</TabsTrigger>
          <TabsTrigger value="embedding">Embedding Provider</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-5">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
            <Card className="bg-[#10170f]/92">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings2 className="h-4 w-4 text-[#e3cb92]" />
                  General
                </CardTitle>
                <CardDescription>{snapshot.general.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                  <div className="text-xs uppercase tracking-[0.24em] text-paper/40">Product</div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight text-paper">
                    {snapshot.general.value}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-paper/62">
                    Chronicle helps a person understand, document, challenge, and preserve their
                    life story.
                  </p>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                    <div className="text-xs uppercase tracking-[0.24em] text-paper/40">Flow</div>
                    <div className="mt-2 font-medium text-paper">Memory → Observation → Hypothesis → Question → Chapter</div>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                    <div className="text-xs uppercase tracking-[0.24em] text-paper/40">Bootstrap</div>
                    <div className="mt-2 font-medium text-paper">Flyway migrations seed the first configuration state.</div>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                    <div className="text-xs uppercase tracking-[0.24em] text-paper/40">Mode</div>
                    <div className="mt-2 font-medium text-paper">Biographer, not chatbot.</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#10170f]/92">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LibraryBig className="h-4 w-4 text-[#e3cb92]" />
                  Provider registry
                </CardTitle>
                <CardDescription>Ready for future providers even when only OpenAI works.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {providerRegistry.map((provider) => (
                  <div
                    key={provider.provider}
                    className={cn(
                      "rounded-2xl border p-4",
                      provider.disabled ? "border-white/6 bg-white/3 opacity-60" : "border-white/8 bg-white/4"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-medium text-paper">{provider.label}</div>
                        <div className="mt-1 text-sm leading-6 text-paper/62">{provider.description}</div>
                      </div>
                      <Badge tone={provider.disabled ? "neutral" : "accent"}>
                        {provider.disabled ? "Disabled" : "Ready"}
                      </Badge>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge tone="neutral">{provider.defaultModel}</Badge>
                      <Badge tone="neutral">{provider.defaultEmbeddingModel}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai" className="space-y-5">
          <ProviderFormCard
            title="AI Provider"
            description="This configuration shapes Chronicle's biographer intelligence. The UI is ready for future providers, but switching behavior remains deferred."
            config={aiConfig}
            registry={providerRegistry}
            onChange={setAiConfig}
            onSave={() => saveConfiguration("AI", aiConfig, setAiConfig)}
          />
        </TabsContent>

        <TabsContent value="embedding" className="space-y-5">
          <ProviderFormCard
            title="Embedding Provider"
            description="Embedding settings are stored separately from the AI provider so Chronicle can evolve each side of the system independently."
            config={embeddingConfig}
            registry={providerRegistry}
            onChange={setEmbeddingConfig}
            onSave={() => saveConfiguration("EMBEDDING", embeddingConfig, setEmbeddingConfig)}
          />
        </TabsContent>

        <TabsContent value="storage" className="space-y-5">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
            <Card className="bg-[#10170f]/92">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-[#e3cb92]" />
                  Storage
                </CardTitle>
                <CardDescription>{storageSummary.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                  <div className="text-xs uppercase tracking-[0.24em] text-paper/40">Primary store</div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight text-paper">
                    {storageSummary.value}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-paper/62">{storageSummary.detail}</p>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                    <div className="text-xs uppercase tracking-[0.24em] text-paper/40">Artifacts</div>
                    <div className="mt-2 text-sm leading-6 text-paper/64">
                      Immutable source files stay separate from derived memory data.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                    <div className="text-xs uppercase tracking-[0.24em] text-paper/40">Provenance</div>
                    <div className="mt-2 text-sm leading-6 text-paper/64">
                      Observations and hypotheses retain traceability to the source material.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                    <div className="text-xs uppercase tracking-[0.24em] text-paper/40">Bootstrap</div>
                    <div className="mt-2 text-sm leading-6 text-paper/64">
                      Flyway creates the baseline settings rows during local startup.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#10170f]/92">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TerminalSquare className="h-4 w-4 text-[#e3cb92]" />
                  Local setup
                </CardTitle>
                <CardDescription>Production-style but simple enough for a local Chronicle demo.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-6 text-paper/68">
                <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                  <div className="flex items-center gap-2 font-medium text-paper">
                    <BadgeCheck className="h-4 w-4 text-[#9fd3af]" />
                    PostgreSQL with pgvector
                  </div>
                  <p className="mt-2">
                    Configuration persists in the database and the app can be bootstrapped through
                    migration data instead of manual setup.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                  <div className="flex items-center gap-2 font-medium text-paper">
                    <CloudCog className="h-4 w-4 text-[#9fd3af]" />
                    Future integrations
                  </div>
                  <p className="mt-2">
                    The provider registry is prepared for future AI vendors without changing the
                    settings surface.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="about" className="space-y-5">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
            <Card className="bg-[#10170f]/92">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <NotebookPen className="h-4 w-4 text-[#e3cb92]" />
                  About
                </CardTitle>
                <CardDescription>{snapshot.about.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                  <div className="text-xs uppercase tracking-[0.24em] text-paper/40">Version</div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight text-paper">
                    {snapshot.about.version}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-paper/62">{snapshot.about.note}</p>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                    <div className="flex items-center gap-2 font-medium text-paper">
                      <Sparkles className="h-4 w-4 text-[#e3cb92]" />
                      Chronicle identity
                    </div>
                    <p className="mt-2 text-sm leading-6 text-paper/64">
                      Chronicle is an AI Biographer.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                    <div className="flex items-center gap-2 font-medium text-paper">
                      <BrainCircuit className="h-4 w-4 text-[#e3cb92]" />
                      Notebook-first
                    </div>
                    <p className="mt-2 text-sm leading-6 text-paper/64">
                      Observations, hypotheses, and questions matter more than chat transcripts.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#10170f]/92">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-[#e3cb92]" />
                  Current state
                </CardTitle>
                <CardDescription>What this settings surface intentionally does not do yet.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-6 text-paper/68">
                <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                  <p>No provider switching logic in runtime orchestration.</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                  <p>No new features or API surface beyond Chronicle settings.</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                  <p>No domain changes to memoir, ingestion, or chapter generation behavior.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
