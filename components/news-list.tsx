"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState, useEffect } from "react"
import { CalendarDays, ChevronRight, Search, SlidersHorizontal, X } from "lucide-react"
import { categories, formatPolishDate, type NewsItem } from "@/lib/news-data"

const categoryTone: Record<string, string> = {
  Ekologia: "bg-[var(--imperial-blue)] text-white ring-[var(--imperial-blue)]/10",
  Edukacja: "bg-[var(--imperial-blue)] text-white ring-[var(--imperial-blue)]/10",
  Wydarzenia: "bg-[var(--imperial-blue)] text-white ring-[var(--imperial-blue)]/10",
  Samorząd: "bg-[var(--imperial-blue)] text-white ring-[var(--imperial-blue)]/10",
  Kultura: "bg-[var(--imperial-blue)] text-white ring-[var(--imperial-blue)]/10",
  Sport: "bg-[var(--imperial-blue)] text-white ring-[var(--imperial-blue)]/10",
  Transport: "bg-[var(--imperial-blue)] text-white ring-[var(--imperial-blue)]/10",
  Zdrowie: "bg-[var(--imperial-blue)] text-white ring-[var(--imperial-blue)]/10",
  Fundusze: "bg-[var(--imperial-blue)] text-white ring-[var(--imperial-blue)]/10",
  Społeczność: "bg-[var(--imperial-blue)] text-white ring-[var(--imperial-blue)]/10",
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
  const [showFilters, setShowFilters] = useState(false)

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
      <div className="mb-12 relative">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--imperial-blue)]/60">
              Dziennik Gminny
            </span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-100 to-transparent" />
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="font-serif text-5xl sm:text-6xl font-medium text-[var(--imperial-blue)] leading-[1.1] tracking-tight mb-2">
              Najnowsze <span className="italic font-light text-[var(--imperial-blue)] drop-shadow-sm opacity-80">wiadomości</span>
            </h2>
            <p className="text-sm text-slate-400 font-medium max-w-lg">
              Najważniejsze informacje z regionu, zebrane w jednym miejscu specjalnie dla Ciebie.
            </p>
          </div>
          
          <div className="flex items-center gap-5 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm self-start md:self-end">
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">
                Baza publikacji
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-serif font-black text-[var(--imperial-blue)]">{filtered.length}</span>
                <span className="text-xs font-bold text-slate-300">/ {items.length}</span>
              </div>
            </div>
            <div className="h-10 w-px bg-slate-100" />
            <div className="p-2 rounded-xl bg-[var(--gold)]/10">
              <Search className="h-5 w-5 text-[var(--gold)]" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--primary)] transition-colors" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Czego dziś szukasz?"
              className="h-14 w-full rounded-2xl border-2 border-slate-200/40 bg-white pl-12 pr-12 text-sm font-bold text-[var(--imperial-blue)] shadow-[0_15px_45px_-15px_rgba(15,23,42,0.1)] outline-none transition-all focus:border-[var(--french-blue)]/50 focus:bg-white placeholder:text-slate-400 focus:shadow-[0_20px_50px_-10px_rgba(59,130,246,0.15)]"
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
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex h-14 items-center justify-center gap-3 rounded-2xl px-8 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
              showFilters 
                ? "bg-[var(--gold)] text-[var(--imperial-blue)] shadow-[0_15px_35px_-10px_rgba(253,230,138,0.5)]" 
                : "bg-[var(--imperial-blue)] text-white shadow-[0_15px_35px_-10px_rgba(15,23,42,0.3)] hover:bg-[#1e293b]"
            }`}
          >
            <SlidersHorizontal className={`h-4 w-4 transition-transform duration-500 ${showFilters ? "rotate-180" : ""}`} />
            Filtry
          </button>
        </div>

        {/* Expandable Filters Area */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showFilters ? "max-h-24 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
          <div className="news-filter-scroll flex items-center gap-2 overflow-x-auto pb-4 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`group flex h-10 shrink-0 items-center gap-3 rounded-xl border px-4 transition-all duration-300 ${
                  cat === active
                    ? "border-[var(--imperial-blue)] bg-[var(--imperial-blue)] text-[var(--gold)] shadow-lg scale-105"
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
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--imperial-blue)] animate-pulse" />
                  Fotoreportaż
                </div>
              </Link>

              <div className="flex flex-col justify-center py-2">
                <div className="mb-5 flex flex-wrap items-center gap-4">
                  <span className={`rounded-lg px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] shadow-sm ring-1 ring-inset ${getCategoryTone(item.category)}`}>
                    {item.category}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <CalendarDays className="h-3.5 w-3.5 text-[var(--imperial-blue)]" />
                    {formatPolishDate(item.date)}
                  </div>
                </div>

                <h3 className="mb-5 font-serif text-2xl font-bold leading-tight text-[var(--imperial-blue)] transition-colors group-hover:text-[var(--primary)] md:text-3xl line-clamp-2">
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
                    className="group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-[var(--imperial-blue)] px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all hover:pr-10"
                  >
                    <span className="relative z-10">Czytaj artykuł</span>
                    <ChevronRight className="absolute right-4 h-4 w-4 translate-x-2 opacity-0 transition-all group-hover/btn:translate-x-0 group-hover/btn:opacity-100 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--french-blue)] to-[var(--steel-azure)] opacity-0 transition-opacity group-hover/btn:opacity-100" />
                  </Link>
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
