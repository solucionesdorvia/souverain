"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { CinematicVideo } from "@/components/CinematicVideo";

type Props = {
  videoSrc: string;
  posterSrc: string;
  children: ReactNode;
};

/**
 * Hero con coreografía de scroll: al descender, el video se acerca y se
 * funde a negro mientras el contenido se desplaza a otra velocidad.
 */
export function HeroCinematic({ videoSrc, posterSrc, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative -mt-20 h-screen min-h-[760px] flex items-end overflow-hidden"
    >
      <motion.div
        style={reduced ? undefined : { scale: videoScale, opacity: videoOpacity }}
        className="absolute inset-0"
      >
        <CinematicVideo src={videoSrc} poster={posterSrc} priority kenburns />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss/70 via-abyss/30 to-abyss" />
      </motion.div>
      <motion.div
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative w-full"
      >
        {children}
      </motion.div>
      <div className="absolute bottom-10 right-10 hidden md:flex flex-col items-center gap-3" aria-hidden>
        <span className="label-souv rotate-90 origin-center translate-y-[-14px]">Descender</span>
        <span className="block w-px h-16 bg-gold/50 origin-top animate-line-grow" />
      </div>
    </section>
  );
}
