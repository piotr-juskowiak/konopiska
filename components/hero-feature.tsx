"use client"

import Link from "next/link"
import { ArrowUpRight, Clock, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { formatPolishDate, type NewsItem } from "@/lib/news-data"
import { useState, useEffect, useCallback } from "react"

export function HeroFeature({ items }: { items: NewsItem[] }) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const totalSlides = Math.max(1, items.length - 3)

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [nextSlide, isPaused])

  if (!items || items.length === 0) return null

  const mainItem = items[current]
  const sideItems = [
    items[(current + 1) % items.length],
    items[(current + 2) % items.length],
    items[(current + 3) % items.length],
  ]

  return (
    <section
      id="aktualnosci"
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]" />
      
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[var(--gold)]/10 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1fr_380px] min-h-[550px] lg:gap-12">

          {/* LEFT: Main Slider */}
          <div className="relative flex flex-col py-14 lg:py-20">

            {/* Meta bar */}
            <div className="flex items-center gap-4 mb-6 text-[11px] font-bold uppercase tracking-[0.25em]">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white">
                <span className="h-2 w-2 rounded-full bg-[var(--gold)] animate-pulse" />
                Aktualnosci
              </span>
              <span className="flex items-center gap-2 text-white/60">
                <Clock className="h-4 w-4 text-[var(--gold)]" />
                {formatPolishDate(mainItem.date)}
              </span>
              {mainItem.category && (
                <span className="px-3 py-1 rounded-lg bg-[var(--gold)] text-[var(--imperial-blue)] font-black">{mainItem.category}</span>
              )}
            </div>

            {/* Headline */}
            <div className="relative min-h-[7rem] mb-6">
              {items.slice(0, totalSlides).map((item, idx) => (
                <div
                  key={item.slug + idx}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    idx === current
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-6 pointer-events-none"
                  }`}
                >
                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] text-white mb-4">
                    <Link href={`/artykul/${item.slug}`} className="hover:text-[var(--gold)] transition-colors duration-300">
                      {item.title}
                    </Link>
                  </h1>
                  <p className="text-base text-white/60 leading-relaxed line-clamp-2 max-w-xl">
                    {item.excerpt}
                  </p>
                </div>
              ))}
            </div>

            {/* Hero image - smaller aspect ratio */}
            <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-white/10 shadow-2xl mb-8 group">
              {items.slice(0, totalSlides).map((item, idx) => (
                <div
                  key={item.slug + "_img_" + idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    idx === current ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--imperial-blue)]/20 via-transparent to-transparent" />
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <Link
                href={`/artykul/${mainItem.slug}`}
                className="inline-flex items-center gap-3 rounded-xl bg-[var(--gold)] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--imperial-blue)] shadow-lg transition-all hover:bg-white hover:-translate-y-0.5 active:scale-95"
              >
                <span>Czytaj artykul</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides)}
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 transition hover:bg-white/10 hover:text-[var(--gold)] active:scale-95"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 transition hover:bg-white/10 hover:text-[var(--gold)] active:scale-95"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex gap-2 ml-2">
                  {Array.from({ length: totalSlides }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrent(idx)}
                      className={`transition-all duration-500 rounded-full ${
                        idx === current
                          ? "w-8 h-2 bg-[var(--gold)]"
                          : "w-2 h-2 bg-white/30 hover:bg-white/50"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <span className="hidden sm:block font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 ml-2">
                  {String(current + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(totalSlides).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Side news list */}
          <div className="hidden lg:flex flex-col py-14 lg:py-20 gap-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="h-1 w-6 bg-gradient-to-r from-[var(--gold)] to-[var(--gold)]/40" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/60">
                Pozostale wiadomosci
              </span>
            </div>

            <div className="flex flex-col gap-4 flex-1">
              {sideItems.map((item, idx) => (
                <Link
                  key={item.slug + idx}
                  href={`/artykul/${item.slug}`}
                  className="group flex gap-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 transition-all hover:border-[var(--gold)]/30 hover:bg-white/10"
                >
                  <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-lg border border-white/10">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col justify-center min-w-0 flex-1">
                    {item.category && (
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--gold)] mb-1.5">
                        {item.category}
                      </span>
                    )}
                    <h3 className="font-serif text-sm font-semibold leading-snug text-white group-hover:text-[var(--gold)] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-2 text-[9px] font-bold tracking-wider text-white/40 uppercase">
                      <Clock className="h-3 w-3" />
                      {formatPolishDate(item.date)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="pt-2 mt-auto">
              <Link
                href="/aktualnosci"
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/50 transition hover:text-[var(--gold)] group"
              >
                Wszystkie aktualnosci
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
