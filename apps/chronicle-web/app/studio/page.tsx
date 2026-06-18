import {
  ArrowRight,
  BookOpenText,
  Check,
  ChevronRight,
  Lightbulb,
  MessageSquareQuote,
  NotebookPen,
  Save,
  Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  editorDraft,
  memories,
  observations,
  openQuestions,
  themes
} from "@/lib/mock-data";

const studioLinks = ["Writing", "Timeline", "Themes", "Notebook", "Books"];

export default function WritingStudioPage() {
  return (
    <div className="grid gap-5 xl:grid-cols-[260px_minmax(0,1fr)_360px]">
      <aside className="paper-surface rounded-3xl p-4">
        <div className="mb-4">
          <div className="text-[11px] uppercase tracking-[0.34em] text-paper/45">
            Writing Studio
          </div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">Working memory</h1>
          <p className="mt-2 text-sm leading-6 text-paper/65">
            This is a mock prototype surface for the writing concept, not a shipped
            writing workflow.
          </p>
        </div>

        <nav className="space-y-2">
          {studioLinks.map((item, index) => (
            <div
              key={item}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${
                index === 0
                  ? "border-[#d8c08b]/25 bg-[#d8c08b]/12 text-paper"
                  : "border-white/8 bg-white/4 text-paper/72"
              }`}
            >
              <span className="font-medium">{item}</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          ))}
        </nav>

        <Separator className="my-5" />

        <div className="rounded-2xl border border-white/8 bg-black/18 p-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Sparkles className="h-4 w-4 text-[#e5cf95]" />
            Biographer state
          </div>
          <p className="mt-2 text-sm leading-6 text-paper/65">
            16 observations active, 3 themes stabilized, 2 contradictions under review.
          </p>
        </div>
      </aside>

      <section className="space-y-5">
        <Card className="overflow-hidden border-white/8 bg-[#11150f]/86">
          <CardHeader className="flex items-start justify-between gap-4">
            <div>
              <Badge tone="accent">Mock prototype</Badge>
              <CardTitle className="mt-3 text-3xl font-semibold">Draft with provenance</CardTitle>
              <CardDescription className="max-w-2xl text-base">
                Write the memory as you remember it. Chronicle will hold the evidence,
                the pattern, and the questions that grow around it.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge tone="neutral">Auto-save on</Badge>
              <Badge tone="success">Voice preserved</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-3xl border border-white/8 bg-black/20 p-5">
              <div className="flex flex-wrap items-center gap-3">
                <Badge tone="neutral">Memory 12</Badge>
                <Badge tone="neutral">Source: Notebook entry</Badge>
                <Badge tone="neutral">Confidence: 88%</Badge>
              </div>
              <p className="chronicle-copy mt-4 text-xl leading-9 text-paper">
                “I taught myself programming because nobody taught me.”
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-paper/60">
                The machine sat in the corner like a dare. Nobody explained the first
                steps, so the subject made them anyway.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-paper/80">Draft editor</div>
                <div className="text-xs uppercase tracking-[0.26em] text-paper/40">
                  Writing mode
                </div>
              </div>
              <Textarea
                defaultValue={`${editorDraft.body}\n\nThe point is not that learning happened alone. The point is that the subject trusted movement over permission.`}
                className="min-h-[310px] font-serif text-[15px] leading-8"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="accent">Prototype</Badge>
                <Badge tone="neutral">Historian</Badge>
                <Badge tone="neutral">Skeptic pass ready</Badge>
              </div>
              <Button size="lg">
                <Save className="h-4 w-4" />
                Save chapter
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-5 md:grid-cols-2">
          <Card className="bg-[#0f140f]/90">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-[#e3cb92]" />
                Today's memory
              </CardTitle>
              <CardDescription>{editorDraft.prompt}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-paper/68">
              <p>{editorDraft.notes}</p>
              <div className="flex items-center gap-2 rounded-2xl border border-white/8 bg-white/4 px-4 py-3">
                <Check className="h-4 w-4 text-[#9fd3af]" />
                Chronicle keeps the memory on the page while it studies the pattern.
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f140f]/90">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpenText className="h-4 w-4 text-[#e3cb92]" />
                Evidence trail
              </CardTitle>
              <CardDescription>What can support this draft if it becomes a chapter?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {memories.slice(0, 3).map((memory) => (
                <div key={memory.id} className="rounded-2xl border border-white/8 bg-white/4 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium text-paper">{memory.title}</div>
                      <div className="mt-1 text-xs text-paper/50">{memory.date}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-paper/35" />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-paper/66">{memory.excerpt}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <aside className="space-y-5">
        <Card className="bg-[#10170f]/92">
          <CardHeader>
            <CardTitle>AI Observations</CardTitle>
            <CardDescription>The biographer notices patterns, not just prompts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {observations.map((observation) => (
              <div key={observation.id} className="rounded-2xl border border-white/8 bg-white/4 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-paper">{observation.title}</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.24em] text-paper/38">
                      {observation.persona}
                    </div>
                  </div>
                  <Badge tone="accent">{observation.confidence}%</Badge>
                </div>
                <p className="mt-3 text-sm leading-6 text-paper/68">{observation.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {observation.evidence.map((item) => (
                    <Badge key={item} tone="neutral">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-[#10170f]/92">
          <CardHeader>
            <CardTitle>Suggested Questions</CardTitle>
            <CardDescription>Prompts that sound like inquiry, not chat.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {openQuestions.map((question) => (
              <div key={question.id} className="rounded-2xl border border-white/8 bg-white/4 p-4">
                <p className="text-sm leading-6 text-paper">{question.question}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-paper/48">
                  <span>{question.tone}</span>
                  <span>{question.memoryIds.join(" • ")}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-[#10170f]/92">
          <CardHeader>
            <CardTitle>Related Memories</CardTitle>
            <CardDescription>Material that may belong in the same chapter.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {memories.slice(1).map((memory) => (
              <div key={memory.id} className="rounded-2xl border border-white/8 bg-white/4 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium">{memory.title}</div>
                    <div className="mt-1 text-xs text-paper/45">{memory.source}</div>
                  </div>
                  <Badge tone="neutral">{memory.date}</Badge>
                </div>
                <p className="mt-2 text-sm leading-6 text-paper/65">{memory.excerpt}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
