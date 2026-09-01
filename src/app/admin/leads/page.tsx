import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { LeadEstado } from "@/components/admin/LeadEstado";
import { esEstadoLead, whatsappDesdeTelefono, type EstadoLead } from "@/lib/leads";

export const dynamic = "force-dynamic";

/** Las sin contactar van arriba: son las únicas que piden una acción hoy. */
const PRIORIDAD: Record<string, number> = { NEW: 0, CONTACTADO: 1, ACTIVA: 2, DESCARTADA: 3 };

export default async function AdminLeadsPage() {
  await requireAdmin();
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  const ordenados = [...leads].sort(
    (a, b) => (PRIORIDAD[a.status] ?? 9) - (PRIORIDAD[b.status] ?? 9)
  );
  const sinContactar = leads.filter((l) => l.status === "NEW").length;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-8">
        <h2 className="font-display text-3xl">Solicitudes On Premise ({leads.length})</h2>
        {sinContactar > 0 && (
          <span className="text-[11px] uppercase tracking-[0.25em] text-gold">
            {sinContactar} sin contactar
          </span>
        )}
      </div>

      {leads.length === 0 ? (
        <div className="hairline p-12 text-center">
          <p className="text-mute mb-2">Todavía no hay solicitudes.</p>
          <p className="caption max-w-sm mx-auto">
            Acá caen los establecimientos que completan el formulario de{" "}
            <span className="text-ink/70">/on-premise</span>.
          </p>
        </div>
      ) : (
        <ul className="space-y-6">
          {ordenados.map((l) => {
            const wa = whatsappDesdeTelefono(l.phone);
            const estado: EstadoLead = esEstadoLead(l.status) ? l.status : "NEW";
            return (
              <li key={l.id} className="hairline p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-4">
                  <div className="min-w-0">
                    <div className="eyebrow mb-1">{l.rubro}</div>
                    <div className="font-display text-2xl leading-tight">{l.empresa}</div>
                    <div className="text-mute text-sm mt-1">{l.contactName}</div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm">
                      <a href={`mailto:${l.email}`} className="text-ink/80 hover:text-gold transition-colors">
                        {l.email}
                      </a>
                      {wa ? (
                        <a
                          href={`https://wa.me/${wa}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ink/80 hover:text-gold transition-colors"
                        >
                          {l.phone} · WhatsApp
                        </a>
                      ) : (
                        <span className="text-ink/80">{l.phone}</span>
                      )}
                    </div>
                  </div>

                  <div className="md:text-right shrink-0">
                    <LeadEstado id={l.id} inicial={estado} />
                    <div className="text-mute text-xs mt-3">
                      {new Date(l.createdAt).toLocaleString("es-AR")}
                    </div>
                  </div>
                </div>

                <dl className="hairline-t pt-4 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 text-sm">
                  <Dato termino="Volumen estimado" valor={l.volumen} />
                  <Dato termino="Ciudad" valor={l.ciudad} />
                </dl>

                {l.mensaje && (
                  <p className="hairline-t mt-4 pt-4 text-sm text-mute italic">{l.mensaje}</p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/** Volumen y ciudad son opcionales en el formulario: se dice cuando no vinieron. */
function Dato({ termino, valor }: { termino: string; valor: string | null }) {
  return (
    <div>
      <dt className="eyebrow mb-1">{termino}</dt>
      <dd className={valor ? "text-ink/90" : "text-mute/60"}>{valor ?? "sin indicar"}</dd>
    </div>
  );
}
