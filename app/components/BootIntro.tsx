"use client";

import { useCallback, useEffect, useState } from "react";
import WindowBar from "./WindowBar";
import { useTr } from "./LangProvider";

const SEEN_KEY = "boot-seen";
const STEP = 380; // ms ต่อ 1 บรรทัด
const FADE = 500; // ms ตอนเฟดออก

// แก้ตรงนี้: ข้อความที่ขึ้นใน terminal
const LINES: { text: string; ok?: boolean }[] = [
  { text: "booting portfolio.sys", ok: true },
  { text: "loading design system", ok: true },
  { text: "connecting to sensors", ok: true },
  { text: "compiling ideas", ok: true },
  { text: "welcome, visitor" },
];

/**
 * หน้า intro แบบ terminal 2 วินาทีแรก แล้วเฟดเข้าเว็บ
 * - แสดงครั้งเดียวต่อ session (รีเฟรชแล้วไม่ขึ้นซ้ำ)
 * - ข้ามได้ด้วยปุ่ม Skip หรือกด Esc
 * - ถ้าผู้ใช้เปิด prefers-reduced-motion จะไม่แสดงเลย
 */
export default function BootIntro() {
  const [phase, setPhase] = useState<"show" | "fade" | "gone">("show");
  const [count, setCount] = useState(0);
  const tr = useTr();

  const finish = useCallback(() => {
    setPhase((p) => (p === "show" ? "fade" : p));
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
  }, []);

  // ถ้าเคยดูแล้ว หรือผู้ใช้ลดแอนิเมชัน → ข้ามทันที
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) setPhase("gone");
  }, []);

  // พิมพ์ทีละบรรทัด แล้วจบเองหลังบรรทัดสุดท้าย
  useEffect(() => {
    if (phase !== "show") return;
    const id = setTimeout(
      () => (count < LINES.length ? setCount((c) => c + 1) : finish()),
      count < LINES.length ? STEP : 600
    );
    return () => clearTimeout(id);
  }, [phase, count, finish]);

  // เฟดเสร็จแล้วเอาออกจาก DOM
  useEffect(() => {
    if (phase !== "fade") return;
    const id = setTimeout(() => setPhase("gone"), FADE);
    return () => clearTimeout(id);
  }, [phase]);

  // Esc = ข้าม
  useEffect(() => {
    if (phase !== "show") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && finish();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, finish]);

  // ล็อกการเลื่อนหน้าระหว่างที่ intro ยังอยู่
  useEffect(() => {
    if (phase === "gone") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[100000] grid place-items-center bg-[#0B0D12] px-6 transition-opacity ease-out"
      style={{
        opacity: phase === "fade" ? 0 : 1,
        transitionDuration: `${FADE}ms`,
        pointerEvents: phase === "fade" ? "none" : "auto",
      }}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-[#8B5CF6]/15 blur-[110px]" />

      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#202530] bg-[#12141d]/80 shadow-[0_0_40px_rgba(139,92,246,0.2)]">
        <WindowBar label="portfolio.sh" />
        <div className="min-h-[190px] space-y-1.5 p-5 font-mono text-sm leading-relaxed">
          {LINES.slice(0, count).map((l, i) => (
            <p key={l.text} className="text-[#F8FAFC]/80">
              <span className="text-[#a78bfa]">&gt;</span> {l.text}
              {l.ok && (
                <span className="ml-2 text-[#22c55e]">
                  {i < count - 1 || count === LINES.length ? "[ok]" : "..."}
                </span>
              )}
            </p>
          ))}
          {count < LINES.length && (
            <span className="inline-block h-4 w-2 animate-pulse bg-[#a78bfa]" />
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={finish}
        className="absolute bottom-6 right-6 rounded-full border border-white/20 bg-[#171923] px-4 py-2 text-xs font-semibold text-white/70 outline-none transition hover:text-white focus-visible:border-[#a78bfa]"
      >
        {tr({ th: "ข้าม", en: "Skip", zh: "跳过" })}
      </button>
    </div>
  );
}