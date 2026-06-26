import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-souv py-32 text-center">
      <div className="eyebrow mb-6 text-gold">404</div>
      <h1 className="font-display text-6xl md:text-8xl leading-[1.05] mb-6">Página no encontrada.</h1>
      <p className="text-mute mb-10">Esta botella no está en nuestra cava.</p>
      <Link href="/" className="btn-primary">Volver al inicio</Link>
    </div>
  );
}
