"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE =
  "a, button, [role='button'], input, textarea, select, summary, label";

/**
 * แสงม่วง-น้ำเงินตามเมาส์แบบหน่วง ๆ + วงแหวนเล็กที่ขยายเมื่อชี้ลิงก์/ปุ่ม
 * - ไม่แสดงบนอุปกรณ์สัมผัส และเคารพ prefers-reduced-motion
 * - ใช้ ref + rAF แก้ style ตรง ๆ จึงไม่ทำให้ React re-render
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const glow = glowRef.current;
    const ring = ringRef.current;
    if (!glow || !ring) return;

    let tx = 0;
    let ty = 0; // ตำแหน่งเมาส์จริง
    let gx = 0;
    let gy = 0; // ตำแหน่งแสงใหญ่ (ตามช้า)
    let rx = 0;
    let ry = 0; // ตำแหน่งวงแหวน (ตามเร็วกว่า)
    let scale = 1;
    let targetScale = 1;
    let shown = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!shown) {
        shown = true;
        gx = rx = tx;
        gy = ry = ty;
        glow.style.opacity = "1";
        ring.style.opacity = "1";
      }
      targetScale =
        e.target instanceof Element && e.target.closest(INTERACTIVE) ? 1.9 : 1;
    };

    const onLeave = () => {
      shown = false;
      glow.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const tick = () => {
      gx += (tx - gx) * 0.08;
      gy += (ty - gy) * 0.08;
      rx += (tx - rx) * 0.22;
      ry += (ty - ry) * 0.22;
      scale += (targetScale - scale) * 0.18;

      glow.style.transform = `translate3d(${gx}px, ${gy}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none">
      <div
  ref={glowRef}
  className="fixed left-0 top-0 z-[9997] h-40 w-40 rounded-full opacity-0 transition-opacity duration-300"
  style={{
    background:
      "radial-gradient(circle, rgba(139,92,246,0.28) 0%, rgba(59,130,246,0.12) 45%, transparent 70%)",
    mixBlendMode: "screen",
    willChange: "transform",
  }}
/>
      <div
        ref={ringRef}
        className="fixed left-0 top-0 z-[9997] h-8 w-8 rounded-full border border-[#a78bfa]/70 bg-[#8B5CF6]/10 opacity-0 transition-opacity duration-300"
        style={{
          boxShadow: "0 0 18px rgba(139,92,246,0.45)",
          willChange: "transform",
        }}
      />
    </div>
  );
}