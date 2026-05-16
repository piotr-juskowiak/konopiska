"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState, useEffect } from "react"
import { ArrowUpRight, Search, X, Calendar, Tag, ChevronRight } from "lucide-react"
import { categories, formatPolishDate, type NewsItem } from "@/lib/news-data"

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

  return (
    <div id="wiadomosci" className="scroll-mt-28">
      {/* Heading Area */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span aria-hidden className="h-px w-8 bg-[var(--gold)]" />
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--imperial-blue)]/60">
            Serwis informacyjny
          </p>
        </div>
        <h2 className="font-serif text-3xl font-medium tracking-tight text-[var(--imperial-blue)] sm:text-4xl">
          Najnowsze <span className="italic text-[var(--steel-azure)]">wiadomości</span>
        </h2>
      </div>

      {/* Search & Categories */}
      <div className="mb-10 flex flex-col gap-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--imperial-blue)]/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Szukaj w aktualnościach..."
            className="h-12 w-full rounded-xl border border-border bg-white pl-11 pr-4 text-sm outline-none focus:border-[var(--gold)] transition-colors"
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                cat === active
                  ? "bg-[var(--imperial-blue)] text-[var(--gold)] shadow-md"
                  : "bg-white border border-border text-[var(--imperial-blue)]/60 hover:border-[var(--gold)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* List Layout */}
      <div className="flex flex-col gap-6">
        {filtered.map((item) => (
          <article 
            key={item.slug} 
            className="group relative bg-white rounded-2xl border border-border/60 p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:border-[var(--steel-azure)]/30"
          >
            <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 items-center sm:items-start">
              <Link 
                href={`/artykul/${item.slug}`}
                className="relative shrink-0 w-full sm:w-56 aspect-[16/10] overflow-hidden rounded-xl bg-slate-100 shadow-inner"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl" />
              </Link>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-3">
                     <span className="px-2.5 py-1 rounded-lg bg-[var(--secondary)] text-[10px] font-bold uppercase tracking-widest text-[var(--secondary-foreground)]">
                       {item.category}
                     </span>
                     <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                       {formatPolishDate(item.date)}
                     </span>
                   </div>
                </div>
                
                <h3 className="font-serif text-xl sm:text-2xl font-medium leading-tight text-slate-800 mb-4 group-hover:text-[var(--primary)] transition-colors">
                  <Link href={`/artykul/${item.slug}`}>
                    {item.title}
                  </Link>
                </h3>
                
                <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-2">
                  {item.excerpt}
                </p>
                
                <Link
                  href={`/artykul/${item.slug}`}
                  className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--primary)] group-hover:gap-3 transition-all"
                >
                  Czytaj artykuł
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center rounded-3xl bg-white border border-dashed border-border">
          <p className="text-sm text-foreground/40">Nie znaleziono wiadomości dla wybranych kryteriów.</p>
        </div>
      )}
    </div>
  )
}
