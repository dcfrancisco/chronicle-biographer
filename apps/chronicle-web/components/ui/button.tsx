import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "ghost" | "outline" | "subtle";
  size?: "sm" | "md" | "lg";
};

export function Button({
  className,
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) {
  const variantClasses = {
    default:
      "bg-accent text-black shadow-soft hover:bg-[#d7c08a] border border-transparent",
    secondary:
      "bg-white/6 text-paper border border-white/10 hover:bg-white/10",
    ghost: "bg-transparent text-paper hover:bg-white/5 border border-transparent",
    outline:
      "bg-transparent text-paper border border-white/12 hover:bg-white/5",
    subtle: "bg-white/4 text-paper border border-white/8 hover:bg-white/8"
  }[variant];

  const sizeClasses = {
    sm: "h-8 rounded-md px-3 text-xs",
    md: "h-10 rounded-lg px-4 text-sm",
    lg: "h-11 rounded-xl px-5 text-sm"
  }[size];

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:pointer-events-none disabled:opacity-50",
        variantClasses,
        sizeClasses,
        className
      )}
      {...props}
    />
  );
}
