"use client";

import type { ComponentType } from "react";
import {
  AlertCircle,
  BadgeCheck,
  BrainCircuit,
  CloudCog,
  Database,
  LibraryBig,
  NotebookPen,
  Settings2,
  Sparkles,
  TerminalSquare
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockSurfaces = [
  {
    name: "Studio",
    state: "Prototype",
    note: "A writing concept surface with mock memory and chapter content.",
    icon: NotebookPen
  },
  {
    name: "Notebook",
    state: "Prototype",
    note: "A research concept surface built from local demo data.",
    icon: BrainCircuit
  },
  {
    name: "Books",
    state: "Prototype",
    note: "A reader concept surface for future narrative exploration.",
    icon: LibraryBig
  },
  {
    name: "Settings",
    state: "Prototype",
    note: "A mock surface that documents current assumptions only.",
    icon: Settings2
  }
];

const currentStatus = [
  "Upload is the only working product surface.",
  "Artifact text extraction, chunking, memory candidates, observations, hypotheses, questions, and chapter draft generation work end to end.",
  "Settings is no longer API-backed and is treated as a prototype/mock surface.",
  "No provider switching or broader platform settings are exposed in the truthful MVP."
];

const deferredNotes = [
  "Interviews",
  "Timeline",
  "Relationships",
  "Themes dashboard",
  "Full notebook",
  "Book reader integration",
  "Workspace SaaS",
  "OIP provider",
  "Multi-provider switching",
  "OCR",
  "ASR",
  "Vector search",
  "Object storage",
  "Workers",
  "Kubernetes"
];

function SurfaceCard({
  name,
  state,
  note,
  icon: Icon
}: {
  name: string;
  state: string;
  note: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 font-medium text-paper">
            <Icon className="h-4 w-4 text-[#e3cb92]" />
            {name}
          </div>
          <p className="mt-2 text-sm leading-6 text-paper/64">{note}</p>
        </div>
        <Badge tone="neutral">{state}</Badge>
      </div>
    </div>
  );
}

export default function SettingsPage() {
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
                This surface is a prototype/mock page. It documents the current demo state without
                pretending to configure live providers.
              </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="neutral">Mock surface</Badge>
              <Badge tone="neutral">No API backing</Badge>
              <Badge tone="neutral">Prototype only</Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
          <div className="flex flex-wrap items-center gap-3 text-sm text-paper/72">
            <span className="inline-flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-[#9fd3af]" />
              Honest about the current demo
            </span>
            <span className="inline-flex items-center gap-2">
              <Database className="h-4 w-4 text-[#9fd3af]" />
              No provider persistence
            </span>
            <span className="inline-flex items-center gap-2">
              <TerminalSquare className="h-4 w-4 text-[#d8c08b]" />
              Future ideas live in the roadmap
            </span>
          </div>
          <div className="text-xs uppercase tracking-[0.26em] text-paper/40">
            Prototype surface only
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="status" className="space-y-5">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="status">Current Status</TabsTrigger>
          <TabsTrigger value="surfaces">Mock Surfaces</TabsTrigger>
          <TabsTrigger value="deferred">Deferred</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-5">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
            <Card className="bg-[#10170f]/92">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#e3cb92]" />
                  What works now
                </CardTitle>
                <CardDescription>The truthful MVP is the artifact-to-draft flow.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-6 text-paper/68">
                {currentStatus.map((line) => (
                  <div key={line} className="rounded-2xl border border-white/8 bg-white/4 p-4">
                    {line}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-[#10170f]/92">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CloudCog className="h-4 w-4 text-[#e3cb92]" />
                  Boundary
                </CardTitle>
                <CardDescription>Keep the demo small enough to trust.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-6 text-paper/68">
                <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                  No live provider selection.
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                  No hidden settings API.
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                  No feature promise beyond the current flow.
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="surfaces" className="space-y-5">
          <Card className="bg-[#10170f]/92">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-[#e3cb92]" />
                Prototype surfaces
              </CardTitle>
              <CardDescription>These are mock or demo surfaces unless they become API-backed later.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              {mockSurfaces.map((surface) => (
                <SurfaceCard key={surface.name} {...surface} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deferred" className="space-y-5">
          <Card className="bg-[#10170f]/92">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-[#e3cb92]" />
                Deferred features
              </CardTitle>
              <CardDescription>These belong in the roadmap, not the MVP.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {deferredNotes.map((note) => (
                <Badge key={note} tone="neutral">
                  {note}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-5">
          <Card className="bg-[#10170f]/92">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <NotebookPen className="h-4 w-4 text-[#e3cb92]" />
                Documentation note
              </CardTitle>
              <CardDescription>The docs are the source of truth for what the MVP is.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-paper/68">
              <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                Settings is intentionally not wired to an API.
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                Future platform ideas belong in <code className="rounded bg-black/20 px-1 py-0.5">docs/10-roadmap.md</code>.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
