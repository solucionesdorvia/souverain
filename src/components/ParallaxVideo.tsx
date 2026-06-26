"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { CinematicVideo } from "@/components/CinematicVideo";

type Props = {
  src: string;
  poster: string;
  kenburns?: boolean;
  /** Recorrido vertical total del video en px durante el scroll de la sección. */
  travel?: number;
};

/**
 * Video de fondo con parallax: el video es más alto que la sección y se
 * desplaza más lento que el scroll, creando profundidad cinematográfica.
 */
export function ParallaxVideo({ src, poster, kenburns = false, travel = 120 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-travel / 2, travel / 2]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        style={reduced ? undefined : { y }}
        className="absolute -top-[80px] -bottom-[80px] left-0 right-0"
      >
        <CinematicVideo src={src} poster={poster} kenburns={kenburns} />
      </motion.div>
    </div>
  );
}
