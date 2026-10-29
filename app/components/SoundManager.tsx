"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useTr } from "./LangProvider";

const STORAGE_KEY = "sound";
const BGM_VOLUME = 0.15; // เบา ๆ
const SFX_VOLUME = 0.4;

export default function SoundManager() {
  const [enabled, setEnabled] = useState(true);
  const bgm = useRef<HTMLAudioElement | null>(null);
  const clickSfx = useRef<HTMLAudioElement | null>(null);
  const keySfx = useRef<HTMLAudioElement | null>(null);
  const tr = useTr();

  // จำค่าเปิด/ปิดไว้ในเครื่อง
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "off") setEnabled(false);
    } catch {}
  }, []);

  // สร้างตัวเล่นเสียงครั้งเดียว
  useEffect(() => {
    const music = new Audio("/sounds/bgm.mp3");
    music.loop = true;
    music.volume = BGM_VOLUME;
    bgm.current = music;

    clickSfx.current = new Audio("/sounds/click.mp3");
    keySfx.current = new Audio("/sounds/key.mp3");

    return () => {
      music.pause();
      bgm.current = null;
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      bgm.current?.pause();
      return;
    }

    const startBgm = () => {
      bgm.current?.play().catch(() => {});
    };

    // clone เพื่อให้กดรัว ๆ แล้วเสียงซ้อนกันได้
    const playSfx = (ref: React.RefObject<HTMLAudioElement | null>) => {
      const node = ref.current?.cloneNode() as HTMLAudioElement | undefined;
      if (!node) return;
      node.volume = SFX_VOLUME;
      node.play().catch(() => {});
    };

    const isToggle = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest("[data-falling-toggle]");

    const onPointer = (e: PointerEvent) => {
      if (isToggle(e.target)) return;
      startBgm(); // เบราว์เซอร์อนุญาตเล่นเพลงได้หลังผู้ใช้โต้ตอบครั้งแรก
      playSfx(clickSfx);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || isToggle(e.target)) return;
      startBgm();
      playSfx(keySfx);
    };

    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [enabled]);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    } catch {}
    if (next) bgm.current?.play().catch(() => {}); // การกดปุ่มนับเป็น user gesture
  };

  const label = enabled
    ? tr({ th: "ปิดเสียง", en: "Mute sound", zh: "关闭声音" })
    : tr({ th: "เปิดเสียง", en: "Unmute sound", zh: "开启声音" });

  return (
    <button
      type="button"
      data-falling-toggle
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={label}
      title={label}
      className={`fixed bottom-4 right-[4.25rem] z-[99999] grid h-11 w-11 place-items-center rounded-full border transition hover:scale-110 ${
        enabled
          ? "border-[#8B5CF6]/60 bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]"
          : "border-white/20 bg-[#171923] text-white/50"
      }`}
    >
      {enabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
    </button>
  );
}