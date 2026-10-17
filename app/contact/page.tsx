// แก้ตรงนี้: ข้อมูลติดต่อของคุณ
const contacts = [
  { label: "Email", value: "your@email.com", href: "mailto:your@email.com" },
  { label: "Line", value: "your-line-id", href: "https://line.me/ti/p/~your-line-id" },
  { label: "GitHub", value: "phakkharaphong2004", href: "https://github.com/phakkharaphong2004" },
  { label: "Phone", value: "0XX-XXX-XXXX", href: "tel:0000000000" },
];

export default function Contact() {
  return (
    <main className="mx-auto max-w-4xl px-6 pb-20 pt-36">
      <h1 className="text-center text-4xl font-extrabold">
        <span className="grad-text">ติดต่อฉัน</span>
      </h1>
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
            className="glow-card p-6 sm:p-7"
          >
            <p className="mb-1 text-sm text-[#F8FAFC]/50">{c.label}</p>
            <p className="text-lg font-semibold">{c.value}</p>
          </a>
        ))}
      </div>
    </main>
  );
}