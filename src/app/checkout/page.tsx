import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";
import { getCheckoutMode } from "@/lib/checkout-mode";

export const metadata: Metadata = {
  title: "Finalizar pedido",
  description: "Complete su pedido con pago seguro o coordinación directa.",
};

export default function CheckoutPage() {
  const mode = getCheckoutMode();
  return (
    <div className="container-souv py-16 md:py-24">
      <header className="mb-12 max-w-2xl">
        <div className="eyebrow-gold mb-3">
          {mode === "whatsapp" ? "Coordinación por WhatsApp" : "Pago seguro"}
        </div>
        <h1 className="display-2 mb-4">
          Finalizar <span className="italic">pedido.</span>
        </h1>
        <p className="text-mute leading-relaxed">
          {mode === "whatsapp"
            ? "Complete sus datos y lo contactamos por WhatsApp para confirmar el pedido."
            : "Complete sus datos para abrir la sesión segura de pago con Stripe."}
        </p>
      </header>
      <CheckoutForm mode={mode} />
    </div>
  );
}
