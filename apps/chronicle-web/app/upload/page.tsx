"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CloudUpload,
  FileText,
  FileUp,
  Layers3,
  Sparkles,
  Wand2,
  CheckCircle2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { uploadFiles, uploadHighlights, type UploadFile } from "@/lib/upload-mock-data";

type UploadEvent = {
  id: string;
  fileName: string;
  status: string;
  memories: number;
  observations: number;
  hypotheses: number;
  themes: string[];
  note: string;
};

function getDemoResult(file: File): UploadFile {
  const lower = file.name.toLowerCase();

  if (lower.includes("career-history")) {
    return {
      id: crypto.randomUUID(),
      fileName: file.name,
      format: "pdf",
      size: "4.2 MB",
      status: "Complete",
      memories: 34,
      observations: 6,
      hypotheses: 2,
      themes: ["Independence", "Teaching", "Building Systems"],
      note: "Chronicle recognized recurring autonomy, service, and systems thinking."
    };
  }

  if (lower.endsWith(".pdf")) {
    return {
      id: crypto.randomUUID(),
      fileName: file.name,
      format: "pdf",
      size: `${Math.max(1, Math.round(file.size / 1024 / 1024))} MB`,
      status: "Complete",
      memories: 12,
      observations: 3,
      hypotheses: 1,
      themes: ["Autonomy", "Care"],
      note: "PDF parsed locally and converted into chunked memory candidates."
    };
  }

  if (lower.endsWith(".docx")) {
    return {
      id: crypto.randomUUID(),
      fileName: file.name,
      format: "docx",
      size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
      status: "Complete",
      memories: 10,
      observations: 2,
      hypotheses: 1,
      themes: ["Family", "Transition"],
      note: "Word document extracted through local paragraph parsing."
    };
  }

  if (lower.endsWith(".md")) {
    return {
      id: crypto.randomUUID(),
      fileName: file.name,
      format: "md",
      size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
      status: "Complete",
      memories: 8,
      observations: 2,
      hypotheses: 1,
      themes: ["Reflection", "Process"],
      note: "Markdown notes were chunked by heading and paragraph."
    };
  }

  return {
    id: crypto.randomUUID(),
    fileName: file.name,
    format: "txt",
    size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
    status: "Complete",
    memories: 6,
    observations: 1,
    hypotheses: 0,
    themes: ["Archive"],
    note: "Plain text import ready for Chronicle analysis."
  };
}

function stageText(status: string) {
  if (status === "Complete") {
    return "Biographer analysis complete";
  }
  if (status === "Chunked") {
    return "Chunking in progress";
  }
  if (status === "Extracted") {
    return "Text extracted locally";
  }
  return "Queued for ingestion";
}

