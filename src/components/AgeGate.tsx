"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KEY = "souverain.age-confirmed";

export function AgeGate() {
  const [open, setOpen] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    const confirmed = typeof window !== "undefined" && localStorage.getItem(KEY) === "yes";
    if (!confirmed) setOpen(true);
  }, []);

  function confirm() {
    try {
      localStorage.setItem(KEY, "yes");
      document.cookie = `${KEY}=yes; path=/; max-age=${60 * 60 * 24 * 365}`;
    } catch {}
    setOpen(false);
  }

  function deny() {
    setDenied(true);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative mx-6 w-full max-w-md bg-surface hairline p-10 text-center"
          >
            <div className="eyebrow mb-6">Distribuidora Souverain</div>
            <h2 className="font-display text-4xl md:text-5xl text-ink mb-4 leading-tight">
              ¿Es usted mayor de 18 años?
            </h2>
            <p className="text-mute text-sm leading-relaxed mb-10">
              El acceso a este sitio está reservado a personas mayores de edad.
              La venta de alcohol a menores está prohibida en la República Argentina.
            </p>
            {denied ? (
              <div>
                <p className="text-ink text-sm mb-4">
                  Gracias por su honestidad. Este sitio no está disponible para menores de 18 años.
                </p>
                <a href="https://www.google.com" className="btn-ghost w-full">Salir</a>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <button onClick={confirm} className="btn-primary w-full">
                  Sí, soy mayor de 18 años
                </button>
                <button onClick={deny} className="btn-ghost w-full">
                  No
                </button>
              </div>
            )}
            <p className="text-[10px] uppercase tracking-[0.3em] text-mute mt-8">
              Beber con moderación
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
