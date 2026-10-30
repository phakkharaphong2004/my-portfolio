"use client";

import { useMemo, useRef, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { ArrowUpRight, FileText, PlayCircle } from "lucide-react";
import { SpotlightCard } from "./ui/spotlight-card";
import ProjectMarquee from "./ProjectMarquee";
import { tagIcons, fallbackTag } from "../data/tagIcons";
import type { Project } from "../data/projects";
import WindowBar from "./WindowBar";
import { T } from "./LangProvider";

// แก้ตรงนี้: "fade" = การ์ดที่ตรงขึ้นก่อน ที่เหลือต่อท้ายตามปกติ, "hide" = โชว์เฉพาะการ์ดที่ตรง
const MODE = "fade" as "fade" | "hide";

function TagChip({
  tag,
  active,
  count,
  onClick,
}: {
  tag: string;
  active: boolean;
  count?: number;
  onClick: () => void;
}) {
  const { icon: Icon, color } = tagIcons[tag] ?? fallbackTag;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs outline-none transition focus-visible:border-[#a78bfa] ${
        active
          ? "border-[#a78bfa] bg-[#8B5CF6]/35 text-white shadow-[0_0_16px_rgba(139,92,246,0.55)]"
          : "border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-[#F8FAFC]/90 hover:border-[#a78bfa] hover:bg-[#8B5CF6]/20"
      }`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" style={{ color }} />
      {tag}
      {count !== undefined && (
        <span className="text-[#F8FAFC]/40">{count}</span>
      )}
    </button>
  );
}

function FilterBar({
  tags,
  active,
  onSelect,
  shown,
  total,
}: {
  tags: { tag: string; count: number }[];
  active: string | null;
  onSelect: (tag: string | null) => void;
  shown: number;
  total: number;
}) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onSelect(null)}
          aria-pressed={active === null}
          className={`rounded-full border px-3 py-1 text-xs font-semibold outline-none transition focus-visible:border-[#a78bfa] ${
            active === null
              ? "border-transparent bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white"
              : "border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-[#F8FAFC]/90 hover:border-[#a78bfa]"
          }`}
        >
          <T v={{ th: "ทั้งหมด", en: "All", zh: "全部" }} />
        </button>
        {tags.map(({ tag, count }) => (
          <TagChip
            key={tag}
            tag={tag}
            count={count}
            active={active === tag}
            onClick={() => onSelect(active === tag ? null : tag)}
          />
        ))}
      </div>
      <p aria-live="polite" className="mt-3 text-xs text-[#F8FAFC]/50">
        <T
          v={{
            th: `แสดง ${shown} จาก ${total} โปรเจกต์`,
            en: `Showing ${shown} of ${total} projects`,
            zh: `显示 ${shown} / ${total} 个项目`,
          }}
        />
      </p>
    </div>
  );
}

function Tags({
  tags,
  active,
  onToggle,
}: {
  tags: string[];
  active: string | null;
  onToggle: (tag: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <TagChip
          key={t}
          tag={t}
          active={active === t}
          onClick={() => onToggle(t)}
        />
      ))}
    </div>
  );
}

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string | null>(null);

  // รวมแท็กทั้งหมด เรียงตามจำนวนโปรเจกต์ที่ใช้
  const allTags = useMemo(() => {
    const map = new Map<string, number>();
    projects.forEach((p) =>
      p.tags.forEach((t) => map.set(t, (map.get(t) ?? 0) + 1))
    );
    return [...map.entries()]
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
  }, [projects]);

  const barRef = useRef<HTMLDivElement>(null);

  const matches = (p: Project) => !active || p.tags.includes(active);
  const shown = projects.filter(matches).length;

  // โปรเจกต์ที่ตรงกับแท็กขึ้นก่อน (เรียงตามลำดับเดิม) ที่เหลือตามหลัง
  const ordered = useMemo(() => {
    if (!active) return projects;
    const hit = projects.filter((p) => p.tags.includes(active));
    const rest = projects.filter((p) => !p.tags.includes(active));
    return MODE === "hide" ? hit : [...hit, ...rest];
  }, [projects, active]);

  const select = (tag: string | null) => {
    setActive(tag);
    // กดแท็กจากการ์ดที่อยู่ไกลลงไป: เลื่อนกลับขึ้นมาดูรายการที่เรียงใหม่
    const el = barRef.current;
    if (tag && el && el.getBoundingClientRect().top < 80) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  };

  const toggleTag = (tag: string) => select(active === tag ? null : tag);

  return (
    <MotionConfig reducedMotion="user">
      <div ref={barRef} className="scroll-mt-28">
        <FilterBar
          tags={allTags}
          active={active}
          onSelect={select}
          shown={shown}
          total={projects.length}
        />
      </div>

      <div className="space-y-8">
        {ordered.map((p, idx) => {
          return (
            <motion.div
              key={p.title}
              layout="position"
              transition={{ type: "spring", stiffness: 260, damping: 32 }}
            >
            <SpotlightCard tilt={2}>
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
                    <T v={p.description} />
                  </p>

                  {p.role && (
                    <p className="mt-2 text-xs text-[#F8FAFC]/50">
                      <T v={{ th: "บทบาท", en: "Role", zh: "角色" }} />:{" "}
                      <span className="text-[#F8FAFC]/80">
                        <T v={p.role} />
                      </span>
                    </p>
                  )}

                  {p.details && (
                    <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[#F8FAFC]/70">
                      <T v={p.details} />
                    </p>
                  )}

                  {p.highlights && (
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[#F8FAFC]/70 marker:text-[#8B5CF6]">
                      {p.highlights.map((h) => (
                        <li key={h.en}>
                          <T v={h} />
                        </li>
                      ))}
                    </ul>
                  )}

                  {p.links && p.links.length > 0 && (
                    <div className="mt-5">
                      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#F8FAFC]/60">
                        <T
                          v={{
                            th: "เอกสารและวิดีโอ",
                            en: "Documents & Videos",
                            zh: "文档与视频",
                          }}
                        />
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
                              <T v={l.label} />
                            </span>
                            <ArrowUpRight className="h-4 w-4 shrink-0 text-[#F8FAFC]/40 transition group-hover:text-[#a78bfa]" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-5">
                    <Tags tags={p.tags} active={active} onToggle={toggleTag} />
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
            </motion.div>
          );
        })}
      </div>
    </MotionConfig>
  );
}