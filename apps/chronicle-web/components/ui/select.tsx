import * as React from "react";
import { cn } from "@/lib/utils";

export function Select({
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-10 w-full rounded-xl border border-white/10 bg-[#11150f]/70 px-4 text-sm text-paper outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/20",
        className
      )}
      {...props}
    />
  );
}
