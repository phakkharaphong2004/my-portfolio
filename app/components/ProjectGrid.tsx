import { ArrowUpRight, FileText, PlayCircle } from "lucide-react";
import { SpotlightCard } from "./ui/spotlight-card";
import ProjectMarquee from "./ProjectMarquee";
import { tagIcons, fallbackTag } from "../data/tagIcons";
import type { Project } from "../data/projects";
import WindowBar from "./WindowBar";

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

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-8">
      {projects.map((p, idx) => (
        <SpotlightCard key={p.title}>
          <WindowBar
            label={`${p.title.toLowerCase().replace(/\s+/g, "-")}.dev`}
          />
          <div
            className={`flex flex-col md:flex-row ${
              idx % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* รูปเลื่อน */}
            <div className="md:w-1/2">
              <ProjectMarquee
                images={p.gallery ?? []}
                alt={p.title}
                reverse={idx % 2 === 1}
              />
            </div>

            {/* ข้อมูล */}
            <div className="flex flex-col p-6 md:w-1/2 md:p-8">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-2xl font-extrabold">
                  <span className="grad-text">{p.title}</span>
                </h2>
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