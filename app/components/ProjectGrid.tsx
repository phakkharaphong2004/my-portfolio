import Image from "next/image";
import { ArrowUpRight, FileText, PlayCircle } from "lucide-react";
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

function Cover({ p }: { p: Project }) {
  return (
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
          <span className="text-sm text-[#F8FAFC]/60">รออัปเดตภาพ</span>
        </div>
      )}
    </div>
  );
}

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map((p) => (
        <SpotlightCard key={p.title} className="h-full">
          <div className="flex h-full flex-col">
            <Cover p={p} />

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
                  บทบาท: <span className="text-[#F8FAFC]/80">{p.role}</span>
                </p>
              )}

              {p.details && (
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[#F8FAFC]/70">
                  {p.details}
                </p>
              )}

              {p.highlights && (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[#F8FAFC]/70 marker:text-[#8B5CF6]">
                  {p.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}

              {p.gallery && p.gallery.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {p.gallery.map((g) => (
                    <div
                      key={g}
                      className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[#202530]"
                    >
                      <Image
                        src={g}
                        alt={p.title}
                        fill
                        sizes="320px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {p.links && p.links.length > 0 && (
                <div className="mt-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#F8FAFC]/60">
                    เอกสารและวิดีโอ
                  </p>
                  <div className="space-y-2">
                    {p.links.map((l) => (
                      <a
                        key={l.url}
                        href={l.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-3 rounded-xl border border-[#202530] bg-[#0B0D12]/60 px-3 py-2.5 text-sm transition hover:border-[#8B5CF6]/60 hover:bg-[#8B5CF6]/10"
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] text-white">
                          {l.type === "video" ? (
                            <PlayCircle className="h-4 w-4" />
                          ) : (
                            <FileText className="h-4 w-4" />
                          )}
                        </span>
                        <span className="min-w-0 flex-1 font-medium">
                          {l.label}
                        </span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-[#F8FAFC]/40 transition group-hover:text-[#a78bfa]" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-5">
                <Tags tags={p.tags} />
              </div>

              {(p.github || p.demo) && (
                <div className="mt-5 flex gap-3">
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
  );
}