import Link from "next/link";
import { SITE } from "@/lib/site";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="hairline-t bg-background mt-32">
      <div className="container-souv py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Logo variant="footer" className="text-ink mb-6" />
          <p className="text-mute text-sm leading-relaxed max-w-sm">
            Casa de bebidas premium en Buenos Aires. Curaduría On Premise para
            hoteles, restaurantes y clubes, con servicio retail para coleccionistas
            y cavas privadas.
          </p>
        </div>
        <div>
          <div className="eyebrow mb-5">La colección</div>
          <ul className="space-y-3 text-sm">
            <li><Link href="/tienda" className="text-ink/80 hover:text-gold transition-colors">La Colección</Link></li>
            <li><Link href="/tienda?exclusive=1" className="text-ink/80 hover:text-gold transition-colors">Luxury Black Selection</Link></li>
            <li><Link href="/ediciones-limitadas" className="text-ink/80 hover:text-gold transition-colors">Ediciones Limitadas</Link></li>
            <li><Link href="/la-cava" className="text-ink/80 hover:text-gold transition-colors">La Cava — Archivo</Link></li>
            <li><Link href="/maridajes" className="text-ink/80 hover:text-gold transition-colors">Arte del Maridaje</Link></li>
            <li><Link href="/guia-de-regalos" className="text-ink/80 hover:text-gold transition-colors">Guía de Regalos</Link></li>
            <li><Link href="/on-premise" className="text-ink/80 hover:text-gold transition-colors">On Premise</Link></li>
            <li><Link href="/nosotros" className="text-ink/80 hover:text-gold transition-colors">Nuestra historia</Link></li>
            <li><Link href="/contacto" className="text-ink/80 hover:text-gold transition-colors">Contacto</Link></li>
          </ul>
        </div>
        {/* min-w-0 + break-words: el mail no tiene dónde cortar y desbordaba la
            columna en el footer de 4 columnas (iPad retrato) */}
        <div className="min-w-0">
          <div className="eyebrow mb-5">Contacto</div>
          <ul className="space-y-3 text-sm text-ink/80 break-words">
            <li>{SITE.address}</li>
            <li>{SITE.phone}</li>
            <li>{SITE.email}</li>
            <li className="text-mute">{SITE.hours}</li>
            <li className="text-mute">{SITE.hoursWeekend}</li>
          </ul>
        </div>
      </div>
      <div className="hairline-t">
        <div className="container-souv py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] uppercase tracking-[0.25em] text-mute">
          <span>© {new Date().getFullYear()} {SITE.name}</span>
          <span>Venta prohibida a menores de 18 años · Beber con moderación</span>
        </div>
      </div>
    </footer>
  );
}
