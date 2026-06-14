import * as React from "react";
import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-40 w-full rounded-2xl border border-white/10 bg-[#11150f]/70 px-4 py-3 text-sm leading-7 text-paper outline-none placeholder:text-paper/35 focus:border-accent/40 focus:ring-2 focus:ring-accent/20",
        className
      )}
      {...props}
    />
  );
}
