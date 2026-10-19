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
} from "lucide-react";
import MatrixRain from "./components/MatrixRain";
import ContactSection from "./components/ContactSection";
import SkillTag from "./components/SkillTag";

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

const skills = [
  { icon: "FE", title: "Frontend", desc: "React · Next.js · Tailwind" },
  { icon: "BE", title: "Backend", desc: "Node.js · REST API · SQL" },
  { icon: "IoT", title: "IoT & Mobile", desc: "ESP32 · MQTT · React Native" },
];

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

const code = [
  { t: "function Developer() {", c: "text-[#a78bfa]" },
  { t: "  return (", c: "text-[#F8FAFC]/60" },
  { t: "    <Skills>", c: "text-[#3B82F6]" },
  { t: "      <Code />", c: "text-[#F8FAFC]/80" },
  { t: "      <Design />", c: "text-[#F8FAFC]/80" },
  { t: "      <Build />", c: "text-[#F8FAFC]/80" },
  { t: "      <Improve />", c: "text-[#F8FAFC]/80" },
  { t: "    </Skills>", c: "text-[#3B82F6]" },
  { t: "  );", c: "text-[#F8FAFC]/60" },
  { t: "}", c: "text-[#a78bfa]" },
];

function Dots() {
  return (
    <div className="flex gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
    </div>
  );
}

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

      {/* การ์ดกระจกซ้อนกัน */}
      <section className="relative mx-auto mt-24 grid max-w-6xl items-center gap-6 px-6 md:grid-cols-[1fr_1.35fr_1fr]">
        {/* หน้าต่างโค้ด */}
        <div className="glass float-slow rounded-2xl p-4 md:-rotate-2">
          <Dots />
          <div className="mt-4 overflow-x-auto font-mono text-xs leading-6">
            {code.map((l, i) => (
              <div key={i} className={`whitespace-pre ${l.c}`}>
                <span className="mr-3 select-none text-[#F8FAFC]/25">
                  {i + 1}
                </span>
                {l.t}
              </div>
            ))}
          </div>
        </div>

        {/* หน้าต่างเบราว์เซอร์ */}
        <div className="glass float rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <Dots />
            <div className="flex-1 truncate rounded-md bg-[#0B0D12]/70 px-3 py-1 text-center text-xs text-[#F8FAFC]/50">
              portfolio.dev
            </div>
          </div>
          <div className="mt-4 grid items-center gap-4 rounded-xl bg-[#0B0D12]/60 p-5 sm:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="text-2xl font-bold leading-tight">
                Building the future,{" "}
                <span className="text-[#a78bfa]">one line</span> of code at a
                time.
              </h2>
              <p className="mt-2 text-xs text-[#F8FAFC]/50">
                <T
                  v={{
                    th: "เว็บ แอป และระบบ IoT ที่ใช้งานได้จริง",
                    en: "Web, apps and IoT systems that actually work",
                    zh: "真正可用的网页、应用和物联网系统",
                  }}
                />
              </p>
              <div className="mt-4 flex gap-2">
                <Link
                  href="/projects"
                  className="rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] px-4 py-2 text-xs font-semibold"
                >
                  <T
                    v={{ th: "ดูผลงาน", en: "Explore Now", zh: "立即查看" }}
                  />
                </Link>
                <Link
                  href="/about"
                  className="glass rounded-lg px-4 py-2 text-xs"
                >
                  <T v={{ th: "เกี่ยวกับฉัน", en: "About", zh: "关于我" }} />
                </Link>
              </div>
            </div>
            <div
              className="flex h-36 items-center justify-center"
              style={{ perspective: 600 }}
            >
              <div className="cube">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
        </div>

        {/* รายการทักษะ */}
        <div className="glass float-slow rounded-2xl p-4 md:rotate-2">
          <p className="mb-3 text-xs uppercase tracking-widest text-[#F8FAFC]/40">
            <T v={{ th: "ทักษะ", en: "Skills", zh: "技能" }} />
          </p>
          <div className="space-y-3">
            {skills.map((s) => (
              <div
                key={s.title}
                className="flex items-center gap-3 rounded-xl bg-[#0B0D12]/50 p-3"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] text-xs font-bold">
                  {s.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold">{s.title}</p>
                  <p className="text-xs text-[#F8FAFC]/50">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
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