
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
    <nav
      aria-label="Language selector"
      style={{
        position: "fixed",
        top: "16px",
        right: "16px",
        zIndex: 99999,
        display: "flex",
        gap: "4px",
        padding: "5px",
        borderRadius: "9999px",
        border: "1px solid rgba(255,255,255,0.2)",
        background: "#171923",
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
      }}
    >
      {options.map((option) => (
        <button
          key={option.code}
          type="button"
          onClick={() => setLang(option.code)}
          aria-pressed={lang === option.code}
          style={{
            border: 0,
            borderRadius: "9999px",
            padding: "8px 12px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: 600,
            color: "#ffffff",
            background:
              lang === option.code
                ? "linear-gradient(90deg, #8B5CF6, #3B82F6)"
                : "transparent",
          }}
        >
          {option.label}
        </button>
      ))}
    </nav>
  );
}
