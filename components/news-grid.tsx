"use client"

import Link from "next/link"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useMemo, useState, useEffect } from "react"
import { ArrowUpRight, Search, X, Calendar } from "lucide-react"
import { categories, formatPolishDate, type NewsItem } from "@/lib/news-data"

export function NewsGrid({ items }: { items: NewsItem[] }) {
  const router = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()

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
      router.replace(`${pathname}${qs ? `?${qs}` : ""}#archiwum`, { scroll: false })
    }, 250)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, query, pathname])

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

  // Count items per category dynamically
  const categoryCounts = useMemo(() => {
    return categories.reduce<Record<string, number>>((acc, cat) => {
      acc[cat] = cat === "Wszystkie" ? items.length : items.filter((item) => item.category === cat).length
      return acc
    }, {})
  }, [items])

  const [featured, ...rest] = filtered

  return (
    <section
      id="archiwum"
      aria-labelledby="grid-heading"
      className="bg-[#fcfcfa] paper-grain scroll-mt-28 py-16 lg:py-24 relative overflow-hidden border-t border-slate-100"
    >
      {/* Exquisite Accent Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--french-blue)]/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[var(--gold)]/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6">
        {/* Controls Bar: Filters & Search */}
        <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-slate-100 pb-10">
          {/* Category filter */}
          <div
            role="tablist"
            aria-label="Kategorie"
            className="flex max-w-full items-center gap-2 overflow-x-auto pb-3 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((cat) => {
              const isActive = cat === active
              const count = categoryCounts[cat] ?? 0
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(cat)}
                  className={`inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full px-5 text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 shrink-0 ${
                    isActive
                      ? "bg-[var(--imperial-blue)] text-white shadow-[0_10px_25px_rgba(15,23,42,0.18)]"
                      : "bg-white border border-slate-100 text-slate-500 hover:border-slate-300 hover:text-[var(--imperial-blue)] shadow-[0_4px_10px_rgba(0,0,0,0.02)]"
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`ml-2.5 rounded-lg px-2 py-0.5 font-mono text-[9px] font-bold ${
                    isActive ? "bg-white/10 text-white" : "bg-slate-50 text-slate-400"
                  }`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Search */}
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="flex h-13 w-full lg:max-w-sm items-center gap-3 rounded-2xl border border-slate-100 bg-white px-5 shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all focus-within:border-[var(--gold)]/30 focus-within:ring-4 focus-within:ring-[var(--gold)]/5 shrink-0"
          >
            <label htmlFor="grid-search" className="sr-only">
              Szukaj w artykułach
            </label>
            <Search
              aria-hidden
              className="h-4.5 w-4.5 text-slate-400 shrink-0"
            />
            <input
              id="grid-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Szukaj artykułów…"
              className="w-full bg-transparent text-xs font-semibold text-[var(--imperial-blue)] outline-none placeholder:text-slate-400"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Wyczyść"
                className="text-slate-400 transition hover:text-[var(--imperial-blue)] shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </form>
        </div>

        {/* Results count indicator */}
        {(query || active !== "Wszystkie") && (
          <div className="mb-10 flex items-center gap-3 bg-white/50 border border-slate-100 rounded-2xl p-4 w-fit shadow-sm backdrop-blur-sm">
             <div className="h-2 w-2 rounded-full bg-[var(--gold)] animate-pulse" />
             <p className="text-xs font-semibold text-slate-600">
               Znaleziono <span className="font-extrabold text-[var(--imperial-blue)]">{filtered.length}</span>{" "}
               {filtered.length === 1 ? "artykuł" : filtered.length > 1 && filtered.length < 5 ? "artykuły" : "artykułów"}
               {active !== "Wszystkie" && (
                 <>
                   {" "}w kategorii <span className="font-extrabold text-[var(--imperial-blue)]">{active}</span>
                 </>
               )}
               {query && (
                 <>
                   {" "}dla zapytania <span className="font-extrabold text-[var(--imperial-blue)]">„{query}”</span>
                 </>
               )}
               .
             </p>
          </div>
        )}

        {/* Featured card */}
        {featured && (
          <article className="group mb-20 relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-[0_30px_70px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_45px_90px_rgba(15,23,42,0.12)] grid lg:grid-cols-[1.1fr_0.9fr]">
            <Link
              href={`/artykul/${featured.slug}`}
              className="relative block aspect-[16/10] overflow-hidden bg-slate-100 lg:aspect-auto"
            >
              <img
                src={featured.image || "/placeholder.svg"}
                alt=""
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-103"
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80"
              />
              <div className="absolute left-6 top-6 flex items-center gap-2">
                <span className="rounded-xl bg-white/90 backdrop-blur border border-white/20 px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--imperial-blue)] shadow-md">
                  Główny artykuł
                </span>
              </div>
            </Link>
            
            <div className="relative flex flex-col justify-center bg-[#0d1527] p-8 sm:p-12 lg:p-16 overflow-hidden text-white">
              {/* Background ambient gold shine */}
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-[var(--gold)]/10 blur-[90px]" />
              
              <div className="relative z-10">
                <div className="mb-6 flex flex-wrap items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--gold)]">
                  <Calendar className="h-3.5 w-3.5" />
                  <time>{formatPolishDate(featured.date)}</time>
                  {featured.category && (
                    <>
                      <span className="opacity-30">•</span>
                      <span>{featured.category}</span>
                    </>
                  )}
                  {featured.readingTime && (
                    <>
                      <span className="opacity-30">•</span>
                      <span>{featured.readingTime} min czytania</span>
                    </>
                  )}
                </div>
                
                <h3 className="mb-6 font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl pr-4">
                  <Link href={`/artykul/${featured.slug}`} className="transition-colors hover:text-[var(--gold)]">
                    {featured.title}
                  </Link>
                </h3>
                
                <p className="mb-10 max-w-xl text-sm leading-relaxed text-slate-300 font-medium">
                  {featured.excerpt}
                </p>
                
                <Link
                  href={`/artykul/${featured.slug}`}
                  className="inline-flex w-fit items-center gap-2.5 rounded-full bg-[var(--gold)] px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--imperial-blue)] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#cbb03e] hover:shadow-[var(--gold)]/15 active:scale-95"
                >
                  Czytaj artykuł
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        )}

        {/* Cards grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item) => (
            <article
              key={item.slug}
              className="group flex flex-col overflow-hidden rounded-[2rem] border border-slate-100/80 bg-white shadow-[0_15px_45px_rgba(15,23,42,0.03)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(15,23,42,0.08)] hover:border-[var(--gold)]/30"
            >
              <Link
                href={`/artykul/${item.slug}`}
                className="relative block aspect-[16/10] overflow-hidden bg-slate-50"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-50 transition-opacity group-hover:opacity-75"
                />
                {item.category && (
                  <span className="absolute left-4 top-4 rounded-xl bg-white/90 px-3.5 py-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-[var(--imperial-blue)] shadow-md backdrop-blur border border-white/40">
                    {item.category}
                  </span>
                )}
              </Link>
              
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="mb-4 flex flex-wrap items-center gap-3 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                  <Calendar className="h-3.5 w-3.5 text-[var(--gold)]" />
                  <time>{formatPolishDate(item.date)}</time>
                  {item.readingTime && (
                    <>
                      <span className="opacity-50">•</span>
                      <span>{item.readingTime} min czytania</span>
                    </>
                  )}
                </div>
                
                <h3 className="mb-4 font-serif text-lg font-semibold leading-snug text-[var(--imperial-blue)] transition-colors group-hover:text-[var(--gold)]">
                  <Link href={`/artykul/${item.slug}`}>
                    {item.title}
                  </Link>
                </h3>
                
                <p className="mb-7 line-clamp-3 text-xs leading-relaxed text-slate-500 font-medium">
                  {item.excerpt}
                </p>
                
                <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-5">
                  <Link
                    href={`/artykul/${item.slug}`}
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-[var(--imperial-blue)] transition-colors group-hover:text-[var(--gold)]"
                  >
                    Czytaj artykuł
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-12 rounded-[2.5rem] border border-dashed border-slate-200 bg-white/50 p-16 text-center backdrop-blur-sm">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-300">
               <Search aria-hidden className="h-7 w-7" />
            </div>
            <p className="font-serif text-2xl font-semibold text-[var(--imperial-blue)]">Brak wyników</p>
            <p className="mt-2 text-xs text-slate-400 max-w-sm mx-auto font-medium">
              Nie znaleźliśmy artykułów pasujących do Twoich kryteriów. Spróbuj zmienić słowa kluczowe lub wybrać inną kategorię.
            </p>
            <button
              type="button"
              onClick={() => {
                setActive("Wszystkie")
                setQuery("")
              }}
              className="mt-8 inline-flex items-center rounded-full bg-[var(--imperial-blue)] px-8 py-3.5 text-[9px] font-black uppercase tracking-[0.2em] text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[var(--gold)] hover:text-[var(--imperial-blue)] hover:shadow-[var(--gold)]/10 active:scale-95"
            >
              Wyczyść filtry
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
