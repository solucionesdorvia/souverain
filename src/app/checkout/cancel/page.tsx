import Link from "next/link";

export const metadata = { title: "Pago cancelado" };

export default function CancelPage() {
  return (
    <div className="container-souv py-32 text-center max-w-2xl mx-auto">
      <div className="eyebrow mb-6">Pago no completado</div>
      <h1 className="display-2 mb-8">
        Su pedido quedó en <span className="italic">pausa.</span>
      </h1>
      <p className="text-mute text-lg leading-relaxed mb-12">
        El proceso de pago no se completó. Su selección está intacta y puede
        retomar el pedido cuando lo desee.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/checkout" className="btn-primary">Reintentar pago</Link>
        <Link href="/carrito" className="btn-ghost">Volver al carrito</Link>
      </div>
    </div>
  );
}
