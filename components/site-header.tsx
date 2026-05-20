"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Archive,
  CalendarDays,
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSun,
  Facebook,
  Mail,
  Menu,
  Newspaper,
  Search,
  ShieldCheck,
  Snowflake,
  Sun,
  Wind,
  X,
  Trophy,
  Landmark,
} from "lucide-react"
import { formatPolishDate, newsItems, type NewsItem } from "@/lib/news-data"

const nav = [
  { label: "Aktualności", href: "/aktualnosci", icon: Newspaper },
  { label: "Wydarzenia", href: "/wydarzenia", icon: CalendarDays },
  { label: "Sport", href: "/sport", icon: Trophy },
  { label: "Polityka", href: "/polityka", icon: Landmark },
  { label: "Kontakt", href: "/kontakt", icon: Mail },
]

function isNavItemActive(href: string, pathname: string) {
  const [path] = href.split("?")

  if (path === "/") return false

  return pathname === path || pathname.startsWith(`${path}/`)
}

function getWeatherIcon(code?: number | null) {
  if (code === 0) return Sun
  if (code === 1 || code === 2) return CloudSun
  if (code === 95 || code === 96 || code === 99) return CloudLightning
  if (code && code >= 51 && code <= 67) return CloudRain
  if (code && code >= 71 && code <= 86) return Snowflake
  return Cloud
}

function getWeatherLabel(code?: number | null) {
  if (code === 0) return "Słonecznie"
  if (code === 1 || code === 2) return "Przejaśnienia"
  if (code === 3) return "Pochmurno"
  if (code === 45 || code === 48) return "Mgła"
  if (code && code >= 51 && code <= 67) return "Deszcz"
  if (code && code >= 71 && code <= 86) return "Śnieg"
  if (code === 95 || code === 96 || code === 99) return "Burze"
  return "Pogoda"
}

