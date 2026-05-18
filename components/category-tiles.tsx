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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0a1021] via-[#0f172a] to-[#080d1a] border-y border-[var(--gold)]/15 py-16 md:py-20">
      {/* Premium Decorative Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-[30%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[var(--gold)]/10 blur-[120px]" />
        <div className="absolute -bottom-[30%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[var(--french-blue)]/20 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mb-12 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
            <span aria-hidden className="h-0.5 w-10 bg-[var(--gold)]" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--gold)]">
              Kategorie Tematyczne
            </p>
          </div>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Przeglądaj według działów
          </h2>
        </div>

        {/* Grid of Categories */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {categoryConfigs.map((config) => {
            const Icon = config.icon
            return (
              <Link
                key={config.name}
                href={`/aktualnosci?kategoria=${encodeURIComponent(config.name)}#archiwum`}
                className="group relative flex flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--gold)]/40 hover:bg-white/[0.05] hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)]"
              >
                {/* Ambient Internal Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.01] to-white/[0.03] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                {/* Icon Container */}
                <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.08] text-slate-300 transition-all duration-500 group-hover:scale-110 group-hover:bg-[var(--gold)]/[0.12] group-hover:border-[var(--gold)]/40 group-hover:text-[var(--gold)] group-hover:shadow-[0_0_20px_rgba(181,155,51,0.18)]">
                  <Icon className="h-6 w-6 transition-transform duration-500 group-hover:rotate-6" aria-hidden />
                </div>
                
                {/* Name */}
                <h3 className="relative font-serif text-base font-semibold leading-tight text-white transition-colors group-hover:text-[var(--gold)]">
                  {config.name}
                </h3>
                
                {/* Description */}
                <p className="relative mt-2 text-xs leading-snug text-slate-400 font-medium transition-colors group-hover:text-slate-300">
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
