"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, Search, X } from "lucide-react"

const nav = [
  { label: "Aktualności", href: "/aktualnosci" },
  { label: "Archiwum", href: "/archiwum" },
  { label: "Newsletter", href: "/newsletter" },
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
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      {/* Top utility bar */}
      <div className="border-b border-border/60 bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-xs sm:px-6">
          <span className="hidden sm:inline tracking-wide uppercase opacity-90">
            Wydanie internetowe · woj. śląskie
          </span>
          <span className="font-mono opacity-90">{updatedAt}</span>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Magazyn Konopiska — strona główna">
          <span
            aria-hidden
            className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground font-serif text-lg font-semibold"
          >
            K
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
              Magazyn Konopiska
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Niezależny przegląd gminny
            </span>
          </span>
        </Link>

        <nav aria-label="Nawigacja główna" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm font-medium">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-foreground/80 transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Szukaj"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/80 transition hover:bg-secondary hover:text-foreground"
          >
            <Search className="h-4 w-4" />
          </button>
          <Link
            href="/newsletter"
            className="hidden sm:inline-flex items-center rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:bg-primary"
          >
            Newsletter
          </Link>
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
        <div className="border-t border-border lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm font-medium text-foreground/80 hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
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
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
          >
            <div className="flex items-center gap-3 px-5">
              <Search className="h-5 w-5 text-muted-foreground" aria-hidden />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Czego szukasz w Magazynie?"
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
