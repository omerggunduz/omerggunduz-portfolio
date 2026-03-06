import { cn } from "@/lib/utils";

type Variant = "default" | "outline" | "status" | "type";

const variantStyles: Record<Variant, string> = {
  default: "bg-neutral-800 text-neutral-300",
  outline: "border border-neutral-700 text-neutral-400",
  status: "bg-neutral-800 text-neutral-300 border border-neutral-700",
  type: "bg-orange-950/60 text-orange-400 border border-orange-800/40",
};

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

export function Badge({ children, variant = "default", className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
