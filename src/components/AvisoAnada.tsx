import { anadaDeLaFoto, fotoDeOtraAnada } from "@/lib/anada-foto";
import { cn } from "@/lib/utils";

/**
 * Aclara que el packshot es de otra cosecha.
 *
 * De Cheval des Andes sólo circula la foto de 2017 y de Terrazas la de la añada
 * vigente: 95 de las 323 piezas se muestran con la botella de un año distinto
 * del que declara el nombre. Aclararlo sólo en la ficha no alcanzaba, porque el
 * año se lee igual de nítido en el hero de Drops y en la tarjeta de la tienda, y
 * ahí la foto salía muda. Al ser un solo componente, cualquier superficie nueva
 * que muestre una botella lo hereda en vez de volver a olvidarlo.
 *
 * Dice el año concreto en lugar de un "puede no corresponder": es más corto,
 * entra debajo de una tarjeta y le sirve más a quien compara cosechas.
 */
export function AvisoAnada({
  name,
  imageUrl,
  className,
}: {
  name: string;
  imageUrl: string;
  className?: string;
}) {
  if (!fotoDeOtraAnada(name, imageUrl)) return null;
  const anada = anadaDeLaFoto(imageUrl);
  if (anada === null) return null;
  return (
    <p className={cn("caption", className)}>Foto de la añada {anada}</p>
  );
}
