"use client"

import Link from "next/link"
import { Trophy, Home, Music, Trees, ArrowRight, Calendar, Layers } from "lucide-react"
import { formatPolishDate, type NewsItem } from "@/lib/news-data"

export function NewsGroups({ items }: { items: NewsItem[] }) {
  // Dynamic article counts per category
  const sportCount = items.filter((i) => i.category === "Sport").length
  const solectwaCount = items.filter((i) => i.category === "Samorząd" || i.category === "Społeczność").length
  const kulturaCount = items.filter((i) => i.category === "Kultura").length
  const rekreacjaCount = items.filter((i) => i.category === "Ekologia" || i.category === "Transport").length

  // Filtered lists for each group
  const sportNews = items.filter((i) => i.category === "Sport").slice(0, 3)
  const solectwaNews = items.filter((i) => i.category === "Samorząd" || i.category === "Społeczność").slice(0, 3)
  const kulturaNews = items.filter((i) => i.category === "Kultura").slice(0, 3)
  const rekreacjaNews = items.filter((i) => i.category === "Ekologia" || i.category === "Transport").slice(0, 3)

  const groups = [
    {
      title: "Sport i rekreacja",
      subtitle: "Turnieje, relacje meczowe i aktywność fizyczna mieszkańców.",
      icon: Trophy,
      iconColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
      news: sportNews,
      totalCount: sportCount,
      emptyMsg: "Brak nowych wpisów sportowych",
    },
    {
      title: "Sołectwa",
      subtitle: "Wieści, inwestycje i codzienne życie w naszych małych ojczyznach.",
      icon: Home,
      iconColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      news: solectwaNews,
      totalCount: solectwaCount,
      emptyMsg: "Brak wiadomości z sołectw",
    },
    {
      title: "Kultura i rozrywka",
      subtitle: "Festiwale, koncerty, wystawy i artystyczny puls gminy.",
      icon: Music,
      iconColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
      news: kulturaNews,
      totalCount: kulturaCount,
      emptyMsg: "Brak nadchodzących wydarzeń kulturalnych",
    },
    {
      title: "Rekreacja",
      subtitle: "Ścieżki rowerowe, rezerwy przyrody i relaks nad zalewem Pająk.",
      icon: Trees,
      iconColor: "text-teal-400 bg-teal-400/10 border-teal-400/20",
      news: rekreacjaNews,
      totalCount: rekreacjaCount,
      emptyMsg: "Brak komunikatów rekreacyjnych",
    },
  ]

  return (
    <section className="relative w-full bg-[var(--imperial-blue)] text-white overflow-hidden py-24 lg:py-28 border-t border-white/5">
      {/* Decorative ambient lights */}
      <div className="absolute -left-1/4 -top-1/4 w-[600px] h-[600px] bg-[var(--gold)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-1/4 -bottom-1/4 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-6">
        {/* Title Area */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span aria-hidden className="h-0.5 w-10 bg-[var(--gold)]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--gold)]">
                Sekcje tematyczne
              </span>
            </div>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
              Rozbudowany panel <em className="text-[var(--gold)]">kategorii</em>
            </h2>
            <p className="text-white/40 text-xs font-medium mt-4 max-w-xl leading-relaxed">
              Przeglądaj najnowsze i archiwalne materiały redakcyjne pogrupowane w cztery główne piony informacyjne portalu.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] font-bold text-white/50 uppercase tracking-widest shrink-0 self-start md:self-end">
            <Layers className="h-4 w-4 text-[var(--gold)]" />
            <span>Wykaz Archiwum</span>
          </div>
        </div>

        {/* Grid of Groups */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, idx) => {
            const Icon = group.icon
            const [featured, ...rest] = group.news
            return (
              <div 
                key={idx}
                className="flex flex-col h-full rounded-[2.5rem] bg-white/[0.02] border border-white/5 p-6 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 group relative overflow-hidden"
              >
                {/* Subtle gradient pattern card background */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${group.iconColor} shadow-inner`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-serif text-base font-semibold text-white tracking-tight leading-snug group-hover:text-[var(--gold)] transition-colors">
                      {group.title}
                    </h3>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-wider bg-white/5 border border-white/10 rounded-lg px-2 py-0.5 text-white/40">
                    {group.totalCount}
                  </span>
                </div>

                {/* Subtitle / Catchphrase */}
                <p className="text-[10px] text-white/40 font-medium leading-relaxed mb-6 relative z-10">
                  {group.subtitle}
                </p>

                {/* News List */}
                <div className="flex flex-col gap-6 flex-grow relative z-10">
                  {featured ? (
                    <>
                      {/* Featured Item with Image */}
                      <Link 
                        href={`/artykul/${featured.slug}`}
                        className="group/feat block relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[var(--gold)]/20 transition-all duration-300"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-900/40">
                          <img 
                            src={featured.image || "/placeholder.svg"} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/feat:scale-105" 
                            alt="" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[var(--imperial-blue)]/80 via-transparent to-transparent opacity-85" />
                          <span className="absolute left-3 top-3 rounded-lg bg-[var(--gold)]/90 backdrop-blur-sm px-2.5 py-1 text-[8px] font-black uppercase tracking-widest text-[var(--imperial-blue)] shadow-md">
                            {featured.category}
                          </span>
                        </div>
                        <div className="p-4">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 mb-1.5 block">
                            {formatPolishDate(featured.date)}
                          </span>
                          <h4 className="text-xs font-bold leading-snug text-white group-hover/feat:text-[var(--gold)] transition-colors line-clamp-2">
                            {featured.title}
                          </h4>
                        </div>
                      </Link>

                      {/* Secondary Items */}
                      {rest.length > 0 && (
                        <div className="flex flex-col gap-4">
                          {rest.map((item) => (
                            <Link 
                              key={item.slug}
                              href={`/artykul/${item.slug}`}
                              className="flex flex-col gap-1 group/item pb-3 border-b border-white/[0.03] last:border-0 last:pb-0"
                            >
                              <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-white/30 group-hover/item:text-[var(--gold)] transition-colors">
                                <span>{formatPolishDate(item.date)}</span>
                                <span className="w-1 h-1 rounded-full bg-white/10" />
                                <span>{item.readingTime} min</span>
                              </div>
                              <h5 className="text-[11px] font-bold leading-snug text-white/60 group-hover/item:text-white transition-colors line-clamp-2">
                                {item.title}
                              </h5>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-xs text-white/30 italic py-4">{group.emptyMsg}</p>
                  )}
                </div>

                {/* Action button */}
                <div className="mt-8 pt-4 border-t border-white/5 relative z-10">
                  <Link 
                    href={`/?kategoria=${encodeURIComponent(group.title === "Sołectwa" ? "Samorząd" : group.title.split(" ")[0])}#archiwum`}
                    className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--gold)] hover:text-white transition-colors"
                  >
                    Wszystkie wpisy
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
