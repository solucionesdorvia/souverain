"use client";

import { useState } from "react";

export function OnPremiseForm() {
  const [empresa, setEmpresa] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rubro, setRubro] = useState("");
  const [volumen, setVolumen] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/on-premise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ empresa, contactName, email, phone, rubro, volumen, ciudad, mensaje }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="hairline p-12 text-center">
        <div className="eyebrow-gold mb-4">Solicitud recibida</div>
        <h3 className="font-display text-3xl mb-4">Nos comunicamos en 24 horas hábiles.</h3>
        <p className="text-mute leading-relaxed">
          Un asesor On Premise se pondrá en contacto para conocer su establecimiento.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="eyebrow block mb-2">Nombre de la empresa *</label>
          <input required value={empresa} onChange={e => setEmpresa(e.target.value)} className="input-souv" />
        </div>
        <div>
          <label className="eyebrow block mb-2">Nombre de contacto *</label>
          <input required value={contactName} onChange={e => setContactName(e.target.value)} className="input-souv" />
        </div>
        <div>
          <label className="eyebrow block mb-2">Email *</label>
          <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-souv" />
        </div>
        <div>
          <label className="eyebrow block mb-2">Teléfono *</label>
          <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="input-souv" />
        </div>
        <div>
          <label className="eyebrow block mb-2">Rubro *</label>
          <select required value={rubro} onChange={e => setRubro(e.target.value)} className="input-souv bg-transparent">
            <option value="">Seleccionar</option>
            <option>Restaurante gastronómico</option>
            <option>Bar o cocteleríA</option>
            <option>Hotel boutique o de lujo</option>
            <option>Club privado</option>
            <option>Eventos y catering</option>
            <option>Otro</option>
          </select>
        </div>
        <div>
          <label className="eyebrow block mb-2">Ciudad</label>
          <input value={ciudad} onChange={e => setCiudad(e.target.value)} className="input-souv" placeholder="ej. Buenos Aires" />
        </div>
      </div>
      <div>
        <label className="eyebrow block mb-2">Volumen estimado mensual</label>
        <select value={volumen} onChange={e => setVolumen(e.target.value)} className="input-souv bg-transparent">
          <option value="">Seleccionar</option>
          <option>Menos de 20 botellas</option>
          <option>20 a 50 botellas</option>
          <option>50 a 150 botellas</option>
          <option>Más de 150 botellas</option>
        </select>
      </div>
      <div>
        <label className="eyebrow block mb-2">Mensaje (opcional)</label>
        <textarea value={mensaje} onChange={e => setMensaje(e.target.value)} rows={4} className="input-souv resize-none" />
      </div>
      {status === "error" && (
        <p className="text-sm text-gold">Hubo un problema. Por favor intente nuevamente.</p>
      )}
      <button type="submit" disabled={status === "sending"} className="btn-primary">
        {status === "sending" ? "Enviando…" : "Solicitar cuenta On Premise"}
      </button>
      <p className="text-[11px] uppercase tracking-[0.25em] text-mute">
        Un asesor se pondrá en contacto dentro de 24 horas hábiles.
      </p>
    </form>
  );
}
