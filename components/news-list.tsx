"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState, useEffect } from "react"
import { CalendarDays, ChevronRight, Search, SlidersHorizontal, X } from "lucide-react"
import { categories, formatPolishDate, type NewsItem } from "@/lib/news-data"

const categoryTone: Record<string, string> = {
  Ekologia: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  Edukacja: "bg-sky-50 text-sky-700 ring-sky-100",
  Wydarzenia: "bg-amber-50 text-amber-700 ring-amber-100",
  Samorząd: "bg-indigo-50 text-indigo-700 ring-indigo-100",
  Kultura: "bg-rose-50 text-rose-700 ring-rose-100",
  Sport: "bg-lime-50 text-lime-700 ring-lime-100",
  Transport: "bg-cyan-50 text-cyan-700 ring-cyan-100",
  Zdrowie: "bg-pink-50 text-pink-700 ring-pink-100",
  Fundusze: "bg-blue-50 text-blue-700 ring-blue-100",
  Społeczność: "bg-violet-50 text-violet-700 ring-violet-100",
}

function getCategoryTone(category?: string) {
  return categoryTone[category ?? ""] ?? "bg-slate-100 text-slate-700 ring-slate-200"
}

export function NewsList({ items }: { items: NewsItem[] }) {
  const router = useRouter()
  const params = useSearchParams()

  const urlCategory = params.get("kategoria") ?? "Wszystkie"
  const urlQuery = params.get("q") ?? ""

  const [active, setActive] = useState(urlCategory)
  const [query, setQuery] = useState(urlQuery)

  useEffect(() => {
    setActive(urlCategory)
  }, [urlCategory])
  useEffect(() => {
    setQuery(urlQuery)
  }, [urlQuery])

  useEffect(() => {
    const t = setTimeout(() => {
      const next = new URLSearchParams(Array.from(params.entries()))
      if (active && active !== "Wszystkie") next.set("kategoria", active)
      else next.delete("kategoria")
      if (query.trim()) next.set("q", query.trim())
      else next.delete("q")
      const qs = next.toString()
      router.replace(`/${qs ? `?${qs}` : ""}#wiadomosci`, { scroll: false })
    }, 250)
    return () => clearTimeout(t)
  }, [active, query, params, router])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((i) => {
      const matchCat = active === "Wszystkie" || i.category === active
      if (!matchCat) return false
      if (!q) return true
      return (
        i.title.toLowerCase().includes(q) ||
        i.excerpt.toLowerCase().includes(q) ||
        (i.category ?? "").toLowerCase().includes(q)
      )
    })
  }, [active, query, items])

  const categoryCounts = useMemo(() => {
    return categories.reduce<Record<string, number>>((acc, cat) => {
      acc[cat] = cat === "Wszystkie" ? items.length : items.filter((item) => item.category === cat).length
      return acc
    }, {})
  }, [items])

  return (
    <div id="wiadomosci" className="scroll-mt-28">
      <div className="mb-10 relative">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-[2px] w-12 bg-gradient-to-r from-[var(--gold)] to-transparent" />
          <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[var(--imperial-blue)]/40">
            Dziennik Gminny
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-[var(--imperial-blue)] leading-none tracking-tight">
            Najnowsze <span className="italic font-medium text-[var(--steel-azure)] drop-shadow-sm">wiadomości</span>
          </h2>
          <div className="flex flex-col items-start md:items-end gap-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Baza publikacji
            </p>
            <p className="font-mono text-xs font-bold text-[var(--imperial-blue)]">
              {filtered.length} / {items.length}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-12 space-y-6">
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--primary)] transition-colors" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Czego dziś szukasz?"
            className="h-14 w-full rounded-2xl border border-slate-200/60 bg-white pl-12 pr-12 text-sm font-medium text-[var(--imperial-blue)] shadow-[0_10px_40px_-10px_rgba(15,23,42,0.05)] outline-none transition-all focus:border-[var(--french-blue)]/30 focus:ring-8 focus:ring-[var(--french-blue)]/5 placeholder:text-slate-400"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-[var(--imperial-blue)]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex h-10 items-center gap-2 rounded-xl bg-[var(--imperial-blue)] px-4 text-[9px] font-black uppercase tracking-[0.2em] text-white shadow-lg">
            <SlidersHorizontal className="h-3.5 w-3.5 text-[var(--gold)]" />
            Filtry
          </div>
          <div className="news-filter-scroll flex flex-1 items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`group flex h-10 shrink-0 items-center gap-3 rounded-xl border px-4 transition-all duration-300 ${
                  cat === active
                    ? "border-[var(--imperial-blue)] bg-[var(--imperial-blue)] text-[var(--gold)] shadow-xl scale-105"
                    : "border-slate-200 bg-white text-slate-500 hover:border-[var(--french-blue)]/20 hover:text-[var(--imperial-blue)] hover:shadow-md"
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-widest">{cat}</span>
                <span
                  className={`rounded-full px-2 py-0.5 font-mono text-[9px] font-bold ${
                    cat === active ? "bg-white/10 text-white" : "bg-slate-50 text-slate-400 group-hover:text-slate-600 group-hover:bg-slate-100"
                  }`}
                >
                  {categoryCounts[cat] ?? 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-8">
        {filtered.map((item, idx) => (
          <article
            key={item.slug}
            className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-4 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.06)] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_-15px_rgba(15,23,42,0.12)] hover:bg-white"
          >
            <div className="grid gap-8 sm:grid-cols-[16rem_1fr] lg:grid-cols-[18rem_1fr]">
              <Link
                href={`/artykul/${item.slug}`}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 sm:aspect-auto"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--imperial-blue)]/40 via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
                
                {/* Image Label */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 backdrop-blur-md border border-white/30 text-[9px] font-black uppercase tracking-widest text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
                  Fotoreportaż
                </div>
              </Link>

              <div className="flex flex-col justify-center py-2">
                <div className="mb-5 flex flex-wrap items-center gap-4">
                  <span className={`rounded-lg px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] shadow-sm ring-1 ring-inset ${getCategoryTone(item.category)}`}>
                    {item.category}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <CalendarDays className="h-3.5 w-3.5 text-[var(--gold)]" />
                    {formatPolishDate(item.date)}
                  </div>
                </div>

                <h3 className="mb-5 font-serif text-2xl font-bold leading-tight text-[var(--imperial-blue)] transition-colors group-hover:text-[var(--primary)] md:text-3xl">
                  <Link href={`/artykul/${item.slug}`} className="block">
                    {item.title}
                  </Link>
                </h3>

                <p className="mb-8 line-clamp-2 text-sm leading-relaxed text-slate-500 md:text-base">
                  {item.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <Link
                    href={`/artykul/${item.slug}`}
                    className="group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[var(--imperial-blue)] px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all hover:pr-10"
                  >
                    <span className="relative z-10">Czytaj artykuł</span>
                    <ChevronRight className="absolute right-4 h-4 w-4 translate-x-2 opacity-0 transition-all group-hover/btn:translate-x-0 group-hover/btn:opacity-100 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--french-blue)] to-[var(--steel-azure)] opacity-0 transition-opacity group-hover/btn:opacity-100" />
                  </Link>
                  
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="" className="h-full w-full object-cover" />
                      </div>
                    ))}
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[var(--school-bus-yellow)] text-[9px] font-bold text-[var(--imperial-blue)]">
                      +12
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/50 py-24 text-center backdrop-blur-sm">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 text-slate-300">
            <Search className="h-10 w-10" />
          </div>
          <h3 className="mb-2 font-serif text-xl font-bold text-[var(--imperial-blue)]">Brak wyników</h3>
          <p className="text-sm font-medium text-slate-500">Nie znaleziono wiadomości dla wybranych kryteriów.</p>
        </div>
      )}
    </div>
  )
}
