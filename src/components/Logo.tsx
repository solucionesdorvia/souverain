import Image from "next/image";
import { cn } from "@/lib/utils";

type Variant = "header" | "hero" | "footer" | "icon";

type Props = {
  variant?: Variant;
  className?: string;
  title?: string;
};

/**
 * Logo oficial Souverain (public/logo.png — texto blanco sobre negro).
 * mix-blend-screen hace transparente el fondo negro del PNG, así el logo
 * se integra sobre cualquier superficie oscura del sitio (fondos, videos).
 */
export function Logo({ variant = "header", className, title = "Distribuidora Souverain · On Premise" }: Props) {
  if (variant === "icon") {
    return (
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-8 w-8", className)}
        role="img"
        aria-label="Souverain"
      >
        <title>{title}</title>
        <rect width="100" height="100" fill="#0A0A0A" />
        <text
          x="50"
          y="72"
          textAnchor="middle"
          fontFamily="var(--font-cinzel), serif"
          fontWeight={600}
          fontSize="72"
          fill="#C9A24B"
        >
          S
        </text>
      </svg>
    );
  }

  const size = {
    header: "h-12 md:h-14",
    hero: "h-32 sm:h-40 md:h-52",
    footer: "h-24 md:h-28",
  }[variant];

  return (
    <Image
      src="/logo-crest.png"
      alt={title}
      width={1790}
      height={954}
      priority={variant === "header" || variant === "hero"}
      className={cn(size, "w-auto select-none", className)}
    />
  );
}
