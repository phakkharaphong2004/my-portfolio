import SculptureHero from "./components/ui/liquid-sculpture-hero";

// แก้ตรงนี้: ข้อมูลติดต่อของคุณ
const contacts = [
  { label: "Email", value: "your@email.com", href: "mailto:your@email.com" },
  { label: "Line", value: "your-line-id", href: "https://line.me/ti/p/~your-line-id" },
  { label: "GitHub", value: "phakkharaphong2004", href: "https://github.com/phakkharaphong2004" },
  { label: "Phone", value: "0XX-XXX-XXXX", href: "tel:0000000000" },
];

export default function Home() {
  return (
    <div className="bg-[#0B0D12] text-[#F8FAFC]">
      <SculptureHero
        showNav={false}
        height="calc(100svh - 72px)"
        theme="dark"
        themeToggle={false}
        background="#0B0D12"
        darkBackground="#0B0D12"
        textColor="#F8FAFC"
        accentColor="#3B82F6"
        backdropText="dev"
        eyebrow="Computer Engineering · Full-Stack Developer"
        // แก้ตรงนี้: ชื่อของคุณ (ส่วนที่เป็น accent จะเป็นตัวเอียงสีน้ำเงิน)
        headline={"Hi, I'm\nYour Name."}
        headlineAccent="Your Name."
        // แก้ตรงนี้: แนะนำตัวสั้น ๆ
        body="นักศึกษาวิศวกรรมคอมพิวเตอร์ ถนัดการพัฒนาเว็บ แอปมือถือ และระบบหลังบ้าน กำลังมองหาโอกาสฝึกงานและร่วมสร้างผลงานจริง"
        primaryCta={{ label: "ติดต่อฉัน", href: "#contact" }}
        secondaryCta={{ label: "ดูผลงาน", href: "/projects" }}
      />

      <section id="contact" className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="mb-2 text-center text-3xl font-bold">ติดต่อฉัน</h2>
        <p className="mb-10 text-center text-[#F8FAFC]/60">
          สนใจร่วมงานหรืออยากคุยเรื่องโปรเจกต์ ติดต่อได้ตามช่องทางนี้
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-[#202530] bg-[#202530]/40 p-6 transition hover:-translate-y-1 hover:border-[#3B82F6]"
            >
              <p className="mb-1 text-sm text-[#F8FAFC]/60">{c.label}</p>
              <p className="text-lg font-semibold">{c.value}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}