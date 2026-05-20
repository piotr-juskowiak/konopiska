"use client"

import Link from "next/link"
import { Trophy, Home, Music, ArrowRight, CalendarDays } from "lucide-react"
import { newsItems, formatPolishDate } from "@/lib/news-data"

const groupsConfig = [
  {
    title: "Sport i rekreacja",
    subtitle: "Turnieje, relacje meczowe, zalew Pająk i aktywność fizyczna mieszkańców.",
    icon: Trophy,
    iconColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    filterCat: "Sport"
  },
  {
    title: "Kultura i rozrywka",
    subtitle: "Konkursy, festiwale muzyczne i wydarzenia kulturalne w naszej gminie.",
    icon: Music,
    iconColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    filterCat: "Kultura"
  },
  {
    title: "Sołectwa",
    subtitle: "Inwestycje, zebrania sołeckie, infrastruktura drogowa i lokalne sprawy.",
    icon: Home,
    iconColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    filterCat: "Samorząd"
  }
]

export function NewsGroups() {
  return (
    <section className="relative w-full py-12 px-4 sm:px-10 rounded-[3rem] bg-[var(--imperial-blue)]/5 border border-[var(--imperial-blue)]/10">
      <div className="mx-auto w-full">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>

          </div>
        </div>

        <div className="flex flex-col gap-16">
          {groupsConfig.map((group, idx) => {
            const Icon = group.icon
            const items = newsItems.filter(i => i.category === group.filterCat).slice(0, 3)

            if (items.length === 0) return null

            return (
              <div key={idx} className="flex flex-col">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 relative z-10">
                    <div className={`p-4 rounded-xl ${group.iconColor} shadow-sm`}>
                      <h3 className="font-serif text-xl font-bold text-white">
                        {group.title}
                      </h3>
                      <p className="text-sm text-white/80 mt-1">
                        {group.subtitle}
                      </p>
                    </div>
                    <Link
                      href={`/?kategoria=${encodeURIComponent(group.filterCat)}#archiwum`}
                      className={`inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] ${group.iconColor} text-white px-3 py-1 rounded-md hover:opacity-90 transition-colors`}
                    >
                      Zobacz wszystkie
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map((item, itemIdx) => (
                    <Link
                      key={itemIdx}
                      href={`/artykul/${item.slug}`}
                      className="group relative flex flex-col h-full overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_8px_30px_rgba(15,23,42,0.02)] transition-all duration-500 hover:-translate-y-1 hover:border-[var(--gold)]/30 hover:shadow-[0_20px_45px_rgba(15,23,42,0.06)]"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50 border-b border-slate-100">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--imperial-blue)]/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-white/90 px-3 py-1.5 backdrop-blur-md shadow-sm text-[8px] font-black uppercase tracking-[0.2em] text-[var(--imperial-blue)] transition-transform group-hover:-translate-y-1">
                          {item.category}
                        </div>
                      </div>

                      <div className="flex flex-col flex-grow p-6">
                        <div className="mb-4 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
                          <CalendarDays className="h-3.5 w-3.5 text-[var(--gold)]/80" />
                          {formatPolishDate(item.date)}
                        </div>

                        <h4 className="mb-3 font-serif text-lg font-bold leading-snug text-[var(--imperial-blue)] transition-colors group-hover:text-[var(--gold)] line-clamp-2">
                          {item.title}
                        </h4>

                        <p className="text-[10px] font-medium leading-relaxed text-slate-400 mb-4 line-clamp-2">
                          {item.excerpt}
                        </p>

                        <div className="mt-auto flex items-center text-[10px] font-black uppercase tracking-widest text-[var(--gold)] group-hover:text-[var(--imperial-blue)] transition-colors">
                          Czytaj więcej
                          <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
