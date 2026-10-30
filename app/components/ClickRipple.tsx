"use client";

import { useEffect, useRef } from "react";

// แก้ตรงนี้: วงแหวนแต่ละวง (หน่วงเวลา / ขนาดสุดท้าย px / สี RGB)
const RINGS = [
  { delay: 0, size: 120, color: "167, 139, 250" },
  { delay: 110, size: 180, color: "139, 92, 246" },
  { delay: 230, size: 250, color: "59, 130, 246" },
];
const DURATION = 900; // ms ต่อ 1 วง

/**
 * คลิก/แตะที่ไหน ก็มีวงแหวนกระจายออกจากจุดนั้นเหมือนน้ำหยด
 * - ใช้ Web Animations API สร้างและลบ element เอง จึงไม่ทำให้ React re-render
 * - เคอร์เซอร์เมาส์ยังเป็นแบบปกติของระบบ
 * - เคารพ prefers-reduced-motion
 */
export default function ClickRipple() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const spawn = (
      x: number,
      y: number,
      size: number,
      style: Partial<CSSStyleDeclaration>,
      keyframes: Keyframe[],
      options: KeyframeAnimationOptions
    ) => {
      const el = document.createElement("span");
      Object.assign(el.style, {
        position: "absolute",
        left: `${x - size / 2}px`,
        top: `${y - size / 2}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        pointerEvents: "none",
        willChange: "transform, opacity",
        ...style,
      });
      box.appendChild(el);
      const anim = el.animate(keyframes, { ...options, fill: "both" });
      anim.onfinish = () => el.remove();
    };

    const onDown = (e: PointerEvent) => {
      if (reduce.matches) return;
      const { clientX: x, clientY: y } = e;

      // เม็ดน้ำตรงจุดที่กระทบ
      spawn(
        x,
        y,
        10,
        { background: "rgba(167, 139, 250, 0.95)" },
        [
          { transform: "scale(1)", opacity: 0.95 },
          { transform: "scale(2.4)", opacity: 0 },
        ],
        { duration: 420, easing: "ease-out" }
      );

      // วงคลื่นกระจายออก
      RINGS.forEach((r) => {
        spawn(
          x,
          y,
          r.size,
          {
            border: `2px solid rgba(${r.color}, 0.9)`,
            boxShadow: `0 0 14px rgba(${r.color}, 0.45)`,
          },
          [
            { transform: "scale(0.05)", opacity: 0.9 },
            { transform: "scale(1)", opacity: 0 },
          ],
          {
            duration: DURATION,
            delay: r.delay,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          }
        );
      });
    };

    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  return (
    <div
      ref={boxRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9997] overflow-hidden"
    />
  );
}