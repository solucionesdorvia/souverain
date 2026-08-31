import type { Metadata } from "next";
import { PaginaLegal } from "@/components/PaginaLegal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Qué datos personales recoge Distribuidora Souverain, para qué los usa y cómo ejercer los derechos de acceso, rectificación y supresión.",
};

export default function PrivacidadPage() {
  return (
    <PaginaLegal
      titulo="Política de privacidad"
      bajada="Qué datos te pedimos, para qué los usamos y cómo pedirnos que los borremos."
      actualizado="agosto de 2026"
    >
      <h2>Qué datos recogemos</h2>
      <ul>
        <li>
          <b>Los que nos das:</b> nombre, correo, teléfono y domicilio de entrega cuando hacés un
          pedido o nos escribís por el formulario de contacto. Si sos un establecimiento, además
          la razón social y el CUIT.
        </li>
        <li>
          <b>Los del pago:</b> los procesa la pasarela de pago. Nosotros no vemos ni guardamos
          números de tarjeta.
        </li>
        <li>
          <b>Los de navegación:</b> la confirmación de mayoría de edad y el contenido del carrito
          se guardan en tu propio navegador para que no tengas que repetirlos.
        </li>
      </ul>

      <h2>Para qué los usamos</h2>
      <p>
        Para procesar y entregar tu pedido, responderte cuando nos escribís, emitir la factura y
        cumplir con las obligaciones fiscales. Nada más.
      </p>
      <p>
        <b>No vendemos ni cedemos tus datos a terceros</b> con fines comerciales. Sólo los
        compartimos con quien hace falta para cumplir el pedido: el servicio de entrega y la
        pasarela de pago.
      </p>

      <h2>Cuánto tiempo los guardamos</h2>
      <p>
        Los datos de una compra se conservan mientras duren las obligaciones legales y fiscales
        asociadas. Los de una consulta que no terminó en compra, hasta que dejen de ser
        necesarios para responderte.
      </p>

      <h2>Tus derechos</h2>
      <p>
        La Ley 25.326 te da derecho a pedirnos qué datos tuyos tenemos, a corregirlos si están mal
        y a que los borremos. Escribinos a{" "}
        <a href={`mailto:${SITE.email}`} className="text-gold/80 hover:text-gold transition-colors">
          {SITE.email}
        </a>{" "}
        y lo resolvemos.
      </p>
      <p className="caption">
        La Agencia de Acceso a la Información Pública, órgano de control de la Ley 25.326, atiende
        las denuncias de quien vea afectado su derecho a la protección de datos personales.
      </p>

      <h2>Cookies</h2>
      <p>
        Este sitio no usa cookies de publicidad ni de seguimiento de terceros. Usa el
        almacenamiento del navegador sólo para lo que hace falta que funcione: la confirmación de
        edad y el carrito. Podés borrarlo desde la configuración de tu navegador cuando quieras.
      </p>

      <h2>Menores</h2>
      <p>
        El sitio está dirigido a mayores de 18 años y no recogemos datos de menores a sabiendas.
        Si detectamos que un dato pertenece a un menor, lo eliminamos.
      </p>
    </PaginaLegal>
  );
}
