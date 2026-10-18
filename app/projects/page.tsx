import { projects } from "../data/projects";
import ProjectGrid from "../components/ProjectGrid";

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
          โปรเจกต์ที่ได้ลงมือทำ ทั้งเว็บ แอป และระบบ IoT · คลิกการ์ดเพื่อดูรายละเอียด
        </p>

        <ProjectGrid projects={projects} />
      </main>
    </div>
  );
}