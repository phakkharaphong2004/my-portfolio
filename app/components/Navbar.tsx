import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <nav className="flex gap-6 bg-[#0B0D12] p-6 text-[#F8FAFC]">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="transition hover:text-[#3B82F6]"
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}