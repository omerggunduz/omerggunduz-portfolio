import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const variantStyles: Record<Variant, string> = {
  primary: "bg-orange-500 hover:bg-orange-600 text-black font-semibold",
  secondary: "bg-neutral-900 hover:bg-neutral-800 text-neutral-100 border border-neutral-700",
  ghost: "hover:bg-neutral-800/60 text-neutral-400 hover:text-orange-400",
};

type BaseProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type LinkProps = BaseProps & { href: string } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href"
  >;

type Props = ButtonProps | LinkProps;

export function Button({ variant = "primary", className, children, ...rest }: Props) {
  const styles = cn(
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
    variantStyles[variant],
    className
  );

  if ("href" in rest && rest.href) {
    const { href, ...linkRest } = rest as LinkProps;
    return (
      <Link href={href} className={styles} {...(linkRest as object)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
