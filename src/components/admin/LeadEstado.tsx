"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ESTADOS_LEAD, ETIQUETA_ESTADO, type EstadoLead } from "@/lib/leads";
import { cn } from "@/lib/utils";

/**
 * Cambia el estado de una solicitud.
 *
 * Una lista que no se puede marcar envejece en dos días: quien atiende termina
 * acordándose de memoria a quién ya llamó. El cambio se refleja al instante y
 * recién después se confirma contra el servidor; si falla, vuelve al valor
 * anterior y lo dice, en vez de dejar en pantalla un estado que no se guardó.
 */
export function LeadEstado({ id, inicial }: { id: string; inicial: EstadoLead }) {
  const [estado, setEstado] = useState<EstadoLead>(inicial);
  const [error, setError] = useState<string | null>(null);
  const [pendiente, startTransition] = useTransition();
  const router = useRouter();

  async function cambiar(nuevo: EstadoLead) {
    const previo = estado;
    setEstado(nuevo);
    setError(null);
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nuevo }),
    }).catch(() => null);

    if (!res?.ok) {
      setEstado(previo);
      setError("No se pudo guardar");
      return;
    }
    startTransition(() => router.refresh());
  }

  return (
    <div className="flex flex-col items-start md:items-end gap-2">
      <div className="flex flex-wrap gap-2">
        {ESTADOS_LEAD.map((e) => (
          <button
            key={e}
            onClick={() => cambiar(e)}
            disabled={pendiente}
            aria-pressed={estado === e}
            className={cn(
              "text-[10px] uppercase tracking-[0.2em] border px-3 py-1.5 transition-colors duration-300",
              estado === e
                ? "border-gold text-gold"
                : "border-hairline text-mute hover:text-ink hover:border-ink/40"
            )}
          >
            {ETIQUETA_ESTADO[e]}
          </button>
        ))}
      </div>
      {error && <span className="text-[10px] uppercase tracking-[0.2em] text-gold/80">{error}</span>}
    </div>
  );
}
