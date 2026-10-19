import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "./ui/spotlight-card";
import { T } from "./LangProvider";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LineIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#06C755" />
      <ellipse cx="12" cy="11" rx="7.5" ry="6" fill="#fff" />
      <path d="M9 15.5 8 19l4.5-2.6z" fill="#fff" />
      <text
        x="12"
        y="12.4"
        textAnchor="middle"
        fontSize="4.2"
        fontWeight="700"
        fill="#06C755"
        fontFamily="Arial, sans-serif"
      >
        LINE
      </text>
    </svg>
  );
}

// แก้ตรงนี้: ข้อมูลติดต่อของคุณ
const contacts = [
  {
    label: "Email",
    value: "phakkharaphongsaranggam@email.com",
    href: "mailto:phakkharaphongsaranggam@email.com",
    tile: "bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] text-white",
    icon: <Mail className="h-5 w-5" />,
    glow: "rgba(139, 92, 246, 0.3)",
  },
  {
    label: "Line",
    value: "phakkharaphong2004",
    href: "https://line.me/ti/p/~phakkharaphong2004",
    tile: "",
    icon: <LineIcon className="h-10 w-10 rounded-xl" />,
    glow: "rgba(6, 199, 85, 0.25)",
  },
  {
    label: "GitHub",
    value: "phakkharaphong2004",
    href: "https://github.com/phakkharaphong2004",
    tile: "bg-white text-[#0B0D12]",
    icon: <GithubIcon className="h-5 w-5" />,
    glow: "rgba(248, 250, 252, 0.2)",
  },
  {
    label: "Phone",
    value: "065-320-4366",
    href: "tel:0653204366",
    tile: "bg-gradient-to-br from-[#22c55e] to-[#16a34a] text-white",
    icon: <Phone className="h-5 w-5" />,
    glow: "rgba(34, 197, 94, 0.25)",
  },
];

export default function ContactSection({
  name,
  handle,
}: {
  name: string;
  handle: string;
}) {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24"
    >
      <h2 className="text-center text-4xl font-extrabold">
  <span className="grad-text">
    <T v={{ th: "ติดต่อฉัน", en: "Contact Me", zh: "联系我" }} />
  </span>
</h2>
<p className="mb-10 mt-2 text-center text-[#F8FAFC]/60">
  <T
    v={{
      th: "สนใจร่วมงานหรืออยากคุยเรื่องโปรเจกต์ ติดต่อได้ตามช่องทางนี้",
      en: "Interested in working together or discussing a project? Reach me here.",
      zh: "有意合作或想聊聊项目？欢迎通过以下方式联系我。",
    }}
  />
</p>

      {/* 4 ใบเรียงแถวเดียวบนจอใหญ่ / 2x2 บนจอกลาง / 1 คอลัมน์บนมือถือ */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {contacts.map((c) => (
          <SpotlightCard key={c.label} className="h-full" spotlightColor={c.glow}>
            <a
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex h-full flex-col gap-4 p-5 outline-none"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-xl ${c.tile}`}
                >
                  {c.icon}
                </span>
                <ArrowUpRight className="h-4 w-4 text-[#F8FAFC]/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#a78bfa]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#F8FAFC]/50">{c.label}</p>
                <p className="mt-0.5 break-words text-[13px] font-semibold leading-snug">
                  {/* อีเมลยาว: ให้ตัดบรรทัดก่อน @ */}
                  {c.value.replace("@", "\u200B@")}
                </p>
              </div>
            </a>
          </SpotlightCard>
        ))}
      </div>

      <div className="mt-14 flex items-center justify-center gap-3 text-sm text-[#F8FAFC]/50">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] font-bold text-white">
          {name.charAt(0)}
        </span>
        <span>{handle}</span>
        <span>|</span>
        <span>Designing · Building · Sharing</span>
      </div>
    </section>
  );
}
