import type { Metadata } from "next";
import { PaginaLegal } from "@/components/PaginaLegal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Botón de arrepentimiento",
  description:
    "Cómo ejercer el derecho de arrepentimiento dentro de los diez días corridos de recibida la compra, según la Resolución 424/2020.",
};

const ASUNTO = encodeURIComponent("Botón de arrepentimiento");
const CUERPO = encodeURIComponent(
  "Quiero ejercer el derecho de arrepentimiento sobre mi compra.\n\n" +
    "Número de pedido:\nNombre y apellido:\nFecha de la compra:\nProductos:\n"
);

export default function ArrepentimientoPage() {
  return (
    <PaginaLegal
      titulo="Botón de arrepentimiento"
      bajada="Tenés diez días corridos desde que recibís la compra para arrepentirte, sin dar ninguna explicación y sin costo."
      actualizado="agosto de 2026"
    >
      <p>
        La Resolución 424/2020 de la Secretaría de Comercio Interior reconoce este derecho a
        cualquier persona que compre a distancia. No hace falta justificar la decisión ni
        cumplir ningún requisito más que avisar dentro del plazo.
      </p>

      <h2>Cómo ejercerlo</h2>
      <p>Escribinos por cualquiera de estas dos vías y decinos que querés arrepentirte:</p>

      <div className="not-prose my-8 flex flex-col sm:flex-row gap-4">
        <a href={`mailto:${SITE.email}?subject=${ASUNTO}&body=${CUERPO}`} className="btn-primary">
          Ejercer por correo
        </a>
        <a
          href={`https://wa.me/${SITE.phoneIntl}?text=${encodeURIComponent(
            "Hola, quiero ejercer el botón de arrepentimiento sobre mi compra."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          Ejercer por WhatsApp
        </a>
      </div>

      <p>
        Nos ayuda que incluyas el número de pedido, tu nombre y la fecha de la compra, pero si no
        los tenés a mano igual lo tramitamos.
      </p>

      <h2>Qué pasa después</h2>
      <ul>
        <li>Te confirmamos la recepción del pedido dentro de las 24 horas hábiles.</li>
        <li>
          Coordinamos el retiro de la mercadería en el domicilio donde la recibiste.{" "}
          <b>El costo de la devolución corre por nuestra cuenta</b>, tal como exige la norma.
        </li>
        <li>
          Devolvemos el importe por el mismo medio de pago que usaste, dentro de los diez días
          corridos de recibida la mercadería.
        </li>
      </ul>

      <h2>Condiciones</h2>
      <p>
        La botella tiene que estar sin abrir, con su precinto y su etiqueta intactos, y en el
        mismo estado en que la recibiste. Es la única condición: no podemos aceptar la devolución
        de una botella abierta, porque deja de ser comercializable.
      </p>
      <p>
        El plazo de diez días corre desde la entrega. Si la compra incluye varias botellas
        entregadas en fechas distintas, se cuenta desde la última.
      </p>
    </PaginaLegal>
  );
}
