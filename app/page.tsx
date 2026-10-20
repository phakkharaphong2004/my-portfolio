import Link from "next/link";
import Image from "next/image";
import { T, type L } from "./components/LangProvider";
import type { ComponentType, CSSProperties } from "react";
import WindowBar from "./components/WindowBar";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaPython,
  FaNodeJs,
  FaFigma,
} from "react-icons/fa";
import { SiCanvas, SiCplusplus } from "react-icons/si";
import {
  PenTool,
  MousePointerClick,
  Workflow,
  Users,
  Network,
  Palette,
  Cpu,
  Wifi,
  Download,
  ArrowRight,
} from "lucide-react";
import MatrixRain from "./components/MatrixRain";
import ContactSection from "./components/ContactSection";
import SkillTag from "./components/SkillTag";
import { projects } from "./data/projects";
import { tagIcons, fallbackTag } from "./data/tagIcons";

type SkillIcon = ComponentType<{ className?: string; style?: CSSProperties }>;
type SkillItem = { name: string; icon: SkillIcon; color: string };

// แก้ตรงนี้: ข้อมูลของคุณ
const NAME = "Phakkharaphong Sarang-ngam";
const NAME_TH = "พัคระพงษ์ สารังงาม";
const NAME_ZH = "พัคระพงษ์ สารังงาม"; // ใส่ชื่อภาษาจีนของคุณแทนได้ (ตอนนี้ใช้ชื่อไทยไปก่อน)
const HANDLE = "@phakkharaphong2004";

const INTRO: L = {
  th: "นักศึกษาวิศวกรรมคอมพิวเตอร์ ถนัดการพัฒนาเว็บ แอปมือถือ และระบบหลังบ้าน กำลังมองหาโอกาสฝึกงานและร่วมสร้างผลงานจริง",
  en: "Computer engineering student skilled in web, mobile apps and back-end systems, looking for an internship to build real-world projects.",
  zh: "计算机工程专业学生，擅长网页、移动应用和后端系统开发，正在寻找实习机会，共同打造真实作品。",
};

// แก้ตรงนี้: สกิลแยกเป็นกลุ่ม (แต่ละรายการ = 1 ป้าย พร้อมไอคอน)
const PURPLE = "#a78bfa"; // สีไอคอนทั่วไป

const skillGroups: {
  slug: string;
  title: L;
  rows: { label: L; items: SkillItem[] }[];
}[] = [
  {
    slug: "ux-ui-design",
    title: { th: "UX/UI และการออกแบบ", en: "UX/UI & Design", zh: "UX/UI 与设计" },
    rows: [
      {
        label: { th: "เครื่องมือออกแบบ", en: "Design Tools", zh: "设计工具" },
        items: [
          { name: "Figma", icon: FaFigma, color: "#F24E1E" },
          { name: "Canva", icon: SiCanvas, color: "#00C4CC" },
        ],
      },
      {
        label: { th: "กระบวนการออกแบบ", en: "Design Process", zh: "设计流程" },
        items: [
          { name: "Wireframing", icon: PenTool, color: PURPLE },
          { name: "Prototyping", icon: MousePointerClick, color: PURPLE },
          { name: "User Flow (Basic)", icon: Workflow, color: PURPLE },
          { name: "Usability Principles (Basic)", icon: Users, color: PURPLE },
        ],
      },
      {
        label: { th: "การวิเคราะห์", en: "Analysis", zh: "分析" },
        items: [
          { name: "System Analysis (Basic)", icon: Network, color: PURPLE },
          { name: "UX/UI Design (Basic)", icon: Palette, color: PURPLE },
        ],
      },
    ],
  },
  {
    slug: "technical-skills",
    title: { th: "ทักษะทางเทคนิค", en: "Technical Skills", zh: "技术技能" },
    rows: [
      {
        label: { th: "ฝั่งหน้าเว็บ (Front-end)", en: "Front-end", zh: "前端" },
        items: [
          { name: "HTML", icon: FaHtml5, color: "#E34F26" },
          { name: "CSS", icon: FaCss3Alt, color: "#2D9CDB" },
          { name: "JavaScript (Basic)", icon: FaJs, color: "#F7DF1E" },
        ],
      },
      {
        label: { th: "ฝั่งหลังบ้าน (Back-end)", en: "Back-end", zh: "后端" },
        items: [
          { name: "Python", icon: FaPython, color: "#4B8BBE" },
          { name: "Node.js (Basic)", icon: FaNodeJs, color: "#68A063" },
        ],
      },
      {
        label: { th: "ฮาร์ดแวร์ / IoT", en: "Hardware / IoT", zh: "硬件 / 物联网" },
        items: [
          { name: "ESP32", icon: Cpu, color: PURPLE },
          { name: "MQTT", icon: Wifi, color: PURPLE },
        ],
      },
      {
        label: {
          th: "พื้นฐานการเขียนโปรแกรม",
          en: "Programming Fundamentals",
          zh: "编程基础",
        },
        items: [{ name: "C/C++", icon: SiCplusplus, color: "#659AD2" }],
      },
    ],
  },
];

