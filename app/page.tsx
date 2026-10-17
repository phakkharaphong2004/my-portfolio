import Link from "next/link";

// แก้ตรงนี้: ข้อมูลของคุณ
const NAME = "ชื่อของคุณ";
const HANDLE = "@phakkharaphong2004";
const INTRO =
  "นักศึกษาวิศวกรรมคอมพิวเตอร์ ถนัดการพัฒนาเว็บ แอปมือถือ และระบบหลังบ้าน กำลังมองหาโอกาสฝึกงานและร่วมสร้างผลงานจริง";

const contacts = [
  { label: "Email", value: "your@email.com", href: "mailto:your@email.com" },
  { label: "Line", value: "your-line-id", href: "https://line.me/ti/p/~your-line-id" },
  { label: "GitHub", value: "phakkharaphong2004", href: "https://github.com/phakkharaphong2004" },
  { label: "Phone", value: "0XX-XXX-XXXX", href: "tel:0000000000" },
];

const skills = [
  { icon: "FE", title: "Frontend", desc: "React · Next.js · Tailwind" },
  { icon: "BE", title: "Backend", desc: "Node.js · REST API · SQL" },
  { icon: "IoT", title: "IoT & Mobile", desc: "ESP32 · MQTT · React Native" },
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
      <div className="pointer-events-none absolute top-[420px] -right-40 h-[420px] w-[420px] rounded-full bg-[#3B82F6]/20 blur-[120px]" />
      <div className="dot-grid pointer-events-none absolute inset-0 h-[900px]" />

      {/* Hero */}
      <section className="relative mx-auto max-w-5xl px-6 pt-16 text-center md:pt-24">
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-[#F8FAFC]/80">
          <span className="h-2 w-2 rounded-full bg-[#a78bfa]" />
          Open to internships
        </span>

        <h1 className="mt-8 text-5xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
          Full-Stack
          <br />
          <span className="grad-text">Developer</span>
        </h1>

        <p className="mt-6 text-lg text-[#F8FAFC]/60">
          Hi, I&apos;m <span className="font-semibold text-[#F8FAFC]">{NAME}</span>
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-[#F8FAFC]/60">{INTRO}</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/projects"
            className="rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] px-8 py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.45)] transition hover:scale-105"
          >
            ดูผลงาน
          </Link>
          <a
            href="#contact"
            className="glass rounded-full px-8 py-3.5 font-semibold transition hover:scale-105 hover:border-[#3B82F6]"
          >
            ติดต่อฉัน
          </a>
        </div>
      </section>

      {/* การ์ดกระจกซ้อนกัน */}
      <section className="relative mx-auto mt-20 grid max-w-6xl items-center gap-6 px-6 md:grid-cols-[1fr_1.35fr_1fr]">
        {/* หน้าต่างโค้ด */}
        <div className="glass float-slow rounded-2xl p-4 md:-rotate-2">
          <Dots />
          <pre className="mt-4 overflow-x-auto font-mono text-xs leading-6">
            {code.map((l, i) => (
              <div key={i} className={`whitespace-pre ${l.c}`}>
                <span className="mr-3 select-none text-[#F8FAFC]/25">{i + 1}</span>
                {l.t}
              </div>
            ))}
          </pre>
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
                <span className="text-[#a78bfa]">one line</span> of code at a time.
              </h2>
              <p className="mt-2 text-xs text-[#F8FAFC]/50">
                เว็บ แอป และระบบ IoT ที่ใช้งานได้จริง
              </p>
              <div className="mt-4 flex gap-2">
                <Link
                  href="/projects"
                  className="rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] px-4 py-2 text-xs font-semibold"
                >
                  Explore Now
                </Link>
                <Link href="/about" className="glass rounded-lg px-4 py-2 text-xs">
                  About
                </Link>
              </div>
            </div>
            <div className="flex h-36 items-center justify-center" style={{ perspective: 600 }}>
              <div className="cube">
                <i /><i /><i /><i /><i /><i />
              </div>
            </div>
          </div>
        </div>

        {/* รายการทักษะ */}
        <div className="glass float-slow rounded-2xl p-4 md:rotate-2">
          <p className="mb-3 text-xs uppercase tracking-widest text-[#F8FAFC]/40">Skills</p>
          <div className="space-y-3">
            {skills.map((s) => (
              <div key={s.title} className="flex items-center gap-3 rounded-xl bg-[#0B0D12]/50 p-3">
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

      {/* ติดต่อ */}
      <section id="contact" className="relative mx-auto max-w-4xl px-6 py-24">
        <h2 className="text-center text-4xl font-extrabold">
          <span className="grad-text">ติดต่อฉัน</span>
        </h2>
        <p className="mb-10 mt-2 text-center text-[#F8FAFC]/60">
          สนใจร่วมงานหรืออยากคุยเรื่องโปรเจกต์ ติดต่อได้ตามช่องทางนี้
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="glass rounded-2xl p-6 transition hover:-translate-y-1 hover:border-[#3B82F6]"
            >
              <p className="mb-1 text-sm text-[#F8FAFC]/50">{c.label}</p>
              <p className="text-lg font-semibold">{c.value}</p>
            </a>
          ))}
        </div>

        <div className="mt-14 flex items-center justify-center gap-3 text-sm text-[#F8FAFC]/50">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] font-bold text-white">
            {NAME.charAt(0)}
          </span>
          <span>{HANDLE}</span>
          <span>|</span>
          <span>Designing · Building · Sharing</span>
        </div>
      </section>
    </div>
  );
}