import { cn } from "@/lib/utils";

type Status = "DISPONIBLE" | "PREVENTA" | "AGOTADO";

const config: Record<Status, { label: string; className: string }> = {
  DISPONIBLE: { label: "Disponible", className: "text-emerald-400 border-emerald-400/40 bg-emerald-400/5" },
  PREVENTA: { label: "Pre-venta", className: "text-gold border-gold/40 bg-gold/5" },
  AGOTADO: { label: "Agotado", className: "text-mute border-mute/30 bg-mute/5 line-through" },
};

export function StatusBadge({ status }: { status: Status }) {
  const c = config[status];
  return (
    <span className={cn("text-[10px] uppercase tracking-[0.35em] border px-3 py-1.5", c.className)}>
      {c.label}
    </span>
  );
}
