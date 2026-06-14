"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { BookOpenText, NotebookPen, PenSquare, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { href: "/upload", label: "Upload", icon: UploadCloud },
  { href: "/studio", label: "Writing Studio", icon: PenSquare },
  { href: "/notebook", label: "Notebook", icon: NotebookPen },
  { href: "/books", label: "Book Reader", icon: BookOpenText }
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-canvas text-paper">
      <div className="fixed inset-0 -z-10 bg-studio-glow opacity-90" />
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05),transparent_20%),radial-gradient(circle_at_80%_0%,rgba(155,191,160,0.08),transparent_24%),radial-gradient(circle_at_50%_90%,rgba(255,201,122,0.05),transparent_20%)]" />
      <header className="sticky top-0 z-50 border-b border-white/8 bg-canvas/84 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 lg:px-8">
          <div>
            <div className="text-[11px] uppercase tracking-[0.42em] text-paper/45">
              Chronicle
            </div>
            <div className="mt-1 text-sm text-paper/70">
              An AI biographer for memoir, not a chatbot for prompts.
            </div>
          </div>
          <nav className="flex items-center gap-2 rounded-full border border-white/8 bg-white/4 p-1">
            {navItems.map((item) => {
              const active = pathname?.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors",
                    active
                      ? "bg-accent text-black"
                      : "text-paper/70 hover:bg-white/6 hover:text-paper"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Badge tone="accent">Mock data prototype</Badge>
        </div>
      </header>
      <main className="mx-auto max-w-[1600px] px-4 py-5 lg:px-6">{children}</main>
    </div>
  );
}
