import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  await requireAdmin();
  const [productCount, orderCount, recentOrders, revenue, leadsSinContactar] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: "PAID" } }),
    prisma.lead.count({ where: { status: "NEW" } }),
  ]);

  const stats = [
    { l: "Productos", v: productCount.toString() },
    { l: "Pedidos", v: orderCount.toString() },
    { l: "Ingresos confirmados", v: formatPrice(revenue._sum.total ?? 0) },
    // Es el número que pide una acción hoy: una solicitud sin contactar es
    // un restaurante esperando que lo llamen.
    { l: "On Premise sin contactar", v: leadsSinContactar.toString() },
  ];

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.l} className="hairline p-8">
            <div className="eyebrow mb-3">{s.l}</div>
            <div className="font-display text-4xl text-ink">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 flex-wrap">
        <Link href="/admin/productos" className="btn-ghost">Gestionar productos</Link>
        <Link href="/admin/productos/nuevo" className="btn-primary">+ Nuevo producto</Link>
        <Link href="/admin/pedidos" className="btn-ghost">Ver pedidos</Link>
        <Link href="/admin/leads" className="btn-ghost">Solicitudes On Premise</Link>
      </div>

      <div>
        <h3 className="font-display text-2xl mb-6">Últimos pedidos</h3>
        {recentOrders.length === 0 ? (
          <p className="text-mute text-sm">Todavía no hay pedidos.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-mute uppercase tracking-widest text-[10px]">
              <tr className="hairline-b">
                <th className="text-left py-3">Cliente</th>
                <th className="text-left py-3">Email</th>
                <th className="text-left py-3">Método</th>
                <th className="text-left py-3">Estado</th>
                <th className="text-right py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="hairline-b">
                  <td className="py-4">{o.customerName}</td>
                  <td className="py-4 text-mute">{o.customerEmail}</td>
                  <td className="py-4">{o.checkoutMethod}</td>
                  <td className="py-4">
                    <span className="text-[10px] uppercase tracking-widest border border-hairline px-2 py-1">
                      {o.status}
                    </span>
                  </td>
                  <td className="py-4 text-right tabular-nums">{formatPrice(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
