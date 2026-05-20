"use client"

import Link from "next/link"
import { ArrowRight, CalendarDays } from "lucide-react"
import { newsItems, formatPolishDate } from "@/lib/news-data"

const groupsConfig = [
  {
    title: "Sport i rekreacja",
    subtitle: "Turnieje, relacje meczowe, zalew Pająk i aktywność fizyczna.",
    filterCat: "Sport",
    bg: "bg-amber-500",
    border: "border-amber-500",
    pill: "bg-amber-500 text-white",
    hover: "hover:border-amber-400",
    accent: "text-amber-500",
  },
  {
    title: "Kultura i rozrywka",
    subtitle: "Konkursy, festiwale muzyczne i wydarzenia kulturalne.",
    filterCat: "Kultura",
    bg: "bg-violet-600",
    border: "border-violet-600",
    pill: "bg-violet-600 text-white",
    hover: "hover:border-violet-400",
    accent: "text-violet-600",
  },
  {
    title: "Sołectwa",
    subtitle: "Inwestycje, zebrania sołeckie i infrastruktura drogowa.",
    filterCat: "Samorząd",
    bg: "bg-emerald-600",
    border: "border-emerald-600",
    pill: "bg-emerald-600 text-white",
    hover: "hover:border-emerald-400",
    accent: "text-emerald-600",
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
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-4 ${group.bg} rounded-2xl px-5 py-3 shadow-md`}>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white leading-tight">
                      {group.title}
                    </h3>
                    <p className="text-xs text-white/75 mt-0.5 font-medium">
                      {group.subtitle}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/?kategoria=${encodeURIComponent(group.filterCat)}#archiwum`}
                  className={`hidden sm:inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] ${group.accent} hover:opacity-70 transition-opacity`}
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
