import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";
import { SpotlightCard } from "../components/ui/spotlight-card";
import { tagIcons, fallbackTag } from "../data/tagIcons";

export default function Projects() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0D12] text-[#F8FAFC]">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[#8B5CF6]/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-[520px] h-[420px] w-[420px] rounded-full bg-[#3B82F6]/15 blur-[120px]" />
      <div className="dot-grid pointer-events-none absolute inset-0 h-[900px]" />

      <main className="relative mx-auto max-w-5xl px-8 pb-24 pt-36">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#a78bfa]">
          Portfolio
        </p>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
          <span className="grad-text">ผลงานของฉัน</span>
        </h1>
        <p className="mb-10 mt-2 text-[#F8FAFC]/60">
          โปรเจกต์ที่ได้ลงมือทำ ทั้งเว็บ แอป และระบบ IoT
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((p) => (
            <SpotlightCard key={p.title} className="h-full">
              <div className="flex h-full flex-col">
                {/* รูปหน้าปก */}
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-[#202530] bg-[#12141d]">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#8B5CF6]/10 to-[#3B82F6]/5">
                      <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-[#8B5CF6]/25 border-t-[#a78bfa]" />
                      <span className="text-sm text-[#F8FAFC]/60">
                        รออัปเดตภาพ
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-xl font-bold">{p.title}</h2>
                    <span className="shrink-0 text-sm text-[#F8FAFC]/50">
                      {p.year}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#a78bfa]">
                    {p.category}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#F8FAFC]/70">
                    {p.description}
                  </p>
                  {p.role && (
                    <p className="mt-2 text-xs text-[#F8FAFC]/50">
                      บทบาท:{" "}
                      <span className="text-[#F8FAFC]/80">{p.role}</span>
                    </p>
                  )}
                  {p.highlights && (
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[#F8FAFC]/70 marker:text-[#8B5CF6]">
                      {p.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => {
                      const { icon: Icon, color } = tagIcons[t] ?? fallbackTag;
                      return (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-3 py-1 text-xs text-[#F8FAFC]/90"
                        >
                          <Icon
                            className="h-3.5 w-3.5 shrink-0"
                            style={{ color }}
                          />
                          {t}
                        </span>
                      );
                    })}
                  </div>

                  {(p.github || p.demo) && (
                    <div className="mt-5 flex gap-3 pt-1">
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-full border border-[#8B5CF6]/60 bg-[#8B5CF6]/10 px-4 py-1.5 text-sm font-semibold transition hover:bg-[#8B5CF6]/20"
                        >
                          GitHub <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                      {p.demo && (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] px-4 py-1.5 text-sm font-semibold text-white transition hover:scale-105"
                        >
                          Demo <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </main>
    </div>
  );
}