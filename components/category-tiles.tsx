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
    <section className="relative bg-white/40 border-b border-slate-100 py-16">
      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mb-10 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
            <span aria-hidden className="h-0.5 w-10 bg-[var(--gold)]" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--gold)]">
              Kategorie Tematyczne
            </p>
          </div>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-[var(--imperial-blue)] md:text-4xl">
            Przeglądaj według działów
          </h2>
        </div>

        {/* Grid of Categories */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categoryConfigs.map((config) => {
            const Icon = config.icon
            return (
              <Link
                key={config.name}
                href={`/aktualnosci?kategoria=${encodeURIComponent(config.name)}#archiwum`}
                className="group flex flex-col items-center justify-center rounded-2xl border border-white/60 bg-white/60 p-5 text-center shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--gold)]/30 hover:bg-white hover:shadow-md hover:shadow-[var(--imperial-blue)]/5"
              >
                {/* Icon Container */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--gold)]/[0.04] border border-[var(--gold)]/10 text-[var(--gold)] transition-transform duration-500 group-hover:scale-110 group-hover:bg-[var(--gold)]/[0.08]">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                
                {/* Name */}
                <h3 className="font-serif text-sm font-semibold leading-tight text-[var(--imperial-blue)] transition-colors group-hover:text-[var(--gold)]">
                  {config.name}
                </h3>
                
                {/* Description */}
                <p className="mt-2 text-[10px] leading-snug text-slate-400 font-medium">
                  {config.desc}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
