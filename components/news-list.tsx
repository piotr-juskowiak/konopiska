"use client"

import Link from "next/link"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useMemo, useState, useEffect } from "react"
import { CalendarDays, ChevronRight, Search, SlidersHorizontal, X, ArrowRight, LayoutGrid, List } from "lucide-react"
import { categories, formatPolishDate, type NewsItem } from "@/lib/news-data"
import { NewsSidebar } from "./news-sidebar"

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
  const pathname = usePathname()

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
      router.replace(`${pathname}${qs ? `?${qs}` : ""}#wiadomosci`, { scroll: false })
    }, 250)
    return () => clearTimeout(t)
  }, [active, query, params, pathname, router])

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
      {/* Premium Header Section */}
      <div className="mb-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white border border-slate-100 shadow-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--imperial-blue)]/60">
                Dziennik Gminny
              </span>
            </div>
            
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--imperial-blue)] leading-[1.05]">
              Najnowsze wiadomości
            </h2>
          </div>

          <div className="flex flex-col items-end gap-6">
            <div className="group relative flex items-center gap-3 bg-white p-1.5 pr-5 rounded-full border border-slate-100 shadow-lg transition-all hover:border-[var(--gold)]/20">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--imperial-blue)] text-white shadow-lg shadow-[var(--imperial-blue)]/20">
                <LayoutGrid className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Publikacje</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-serif font-black text-[var(--imperial-blue)]">{filtered.length}</span>
                  <span className="text-[9px] font-bold text-slate-300">/ {items.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-3 pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
              <div className="h-3 w-px bg-slate-200" />
            </div>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Szukaj informacji..."
              className="h-14 w-full rounded-2xl border border-[var(--imperial-blue)]/20 bg-white pl-16 pr-12 text-xs font-semibold text-[var(--imperial-blue)] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] outline-none transition-all focus:border-[var(--gold)]/40 focus:ring-4 focus:ring-[var(--gold)]/5 placeholder:text-slate-400"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-50 hover:text-[var(--imperial-blue)]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`group flex h-14 items-center justify-center gap-3 rounded-2xl px-8 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-xl ${
              showFilters 
                ? "bg-[var(--gold)] text-white shadow-[var(--gold)]/30" 
                : "bg-[var(--imperial-blue)] text-white shadow-[var(--imperial-blue)]/20 hover:bg-[#1e293b]"
            }`}
          >
            <SlidersHorizontal className={`h-3.5 w-3.5 transition-transform duration-500 ${showFilters ? "rotate-90" : ""}`} />
            Filtry
          </button>
        </div>

        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showFilters ? "max-h-[300px] opacity-100 mt-5" : "max-h-0 opacity-0 pointer-events-none"}`}>
          <div className="flex flex-wrap gap-2 p-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`flex h-10 items-center gap-3 rounded-xl border px-5 transition-all duration-300 ${
                  cat === active
                    ? "border-[var(--imperial-blue)] bg-[var(--imperial-blue)] text-white shadow-lg scale-105"
                    : "border-slate-100 bg-white text-slate-500 hover:border-[var(--imperial-blue)]/20 hover:text-[var(--imperial-blue)]"
                }`}
              >
                <span className="text-[9px] font-bold uppercase tracking-[0.15em]">{cat}</span>
                <span
                  className={`rounded-lg px-1.5 py-0.5 font-mono text-[8px] font-bold ${
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Articles */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.slice(0, 9).map((item, idx) => (
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
                
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-black/40 px-3 py-1.5 backdrop-blur-md border border-white/10 text-[8px] font-black uppercase tracking-[0.2em] text-white">
                  <div className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
                  Wiadomość
                </div>
              </Link>

              <div className="flex flex-col flex-grow px-1">
                <div className="mb-4 flex flex-wrap items-center gap-4">
                  <span className={`rounded-lg border px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.15em] shadow-sm ${getCategoryTone(item.category)}`}>
                    {item.category}
                  </span>
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

              <div className="flex items-center px-1 mt-auto">
                <Link
                  href={`/artykul/${item.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--imperial-blue)] px-5 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-white shadow-[0_4px_12px_rgba(15,23,42,0.1)] transition-all group-hover:bg-[var(--gold)] group-hover:text-[var(--imperial-blue)] group-hover:shadow-[0_8px_20px_rgba(181,155,51,0.2)] active:scale-95"
                >
                  Czytaj więcej
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <NewsSidebar />
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="rounded-[3rem] border-2 border-dashed border-slate-100 bg-white/50 py-24 text-center backdrop-blur-sm">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 text-slate-200">
            <Search className="h-10 w-10" />
          </div>
          <h3 className="mb-2 font-serif text-xl font-bold text-[var(--imperial-blue)]">Brak wyników</h3>
          <p className="text-xs font-medium text-slate-400">Spróbuj wpisać inne hasło lub zmień kategorię.</p>
        </div>
      )}
    </div>
  )
}
