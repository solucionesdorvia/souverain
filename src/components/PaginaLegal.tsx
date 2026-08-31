import Link from "next/link";
import { FISCAL, SITE } from "@/lib/site";

/**
 * Envoltorio de las tres páginas legales.
 *
 * Comparten estructura y tono: texto corrido, medida de lectura acotada y el
 * mismo pie con los datos de la empresa. La ley pide que esos datos estén
 * visibles, así que van al final de las tres y no sólo en una.
 */
export function PaginaLegal({
  titulo,
  bajada,
  actualizado,
  children,
}: {
  titulo: string;
  bajada: string;
  actualizado: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container-souv py-16 md:py-24">
      <header className="max-w-2xl mb-14 md:mb-20">
        <h1 className="display-2 mb-5">{titulo}</h1>
        <p className="text-mute text-base md:text-lg leading-relaxed">{bajada}</p>
        <p className="caption mt-6">Última actualización: {actualizado}</p>
      </header>

      <div className="max-w-[68ch] legal">{children}</div>

      <footer className="max-w-[68ch] mt-16 md:mt-20 hairline-t pt-8">
        <div className="label-souv mb-4">Datos del vendedor</div>
        <ul className="text-sm text-mute leading-relaxed space-y-1">
          <li>
            <b className="text-ink font-normal">Razón social:</b>{" "}
            {FISCAL.razonSocial ?? <PendienteDato />}
          </li>
          <li>
            <b className="text-ink font-normal">CUIT:</b> {FISCAL.cuit ?? <PendienteDato />}
          </li>
          <li>
            <b className="text-ink font-normal">Domicilio:</b> {FISCAL.domicilio}
          </li>
          <li>
            <b className="text-ink font-normal">Contacto:</b>{" "}
            <a href={`mailto:${SITE.email}`} className="hover:text-gold transition-colors">
              {SITE.email}
            </a>{" "}
            · {SITE.phone}
          </li>
        </ul>
        <p className="caption mt-6">
          Ante un conflicto de consumo podés acudir a{" "}
          <a
            href="https://autogestion.produccion.gob.ar/consumidores"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold/80 hover:text-gold transition-colors"
          >
            Defensa de las y los Consumidores
          </a>
          .
        </p>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.25em] text-mute">
          <Link href="/terminos" className="hover:text-gold transition-colors">Términos</Link>
          <Link href="/privacidad" className="hover:text-gold transition-colors">Privacidad</Link>
          <Link href="/arrepentimiento" className="hover:text-gold transition-colors">Arrepentimiento</Link>
        </div>
      </footer>
    </div>
  );
}

/** Marca un dato fiscal que Souverain todavía no entregó, en vez de inventarlo. */
function PendienteDato() {
  return <span className="text-gold/70">— pendiente de completar —</span>;
}
