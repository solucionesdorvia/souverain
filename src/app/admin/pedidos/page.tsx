import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminPedidosPage() {
  await requireAdmin();
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } } },
  });

  return (
    <div>
      <h2 className="font-display text-3xl mb-8">Pedidos ({orders.length})</h2>
      {orders.length === 0 ? (
        <div className="hairline p-12 text-center">
          <p className="text-mute">Todavía no hay pedidos.</p>
        </div>
      ) : (
        <ul className="space-y-6">
          {orders.map((o) => (
            <li key={o.id} className="hairline p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <div className="eyebrow mb-1">#{o.id.slice(-8)}</div>
                  <div className="font-display text-xl">{o.customerName}</div>
                  <div className="text-mute text-sm">{o.customerEmail} · {o.customerPhone}</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-2xl text-gold mb-1">{formatPrice(o.total)}</div>
                  <div className="flex gap-2 justify-end text-[10px] uppercase tracking-widest">
                    <span className="border border-hairline px-2 py-1">{o.checkoutMethod}</span>
                    <span className="border border-hairline px-2 py-1">{o.status}</span>
                  </div>
                  <div className="text-mute text-xs mt-2">
                    {new Date(o.createdAt).toLocaleString("es-AR")}
                  </div>
                </div>
              </div>
              <ul className="hairline-t pt-4 space-y-2">
                {o.items.map((it) => (
                  <li key={it.id} className="flex justify-between text-sm">
                    {/* El nombre se lee del ítem: la pieza puede haber salido del catálogo. */}
                    <span className="text-ink/90">{it.quantity} × {it.productName || it.product?.name || "Pieza dada de baja"}</span>
                    <span className="text-mute tabular-nums">{formatPrice(it.unitPrice * it.quantity)}</span>
                  </li>
                ))}
              </ul>
              {o.customerNotes && (
                <p className="hairline-t mt-4 pt-4 text-sm text-mute italic">
                  Notas: {o.customerNotes}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
