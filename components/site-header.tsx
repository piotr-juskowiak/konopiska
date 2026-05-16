"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, Search, X, Facebook } from "lucide-react"

const nav = [
  { label: "Aktualności", href: "/aktualnosci" },
  { label: "Wydarzenia", href: "/?cat=Wydarzenia#archiwum" },
  { label: "Oceń Radnych", href: "/ocen-radnych" },
  { label: "Archiwum", href: "/archiwum" },
  { label: "Kontakt", href: "/kontakt" },
]

export function SiteHeader({ updatedAt }: { updatedAt: string }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

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
    const q = query.trim()
    setSearchOpen(false)
    router.push(q ? `/?q=${encodeURIComponent(q)}#archiwum` : `/#archiwum`)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      {/* Top utility bar */}
      <div className="border-b border-white/10 bg-[var(--imperial-blue)] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-[10px] sm:px-6">
          <div className="flex items-center gap-6">
            <span className="hidden sm:inline tracking-[0.2em] uppercase opacity-90 text-[var(--gold)] font-bold">
              Wydanie internetowe · woj. śląskie
            </span>
            <span className="font-mono opacity-80 text-white/80">{updatedAt}</span>
          </div>
          <div className="flex items-center gap-4">
             <a href="#" className="flex items-center gap-2 hover:text-[var(--gold)] transition-colors group">
               <Facebook className="h-3.5 w-3.5" />
               <span className="hidden md:inline font-bold uppercase tracking-widest">Śledź nas na Facebooku</span>
             </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-4 group" aria-label="Serwis Informacyjny Konopiska — strona główna">
          <img
            src="/logo.png"
            alt="Logo Serwis Informacyjny Konopiska"
            className="h-12 w-12 rounded-full object-cover shadow-[0_4px_12px_rgba(0,41,107,0.2)] transition-transform group-hover:scale-105"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-2xl font-medium tracking-tight text-[var(--imperial-blue)]">
              Serwis Informacyjny Konopiska
            </span>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--french-blue)]/60">
              Niezależny przegląd gminny
            </span>
          </span>
        </Link>

        <nav aria-label="Nawigacja główna" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative text-[var(--imperial-blue)] font-bold uppercase tracking-wider text-[11px] transition-colors hover:text-[var(--steel-azure)] group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[var(--gold)] transition-all group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-6">
          {/* Desktop Search Input */}
          <form 
            onSubmit={submitSearch}
            className="hidden md:flex items-center gap-3 bg-secondary/50 rounded-xl px-4 py-2 border border-transparent focus-within:border-[var(--gold)]/50 focus-within:bg-white transition-all w-64 xl:w-80"
          >
            <Search className="h-4 w-4 text-[var(--imperial-blue)]/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Szukaj w serwisie..."
              className="bg-transparent text-[11px] font-bold uppercase tracking-widest text-[var(--imperial-blue)] outline-none placeholder:text-[var(--imperial-blue)]/30 w-full"
            />
          </form>

          {/* Mobile Search Button */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Szukaj"
            className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-full bg-secondary/50 text-[var(--imperial-blue)] transition hover:bg-[var(--gold)]"
          >
            <Search className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="border-t border-border bg-white lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6 divide-y divide-border/50">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-xs font-bold uppercase tracking-widest text-[var(--imperial-blue)] hover:text-[var(--gold)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Search overlay remains same */}
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
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
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
            <div className="flex items-center justify-between gap-3 border-t border-border bg-card/60 px-5 py-3 text-xs text-muted-foreground">
              <span>
                Wciśnij <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono">Enter</kbd>, aby wyszukać
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
