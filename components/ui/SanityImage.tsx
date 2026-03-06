import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";
import { cn } from "@/lib/utils";

type Props = {
  source: SanityImageSource;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
};

export function SanityImage({
  source,
  alt,
  width = 800,
  height = 450,
  className,
  priority = false,
  fill = false,
}: Props) {
  const src = urlFor(source).width(width).height(height).url();

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={cn("object-cover", className)}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("object-cover", className)}
      priority={priority}
    />
  );
}
