import type { Metadata } from "next";
import Link from "next/link";
import { PaginaLegal } from "@/components/PaginaLegal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Condiciones de venta de Distribuidora Souverain: pedidos, precios, entregas, devoluciones y venta de bebidas alcohólicas.",
};

export default function TerminosPage() {
  return (
    <PaginaLegal
      titulo="Términos y condiciones"
      bajada="Las condiciones bajo las que Souverain vende y entrega. Están escritas para leerse, no para esconder nada."
      actualizado="agosto de 2026"
    >
      <h2>Quiénes somos</h2>
      <p>
        {SITE.name} distribuye bebidas de alta gama en Buenos Aires, a particulares y a
        establecimientos gastronómicos. Los datos fiscales y de contacto están al pie de esta
        página.
      </p>

      <h2>Venta de bebidas alcohólicas</h2>
      <p>
        <b>No vendemos a menores de 18 años.</b> La Ley 24.788 lo prohíbe y el sitio pide confirmar
        la mayoría de edad antes de mostrar el catálogo. Al hacer un pedido declarás ser mayor de
        18 años, y podemos pedirte un documento en el momento de la entrega. Si quien recibe no
        acredita la edad, no entregamos.
      </p>

      <h2>Pedidos</h2>
      <p>
        Un pedido es una oferta de compra: queda confirmado recién cuando te lo confirmamos
        nosotros. Podemos no aceptarlo si el producto quedó sin stock, si detectamos un error de
        precio o si no podemos verificar los datos de entrega.
      </p>
      <p>
        Buena parte del catálogo se vende bajo la modalidad <b>Consultar</b>: son piezas de
        asignación limitada cuyo precio y disponibilidad se confirman caso por caso. Ahí el pedido
        se cierra por WhatsApp o por correo, no por el carrito.
      </p>

      <h2>Precios</h2>
      <p>
        Los precios se muestran en pesos argentinos con impuestos incluidos, y pueden cambiar sin
        aviso previo. El que vale es el que estaba publicado al momento en que confirmamos tu
        pedido. Si detectamos un error evidente de carga, te lo avisamos antes de cobrar y podés
        cancelar sin costo.
      </p>

      <h2>Entregas</h2>
      <p>
        Coordinamos la entrega al confirmar el pedido, junto con el plazo y el costo del envío
        según la zona. Entregamos en el domicilio que nos indiques, en el horario acordado. Si no
        hay nadie que reciba, coordinamos una segunda visita.
      </p>
      <p>
        El riesgo sobre la mercadería pasa a vos en el momento de la entrega. Revisá las botellas
        al recibirlas: si alguna llegó rota o no corresponde a lo pedido, decilo en el momento o
        dentro de las 48 horas y lo resolvemos sin vueltas.
      </p>

      <h2>Fotografías del catálogo</h2>
      <p>
        Las imágenes son de referencia. En los vinos que se venden por cosecha, la botella
        fotografiada puede corresponder a una añada distinta de la que recibas; cuando eso pasa lo
        aclaramos debajo de la foto. El envase, la etiqueta y la presentación pueden tener
        variaciones respecto de la imagen.
      </p>

      <h2>Devoluciones y arrepentimiento</h2>
      <p>
        Si comprás a distancia tenés diez días corridos para arrepentirte sin dar explicaciones.
        Cómo hacerlo está en la página de{" "}
        <Link href="/arrepentimiento" className="text-gold/80 hover:text-gold transition-colors">
          botón de arrepentimiento
        </Link>
        .
      </p>
      <p>
        Aparte de ese derecho, si un producto llega en mal estado o no es el que pediste, lo
        cambiamos o devolvemos el importe. Una botella abierta no puede devolverse, salvo que el
        problema sea del producto en sí.
      </p>

      <h2>Propiedad intelectual</h2>
      <p>
        Las marcas, etiquetas y fotografías de producto pertenecen a sus respectivas casas
        productoras. El diseño y los textos de este sitio son de {SITE.name}.
      </p>

      <h2>Cambios</h2>
      <p>
        Podemos actualizar estos términos. La versión que rige tu compra es la que estaba
        publicada el día en que la hiciste; arriba figura la fecha de la última actualización.
      </p>
    </PaginaLegal>
  );
}
