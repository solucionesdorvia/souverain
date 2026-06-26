"use client";

import { useEffect, useState } from "react";

type TimeLeft = { d: number; h: number; m: number; s: number };

export function Countdown({ target }: { target: string }) {
  const [time, setTime] = useState<TimeLeft>({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    function calc() {
      const diff = new Date(target).getTime() - Date.now();
      if (diff <= 0) { setTime({ d: 0, h: 0, m: 0, s: 0 }); return; }
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    }
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [target]);

  const units = [
    { label: "DÍA", value: time.d },
    { label: "HRS", value: time.h },
    { label: "MIN", value: time.m },
    { label: "SEG", value: time.s },
  ];

  return (
    <div className="flex items-center gap-5 md:gap-8">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-5 md:gap-8">
          <div className="text-center">
            <div className="font-mono text-4xl md:text-6xl text-ink tabular-nums leading-none">
              {String(u.value).padStart(2, "0")}
            </div>
            <div className="text-[9px] tracking-[0.4em] text-mute mt-2">{u.label}</div>
          </div>
          {i < 3 && <span className="font-mono text-2xl text-mute/30 -mt-3">:</span>}
        </div>
      ))}
    </div>
  );
}