function stageIndex(status: string) {
  return {
    Queued: 1,
    Extracted: 2,
    Chunked: 3,
    Complete: 4
  }[status as keyof Record<string, number>] ?? 1;
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-white/6">
      <div
        className="h-2 rounded-full bg-[linear-gradient(90deg,rgba(214,192,138,0.95),rgba(159,211,175,0.95))]"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadFile[]>(uploadFiles);
  const [dragging, setDragging] = useState(false);
  const [recent, setRecent] = useState<UploadEvent[]>([
    {
      id: "career-history",
      fileName: "career-history.pdf",
      status: "Complete",
      memories: 34,
      observations: 6,
      hypotheses: 2,
      themes: ["Independence", "Teaching", "Building Systems"],
      note: "Chronicle responded with a full local extraction pass."
    }
  ]);

  const totals = useMemo(
    () =>
      files.reduce(
        (acc, file) => ({
          memories: acc.memories + file.memories,
          observations: acc.observations + file.observations,
          hypotheses: acc.hypotheses + file.hypotheses
        }),
        { memories: 0, observations: 0, hypotheses: 0 }
      ),
    [files]
  );

  function ingestFiles(nextFiles: FileList | File[]) {
    const added = Array.from(nextFiles).map(getDemoResult);
    setFiles((current) => [...added, ...current]);
    setRecent((current) => [
      ...added.map((file) => ({
        id: file.id,
        fileName: file.fileName,
        status: file.status,
        memories: file.memories,
        observations: file.observations,
        hypotheses: file.hypotheses,
        themes: file.themes,
        note: file.note
      })),
      ...current
    ]);
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_360px]">
      <section className="space-y-5">
        <Card className="paper-surface overflow-hidden rounded-3xl">
          <CardHeader className="border-b border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <Badge tone="accent">Artifact Ingestion</Badge>
                <CardTitle className="mt-3 text-3xl font-semibold tracking-tight">
                  Upload files into Chronicle
                </CardTitle>
                <CardDescription className="mt-2 max-w-2xl text-base">
                  Chronicle turns uploaded files into artifacts, chunks, memories, and
                  biographer observations using local extraction only.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone="neutral">txt</Badge>
                <Badge tone="neutral">md</Badge>
                <Badge tone="neutral">pdf</Badge>
                <Badge tone="neutral">docx</Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:p-6">
            <div
              onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => {
                event.preventDefault();
                setDragging(false);
                if (event.dataTransfer.files.length > 0) {
                  ingestFiles(event.dataTransfer.files);
                }
              }}
              className={`rounded-3xl border border-dashed p-6 transition-colors ${
                dragging
                  ? "border-[#e3cb92]/60 bg-[#e3cb92]/10"
                  : "border-white/10 bg-black/15"
              }`}
            >
              <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 text-sm font-medium text-paper/78">
                    <CloudUpload className="h-4 w-4 text-[#e3cb92]" />
                    Drag and drop files here
                  </div>
                  <p className="mt-2 text-sm leading-6 text-paper/62">
                    Chronicle will register the artifact, extract local text, chunk it,
                    and create memory candidates with provenance attached.
                  </p>
                </div>
                <Button
                  size="lg"
                  onClick={() => ingestFiles([new File(["career history"], "career-history.pdf", { type: "application/pdf" })])}
                >
                  <FileUp className="h-4 w-4" />
                  Simulate demo upload
                </Button>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {uploadHighlights.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/8 bg-white/4 p-4">
                    <div className="text-sm font-medium text-paper">{item.label}</div>
                    <p className="mt-2 text-sm leading-6 text-paper/62">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Card className="bg-[#10170f]/92">
                <CardHeader>
                  <CardTitle>Demo scenario</CardTitle>
                  <CardDescription>Upload `career-history.pdf` and Chronicle responds.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-paper">Created</div>
                      <Wand2 className="h-4 w-4 text-[#e3cb92]" />
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                      <div className="rounded-xl bg-black/20 p-3">
                        <div className="text-2xl font-semibold text-paper">34</div>
                        <div className="mt-1 text-xs uppercase tracking-[0.24em] text-paper/42">Memories</div>
                      </div>
                      <div className="rounded-xl bg-black/20 p-3">
                        <div className="text-2xl font-semibold text-paper">6</div>
                        <div className="mt-1 text-xs uppercase tracking-[0.24em] text-paper/42">Observations</div>
                      </div>
                      <div className="rounded-xl bg-black/20 p-3">
                        <div className="text-2xl font-semibold text-paper">2</div>
                        <div className="mt-1 text-xs uppercase tracking-[0.24em] text-paper/42">Hypotheses</div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                    <div className="text-sm font-medium text-paper">Themes detected</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Independence", "Teaching", "Building Systems"].map((theme) => (
                        <Badge key={theme} tone="accent">
                          {theme}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-5 lg:grid-cols-2">
          <Card className="bg-[#10170f]/92">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers3 className="h-4 w-4 text-[#9fd3af]" />
                Uploaded files
              </CardTitle>
              <CardDescription>Artifacts Chronicle has registered locally.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {files.map((file) => (
                <div key={file.id} className="rounded-2xl border border-white/8 bg-white/4 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-paper/48" />
                        <div className="text-sm font-medium text-paper">{file.fileName}</div>
                      </div>
                      <div className="mt-1 text-xs uppercase tracking-[0.24em] text-paper/38">
                        {file.size} · {file.format}
                      </div>
                    </div>
                    <Badge tone={file.status === "Complete" ? "success" : "neutral"}>{file.status}</Badge>
                  </div>
                  <div className="mt-3">
                    <ProgressBar value={stageIndex(file.status) * 25} />
                    <div className="mt-2 flex items-center justify-between text-xs text-paper/45">
                      <span>{stageText(file.status)}</span>
                      <span>{file.memories} memories</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-[#10170f]/92">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#e3cb92]" />
                Ingestion summary
              </CardTitle>
              <CardDescription>What Chronicle has learned from the current queue.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/8 bg-white/4 p-4 text-center">
                  <div className="text-2xl font-semibold">{totals.memories}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.24em] text-paper/42">Memories</div>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/4 p-4 text-center">
                  <div className="text-2xl font-semibold">{totals.observations}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.24em] text-paper/42">Observations</div>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/4 p-4 text-center">
                  <div className="text-2xl font-semibold">{totals.hypotheses}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.24em] text-paper/42">Hypotheses</div>
                </div>
              </div>

              <Separator className="bg-white/10" />

              <div className="space-y-3">
                <div className="text-sm font-medium text-paper">Created last</div>
                {recent.slice(0, 4).map((item) => (
                  <div key={item.id} className="rounded-2xl border border-white/8 bg-white/4 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-medium text-paper">{item.fileName}</div>
                      <Badge tone={item.status === "Complete" ? "success" : "neutral"}>{item.status}</Badge>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-paper/62">{item.note}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.themes.map((theme) => (
                        <Badge key={theme} tone="neutral">
                          {theme}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <aside className="space-y-5">
        <Card className="bg-[#10170f]/92">
          <CardHeader>
            <CardTitle>Pipeline</CardTitle>
            <CardDescription>The artifact-to-memory sequence Chronicle runs locally.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Upload file",
              "Register artifact",
              "Extract text locally",
              "Chunk by page and paragraph",
              "Create memories with provenance",
              "Run biographer analysis"
            ].map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 p-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e3cb92]/15 text-xs font-semibold text-[#f1ddb2]">
                  {index + 1}
                </div>
                <div className="text-sm text-paper/76">{step}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-[#10170f]/92">
          <CardHeader>
            <CardTitle>What comes next</CardTitle>
            <CardDescription>Chronicle turns ingestion into questions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-paper/68">
            <p>After ingestion, the next screen should be Hypotheses.</p>
            <p>That is where Chronicle becomes a biographer instead of a file system.</p>
            <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-paper">
                <CheckCircle2 className="h-4 w-4 text-[#9fd3af]" />
                “I&apos;ve read 500 pages of your history.”
              </div>
              <p className="mt-2 text-sm leading-6 text-paper/68">
                “Here are three things I think are true about you.”
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-paper/30" />
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