// โปรเจกต์เด่น 3 ใบ: ใบแรกใน data/projects.ts จะอยู่ตรงกลาง (ใบใหญ่)
const featured = projects.slice(0, 3);
const showcase = [featured[1], featured[0], featured[2]].filter(
  (p): p is (typeof projects)[number] => Boolean(p)
);
// ตำแหน่ง ซ้าย / กลาง / ขวา
const cardPos = ["float-slow md:-rotate-2", "float", "float-slow md:rotate-2"];

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-[#0B0D12] text-[#F8FAFC]">
      {/* พื้นหลังเรืองแสง */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[#8B5CF6]/25 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-[420px] h-[420px] w-[420px] rounded-full bg-[#3B82F6]/20 blur-[120px]" />
      <div className="dot-grid pointer-events-none absolute inset-0 h-[900px]" />

      {/* Hero */}
      <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pt-32 md:pt-40 lg:grid-cols-[1.25fr_0.75fr]">
        {/* ข้อความ (ชิดซ้าย) */}
        <div className="text-center lg:text-left">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-[#F8FAFC]/80">
            <span className="h-2 w-2 rounded-full bg-[#a78bfa]" />
            <T
              v={{
                th: "เปิดรับโอกาสฝึกงาน",
                en: "Open to internships",
                zh: "寻找实习机会",
              }}
            />
          </span>

          <h1 className="mt-8 font-extrabold uppercase leading-[1.05] tracking-tight">
            <span className="block text-xs font-semibold tracking-[0.4em] text-[#F8FAFC]/50 sm:text-sm">
              Computer Engineering
            </span>
            <span className="mt-3 block text-4xl sm:text-6xl xl:text-7xl">
              UX/UI Design
            </span>
            <span className="block text-4xl sm:text-6xl xl:text-7xl">
              <span className="grad-text">Full-Stack</span>
              <span className="ml-2 inline-block h-[0.8em] w-[0.1em] translate-y-[0.08em] animate-pulse bg-[#a78bfa]" />
            </span>
          </h1>

          <p className="mt-6 text-lg text-[#F8FAFC]/60">
            <T
              v={{ th: "สวัสดี ฉันชื่อ", en: "Hi, I'm", zh: "你好，我是" }}
            />
            <span className="block font-semibold text-[#F8FAFC]">{NAME}</span>
            <span className="block font-semibold text-[#F8FAFC]">
              <T v={{ th: NAME_TH, en: NAME_TH, zh: NAME_ZH }} />
            </span>
          </p>
          <p className="mx-auto mt-3 max-w-xl text-[#F8FAFC]/60 lg:mx-0">
            <T v={INTRO} />
          </p>

          <div className="mt-8 flex flex-col flex-wrap items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/projects"
              className="rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] px-8 py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.45)] transition hover:scale-105"
            >
              <T v={{ th: "ดูผลงาน", en: "View projects", zh: "查看作品" }} />
            </Link>
            <a
              href="#contact"
              className="glass rounded-full px-8 py-3.5 font-semibold transition hover:scale-105 hover:border-[#3B82F6]"
            >
              <T
                v={{
                  th: "ติดต่อเพื่อร่วมงาน",
                  en: "Get in touch",
                  zh: "联系合作",
                }}
              />
            </a>
            {/* ปุ่มดาวน์โหลด CV (ไฟล์อยู่ที่ public/CV-Phakkharaphong-fixed.pdf) */}
            <a
              href="/CV-Phakkharaphong-fixed.pdf"
              download="CV-Phakkharaphong-fixed.pdf"
              className="group inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/60 bg-[#8B5CF6]/10 px-8 py-3.5 font-semibold shadow-[0_0_24px_rgba(139,92,246,0.25)] transition hover:scale-105 hover:bg-[#8B5CF6]/20"
            >
              <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              <T
                v={{ th: "ดาวน์โหลด CV", en: "Download CV", zh: "下载简历" }}
              />
            </a>
          </div>
        </div>

        {/* รูปโปรไฟล์ (ขวา) */}
        <div className="relative mx-auto w-full max-w-[19rem] lg:mx-0 lg:w-[90%] lg:max-w-none lg:justify-self-end">
          <div className="absolute -inset-8 rounded-full bg-[#8B5CF6]/20 blur-3xl" />
          <div className="photo-frame float-slow">
            <div className="photo-inner">
              <MatrixRain />
              <Image
                src="/profile.webp"
                alt={`Profile photo of ${NAME}`}
                width={900}
                height={1260}
                priority
                className="relative z-10 h-auto w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 z-20 h-1/3 bg-gradient-to-t from-[#0B0D12]/85 to-transparent" />
              <div className="glass absolute inset-x-4 bottom-4 z-20 rounded-xl px-4 py-3">
                <p className="font-semibold">{NAME}</p>
                <p className="text-xs text-[#F8FAFC]/60">
                  Full-Stack Developer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ผลงานเด่น: การ์ดกระจก 3 ใบ */}
      <section className="relative mx-auto mt-24 max-w-6xl px-6">
        <h2 className="text-center text-3xl font-extrabold sm:text-4xl">
          <span className="grad-text">
            <T
              v={{
                th: "ผลงานเด่น",
                en: "Featured Projects",
                zh: "精选作品",
              }}
            />
          </span>
        </h2>
        <p className="mb-10 mt-2 text-center text-[#F8FAFC]/60">
          <T
            v={{
              th: "ตัวอย่างโปรเจกต์ที่ได้ลงมือทำ",
              en: "A few projects I've built",
              zh: "部分亲手完成的项目",
            }}
          />
        </p>

        <div className="grid items-center gap-6 md:grid-cols-[1fr_1.2fr_1fr]">
          {showcase.map((p, i) => {
            const cover = p.gallery?.[0];
            return (
              <Link
                key={p.title}
                href="/projects"
                className={`glass group block overflow-hidden rounded-2xl transition hover:border-[#8B5CF6]/60 ${cardPos[i]}`}
              >
                <WindowBar
                  label={`${p.title.toLowerCase().replace(/\s+/g, "-")}.dev`}
                />

                {cover && (
                  <div className="relative aspect-video w-full overflow-hidden bg-[#12141d]">
                    <Image
                      src={cover}
                      alt={p.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-extrabold">
                      <span className="grad-text">{p.title}</span>
                    </h3>
                    <span className="shrink-0 text-xs text-[#F8FAFC]/50">
                      {p.year}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-[#a78bfa]">
                    {p.category}
                  </p>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#F8FAFC]/70">
                    <T v={p.description} />
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 3).map((t) => {
                      const { icon: Icon, color } = tagIcons[t] ?? fallbackTag;
                      return (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-2.5 py-1 text-[11px] text-[#F8FAFC]/90"
                        >
                          <Icon
                            className="h-3 w-3 shrink-0"
                            style={{ color }}
                          />
                          {t}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ปุ่มดูเพิ่มเติม -> หน้าโปรเจกต์ */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] px-8 py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.45)] transition hover:scale-105"
          >
            <T v={{ th: "ดูเพิ่มเติม", en: "View more", zh: "查看更多" }} />
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ทักษะ */}
      <section className="relative mx-auto mt-24 max-w-6xl px-6">
        <h2 className="text-center text-3xl font-extrabold sm:text-4xl">
          <span className="grad-text">
            <T v={{ th: "ทักษะของฉัน", en: "My Skills", zh: "我的技能" }} />
          </span>
        </h2>
        <p className="mb-10 mt-2 text-center text-[#F8FAFC]/75">
          <T
            v={{
              th: "เครื่องมือและความรู้ที่ใช้ในการออกแบบและพัฒนา",
              en: "Tools and knowledge I use for design and development",
              zh: "用于设计与开发的工具和知识",
            }}
          />
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((g, idx) => (
            <div
              key={g.slug}
              className={`glass overflow-hidden rounded-2xl ${
                idx % 2 === 0 ? "float-slow" : "float"
              }`}
            >
              <WindowBar label={`${g.slug}.dev`} />
              <div className="p-6">
                <h3 className="mb-5 text-lg font-bold">
                  <span className="grad-text">
                    <T v={g.title} />
                  </span>
                </h3>
                <div className="space-y-5">
                  {g.rows.map((r) => (
                    <div key={r.label.en}>
                      <p className="mb-2 text-xs uppercase tracking-widest text-[#F8FAFC]/60">
                        <T v={r.label} />
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {r.items.map((s) => {
                          const Icon = s.icon;
                          return (
                            <SkillTag key={s.name}>
                              <Icon
                                className="skill-icon h-4 w-4 shrink-0 transition-transform duration-300 group-hover/tag:scale-125"
                                style={{ color: s.color }}
                              />
                              {s.name}
                            </SkillTag>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ติดต่อ */}
      <ContactSection name={NAME} handle={HANDLE} />
    </div>
  );
}