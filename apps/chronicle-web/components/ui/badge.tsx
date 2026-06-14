import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "accent" | "warning" | "success";
};

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  const toneClasses = {
    neutral: "bg-white/6 text-paper/78 border-white/10",
    accent: "bg-accent/14 text-[#f4dfb0] border-[#d6c08a]/20",
    warning: "bg-warning/15 text-[#f9d9a1] border-warning/20",
    success: "bg-success/15 text-[#b8e2c7] border-success/20"
  }[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em]",
        toneClasses,
        className
      )}
      {...props}
    />
  );
}
