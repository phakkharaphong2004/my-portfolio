import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <nav className="relative z-10 flex justify-center bg-[#0B0D12] px-6 pt-6">
      <div className="glass flex gap-6 rounded-full px-6 py-2.5 text-sm text-[#F8FAFC]">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="transition hover:text-[#a78bfa]">
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}