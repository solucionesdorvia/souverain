import Link from "next/link";
import { ClearCartOnLoad } from "@/components/ClearCartOnLoad";

export const metadata = { title: "Pedido confirmado" };

export default function SuccessPage({ searchParams }: { searchParams: { session_id?: string } }) {
  return (
    <div className="container-souv py-32 text-center max-w-2xl mx-auto">
      <ClearCartOnLoad />
      <div className="eyebrow-gold mb-6">Confirmación</div>
      <h1 className="display-2 mb-8">
        Su pedido está <span className="italic">confirmado.</span>
      </h1>
      <p className="text-mute text-lg leading-relaxed mb-12">
        Recibirá un correo con los detalles de la compra. Ante cualquier
        consulta, su asesor está disponible por WhatsApp.
      </p>
      {searchParams.session_id && (
        <p className="text-xs text-mute font-mono mb-12">Ref: {searchParams.session_id.slice(0, 24)}…</p>
      )}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/tienda" className="btn-primary">Volver a la colección</Link>
        <Link href="/" className="btn-ghost">Ir al inicio</Link>
      </div>
    </div>
  );
}
