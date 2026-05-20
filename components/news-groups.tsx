"use client"

import Link from "next/link"
import { ArrowRight, CalendarDays } from "lucide-react"
import { newsItems, formatPolishDate } from "@/lib/news-data"

const groupsConfig = [
  {
    title: "Sport i rekreacja",
    subtitle: "Turnieje, relacje meczowe, zalew Pająk i aktywność fizyczna.",
    filterCat: "Sport",
    bg: "bg-gradient-to-r from-sky-400 to-blue-500",
    border: "border-sky-500",
    pill: "bg-sky-500 text-white",
    hover: "hover:border-sky-400",
    accent: "text-sky-500",
  },
  {
    title: "Kultura i rozrywka",
    subtitle: "Konkursy, festiwale muzyczne i wydarzenia kulturalne.",
    filterCat: "Kultura",
    bg: "bg-gradient-to-r from-yellow-400 to-amber-500",
    border: "border-yellow-500",
    pill: "bg-yellow-500 text-amber-900",
    hover: "hover:border-yellow-400",
    accent: "text-amber-500",
  },
  {
    title: "Sołectwa",
    subtitle: "Inwestycje, zebrania sołeckie i infrastruktura drogowa.",
    filterCat: "Samorząd",
    bg: "bg-gradient-to-r from-amber-700 to-orange-900",
    border: "border-orange-800",
    pill: "bg-orange-800 text-white",
    hover: "hover:border-orange-700",
    accent: "text-orange-800",
  },
]

export function NewsGroups() {
  return (
    <section className="relative w-full py-8 px-4 sm:px-8 rounded-[2rem] bg-slate-50 border border-slate-100">
      <div className="flex flex-col gap-10">
        {groupsConfig.map((group, idx) => {
          const items = newsItems.filter(i => i.category === group.filterCat).slice(0, 3)
          if (items.length === 0) return null

          return (
            <div key={idx} className="flex flex-col gap-5">
              {/* Section header */}
              <div className={`flex items-center justify-between ${group.bg} rounded-2xl px-5 py-4 shadow-md w-full`}>
                <div>
                  <h3 className="font-serif text-xl font-bold text-white leading-tight">
                    {group.title}
                  </h3>
                  <p className="text-xs text-white/80 mt-1 font-medium">
                    {group.subtitle}
                  </p>
                </div>
                <Link
                  href={`/?kategoria=${encodeURIComponent(group.filterCat)}#archiwum`}
                  className="hidden sm:inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-white/90 hover:text-white transition-opacity"
                >
                  Zobacz wszystkie
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Articles grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((item, itemIdx) => (
                  <Link
                    key={itemIdx}
                    href={`/artykul/${item.slug}`}
                    className={`group relative flex flex-col h-full overflow-hidden rounded-2xl bg-white border-2 border-transparent ${group.hover} shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md`}
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>

                    <div className="flex flex-col flex-grow p-4">
                      <div className="mb-2 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
                        <CalendarDays className="h-3 w-3" />
                        {formatPolishDate(item.date)}
                      </div>

                      <h4 className={`font-serif text-base font-bold leading-snug text-slate-800 transition-colors group-hover:${group.accent} line-clamp-2`}>
                        {item.title}
                      </h4>

                      <p className="mt-2 text-[11px] font-medium leading-relaxed text-slate-400 line-clamp-2">
                        {item.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Divider between groups */}
              {idx < groupsConfig.length - 1 && (
                <div className="h-px w-full bg-slate-200 mt-2" />
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
