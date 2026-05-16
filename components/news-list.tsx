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
      {/* Heading Area */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <span aria-hidden className="h-px w-8 bg-[var(--gold)]" />
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--imperial-blue)]/60">
            Serwis informacyjny
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-serif text-3xl font-semibold text-[var(--imperial-blue)] sm:text-4xl">
            Najnowsze <span className="italic text-[var(--steel-azure)]">wiadomości</span>
          </h2>
          <p className="text-xs font-semibold text-slate-500">
            {filtered.length} z {items.length} publikacji
          </p>
        </div>
      </div>

      {/* Search & Categories */}
      <div className="mb-10 border-y border-slate-200 py-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Szukaj w aktualnościach..."
            className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-12 text-sm font-medium text-[var(--imperial-blue)] shadow-[0_10px_30px_rgba(15,23,42,0.04)] outline-none transition focus:border-[var(--french-blue)]/50 focus:ring-4 focus:ring-[var(--french-blue)]/10 placeholder:text-slate-400"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Wyczyść wyszukiwanie"
              className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-[var(--imperial-blue)]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mt-5 flex items-center gap-3">
          <div className="hidden h-9 shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 sm:flex">
            <SlidersHorizontal className="h-3.5 w-3.5 text-[var(--french-blue)]" />
            Filtry
          </div>
          <div className="relative min-w-0 flex-1">
            <div
              role="tablist"
              aria-label="Filtr kategorii wiadomości"
              className="news-filter-scroll flex items-center gap-2 overflow-x-auto pb-3"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={cat === active}
                  onClick={() => setActive(cat)}
                  className={`group inline-flex h-9 shrink-0 items-center gap-2 rounded-lg border px-3.5 text-[10px] font-bold uppercase tracking-[0.14em] transition ${
                    cat === active
                      ? "border-[var(--imperial-blue)] bg-[var(--imperial-blue)] text-[var(--gold)] shadow-[0_10px_24px_rgba(15,23,42,0.16)]"
                      : "border-slate-200 bg-white text-slate-500 hover:border-[var(--french-blue)]/30 hover:text-[var(--imperial-blue)] hover:shadow-sm"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 font-mono text-[9px] ${
                      cat === active ? "bg-white/10 text-white/80" : "bg-slate-100 text-slate-400 group-hover:text-slate-600"
                    }`}
                  >
                    {categoryCounts[cat] ?? 0}
                  </span>
                </button>
              ))}
            </div>
            <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent" />
          </div>
        </div>
      </div>

      {/* List Layout */}
      <div className="flex flex-col gap-5">
        {filtered.map((item) => (
          <article
            key={item.slug}
            className="group relative overflow-hidden rounded-lg border border-slate-200/80 bg-white p-3 shadow-[0_18px_50px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--steel-azure)]/35 hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)]"
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--french-blue)] via-[var(--gold)] to-transparent opacity-0 transition group-hover:opacity-100"
            />
            <div className="grid gap-5 sm:grid-cols-[13.5rem_1fr] lg:grid-cols-[14.5rem_1fr]">
              <Link
                href={`/artykul/${item.slug}`}
                className="relative min-h-48 overflow-hidden rounded-md bg-slate-100 sm:min-h-full"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--imperial-blue)]/20 via-transparent to-transparent opacity-70" />
                <div className="absolute inset-0 rounded-md ring-1 ring-inset ring-black/5" />
              </Link>

              <div className="flex min-w-0 flex-col justify-between px-1 py-1 sm:px-0 lg:py-2">
                <div>
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className={`rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ring-1 ${getCategoryTone(item.category)}`}>
                      {item.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      <CalendarDays className="h-3.5 w-3.5 text-[var(--gold)]" />
                      {formatPolishDate(item.date)}
                    </span>
                  </div>

                  <h3 className="mb-4 font-serif text-xl font-semibold leading-tight text-[var(--imperial-blue)] transition-colors group-hover:text-[var(--primary)] sm:text-2xl">
                    <Link href={`/artykul/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h3>

                  <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-slate-500">
                    {item.excerpt}
                  </p>
                </div>

                <Link
                  href={`/artykul/${item.slug}`}
                  className="inline-flex w-fit items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--primary)] transition-all hover:text-[var(--imperial-blue)] group-hover:gap-3"
                >
                  Czytaj artykuł
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-secondary text-[var(--primary)] transition group-hover:bg-[var(--imperial-blue)] group-hover:text-white">
                    <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white py-20 text-center">
          <p className="text-sm font-medium text-slate-500">Nie znaleziono wiadomości dla wybranych kryteriów.</p>
        </div>
      )}
    </div>
  )
}
