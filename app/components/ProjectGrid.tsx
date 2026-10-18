"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X, FileText, PlayCircle } from "lucide-react";
import { SpotlightCard } from "./ui/spotlight-card";
import { tagIcons, fallbackTag } from "../data/tagIcons";
import type { Project } from "../data/projects";

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => {
        const { icon: Icon, color } = tagIcons[t] ?? fallbackTag;
        return (
          <span
            key={t}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-3 py-1 text-xs text-[#F8FAFC]/90"
          >
            <Icon className="h-3.5 w-3.5 shrink-0" style={{ color }} />
            {t}
          </span>
        );
      })}
    </div>
  );
}

function Cover({ p, sizes }: { p: Project; sizes: string }) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-[#202530] bg-[#12141d]">
      {p.image ? (
        <Image src={p.image} alt={p.title} fill sizes={sizes} className="object-cover" />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#8B5CF6]/10 to-[#3B82F6]/5">
          <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-[#8B5CF6]/25 border-t-[#a78bfa]" />
          <span className="text-sm text-[#F8FAFC]/60">รออัปเดตภาพ</span>
        </div>
      )}
    </div>
  );
}

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <SpotlightCard key={p.title} className="h-full">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setActive(p)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(p);
                }
              }}
              className="group flex h-full cursor-pointer flex-col outline-none"
            >
              <Cover p={p} sizes="(min-width: 640px) 50vw, 100vw" />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-xl font-bold">{p.title}</h2>
                  <span className="shrink-0 text-sm text-[#F8FAFC]/50">{p.year}</span>
                </div>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#a78bfa]">
                  {p.category}
                </p>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#F8FAFC]/70">
                  {p.description}
                </p>
                <div className="mt-4">
                  <Tags tags={p.tags} />
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#a78bfa] transition group-hover:gap-2">
                  ดูรายละเอียด <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#8B5CF6]/40 bg-[#12141d] shadow-[0_0_50px_rgba(139,92,246,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              aria-label="ปิด"
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white transition hover:bg-[#8B5CF6]"
            >
              <X className="h-5 w-5" />
            </button>

            <Cover p={active} sizes="672px" />

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-2xl font-extrabold">
                  <span className="grad-text">{active.title}</span>
                </h2>
                <span className="shrink-0 text-sm text-[#F8FAFC]/50">{active.year}</span>
              </div>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#a78bfa]">
                {active.category}
              </p>

              {active.role && (
                <p className="mt-4 text-sm text-[#F8FAFC]/50">
                  บทบาท: <span className="text-[#F8FAFC]/85">{active.role}</span>
                </p>
              )}

              <p className="mt-4 leading-relaxed text-[#F8FAFC]/75">{active.description}</p>

              {active.details && (
                <p className="mt-4 whitespace-pre-line leading-relaxed text-[#F8FAFC]/75">
                  {active.details}
                </p>
              )}

              {active.highlights && (
                <>
                  <h3 className="mt-6 text-sm font-bold uppercase tracking-widest text-[#F8FAFC]/60">
                    สิ่งที่ทำ
                  </h3>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#F8FAFC]/75 marker:text-[#8B5CF6]">
                    {active.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </>
              )}

              {active.gallery && active.gallery.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {active.gallery.map((g) => (
                    <div
                      key={g}
                      className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[#202530]"
                    >
                      <Image src={g} alt={active.title} fill sizes="320px" className="object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {active.links && active.links.length > 0 && (
                <>
                  <h3 className="mt-6 text-sm font-bold uppercase tracking-widest text-[#F8FAFC]/60">
                    เอกสารและวิดีโอ
                  </h3>
                  <div className="mt-3 space-y-2">
                    {active.links.map((l) => (
                      <a
                        key={l.url}
                        href={l.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-3 rounded-xl border border-[#202530] bg-[#0B0D12]/60 px-4 py-3 text-sm transition hover:border-[#8B5CF6]/60 hover:bg-[#8B5CF6]/10"
                      >
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] text-white">
                          {l.type === "video" ? (
                            <PlayCircle className="h-5 w-5" />
                          ) : (
                            <FileText className="h-5 w-5" />
                          )}
                        </span>
                        <span className="min-w-0 flex-1 font-medium">{l.label}</span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-[#F8FAFC]/40 transition group-hover:text-[#a78bfa]" />
                      </a>
                    ))}
                  </div>
                </>
              )}

              <div className="mt-6">
                <Tags tags={active.tags} />
              </div>

              {(active.github || active.demo) && (
                <div className="mt-6 flex gap-3">
                  {active.github && (
                    <a
                      href={active.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-[#8B5CF6]/60 bg-[#8B5CF6]/10 px-5 py-2 text-sm font-semibold transition hover:bg-[#8B5CF6]/20"
                    >
                      GitHub <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                  {active.demo && (
                    <a
                      href={active.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] px-5 py-2 text-sm font-semibold text-white transition hover:scale-105"
                    >
                      Demo <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}