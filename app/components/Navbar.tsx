"use client"

import { useMemo } from "react"
import { Home, User, Folder, Mail } from "lucide-react"
import { AnimeNavBar } from "./ui/anime-navbar"
import { useLang, type L } from "./LangProvider"

const items: { name: L; url: string; icon: typeof Home }[] = [
  { name: { th: "หน้าแรก", en: "Home", zh: "首页" }, url: "/", icon: Home },
  { name: { th: "เกี่ยวกับ", en: "About", zh: "关于" }, url: "/about", icon: User },
  { name: { th: "ผลงาน", en: "Projects", zh: "作品" }, url: "/projects", icon: Folder },
  { name: { th: "ติดต่อ", en: "Contact", zh: "联系" }, url: "/#contact", icon: Mail },
]

export default function Navbar() {
  const { lang } = useLang()
  const list = useMemo(
    () => items.map((i) => ({ ...i, name: i.name[lang] })),
    [lang]
  )
  return <AnimeNavBar items={list} defaultActive={list[0].name} />
}