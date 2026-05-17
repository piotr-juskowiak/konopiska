"use client"

import Link from "next/link"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useMemo, useState, useEffect } from "react"
import { ArrowUpRight, Search, X, Calendar, Tag } from "lucide-react"
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

  const [featured, ...rest] = filtered

  return (
    <section
      id="archiwum"
      aria-labelledby="grid-heading"
      className="bg-[#f8fafd] paper-grain scroll-mt-28 py-16 lg:py-24 relative overflow-hidden"
    >
      {/* Decorative background blur */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--french-blue)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-[var(--gold)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6">
        {/* Controls Bar: Filters & Search */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Category filter */}
          <div
            role="tablist"
            aria-label="Kategorie"
            className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-slate-200 bg-slate-50/80 p-1 shadow-inner shadow-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((cat) => {
              const isActive = cat === active
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(cat)}
                  className={`inline-flex h-9 items-center justify-center whitespace-nowrap rounded-full px-4 text-[10px] font-bold uppercase tracking-[0.12em] transition-all duration-300 shrink-0 ${
                    isActive
                      ? "bg-white text-[var(--imperial-blue)] shadow-[0_8px_20px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/60"
                      : "text-slate-600 hover:bg-white/80 hover:text-[var(--imperial-blue)]"
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Search */}
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="flex h-11 w-full md:max-w-xs items-center gap-3 rounded-full border border-slate-200 bg-white px-4 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all focus-within:border-[var(--imperial-blue)]/30 focus-within:ring-4 focus-within:ring-[var(--imperial-blue)]/5 shrink-0"
          >
            <label htmlFor="grid-search" className="sr-only">
              Szukaj w artykułach
            </label>
            <Search
              aria-hidden
              className="h-4 w-4 text-slate-400 shrink-0"
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

        {(query || active !== "Wszystkie") && (
          <div className="mb-8 flex items-center gap-2">
             <div className="h-1.5 w-1.5 rounded-full bg-[var(--school-bus-yellow)] animate-pulse" />
             <p className="text-sm font-medium text-[var(--steel-azure)]">
               Znaleziono <span className="font-bold text-[var(--imperial-blue)]">{filtered.length}</span>{" "}
               {filtered.length === 1 ? "artykuł" : "artykułów"}
               {active !== "Wszystkie" && (
                 <>
                   {" "}
                   w kategorii <span className="font-bold text-[var(--imperial-blue)]">{active}</span>
                 </>
               )}
               {query && (
                 <>
                   {" "}
                   dla zapytania <span className="font-bold text-[var(--imperial-blue)]">„{query}”</span>
                 </>
               )}
               .
             </p>
          </div>
        )}

        {/* Featured card */}
        {featured && (
          <article className="group mb-16 grid overflow-hidden rounded-3xl border border-white/60 bg-white shadow-xl shadow-[var(--imperial-blue)]/5 lg:grid-cols-2">
            <Link
              href={`/artykul/${featured.slug}`}
              className="relative block aspect-[4/3] overflow-hidden bg-[var(--steel-azure)] lg:aspect-auto"
            >
              <img
                src={featured.image || "/placeholder.svg"}
                alt=""
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[var(--imperial-blue)]/80 via-transparent to-transparent opacity-80"
              />
              <div className="absolute left-6 top-6 flex items-center gap-2">
                <span className="rounded-full bg-[var(--gold)] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--imperial-blue)] shadow-lg">
                  Polecamy
                </span>
              </div>
            </Link>
            <div className="relative flex flex-col justify-center bg-[var(--imperial-blue)] p-8 sm:p-12 lg:p-16 overflow-hidden">
              <div className="absolute top-0 right-0 h-48 w-48 -translate-y-1/2 translate-x-1/2 rounded-full bg-[var(--french-blue)] opacity-50 blur-2xl" />
              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--school-bus-yellow)]">
                  <Calendar className="h-4 w-4" />
                  <time>{formatPolishDate(featured.date)}</time>
                  {featured.category && (
                    <>
                      <span className="mx-2 opacity-50">•</span>
                      <span>{featured.category}</span>
                    </>
                  )}
                </div>
                <h3 className="mb-6 font-serif text-3xl font-medium leading-tight text-white text-pretty sm:text-4xl lg:text-5xl">
                  <Link href={`/artykul/${featured.slug}`} className="transition-colors hover:text-[var(--gold)]">
                    {featured.title}
                  </Link>
                </h3>
                <p className="mb-10 max-w-xl text-base leading-relaxed text-[var(--steel-azure)] text-white/80 sm:text-lg">
                  {featured.excerpt}
                </p>
                <Link
                  href={`/artykul/${featured.slug}`}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--gold)] px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-[var(--imperial-blue)] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[var(--school-bus-yellow)] hover:shadow-[var(--school-bus-yellow)]/20"
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
              className="group flex flex-col overflow-hidden rounded-2xl border-t-4 border-t-[var(--school-bus-yellow)] bg-white shadow-lg shadow-[var(--imperial-blue)]/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[var(--imperial-blue)]/10"
            >
              <Link
                href={`/artykul/${item.slug}`}
                className="relative block aspect-[4/3] overflow-hidden bg-[var(--french-blue)]"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                  loading="lazy"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[var(--imperial-blue)]/60 via-transparent to-transparent opacity-50 transition-opacity group-hover:opacity-80"
                />
                {item.category && (
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--imperial-blue)] shadow-md backdrop-blur">
                    {item.category}
                  </span>
                )}
              </Link>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--french-blue)]">
                  <Calendar className="h-3.5 w-3.5" />
                  <time>{formatPolishDate(item.date)}</time>
                </div>
                <h3 className="mb-4 font-serif text-xl font-medium leading-snug text-[var(--imperial-blue)] text-pretty transition-colors group-hover:text-[var(--steel-azure)]">
                  <Link href={`/artykul/${item.slug}`}>
                    {item.title}
                  </Link>
                </h3>
                <p className="mb-8 line-clamp-3 text-sm leading-relaxed text-[var(--imperial-blue)]/70">
                  {item.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-5">
                  <Link
                    href={`/artykul/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[var(--imperial-blue)] transition-colors group-hover:text-[var(--gold)]"
                  >
                    Czytaj dalej
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <span aria-hidden className="h-px w-8 bg-[var(--french-blue)]/20 transition-all duration-300 group-hover:w-16 group-hover:bg-[var(--gold)]" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-8 rounded-3xl border border-dashed border-[var(--french-blue)]/20 bg-white/50 p-16 text-center backdrop-blur">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--french-blue)]/10">
               <Search aria-hidden className="h-8 w-8 text-[var(--french-blue)]" />
            </div>
            <p className="font-serif text-3xl font-medium text-[var(--imperial-blue)]">Brak wyników</p>
            <p className="mt-3 text-base text-[var(--imperial-blue)]/60 max-w-sm mx-auto">
              Nie znaleźliśmy artykułów pasujących do Twoich kryteriów. Spróbuj zmienić słowa kluczowe.
            </p>
            <button
              type="button"
              onClick={() => {
                setActive("Wszystkie")
                setQuery("")
              }}
              className="mt-8 inline-flex items-center rounded-full bg-[var(--imperial-blue)] px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-transform hover:-translate-y-0.5 hover:bg-[var(--french-blue)] shadow-lg hover:shadow-[var(--imperial-blue)]/20"
            >
              Wyczyść filtry
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

