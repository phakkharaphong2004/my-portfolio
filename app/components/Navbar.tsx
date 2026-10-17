"use client"

import { Home, User, Folder, Mail } from "lucide-react"
import { AnimeNavBar } from "./ui/anime-navbar"

const items = [
  { name: "Home", url: "/", icon: Home },
  { name: "About", url: "/about", icon: User },
  { name: "Projects", url: "/projects", icon: Folder },
  { name: "Contact", url: "/#contact", icon: Mail },
]

export default function Navbar() {
  return <AnimeNavBar items={items} />
}