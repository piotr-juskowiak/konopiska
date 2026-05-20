"use client"

import Link from "next/link"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useMemo, useState, useEffect } from "react"
import { CalendarDays, Search, ArrowUpDown, Clock, TrendingUp, AlignLeft, LayoutGrid } from "lucide-react"
import { categories, formatPolishDate, type NewsItem } from "@/lib/news-data"
import { NewsSidebar } from "./news-sidebar"
import { NewsGroups } from "./news-groups"

const categoryTone: Record<string, string> = {
  Ekologia: "text-[var(--gold)] bg-[var(--gold)]/10 border-[var(--gold)]/20",
  Edukacja: "text-[var(--gold)] bg-[var(--gold)]/10 border-[var(--gold)]/20",
  Wydarzenia: "text-[var(--gold)] bg-[var(--gold)]/10 border-[var(--gold)]/20",
  Samorząd: "text-[var(--gold)] bg-[var(--gold)]/10 border-[var(--gold)]/20",
  Kultura: "text-[var(--gold)] bg-[var(--gold)]/10 border-[var(--gold)]/20",
  Sport: "text-[var(--gold)] bg-[var(--gold)]/10 border-[var(--gold)]/20",
  Transport: "text-[var(--gold)] bg-[var(--gold)]/10 border-[var(--gold)]/20",
  Zdrowie: "text-[var(--gold)] bg-[var(--gold)]/10 border-[var(--gold)]/20",
  Fundusze: "text-[var(--gold)] bg-[var(--gold)]/10 border-[var(--gold)]/20",
  Społeczność: "text-[var(--gold)] bg-[var(--gold)]/10 border-[var(--gold)]/20",
}

function getCategoryTone(category?: string) {
  return categoryTone[category ?? ""] ?? "bg-slate-50 text-slate-600 border-slate-100"
}

type SortKey = "newest" | "oldest" | "az"

const sortOptions: { key: SortKey; label: string; icon: React.ElementType }[] = [
  { key: "newest", label: "Najnowsze", icon: Clock },
  { key: "oldest", label: "Najstarsze", icon: ArrowUpDown },
  { key: "az", label: "A–Z", icon: AlignLeft },
]

