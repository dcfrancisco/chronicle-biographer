import {
  BookOpenText,
  CircleDashed,
  TriangleAlert,
  Waypoints,
  Quote
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { contradictions, hypotheses, observations, openQuestions, themes } from "@/lib/mock-data";

function ConfidenceBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-white/6">
      <div
        className="h-2 rounded-full bg-[linear-gradient(90deg,rgba(214,192,138,0.95),rgba(159,211,175,0.95))]"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function NotebookPage() {
  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
      <section className="paper-surface rounded-3xl p-5 lg:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[0.34em] text-paper/45">
              Biographer Notebook
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              What Chronicle currently believes
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-paper/68">
              This is the private research surface. The biographer studies the life here:
              observations, hypotheses, open questions, contradictions, and themes.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge tone="accent">Private notes</Badge>
            <Badge tone="neutral">Evidence linked</Badge>
          </div>
        </div>

        <Separator className="my-5" />

        <Tabs defaultValue="observations" className="space-y-5">
          <TabsList>
            <TabsTrigger value="observations">Observations</TabsTrigger>
            <TabsTrigger value="hypotheses">Hypotheses</TabsTrigger>
            <TabsTrigger value="questions">Open Questions</TabsTrigger>
            <TabsTrigger value="contradictions">Contradictions</TabsTrigger>
            <TabsTrigger value="themes">Themes</TabsTrigger>
          </TabsList>

          <TabsContent value="observations" className="space-y-4">
            {observations.map((item) => (
              <Card key={item.id} className="bg-[#10170f]/92">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle>Observation #{item.id.split("-")[1]}</CardTitle>
                      <CardDescription className="max-w-3xl text-base text-paper/78">
                        {item.title}
                      </CardDescription>
                    </div>
                    <Badge tone="accent">{item.confidence}%</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-6 text-paper/68">{item.summary}</p>
                  <div>
                    <div className="mb-2 text-xs uppercase tracking-[0.26em] text-paper/40">
                      Evidence
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.evidence.map((evidence) => (
                        <Badge key={evidence} tone="neutral">
                          {evidence}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <ConfidenceBar value={item.confidence} />
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="hypotheses" className="space-y-4">
            {hypotheses.map((item) => (
              <Card key={item.id} className="bg-[#10170f]/92">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle>Hypothesis #{item.id.split("-")[1]}</CardTitle>
                      <CardDescription className="max-w-3xl text-base text-paper/78">
                        {item.title}
                      </CardDescription>
                    </div>
                    <Badge tone="accent">{item.confidence}%</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-6 text-paper/68">{item.summary}</p>
                  <div className="flex items-center gap-2 text-sm text-paper/55">
                    <BookOpenText className="h-4 w-4" />
                    <span>{item.evidenceCount}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.evidence.map((evidence) => (
                      <Badge key={evidence} tone="neutral">
                        {evidence}
                      </Badge>
                    ))}
                  </div>
                  <ConfidenceBar value={item.confidence} />
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="questions" className="space-y-4">
            {openQuestions.map((item) => (
              <Card key={item.id} className="bg-[#10170f]/92">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <Quote className="mt-1 h-4 w-4 text-[#e4c984]" />
                    <div>
                      <CardTitle>Open Question</CardTitle>
                      <CardDescription className="max-w-3xl text-base text-paper/78">
                        {item.question}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge tone="neutral">{item.tone}</Badge>
                    <Badge tone="accent">Needs interview</Badge>
                  </div>
                  <p className="text-sm leading-6 text-paper/68">
                    Chronicle surfaces this as a research prompt, not a chatbot response.
                  </p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="contradictions" className="space-y-4">
            {contradictions.map((item) => (
              <Card key={item.id} className="bg-[#10170f]/92">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <TriangleAlert className="mt-1 h-4 w-4 text-[#f2c171]" />
                      <div>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription className="max-w-3xl text-base text-paper/78">
                          {item.detail}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge tone={item.severity === "High" ? "warning" : "neutral"}>
                      {item.severity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {item.evidence.map((evidence) => (
                      <Badge key={evidence} tone="neutral">
                        {evidence}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="themes" className="space-y-4">
            {themes.map((item) => (
              <Card key={item.id} className="bg-[#10170f]/92">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <Waypoints className="mt-1 h-4 w-4 text-[#9fd3af]" />
                      <div>
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription className="max-w-3xl text-base text-paper/78">
                          {item.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge tone="success">{item.confidence}%</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {item.relatedIds.map((related) => (
                      <Badge key={related} tone="neutral">
                        {related}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </section>

      <aside className="space-y-5">
        <Card className="bg-[#10170f]/92">
          <CardHeader>
            <CardTitle>Notebook stance</CardTitle>
            <CardDescription>How Chronicle is currently reading the subject.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
              <div className="text-sm font-medium text-paper">Current belief</div>
              <p className="mt-2 text-sm leading-6 text-paper/68">
                The subject is motivated less by recognition than by the freedom to shape
                the work on their own terms.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
              <div className="text-sm font-medium text-paper">Pending revision</div>
              <p className="mt-2 text-sm leading-6 text-paper/68">
                Leadership may be less about ambition and more about protecting the mission.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#10170f]/92">
          <CardHeader>
            <CardTitle>Research actions</CardTitle>
            <CardDescription>Ways the biographer can respond.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Share with user",
              "Ask interview question",
              "Add evidence",
              "Promote to theme"
            ].map((action) => (
              <div
                key={action}
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-paper/76"
              >
                <span>{action}</span>
                <CircleDashed className="h-4 w-4 text-paper/35" />
              </div>
            ))}
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
