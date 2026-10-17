"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  /** ขนาดตัวอักษร (px) */
  fontSize?: number;
  /** ความเร็ว: จำนวนเฟรมต่อวินาที */
  fps?: number;
};

export default function MatrixRain({
  className = "",
  fontSize = 14,
  fps = 24,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let drops: number[] = [];
    let speeds: number[] = [];
    let raf = 0;
    let last = 0;
    let visible = true;
    const interval = 1000 / fps;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${fontSize}px ui-monospace, "Geist Mono", monospace`;
      ctx.textAlign = "center";
      const cols = Math.ceil(w / fontSize);
      drops = Array.from({ length: cols }, () => -Math.random() * (h / fontSize));
      speeds = Array.from({ length: cols }, () => 0.5 + Math.random() * 0.9);
    };

    const draw = () => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.09)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";

      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize + fontSize / 2;
        const y = drops[i] * fontSize;
        const ch = Math.random() > 0.5 ? "1" : "0";

        ctx.fillStyle = "rgba(220,235,255,0.95)";
        ctx.fillText(ch, x, y);
        ctx.fillStyle =
          i % 4 === 0 ? "rgba(167,139,250,0.75)" : "rgba(59,130,246,0.7)";
        ctx.fillText(Math.random() > 0.5 ? "1" : "0", x, y - fontSize);

        drops[i] += speeds[i];
        if (y > h && Math.random() > 0.975) {
          drops[i] = -Math.random() * 10;
          speeds[i] = 0.5 + Math.random() * 0.9;
        }
      }
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || t - last < interval) return;
      last = t;
      draw();
    };

    setup();
    const ro = new ResizeObserver(setup);
    ro.observe(canvas);
    const io = new IntersectionObserver(
      ([e]) => (visible = e.isIntersecting),
      { threshold: 0 }
    );
    io.observe(canvas);

    if (reduce) {
      for (let i = 0; i < 40; i++) {
        draw();
        drops = drops.map((d, k) => d + speeds[k] * 2);
      }
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [fontSize, fps]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}