export function NewsList({ items }: { items: NewsItem[] }) {
  const router = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()

  const urlCategory = params.get("kategoria") ?? "Wszystkie"
  const [active, setActive] = useState(urlCategory)
  const [sort, setSort] = useState<SortKey>("newest")

  useEffect(() => { setActive(urlCategory) }, [urlCategory])

  useEffect(() => {
    const t = setTimeout(() => {
      const next = new URLSearchParams(Array.from(params.entries()))
      if (active && active !== "Wszystkie") next.set("kategoria", active)
      else next.delete("kategoria")
      const qs = next.toString()
      router.replace(`${pathname}${qs ? `?${qs}` : ""}#wiadomosci`, { scroll: false })
    }, 250)
    return () => clearTimeout(t)
  }, [active, params, pathname, router])

  const filtered = useMemo(() => {
    const base = items.filter((i) => active === "Wszystkie" || i.category === active)
    if (sort === "oldest") return [...base].sort((a, b) => a.date.localeCompare(b.date))
    if (sort === "az") return [...base].sort((a, b) => a.title.localeCompare(b.title, "pl"))
    return [...base].sort((a, b) => b.date.localeCompare(a.date))
  }, [active, sort, items])

  const categoryCounts = useMemo(() => {
    return categories.reduce<Record<string, number>>((acc, cat) => {
      acc[cat] = cat === "Wszystkie" ? items.length : items.filter((item) => item.category === cat).length
      return acc
    }, {})
  }, [items])

  return (
    <div id="wiadomosci" className="scroll-mt-28">
      <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-10">
        {/* Left Column: Header + Articles */}
        <div className="flex flex-col">
          {/* Header Section */}
          <div className="mb-8">
            {/* Title row */}
            <div className="flex items-end justify-between gap-4 mb-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-slate-100 shadow-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--imperial-blue)]/60">Dziennik Gminny</span>
                </div>
                <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--imperial-blue)] leading-[1.05]">
                  Najnowsze wiadomości
                </h2>
              </div>

              {/* Count badge */}
              <div className="flex items-center gap-2.5 bg-white border border-slate-100 shadow-sm rounded-2xl px-4 py-2.5 shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--imperial-blue)] text-white">
                  <LayoutGrid className="h-3.5 w-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Artykuły</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-serif font-black text-[var(--imperial-blue)]">{filtered.length}</span>
                    <span className="text-[9px] font-bold text-slate-300">/ {items.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sort row */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mr-1">Sortuj:</span>
              {sortOptions.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setSort(key)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] border transition-all ${
                    sort === key
                      ? "bg-[var(--imperial-blue)] text-white border-[var(--imperial-blue)] shadow-md"
                      : "bg-white text-slate-500 border-slate-100 hover:border-[var(--imperial-blue)]/30 hover:text-[var(--imperial-blue)]"
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  {label}
                </button>
              ))}
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`flex items-center gap-2 h-8 px-4 rounded-xl border text-[9px] font-bold uppercase tracking-[0.12em] transition-all ${
                    cat === active
                      ? "bg-[var(--imperial-blue)] text-white border-[var(--imperial-blue)] shadow-md"
                      : "bg-white text-slate-500 border-slate-100 hover:border-[var(--imperial-blue)]/20 hover:text-[var(--imperial-blue)]"
                  }`}
                >
                  {cat}
                  <span className={`rounded px-1 py-0.5 font-mono text-[8px] ${
                    cat === active ? "bg-white/15 text-white" : "bg-slate-50 text-slate-400"
                  }`}>
                    {categoryCounts[cat] ?? 0}
                  </span>
                </button>
              ))}
            </div>
          </div>

        {/* Main Content - Articles */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filtered.slice(0, 6).map((item, idx) => (
          <article
            key={item.slug}
            className="group relative flex flex-col h-full overflow-hidden rounded-[2.5rem] bg-white/70 backdrop-blur-md p-5 border border-slate-100 shadow-[0_8px_30px_rgba(15,23,42,0.02)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--gold)]/30 hover:shadow-[0_20px_45px_rgba(15,23,42,0.06)]"
          >
            <div className="flex flex-col h-full justify-between gap-5">
              <Link
                href={`/artykul/${item.slug}`}
                className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.6rem] bg-slate-50 border border-slate-100/50"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--imperial-blue)]/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </Link>

              <div className="flex flex-col flex-grow px-1">
                <div className="mb-4 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    <CalendarDays className="h-3.5 w-3.5 text-[var(--gold)]/80" />
                    {formatPolishDate(item.date)}
                  </div>
                </div>

                <h3 className="mb-3 font-serif text-lg sm:text-xl font-bold leading-snug text-[var(--imperial-blue)] transition-colors group-hover:text-[var(--gold)] line-clamp-2">
                  <Link href={`/artykul/${item.slug}`} className="block">
                    {item.title}
                  </Link>
                </h3>

                <p className="text-[10px] font-medium leading-relaxed text-slate-400 mb-2 line-clamp-2">
                  {item.excerpt}
                </p>
              </div>
            </div>
          </article>
          ))}
          </div>
        ) : (
          <div className="rounded-[3rem] border-2 border-dashed border-slate-100 bg-white/50 py-24 text-center backdrop-blur-sm">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 text-slate-200">
              <Search className="h-10 w-10" />
            </div>
            <h3 className="mb-2 font-serif text-xl font-bold text-[var(--imperial-blue)]">Brak wyników</h3>
            <p className="text-xs font-medium text-slate-400">Spróbuj wpisać inne hasło lub zmień kategorię.</p>
          </div>
        )}
        
        {/* Thematic Categories injected here */}
        <div className="mt-8">
          <NewsGroups />
        </div>
        
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <NewsSidebar />
        </div>
      </div>
    </div>
  )
}
