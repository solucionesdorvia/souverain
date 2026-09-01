import Link from "next/link";
import { isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const loggedIn = await isAdmin();

  return (
    <div className="container-souv py-12 min-h-[calc(100vh-80px)]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 hairline-b pb-8">
        <div>
          <div className="eyebrow mb-2 text-gold">Panel administrativo</div>
          <h1 className="font-display text-4xl md:text-5xl">Souverain Admin</h1>
        </div>
        {loggedIn && (
          <nav className="flex gap-6 text-[11px] uppercase tracking-[0.25em] flex-wrap">
            <Link href="/admin" className="text-ink/80 hover:text-gold">Resumen</Link>
            <Link href="/admin/productos" className="text-ink/80 hover:text-gold">Productos</Link>
            <Link href="/admin/pedidos" className="text-ink/80 hover:text-gold">Pedidos</Link>
            <Link href="/admin/leads" className="text-ink/80 hover:text-gold">On Premise</Link>
            <form action="/api/admin/logout" method="post">
              <button type="submit" className="text-mute hover:text-gold uppercase tracking-[0.25em]">
                Salir
              </button>
            </form>
          </nav>
        )}
      </div>
      {children}
    </div>
  );
}
