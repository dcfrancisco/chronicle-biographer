import {
  BookOpenText,
  ChevronRight,
  FileText,
  LibraryBig,
  Quote,
  ScrollText
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { chapters, memories } from "@/lib/mock-data";

export default function BooksPage() {
  const chapter = chapters[0];

  return (
    <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)_340px]">
      <aside className="paper-surface rounded-3xl p-5">
        <div className="flex items-center gap-2">
          <LibraryBig className="h-5 w-5 text-[#e4cb8f]" />
          <div>
            <div className="text-[11px] uppercase tracking-[0.34em] text-paper/45">
              Book Reader
            </div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">Memoir shelf</h1>
          </div>
        </div>

        <p className="mt-3 text-sm leading-6 text-paper/65">
          Read the memoir as a crafted work, with the evidence still within reach.
        </p>

        <Separator className="my-5" />

        <div className="space-y-2">
          {chapters.map((item, index) => (
            <div
              key={item.id}
              className={`rounded-2xl border px-4 py-3 ${
                index === 0
                  ? "border-[#d8c08b]/24 bg-[#d8c08b]/10"
                  : "border-white/8 bg-white/4"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.28em] text-paper/40">
                    {item.part}
                  </div>
                  <div className="mt-2 text-sm font-medium text-paper">{item.title}</div>
                  <div className="mt-1 text-xs text-paper/48">{item.subtitle}</div>
                </div>
                <ChevronRight className="h-4 w-4 text-paper/35" />
              </div>
            </div>
          ))}
        </div>
      </aside>

      <section className="space-y-5">
        <Card className="overflow-hidden bg-[#f0e5cf] text-[#1a1c17] shadow-[0_24px_90px_rgba(0,0,0,0.28)]">
          <CardHeader className="border-b border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.12))]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <Badge tone="neutral" className="border-black/10 bg-black/5 text-[#4b4b3c]">
                  Reading mode
                </Badge>
                <CardTitle className="chronicle-copy mt-3 text-4xl text-[#171a14]">
                  {chapter.part}
                </CardTitle>
                <CardDescription className="mt-2 text-base text-[#3a3d34]">
                  {chapter.title}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="border-black/10 text-[#1f231c]">
                  <ScrollText className="h-4 w-4" />
                  Citations
                </Button>
                <Button variant="secondary" className="border-black/10 bg-black/6 text-[#1f231c]">
                  <BookOpenText className="h-4 w-4" />
                  Reader notes
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="grid gap-8 p-7 lg:grid-cols-[minmax(0,1fr)_220px] lg:p-10">
            <article className="space-y-8">
              <div>
                <div className="text-xs uppercase tracking-[0.34em] text-[#5e5c4a]">
                  {chapter.sections[0].heading}
                </div>
                <h2 className="chronicle-copy mt-3 text-4xl font-semibold leading-tight text-[#171a14]">
                  Learning Alone
                </h2>
              </div>

              {chapter.sections[0].body.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className="chronicle-copy max-w-3xl text-[18px] leading-9 text-[#252820]"
                >
                  {paragraph}
                  {index === 0 ? " [Memory 12]" : index === 1 ? " [Observation 14]" : " [Interview 3]"}
                </p>
              ))}

              <div className="rounded-3xl border border-black/8 bg-white/40 p-5">
                <div className="flex items-center gap-2 text-sm font-medium text-[#2f3428]">
                  <Quote className="h-4 w-4" />
                  Chapter note
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#44483a]">
                  Chronicle keeps the memoir readable in its own right, while citations stay
                  visibly attached to the claims that shaped it.
                </p>
              </div>

              <div className="space-y-4">
                <div className="text-xs uppercase tracking-[0.34em] text-[#5e5c4a]">
                  {chapter.sections[1].heading}
                </div>
                {chapter.sections[1].body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="chronicle-copy max-w-3xl text-[18px] leading-9 text-[#252820]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>

            <aside className="space-y-4">
              <Card className="border-black/10 bg-white/40 text-[#1a1c17] shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base text-[#1f231c]">
                    <FileText className="h-4 w-4" />
                    Supporting Memories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {memories.slice(0, 3).map((memory) => (
                    <div key={memory.id} className="rounded-2xl border border-black/8 bg-white/50 p-3">
                      <div className="text-sm font-medium">{memory.title}</div>
                      <div className="mt-1 text-xs text-[#636353]">{memory.source}</div>
                      <p className="mt-2 text-sm leading-6 text-[#36392f]">{memory.excerpt}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-black/10 bg-white/40 text-[#1a1c17] shadow-none">
                <CardHeader>
                  <CardTitle className="text-base text-[#1f231c]">Related Interviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {["Interview 3", "Interview 8"].map((item) => (
                    <div key={item} className="rounded-2xl border border-black/8 bg-white/50 p-3">
                      <div className="text-sm font-medium">{item}</div>
                      <p className="mt-2 text-sm leading-6 text-[#36392f]">
                        A biographical touchpoint that helps verify the memoir draft.
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-black/10 bg-white/40 text-[#1a1c17] shadow-none">
                <CardHeader>
                  <CardTitle className="text-base text-[#1f231c]">Evidence</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {["Memory 12", "Observation 14", "Hypothesis 4"].map((item) => (
                    <Badge key={item} tone="neutral" className="border-black/10 bg-black/5 text-[#313327]">
                      {item}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </aside>
          </CardContent>
        </Card>
      </section>

      <aside className="space-y-5">
        <Card className="bg-[#10170f]/92">
          <CardHeader>
            <CardTitle>Reading mode</CardTitle>
            <CardDescription>All prose, no chat bubbles.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-paper/68">
            <p>Use this view when the chapter should read like a published memoir draft.</p>
            <p>Citations remain visible, but the page should still feel like literature.</p>
          </CardContent>
        </Card>

        <Card className="bg-[#10170f]/92">
          <CardHeader>
            <CardTitle>Chapter navigation</CardTitle>
            <CardDescription>Move through the memoir by part and chapter.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
              <div className="text-xs uppercase tracking-[0.28em] text-paper/38">Part I</div>
              <div className="mt-2 text-sm font-medium">Learning Alone</div>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
              <div className="text-xs uppercase tracking-[0.28em] text-paper/38">Part II</div>
              <div className="mt-2 text-sm font-medium">Choosing Responsibility</div>
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
