"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Lang = "th" | "en" | "zh";
export type L = { th: string; en: string; zh: string };

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "th",
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("th"); // ภาษาเริ่มต้น

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "th" || saved === "en" || saved === "zh") setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  };

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);

/** ใช้ในที่ที่ต้องการข้อความเป็น string เช่น alt, aria-label */
export function useTr() {
  const { lang } = useLang();
  return (v: L) => v[lang];
}

/** ใช้ใน JSX: <T v={{ th: "...", en: "...", zh: "..." }} /> */
export function T({ v }: { v: L }) {
  const { lang } = useLang();
  return <>{v[lang]}</>;
}