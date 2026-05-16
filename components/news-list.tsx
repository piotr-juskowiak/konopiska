"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState, useEffect } from "react"
import { CalendarDays, ChevronRight, Search, SlidersHorizontal, X, ArrowRight } from "lucide-react"
import { categories, formatPolishDate, type NewsItem } from "@/lib/news-data"

const categoryTone: Record<string, string> = {
  Ekologia: "text-blue-600 bg-blue-50 border-blue-100",
  Edukacja: "text-blue-600 bg-blue-50 border-blue-100",
  Wydarzenia: "text-blue-600 bg-blue-50 border-blue-100",
  Samorząd: "text-blue-600 bg-blue-50 border-blue-100",
  Kultura: "text-blue-600 bg-blue-50 border-blue-100",
  Sport: "text-blue-600 bg-blue-50 border-blue-100",
  Transport: "text-blue-600 bg-blue-50 border-blue-100",
  Zdrowie: "text-blue-600 bg-blue-50 border-blue-100",
  Fundusze: "text-blue-600 bg-blue-50 border-blue-100",
  Społeczność: "text-blue-600 bg-blue-50 border-blue-100",
}

function getCategoryTone(category?: string) {
  return categoryTone[category ?? ""] ?? "bg-slate-50 text-slate-600 border-slate-100"
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
            <h2 className="font-serif text-5xl sm:text-6xl font-medium text-[var(--imperial-blue)] leading-[1.1] tracking-tight mb-4">
              Najnowsze <span className="italic font-light text-[var(--imperial-blue)] drop-shadow-sm opacity-80">wiadomości</span>
            </h2>
            <p className="text-sm text-slate-400 font-medium max-w-lg leading-relaxed">
              Najważniejsze informacje z regionu, zebrane w jednym miejscu specjalnie dla Ciebie.
            </p>
          </div>
          
          <div className="flex items-center gap-5 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm self-start md:self-end">
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
            <div className="p-2.5 rounded-2xl bg-[var(--gold)]/10 text-[var(--gold)]">
              <Search className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-14 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch">
          <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--imperial-blue)] transition-colors" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Czego dziś szukasz?"
              className="h-16 w-full rounded-3xl border-2 border-slate-100 bg-white pl-14 pr-14 text-sm font-bold text-[var(--imperial-blue)] shadow-[0_20px_50px_-15px_rgba(15,23,42,0.08)] outline-none transition-all focus:border-[var(--imperial-blue)]/20 focus:bg-white placeholder:text-slate-400 focus:shadow-[0_25px_60px_-10px_rgba(15,23,42,0.12)]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-[var(--imperial-blue)]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex h-16 items-center justify-center gap-3 rounded-3xl px-10 text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-500 shadow-xl ${
              showFilters 
                ? "bg-[var(--gold)] text-[var(--imperial-blue)] shadow-[var(--gold)]/20" 
                : "bg-[var(--imperial-blue)] text-white shadow-[var(--imperial-blue)]/10 hover:bg-[#1e293b]"
            }`}
          >
            <SlidersHorizontal className={`h-4 w-4 transition-transform duration-500 ${showFilters ? "rotate-180" : ""}`} />
            Filtry
          </button>
        </div>

        {/* Expandable Filters Area */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showFilters ? "max-h-24 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
          <div className="news-filter-scroll flex items-center gap-2 overflow-x-auto pb-4 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`group flex h-11 shrink-0 items-center gap-3 rounded-2xl border px-5 transition-all duration-300 ${
                  cat === active
                    ? "border-[var(--imperial-blue)] bg-[var(--imperial-blue)] text-white shadow-xl scale-105"
                    : "border-slate-100 bg-white text-slate-500 hover:border-[var(--imperial-blue)]/20 hover:text-[var(--imperial-blue)] hover:shadow-lg"
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{cat}</span>
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

      <div className="grid gap-10">
        {filtered.map((item, idx) => (
          <article
            key={item.slug}
            className="group relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white/60 p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] hover:bg-white"
          >
            <div className="grid gap-10 lg:grid-cols-[22rem_1fr]">
              <Link
                href={`/artykul/${item.slug}`}
                className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-slate-50 lg:aspect-auto"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--imperial-blue)]/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                
                {/* Image Label */}
                <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 backdrop-blur-xl border border-white/20 text-[9px] font-black uppercase tracking-[0.3em] text-white transition-transform group-hover:translate-x-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                  Fotoreportaż
                </div>
              </Link>

              <div className="flex flex-col justify-center">
                <div className="mb-6 flex flex-wrap items-center gap-6">
                  <span className={`rounded-xl border px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${getCategoryTone(item.category)}`}>
                    {item.category}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <CalendarDays className="h-4 w-4 text-[var(--imperial-blue)]/40" />
                    {formatPolishDate(item.date)}
                  </div>
                </div>

                <h3 className="mb-6 font-serif text-3xl font-bold leading-tight text-[var(--imperial-blue)] transition-colors group-hover:text-[var(--primary)] xl:text-4xl tracking-tight">
                  <Link href={`/artykul/${item.slug}`} className="block">
                    {item.title}
                  </Link>
                </h3>

                <p className="mb-8 line-clamp-3 text-base leading-relaxed text-slate-500/80">
                  {item.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <Link
                    href={`/artykul/${item.slug}`}
                    className="group/btn inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-[var(--imperial-blue)] transition-all hover:gap-6"
                  >
                    <span>Czytaj artykuł</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 border border-slate-100 transition-all group-hover/btn:bg-[var(--imperial-blue)] group-hover/btn:text-white group-hover/btn:border-[var(--imperial-blue)] group-hover/btn:shadow-lg">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-[3rem] border-2 border-dashed border-slate-100 bg-white/50 py-32 text-center backdrop-blur-sm">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 text-slate-200">
            <Search className="h-12 w-12" />
          </div>
          <h3 className="mb-3 font-serif text-2xl font-bold text-[var(--imperial-blue)]">Brak wyników</h3>
          <p className="text-sm font-medium text-slate-400">Spróbuj wpisać inne hasło lub zmień kategorię.</p>
        </div>
      )}
    </div>
  )
}
