"use client"

import Link from "next/link"
import {
  Leaf,
  GraduationCap,
  CalendarDays,
  Landmark,
  Palette,
  Trophy,
  Bus,
  HeartPulse,
  Coins,
  Users,
} from "lucide-react"

const categoryConfigs = [
  { name: "Samorząd", icon: Landmark, desc: "Urząd i decyzje" },
  { name: "Wydarzenia", icon: CalendarDays, desc: "Kultura i imprezy" },
  { name: "Sport", icon: Trophy, desc: "GLKS LOT i rekreacja" },
  { name: "Edukacja", icon: GraduationCap, desc: "Szkoły i rozwój" },
  { name: "Ekologia", icon: Leaf, desc: "Środowisko i eko" },
]

export function CategoryTiles() {
  return (
    <div className="relative w-full -mt-8 mb-12 z-20">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6">
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-white/80 backdrop-blur-lg border border-slate-100/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] py-3 px-5 rounded-2xl sm:rounded-full max-w-full">
            <span className="hidden sm:inline-flex items-center gap-1.5 pr-4 border-r border-slate-200/60 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
              Kategorie:
            </span>
            <div className="flex items-center gap-2 pl-0 sm:pl-2">
              {categoryConfigs.map((config) => {
                const Icon = config.icon
                return (
                  <Link
                    key={config.name}
                    href={`/aktualnosci?kategoria=${encodeURIComponent(config.name)}#archiwum`}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold text-slate-600 transition-all duration-300 hover:text-[var(--imperial-blue)] hover:bg-slate-50 border border-transparent hover:border-slate-100 whitespace-nowrap active:scale-95 group"
                  >
                    <Icon className="h-3.5 w-3.5 text-slate-400 group-hover:text-[var(--gold)] transition-colors duration-300" aria-hidden />
                    <span>{config.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
