"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState, useEffect } from "react"
import { CalendarDays, ChevronRight, Search, SlidersHorizontal, X, ArrowRight, LayoutGrid, List } from "lucide-react"
import { categories, formatPolishDate, type NewsItem } from "@/lib/news-data"

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
      {/* Redesigned Premium Header Section */}
      <div className="mb-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-slate-100 shadow-sm">
              <div className="h-2 w-2 rounded-full bg-[var(--gold)] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--imperial-blue)]/60">
                Dziennik Gminny
              </span>
            </div>
            
            <h2 className="font-serif text-5xl sm:text-6xl font-medium text-[var(--imperial-blue)] leading-[1.05] tracking-tighter">
              Najnowsze <br />
              <span className="font-light text-[var(--imperial-blue)] drop-shadow-sm opacity-80">wiadomości</span>
            </h2>
            
            <p className="text-base text-slate-400 font-medium max-w-md leading-relaxed">
              Odkryj historie, które kształtują naszą gminę każdego dnia.
            </p>
          </div>

          <div className="flex flex-col items-end gap-6">
            {/* Stats Badge */}
            <div className="group relative flex items-center gap-4 bg-white p-2 pr-6 rounded-full border border-slate-100 shadow-xl transition-all hover:border-[var(--gold)]/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--imperial-blue)] text-white shadow-lg shadow-[var(--imperial-blue)]/20">
                <LayoutGrid className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Publikacje</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-serif font-black text-[var(--imperial-blue)]">{filtered.length}</span>
                  <span className="text-[10px] font-bold text-slate-300">/ {items.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Improved Search and Filters Bar */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-4 pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
              <div className="h-4 w-px bg-slate-200" />
            </div>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Czego dziś szukasz w Konopiskach?"
              className="h-16 w-full rounded-3xl border border-slate-200 bg-white pl-20 pr-14 text-sm font-semibold text-[var(--imperial-blue)] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] outline-none transition-all focus:border-[var(--gold)]/40 focus:ring-4 focus:ring-[var(--gold)]/5 placeholder:text-slate-400"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-5 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-2xl text-slate-400 transition hover:bg-slate-50 hover:text-[var(--imperial-blue)]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`group flex h-16 items-center justify-center gap-4 rounded-3xl px-10 text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-500 shadow-2xl ${
              showFilters 
                ? "bg-[var(--gold)] text-white shadow-[var(--gold)]/30" 
                : "bg-[var(--imperial-blue)] text-white shadow-[var(--imperial-blue)]/20 hover:bg-[#1e293b] hover:-translate-y-0.5"
            }`}
          >
            <SlidersHorizontal className={`h-4 w-4 transition-transform duration-500 ${showFilters ? "rotate-90" : ""}`} />
            Filtry
          </button>
        </div>

        {/* Category Filters Grid */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showFilters ? "max-h-[300px] opacity-100 mt-6" : "max-h-0 opacity-0 pointer-events-none"}`}>
          <div className="flex flex-wrap gap-2 p-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`flex h-11 items-center gap-3 rounded-2xl border px-6 transition-all duration-300 ${
                  cat === active
                    ? "border-[var(--imperial-blue)] bg-[var(--imperial-blue)] text-white shadow-xl scale-105"
                    : "border-slate-100 bg-white text-slate-500 hover:border-[var(--imperial-blue)]/20 hover:text-[var(--imperial-blue)] hover:shadow-lg"
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{cat}</span>
                <span
                  className={`rounded-lg px-2 py-0.5 font-mono text-[9px] font-bold ${
                    cat === active ? "bg-white/10 text-white" : "bg-slate-50 text-slate-400"
                  }`}
                >
                  {categoryCounts[cat] ?? 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-12">
        {filtered.map((item, idx) => (
          <article
            key={item.slug}
            className="group relative overflow-hidden rounded-[3rem] border border-slate-100 bg-white/50 p-6 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_50px_90px_-20px_rgba(0,0,0,0.12)] hover:bg-white"
          >
            <div className="grid gap-10 lg:grid-cols-[18rem_1fr]">
              <Link
                href={`/artykul/${item.slug}`}
                className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] bg-slate-50 lg:aspect-[4/3] lg:h-64"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--imperial-blue)]/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                
                {/* Image Label Overlay */}
                <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-black/40 px-5 py-2.5 backdrop-blur-xl border border-white/20 text-[10px] font-black uppercase tracking-[0.3em] text-white transition-all group-hover:translate-x-2">
                  <div className="h-2 w-2 rounded-full bg-[var(--gold)]" />
                  Fotoreportaż
                </div>
              </Link>

              <div className="flex flex-col justify-center py-4">
                <div className="mb-8 flex flex-wrap items-center gap-8">
                  <span className={`rounded-2xl border px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${getCategoryTone(item.category)}`}>
                    {item.category}
                  </span>
                  <div className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
                    <CalendarDays className="h-4 w-4 text-[var(--gold)]" />
                    {formatPolishDate(item.date)}
                  </div>
                </div>

                <h3 className="mb-6 font-serif text-3xl font-semibold leading-tight text-[var(--imperial-blue)] transition-colors group-hover:text-[var(--gold)] xl:text-4xl tracking-tighter">
                  <Link href={`/artykul/${item.slug}`} className="block">
                    {item.title}
                  </Link>
                </h3>

                <p className="mb-10 line-clamp-3 text-lg leading-relaxed text-slate-500/80 font-medium">
                  {item.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <Link
                    href={`/artykul/${item.slug}`}
                    className="group/btn inline-flex items-center gap-5 text-[11px] font-black uppercase tracking-[0.3em] text-[var(--imperial-blue)] transition-all hover:gap-8"
                  >
                    <span className="relative">
                      Czytaj artykuł
                      <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-[var(--gold)] transition-all group-hover/btn:w-full" />
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 border border-slate-100 transition-all group-hover/btn:bg-[var(--imperial-blue)] group-hover/btn:text-white group-hover/btn:border-[var(--imperial-blue)] group-hover/btn:shadow-[0_15px_30px_-5px_rgba(15,23,42,0.3)]">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-[4rem] border-2 border-dashed border-slate-100 bg-white/50 py-32 text-center backdrop-blur-sm">
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
