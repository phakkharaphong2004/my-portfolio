"use client";

import { useEffect, useRef } from "react";

// แก้ตรงนี้: true = ซ่อนลูกศรเมาส์ของระบบ ใช้แต่จุด + วงแหวน / false = โชว์ลูกศรเดิมด้วย
const HIDE_NATIVE = true;

const INTERACTIVE =
  "a, button, select, summary, label, [role='button'], [data-cursor='hover']";
const TEXT_FIELD = "input, textarea, [contenteditable='true']";

/**
 * เคอร์เซอร์แบบ จุด + วงแหวนคม ๆ
 * - จุดตามเมาส์ทันที / วงแหวนตามหลังนิดหน่อย
 * - ชี้ลิงก์หรือปุ่ม: วงแหวนขยายและมีสีเติมจาง ๆ จุดเล็กลง
 * - กดเมาส์: วงแหวนหดลง
 * - ช่องกรอกข้อความ: ซ่อนเคอร์เซอร์นี้แล้วใช้เคอร์เซอร์ตัวพิมพ์ของระบบ
 * - ไม่แสดงบนจอสัมผัส และเคารพ prefers-reduced-motion
 */
export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const root = document.documentElement;
    if (HIDE_NATIVE) root.classList.add("custom-cursor");

    let x = 0;
    let y = 0; // ตำแหน่งเมาส์จริง
    let rx = 0;
    let ry = 0; // ตำแหน่งวงแหวน
    let scale = 1;
    let targetScale = 1;
    let hovering = false;
    let pressed = false;
    let shown = false;
    let raf = 0;

    const updateScale = () => {
      targetScale = pressed ? 0.75 : hovering ? 1.7 : 1;
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;

      const t = e.target instanceof Element ? e.target : null;
      const onText = !!t?.closest(TEXT_FIELD);
      hovering = !onText && !!t?.closest(INTERACTIVE);
      updateScale();

      if (!shown) {
        shown = true;
        rx = x;
        ry = y;
      }
      const visible = shown && !onText;
      dot.style.opacity = visible ? "1" : "0";
      ring.style.opacity = visible ? "1" : "0";

      dot.style.scale = hovering ? "0.5" : "1";
      ring.style.backgroundColor = hovering
        ? "rgba(139, 92, 246, 0.15)"
        : "transparent";

      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const onDown = () => {
      pressed = true;
      updateScale();
    };
    const onUp = () => {
      pressed = false;
      updateScale();
    };
    const onLeave = () => {
      shown = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const tick = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      scale += (targetScale - scale) * 0.2;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    root.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      root.removeEventListener("mouseleave", onLeave);
      root.classList.remove("custom-cursor");
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none">
      <style>{`
        html.custom-cursor, html.custom-cursor * { cursor: none !important; }
        html.custom-cursor :is(input, textarea, [contenteditable="true"]) { cursor: text !important; }
      `}</style>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 z-[100001] h-1.5 w-1.5 rounded-full bg-[#a78bfa] opacity-0 transition-[opacity,scale] duration-200"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 z-[100001] h-9 w-9 rounded-full border-[1.5px] border-[#a78bfa]/80 opacity-0 transition-[opacity,background-color] duration-200"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}