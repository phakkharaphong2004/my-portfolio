"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType, CSSProperties } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaPython,
  FaNodeJs,
  FaReact,
  FaPhp,
  FaJava,
} from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiCplusplus } from "react-icons/si";
import { Sparkles } from "lucide-react";
import { useTr } from "./LangProvider";

type IconType = ComponentType<{ className?: string; style?: CSSProperties }>;

// แก้ตรงนี้: เพิ่ม/ลดไอคอนที่อยากให้หล่นได้
const ICONS: { icon: IconType; color: string }[] = [
  { icon: FaHtml5, color: "#E34F26" },
  { icon: FaCss3Alt, color: "#2D9CDB" },
  { icon: FaJs, color: "#F7DF1E" },
  { icon: SiTypescript, color: "#3178C6" },
  { icon: FaReact, color: "#61DAFB" },
  { icon: FaNodeJs, color: "#68A063" },
  { icon: FaPython, color: "#4B8BBE" },
  { icon: FaPhp, color: "#8892BF" },
  { icon: FaJava, color: "#ED8B00" },
  { icon: SiCplusplus, color: "#659AD2" },
  { icon: SiTailwindcss, color: "#38BDF8" },
];

const STORAGE_KEY = "falling-icons";

type Drop = {
  id: number;
  x: number; // px
  size: number; // px
  duration: number; // s
  spin: number; // deg ที่หมุนระหว่างหล่น
  icon: IconType;
  color: string;
};

export default function FallingIcons() {
  const [drops, setDrops] = useState<Drop[]>([]);
  const [enabled, setEnabled] = useState(true);
  const idRef = useRef(0);
  const tr = useTr();

  // จำค่าเปิด/ปิดไว้ในเครื่อง
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "off") setEnabled(false);
    } catch {}
  }, []);

  const toggle = () => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
      } catch {}
      if (!next) setDrops([]);
      return next;
    });
  };

  useEffect(() => {
    if (!enabled) return;

    const spawn = (x: number) => {
      const pick = ICONS[Math.floor(Math.random() * ICONS.length)];
      const size = 28 + Math.random() * 28;
      const drop: Drop = {
        id: idRef.current++,
        x: Math.min(Math.max(x, size / 2), window.innerWidth - size / 2),
        size,
        duration: 1.6 + Math.random() * 1.4,
        spin: (Math.random() - 0.5) * 720,
        icon: pick.icon,
        color: pick.color,
      };
      setDrops((d) => [...d, drop]);
    };

    const isToggle = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest("[data-falling-toggle]");

    // คลิก/แตะ: หล่นจากตำแหน่งที่กด (ไม่นับตอนกดปุ่มเปิด/ปิด)
    const onPointer = (e: PointerEvent) => {
      if (isToggle(e.target)) return;
      spawn(e.clientX);
    };
    // กดแป้นพิมพ์: หล่นจากตำแหน่งสุ่มบนจอ (ไม่นับตอนกดค้าง)
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || isToggle(e.target)) return;
      spawn(Math.random() * window.innerWidth);
    };

    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [enabled]);

  const remove = (id: number) =>
    setDrops((d) => d.filter((item) => item.id !== id));

  const label = enabled
    ? tr({
        th: "ปิดไอคอนหล่น",
        en: "Turn off falling icons",
        zh: "关闭掉落图标",
      })
    : tr({
        th: "เปิดไอคอนหล่น",
        en: "Turn on falling icons",
        zh: "开启掉落图标",
      });

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden"
      >
        <style>{`
          @keyframes icon-fall {
            0%   { transform: translate(-50%, -80px) rotate(0deg); opacity: 0; }
            8%   { opacity: 1; }
            100% { transform: translate(-50%, calc(100vh + 80px)) rotate(var(--spin)); opacity: 1; }
          }
        `}</style>
        {drops.map((d) => {
          const Icon = d.icon;
          return (
            <span
              key={d.id}
              onAnimationEnd={() => remove(d.id)}
              style={
                {
                  position: "absolute",
                  top: 0,
                  left: d.x,
                  width: d.size,
                  height: d.size,
                  "--spin": `${d.spin}deg`,
                  animation: `icon-fall ${d.duration}s cubic-bezier(0.5, 0, 0.9, 0.6) forwards`,
                  filter: `drop-shadow(0 0 8px ${d.color}88)`,
                } as CSSProperties
              }
            >
              <Icon className="h-full w-full" style={{ color: d.color }} />
            </span>
          );
        })}
      </div>

      <button
        type="button"
        data-falling-toggle
        onClick={toggle}
        aria-pressed={enabled}
        aria-label={label}
        title={label}
        className={`fixed bottom-4 right-4 z-[99999] grid h-11 w-11 place-items-center rounded-full border transition hover:scale-110 ${
          enabled
            ? "border-[#8B5CF6]/60 bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]"
            : "border-white/20 bg-[#171923] text-white/50"
        }`}
      >
        <Sparkles className="h-5 w-5" />
        {!enabled && (
          <span className="pointer-events-none absolute h-0.5 w-7 rotate-45 rounded bg-white/60" />
        )}
      </button>
    </>
  );
}