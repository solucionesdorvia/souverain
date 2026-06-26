"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  poster: string;
  /** Hero: carga inmediata + autoplay. Resto: lazy, reproduce solo en viewport. */
  priority?: boolean;
  /** Zoom cinematográfico muy lento (Ken Burns). */
  kenburns?: boolean;
  className?: string;
};

export function CinematicVideo({ src, poster, priority = false, kenburns = false, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (priority) {
      video.play().catch(() => {});
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [priority]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay={priority}
      muted
      loop
      playsInline
      preload={priority ? "auto" : "none"}
      aria-hidden
      className={cn(
        "absolute inset-0 h-full w-full object-cover object-center",
        kenburns && "motion-safe:animate-kenburns",
        className,
      )}
    />
  );
}
