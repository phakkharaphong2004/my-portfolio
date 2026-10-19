"use client";

import { useLang, type Lang } from "./LangProvider";

const options: { code: Lang; label: string }[] = [
  { code: "th", label: "ไทย" },
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" },
];

export default function LangSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div className="fixed right-3 top-3 z-[9999] flex gap-1 rounded-full border border-white/10 bg-[#0B0D12]/70 p-1 shadow-lg backdrop-blur-lg md:right-6 md:top-12">
      {options.map((o) => (
        <button
          key={o.code}
          onClick={() => setLang(o.code)}
          aria-pressed={lang === o.code}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            lang === o.code
              ? "bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white"
              : "text-white/70 hover:text-white"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}