"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  defaultActive?: string
}

export function AnimeNavBar({ items, className, defaultActive = "Home" }: NavBarProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
    const [hidden, setHidden] = useState(false)
  const [inView, setInView] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // ซ่อนเมนูตอนเลื่อนลง และเช็คว่าเลื่อนมาถึงส่วน #anchor ไหนแล้ว
  useEffect(() => {
    let last = window.scrollY
    const update = () => {
      const y = window.scrollY
      setHidden(y > last && y > 80)
      last = y

      let found: string | null = null
      for (const item of items) {
        const id = item.url.split("#")[1]
        if (!id) continue
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) {
          found = id
        }
      }
      setInView(found)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [items, pathname])

  if (!mounted) return null
    const anchorItem = items.find((i) => i.url.split("#")[1] === inView)
  const activeTab =
    (pathname === "/" && anchorItem?.name) ||
    items.find((i) => {
      if (i.url.includes("#")) return false
      return i.url === "/" ? pathname === "/" : pathname.startsWith(i.url)
    })?.name ||
    defaultActive

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 top-2 z-[9999] transition-transform duration-300",
        hidden && "-translate-y-full",
        className
      )}
    >
      <div className="flex justify-center pt-10">
        <motion.div
          className="pointer-events-auto relative flex items-center gap-1 rounded-full border border-white/10 bg-[#0B0D12]/70 p-1.5 shadow-lg backdrop-blur-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name
            const isHovered = hoveredTab === item.name

            return (
              <Link
                key={item.name}
                href={item.url}
                onMouseEnter={() => setHoveredTab(item.name)}
                onMouseLeave={() => setHoveredTab(null)}
                className={cn(
                  "relative cursor-pointer rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-300",
                  "text-white/70 hover:text-white",
                  isActive && "text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 -z-10 overflow-hidden rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.03, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="absolute inset-0 rounded-full bg-[#8B5CF6]/25 blur-md" />
                    <div className="absolute inset-[-4px] rounded-full bg-[#3B82F6]/20 blur-xl" />
                    <div className="absolute inset-[-8px] rounded-full bg-[#8B5CF6]/15 blur-2xl" />
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-[#3B82F6]/0 via-[#8B5CF6]/30 to-[#3B82F6]/0"
                      style={{ animation: "shine 3s ease-in-out infinite" }}
                    />
                  </motion.div>
                )}

                <motion.span
                  className="relative z-10 hidden md:inline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.span>
                <motion.span
                  className="relative z-10 md:hidden"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={16} strokeWidth={2.5} />
                </motion.span>

                <AnimatePresence>
                  {isHovered && !isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 -z-10 rounded-full bg-white/10"
                    />
                  )}
                </AnimatePresence>

                {isActive && (
                  <motion.div
                    layoutId="anime-mascot"
                    className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="relative h-12 w-12 origin-bottom scale-75">
                      <motion.div
                        className="absolute left-1/2 h-10 w-10 -translate-x-1/2 rounded-full bg-white"
                        animate={
                          hoveredTab
                            ? {
                                scale: [1, 1.1, 1],
                                rotate: [0, -5, 5, 0],
                                transition: { duration: 0.5, ease: "easeInOut" },
                              }
                            : {
                                y: [0, -3, 0],
                                transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                              }
                        }
                      >
                        <motion.div
                          className="absolute h-2 w-2 rounded-full bg-black"
                          animate={
                            hoveredTab
                              ? { scaleY: [1, 0.2, 1], transition: { duration: 0.2, times: [0, 0.5, 1] } }
                              : {}
                          }
                          style={{ left: "25%", top: "40%" }}
                        />
                        <motion.div
                          className="absolute h-2 w-2 rounded-full bg-black"
                          animate={
                            hoveredTab
                              ? { scaleY: [1, 0.2, 1], transition: { duration: 0.2, times: [0, 0.5, 1] } }
                              : {}
                          }
                          style={{ right: "25%", top: "40%" }}
                        />
                        <motion.div
                          className="absolute h-1.5 w-2 rounded-full bg-pink-300"
                          animate={{ opacity: hoveredTab ? 0.8 : 0.6 }}
                          style={{ left: "15%", top: "55%" }}
                        />
                        <motion.div
                          className="absolute h-1.5 w-2 rounded-full bg-pink-300"
                          animate={{ opacity: hoveredTab ? 0.8 : 0.6 }}
                          style={{ right: "15%", top: "55%" }}
                        />
                        <motion.div
                          className="absolute h-2 w-4 rounded-full border-b-2 border-black"
                          animate={hoveredTab ? { scaleY: 1.5, y: -1 } : { scaleY: 1, y: 0 }}
                          style={{ left: "30%", top: "60%" }}
                        />
                        <AnimatePresence>
                          {hoveredTab && (
                            <>
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                className="absolute -right-1 -top-1 h-2 w-2 text-yellow-300"
                              >
                                ✨
                              </motion.div>
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ delay: 0.1 }}
                                className="absolute -top-2 left-0 h-2 w-2 text-yellow-300"
                              >
                                ✨
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </motion.div>
                      <motion.div
                        className="absolute -bottom-1 left-1/2 h-4 w-4 -translate-x-1/2"
                        animate={
                          hoveredTab
                            ? {
                                y: [0, -4, 0],
                                transition: { duration: 0.3, repeat: Infinity, repeatType: "reverse" },
                              }
                            : {
                                y: [0, 2, 0],
                                transition: { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                              }
                        }
                      >
                        <div className="h-full w-full origin-center rotate-45 transform bg-white" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </Link>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}