function WeatherWidget() {
  const [weather, setWeather] = useState<{
    code: number | null
    temperature: number | null
    wind: number | null
    humidity: number | null
  }>({
    code: null,
    temperature: null,
    wind: null,
    humidity: null,
  })

  useEffect(() => {
    let active = true

    async function loadWeather() {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=50.72&longitude=19.01&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Europe%2FWarsaw",
          { cache: "no-store" },
        )
        const data = await response.json()

        if (!active) return

        setWeather({
          code: data.current?.weather_code ?? null,
          temperature:
            typeof data.current?.temperature_2m === "number" ? Math.round(data.current.temperature_2m) : null,
          wind: typeof data.current?.wind_speed_10m === "number" ? Math.round(data.current.wind_speed_10m) : null,
          humidity: data.current?.relative_humidity_2m ?? null,
        })
      } catch {
        if (!active) return
        setWeather({ code: null, temperature: null, wind: null, humidity: null })
      }
    }

    loadWeather()
    const interval = window.setInterval(loadWeather, 30 * 60 * 1000)

    return () => {
      active = false
      window.clearInterval(interval)
    }
  }, [])

  const Icon = getWeatherIcon(weather.code)

  return (
    <div className="group relative hidden h-8 items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 text-white/90 shadow-sm backdrop-blur-md transition-all hover:bg-white/20 md:flex">
      <div className="relative">
        <Icon className="h-4 w-4 text-[var(--gold)] drop-shadow-[0_0_8px_rgba(181,155,51,0.4)]" aria-hidden />
        <span className="absolute -right-1 -top-1 flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--gold)] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--gold)]"></span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs font-bold">
          {weather.temperature === null ? "--" : weather.temperature}°C
        </span>
        <div className="h-3 w-px bg-white/20" />
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">
          {getWeatherLabel(weather.code)}
        </span>
      </div>

      {/* Expanded Hover Tooltip */}
      <div className="pointer-events-none absolute left-0 top-11 w-48 translate-y-2 rounded-xl border border-white/10 bg-[var(--imperial-blue)]/95 p-4 opacity-0 shadow-2xl backdrop-blur-xl transition-all group-hover:translate-y-0 group-hover:opacity-100">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Warunki</span>
          <span className="text-[9px] font-bold text-[var(--gold)]">Konopiska</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-[8px] font-bold uppercase text-white/40">Wiatr</span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-white">
              <Wind className="h-3 w-3 text-[var(--gold)]/60" />
              {weather.wind ?? "--"} km/h
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[8px] font-bold uppercase text-white/40">Wilgoć</span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-white">
              <CloudRain className="h-3 w-3 text-[var(--gold)]/60" />
              {weather.humidity ?? "--"}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function SearchSuggestions({
  query,
  results,
  onArticleSelect,
  onSearchAll,
}: {
  query: string
  results: NewsItem[]
  onArticleSelect: (item: NewsItem) => void
  onSearchAll: () => void
}) {
  const hasQuery = query.trim().length >= 2

  if (!hasQuery) {
    return (
      <div className="px-6 py-10 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-300">
          <Search className="h-6 w-6" />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500">
          Szukaj w serwisie
        </p>
        <p className="mt-1 text-[10px] text-slate-400">
          Wpisz minimum 2 znaki, aby zobaczyć podpowiedzi
        </p>
      </div>
    )
  }

  return (
    <div className="max-h-[32rem] overflow-y-auto">
      {results.length > 0 ? (
        <div className="grid gap-1 p-2">
          <div className="px-4 py-2 text-[9px] font-black uppercase tracking-widest text-slate-400">
            Dopasowane artykuły ({results.length})
          </div>
          {results.map((item) => (
            <button
              key={item.slug}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => onArticleSelect(item)}
              className="group grid w-full grid-cols-[4.5rem_1fr] gap-4 rounded-xl p-3 text-left transition hover:bg-slate-50"
            >
              <div className="relative h-14 w-full overflow-hidden rounded-lg">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="rounded bg-[var(--imperial-blue)] px-2 py-0.5 text-[7px] font-black uppercase tracking-widest text-white shadow-sm ring-1 ring-white/10">
                    {item.category}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400">
                    {formatPolishDate(item.date)}
                  </span>
                </div>
                <h3 className="text-sm font-bold leading-tight text-[var(--imperial-blue)] transition-colors group-hover:text-[var(--gold)] line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="px-6 py-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-300">
            <X className="h-6 w-6" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500">
            Brak wyników
          </p>
        </div>
      )}

      <button
        type="button"
        onMouseDown={(event) => event.preventDefault()}
        onClick={onSearchAll}
        className="group flex w-full items-center justify-between border-t border-slate-100 bg-slate-50/50 px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--imperial-blue)] transition hover:bg-[var(--imperial-blue)] hover:text-white"
      >
        <span>Zobacz wszystkie wyniki</span>
        <Search className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
      </button>
    </div>
  )
}

export function SiteHeader({ updatedAt }: { updatedAt?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const [todayDate, setTodayDate] = useState("17 maja 2026")

  useEffect(() => {
    try {
      const today = new Date()
      setTodayDate(
        today.toLocaleDateString("pl-PL", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      )
    } catch (e) {
      // safe fallback
    }
  }, [])

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase()

    if (q.length < 2) return []

    return newsItems
      .filter((item) => {
        return (
          item.title.toLowerCase().includes(q) ||
          item.excerpt.toLowerCase().includes(q) ||
          (item.category ?? "").toLowerCase().includes(q)
        )
      })
      .slice(0, 5)
  }, [query])

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus()
  }, [searchOpen])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSearchOpen(false)
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  function submitSearch(e: React.FormEvent) {
    e.preventDefault()
    runSearch()
  }

  function runSearch() {
    const q = query.trim()
    setSearchOpen(false)
    setDesktopSearchOpen(false)
    router.push(q ? `/?q=${encodeURIComponent(q)}#wiadomosci` : `/#wiadomosci`)
  }

  function selectArticle(item: NewsItem) {
    setSearchOpen(false)
    setDesktopSearchOpen(false)
    setQuery("")
    router.push(`/artykul/${item.slug}`)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      {/* Top utility bar */}
      <div className="imperial-gradient border-b border-white/10 text-white">
        <div className="mx-auto flex max-w-[90rem] items-center justify-end gap-4 px-4 py-2.5 text-[10px] sm:px-6">
          <div className="flex shrink-0 items-center gap-3">
            <WeatherWidget />
            <a
              href="#"
              className="group inline-flex h-8 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 font-bold uppercase tracking-[0.16em] text-white/85 transition hover:border-[var(--gold)]/50 hover:bg-white/10 hover:text-[var(--gold)]"
            >
              <Facebook className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Facebook</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:gap-6">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--imperial-blue)] focus-visible:ring-offset-4"
          aria-label="Serwis Informacyjny Konopiska — strona główna"
        >
          <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white shadow-[0_10px_25px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/80 transition group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_32px_rgba(15,23,42,0.18)]">
            <img
              src="/logo.png"
              alt="Logo Serwis Informacyjny Konopiska"
              className="h-10 w-10 rounded-full object-cover"
            />
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="whitespace-nowrap font-serif text-xl font-semibold tracking-tight text-[var(--imperial-blue)] sm:text-2xl">
              Gmina Konopiska
            </span>
            <span className="mt-1 hidden text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--imperial-blue)]/60 sm:block">
              Niezależny przegląd gminny
            </span>
          </span>
        </Link>

        <nav aria-label="Nawigacja główna" className="hidden shrink-0 xl:block">
          <ul className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50/80 p-1 text-sm shadow-inner shadow-white">
            {nav.map((item) => {
              const isActive = isNavItemActive(item.href, pathname)

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`group inline-flex h-10 items-center gap-2 rounded-full px-3.5 text-[11px] font-bold uppercase tracking-[0.12em] transition ${
                      isActive
                        ? "bg-white text-[var(--imperial-blue)] shadow-[0_8px_20px_rgba(15,23,42,0.08)] ring-1 ring-slate-200"
                        : "text-slate-600 hover:bg-white/80 hover:text-[var(--imperial-blue)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Desktop Search Input */}
          <div className="relative hidden 2xl:block">
            <form
              onSubmit={submitSearch}
              role="search"
              className="flex h-11 w-72 items-center gap-3 rounded-full border border-slate-200 bg-white px-4 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all focus-within:border-[var(--imperial-blue)]/30 focus-within:ring-4 focus-within:ring-[var(--imperial-blue)]/5"
            >
              <Search className="h-4 w-4 text-slate-400" aria-hidden />
              <input
                type="text"
                value={query}
                onFocus={() => setDesktopSearchOpen(true)}
                onBlur={() => window.setTimeout(() => setDesktopSearchOpen(false), 120)}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setDesktopSearchOpen(true)
                }}
                placeholder="Szukaj w serwisie..."
                className="w-full bg-transparent text-xs font-semibold text-[var(--imperial-blue)] outline-none placeholder:text-slate-400"
              />
              {query && (
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => setQuery("")}
                  aria-label="Wyczyść wyszukiwanie"
                  className="text-slate-400 transition hover:text-[var(--imperial-blue)]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </form>

            {desktopSearchOpen && (
              <div className="absolute right-0 top-14 z-50 w-[26rem] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_22px_60px_rgba(15,23,42,0.18)]">
                <SearchSuggestions
                  query={query}
                  results={searchResults}
                  onArticleSelect={selectArticle}
                  onSearchAll={runSearch}
                />
              </div>
            )}
          </div>

          {/* Mobile Search Button */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Szukaj"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[var(--imperial-blue)] shadow-[0_8px_20px_rgba(15,23,42,0.06)] transition hover:border-[var(--gold)]/40 hover:text-[var(--gold)] 2xl:hidden"
          >
            <Search className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 imperial-gradient text-white shadow-[0_8px_20px_rgba(24,65,142,0.28)] transition hover:opacity-90 xl:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="border-t border-slate-200 bg-white/95 shadow-[0_18px_40px_rgba(15,23,42,0.08)] xl:hidden">
          <ul className="mx-auto grid max-w-[90rem] gap-2 px-4 py-4 sm:px-6">
            {nav.map((item) => {
              const isActive = isNavItemActive(item.href, pathname)

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] transition ${
                      isActive
                        ? "bg-slate-50 text-[var(--imperial-blue)] ring-1 ring-[var(--imperial-blue)]/15"
                        : "text-slate-600 hover:bg-slate-50 hover:text-[var(--imperial-blue)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {/* Search overlay */}
      {searchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Wyszukiwarka"
          className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/40 backdrop-blur-sm px-4 pt-24"
          onClick={() => setSearchOpen(false)}
        >
          <form
            role="search"
            onSubmit={submitSearch}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-lg border border-border bg-background shadow-2xl"
          >
            <div className="flex items-center gap-3 px-5">
              <Search className="h-5 w-5 text-muted-foreground" aria-hidden />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Czego szukasz w Serwisie?"
                className="h-16 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Zamknij wyszukiwarkę"
                className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="border-t border-border bg-white">
              <SearchSuggestions
                query={query}
                results={searchResults}
                onArticleSelect={selectArticle}
                onSearchAll={runSearch}
              />
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-border bg-card/60 px-5 py-3 text-xs text-muted-foreground">
              <span>
                Wyniki aktualizują się automatycznie. <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono">Enter</kbd> szuka pełnej listy
              </span>
              <span className="hidden sm:inline">
                <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono">⌘</kbd>{" "}
                <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono">K</kbd>
              </span>
            </div>
          </form>
        </div>
      )}
    </header>
  )
}
