"use client";

import { useState } from "react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });
      if (!res.ok) throw new Error("error");
      setStatus("sent");
      setName(""); setEmail(""); setPhone(""); setMessage("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="hairline p-12 text-center h-fit">
        <div className="eyebrow mb-4 text-gold">Mensaje recibido</div>
        <h3 className="font-display text-3xl mb-4">Gracias por escribirnos.</h3>
        <p className="text-mute leading-relaxed">
          Le respondemos dentro de las próximas 24 horas hábiles.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      <div>
        <label className="eyebrow block mb-2">Nombre *</label>
        <input required value={name} onChange={(e) => setName(e.target.value)} className="input-souv" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="eyebrow block mb-2">Email *</label>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-souv" />
        </div>
        <div>
          <label className="eyebrow block mb-2">Teléfono</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-souv" />
        </div>
      </div>
      <div>
        <label className="eyebrow block mb-2">Mensaje *</label>
        <textarea required rows={6} value={message} onChange={(e) => setMessage(e.target.value)} className="input-souv resize-none" />
      </div>
      {status === "error" && (
        <p className="text-sm text-gold">Hubo un problema al enviar. Intente nuevamente.</p>
      )}
      <button type="submit" disabled={status === "sending"} className="btn-primary w-full md:w-auto">
        {status === "sending" ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}
