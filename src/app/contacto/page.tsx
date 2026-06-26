import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/lib/site";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Hable con Distribuidora Souverain. Dirección, horarios, asesoría On Premise e invitaciones al Black Club.",
};

export default function ContactoPage() {
  const mapQuery = encodeURIComponent(SITE.address);
  return (
    <div className="container-souv py-16 md:py-24">
      <header className="mb-16 max-w-3xl">
        <div className="eyebrow-gold mb-4">On Premise · Retail · Eventos · Black Club</div>
        <h1 className="display-2 mb-6">
          Hablemos en <span className="italic">persona.</span>
        </h1>
        <p className="text-mute text-lg leading-relaxed">
          Atendemos cada canal con la misma curaduría: cartas para hoteles,
          restaurantes y bares; compra retail para coleccionistas y cavas
          privadas; eventos puntuales; y solicitudes de invitación al
          Souverain Black Club.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <ul className="space-y-8 mb-12">
            <li className="flex gap-5">
              <MapPin size={20} strokeWidth={1.2} className="text-gold mt-1 flex-shrink-0" />
              <div>
                <div className="eyebrow mb-2">Dirección</div>
                <div className="text-ink/90 leading-relaxed">{SITE.address}</div>
              </div>
            </li>
            <li className="flex gap-5">
              <Phone size={20} strokeWidth={1.2} className="text-gold mt-1 flex-shrink-0" />
              <div>
                <div className="eyebrow mb-2">Teléfono</div>
                <a href={`https://wa.me/${SITE.phoneIntl}`} target="_blank" className="text-ink/90 hover:text-gold transition-colors">
                  {SITE.phone}
                </a>
              </div>
            </li>
            <li className="flex gap-5">
              <Mail size={20} strokeWidth={1.2} className="text-gold mt-1 flex-shrink-0" />
              <div>
                <div className="eyebrow mb-2">Email</div>
                <a href={`mailto:${SITE.email}`} className="text-ink/90 hover:text-gold transition-colors">
                  {SITE.email}
                </a>
              </div>
            </li>
            <li className="flex gap-5">
              <Clock size={20} strokeWidth={1.2} className="text-gold mt-1 flex-shrink-0" />
              <div>
                <div className="eyebrow mb-2">Horarios</div>
                <div className="text-ink/90">{SITE.hours}</div>
                <div className="text-mute text-sm mt-1">{SITE.hoursWeekend}</div>
              </div>
            </li>
          </ul>

          <div className="aspect-[4/3] hairline overflow-hidden bg-surface">
            <iframe
              title="Mapa Souverain"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="w-full h-full grayscale contrast-125 brightness-75"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
