"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { VolumetricStudio } from "@/components/ui/volumetric-studio";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// แก้ตรงนี้: ข้อมูลติดต่อของคุณ
const contacts = [
  { label: "Email", value: "your@email.com", href: "mailto:your@email.com" },
  { label: "Line", value: "your-line-id", href: "https://line.me/ti/p/~your-line-id" },
  { label: "GitHub", value: "phakkharaphong2004", href: "https://github.com/phakkharaphong2004" },
  { label: "Phone", value: "0XX-XXX-XXXX", href: "tel:0000000000" },
];

export default function Home() {
  return (
    <div className="bg-black text-white">
      {/* ส่วน Hero */}
      <div className="h-[85vh] min-h-[640px]">
        <VolumetricStudio>
          <div className="flex h-full w-full flex-col items-center justify-center px-4 text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 1, ease }}
              className="mb-3 text-sm uppercase tracking-[0.3em] text-white/50"
            >
              Hi, I&apos;m
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 1.2, ease }}
              className="bg-gradient-to-b from-white to-white/40 bg-clip-text pb-2 text-5xl font-bold leading-tight tracking-tight text-transparent md:text-7xl"
            >
              {/* แก้ตรงนี้: ชื่อของคุณ */}
              ชื่อของคุณ
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 1.2, ease }}
              className="mb-4 text-xl font-medium text-white/70 md:text-2xl"
            >
              Full-Stack Developer
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 1.2, ease }}
              className="mb-10 max-w-xl text-base text-white/50 md:text-lg"
            >
              {/* แก้ตรงนี้: แนะนำตัวสั้น ๆ */}
              นักศึกษาวิศวกรรมคอมพิวเตอร์ ถนัดการพัฒนาเว็บ แอปมือถือ และระบบหลังบ้าน
              กำลังมองหาโอกาสฝึกงานและร่วมสร้างผลงานจริง
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 1.2, ease }}
              className="pointer-events-auto flex flex-col gap-4 sm:flex-row"
            >
              <Link
                href="/projects"
                className="rounded-full bg-white px-8 py-4 font-bold text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-transform hover:scale-105 active:scale-95"
              >
                ดูผลงาน
              </Link>
              <a
                href="#contact"
                className="rounded-full border border-white/20 px-8 py-4 font-bold text-white transition-transform hover:scale-105 hover:bg-white/10 active:scale-95"
              >
                ติดต่อฉัน
              </a>
            </motion.div>
          </div>
        </VolumetricStudio>
      </div>

      {/* ส่วนช่องทางติดต่อ */}
      <section id="contact" className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="mb-2 text-center text-3xl font-bold">ติดต่อฉัน</h2>
        <p className="mb-10 text-center text-white/50">
          สนใจร่วมงานหรืออยากคุยเรื่องโปรเจกต์ ติดต่อได้ตามช่องทางนี้
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 p-6 transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/5"
            >
              <p className="mb-1 text-sm text-white/50">{c.label}</p>
              <p className="text-lg font-semibold">{c.value}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}