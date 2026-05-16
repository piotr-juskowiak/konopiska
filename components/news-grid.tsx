"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState, useEffect } from "react"
import { ArrowUpRight, Search, X, Calendar, Tag } from "lucide-react"
import { categories, formatPolishDate, type NewsItem } from "@/lib/news-data"

export function NewsGrid({ items }: { items: NewsItem[] }) {
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
      router.replace(`/${qs ? `?${qs}` : ""}#archiwum`, { scroll: false })
    }, 250)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, query])

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
      className="border-t border-border bg-card/40 paper-grain scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        {/* Heading */}
        <div className="mb-10 flex flex-col gap-8 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-10 bg-primary" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
                Archiwum redakcji
              </p>
            </div>
            <h2
              id="grid-heading"
              className="mt-4 font-serif text-3xl font-medium tracking-tight text-foreground text-balance sm:text-4xl lg:text-5xl"
            >
              Wszystkie historie z gminy
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Przeglądaj publikacje według kategorii lub wyszukaj konkretny temat. Aktualizujemy
              bazę codziennie o nowe materiały redakcji.
            </p>
          </div>

          {/* Search */}
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="relative w-full md:max-w-sm"
          >
            <label htmlFor="grid-search" className="sr-only">
              Szukaj w artykułach
            </label>
            <Search
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              id="grid-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Szukaj artykułów…"
              className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-11 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Wyczyść"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </form>
        </div>

        {/* Category filter */}
        <div className="mb-10 flex items-center gap-3 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible">
          <span className="hidden items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground md:inline-flex">
            <Tag className="h-3.5 w-3.5" />
            Filtruj
          </span>
          <div role="tablist" aria-label="Kategorie" className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = cat === active
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(cat)}
                  className={[
                    "whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-widest transition",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-background text-foreground/70 hover:border-primary/40 hover:text-foreground",
                  ].join(" ")}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {(query || active !== "Wszystkie") && (
          <p className="mb-8 text-sm text-muted-foreground">
            Znaleziono <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "artykuł" : "artykułów"}
            {active !== "Wszystkie" && (
              <>
                {" "}
                w kategorii <span className="font-semibold text-foreground">{active}</span>
              </>
            )}
            {query && (
              <>
                {" "}
                dla zapytania <span className="font-semibold text-foreground">„{query}”</span>
              </>
            )}
            .
          </p>
        )}

        {/* Featured card */}
        {featured && (
          <article className="group mb-12 overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition hover:shadow-lg">
            <div className="grid lg:grid-cols-5">
              <Link
                href={`/artykul/${featured.slug}`}
                className="relative block aspect-[4/3] overflow-hidden bg-secondary lg:col-span-3 lg:aspect-auto"
              >
                <img
                  src={featured.image || "/placeholder.svg"}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-foreground/0 to-transparent"
                />
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground shadow-sm">
                    Polecamy
                  </span>
                  {featured.category && (
                    <span className="rounded-full bg-background/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-foreground backdrop-blur">
                      {featured.category}
                    </span>
                  )}
                </div>
              </Link>
              <div className="flex flex-col justify-center gap-5 p-6 lg:col-span-2 lg:p-10">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  <time>{formatPolishDate(featured.date)}</time>
                </div>
                <h3 className="font-serif text-2xl font-medium leading-tight text-foreground text-pretty sm:text-3xl">
                  <Link href={`/artykul/${featured.slug}`} className="transition-colors hover:text-primary">
                    {featured.title}
                  </Link>
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {featured.excerpt}
                </p>
                <Link
                  href={`/artykul/${featured.slug}`}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-background transition hover:bg-primary"
                >
                  Czytaj artykuł
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        )}

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {rest.map((item) => (
            <article
              key={item.slug}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              <Link
                href={`/artykul/${item.slug}`}
                className="relative block aspect-[4/3] overflow-hidden bg-secondary"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  loading="lazy"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80"
                />
                {item.category && (
                  <span className="absolute left-3 top-3 rounded-full bg-background/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-foreground shadow-sm backdrop-blur">
                    {item.category}
                  </span>
                )}
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <time>{formatPolishDate(item.date)}</time>
                </div>
                <h3 className="mt-3 font-serif text-lg font-medium leading-snug text-foreground text-pretty">
                  <Link href={`/artykul/${item.slug}`} className="transition-colors hover:text-primary">
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {item.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between pt-5">
                  <Link
                    href={`/artykul/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                  >
                    Czytaj dalej
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <span aria-hidden className="h-px w-10 bg-border transition-all group-hover:w-16 group-hover:bg-primary" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-border bg-background p-12 text-center">
            <Search aria-hidden className="mx-auto mb-3 h-8 w-8 text-muted-foreground/60" />
            <p className="font-serif text-xl text-foreground">Brak wyników</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Nie znaleźliśmy artykułów pasujących do Twoich kryteriów.
            </p>
            <button
              type="button"
              onClick={() => {
                setActive("Wszystkie")
                setQuery("")
              }}
              className="mt-5 inline-flex items-center rounded-full bg-foreground px-5 py-2 text-xs font-semibold uppercase tracking-widest text-background hover:bg-primary"
            >
              Wyczyść filtry
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
