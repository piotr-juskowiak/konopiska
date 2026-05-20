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
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/40 to-white" />
      
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[var(--gold)]/8 blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-[var(--imperial-blue)]/5 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] min-h-[600px] lg:gap-10">

          {/* ─── LEFT: Main Slider ─── */}
          <div className="relative flex flex-col py-12 lg:py-16">

            {/* Premium meta bar */}
            <div className="flex items-center gap-3 mb-8 text-[10px] font-black uppercase tracking-[0.3em]">
              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-[var(--imperial-blue)]/8 to-[var(--gold)]/8 border border-[var(--gold)]/20 text-[var(--imperial-blue)] backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-[var(--gold)] animate-pulse" />
                Aktualności
              </span>
              <span className="text-slate-200">·</span>
              <span className="flex items-center gap-1.5 text-slate-500">
                <Clock className="h-3.5 w-3.5 text-[var(--gold)]" />
                {formatPolishDate(mainItem.date)}
              </span>
              {mainItem.category && (
                <>
                  <span className="text-slate-200">·</span>
                  <span className="px-2 py-0.5 rounded-lg bg-[var(--gold)]/10 text-[var(--gold)] font-bold">{mainItem.category}</span>
                </>
              )}
            </div>

            {/* Animated headline with premium styling */}
            <div className="relative min-h-[9rem] mb-8">
              {items.slice(0, totalSlides).map((item, idx) => (
                <div
                  key={item.slug + idx}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    idx === current
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-8 pointer-events-none"
                  }`}
                >
                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.2rem] font-bold leading-[1.15] text-[var(--imperial-blue)] mb-4">
                    <Link href={`/artykul/${item.slug}`} className="hover:text-[var(--gold)] transition-colors duration-300 relative group">
                      {item.title}
                      <span className="absolute bottom-0 left-0 h-1 bg-[var(--gold)] transition-all duration-300 group-hover:w-full" style={{width: "0%"}} />
                    </Link>
                  </h1>
                  <p className="text-base text-slate-500 leading-relaxed line-clamp-2 max-w-2xl font-light">
                    {item.excerpt}
                  </p>
                </div>
              ))}
            </div>

            {/* Premium hero image */}
            <div className="relative aspect-video overflow-hidden rounded-3xl border border-slate-100 shadow-[0_24px_64px_-12px_rgba(15,23,42,0.12)] mb-10 group">
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

            {/* Premium controls */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <Link
                href={`/artykul/${mainItem.slug}`}
                className="inline-flex items-center gap-3 rounded-2xl bg-[var(--imperial-blue)] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-[0_12px_32px_rgba(15,23,42,0.2)] transition-all hover:bg-[var(--gold)] hover:text-[var(--imperial-blue)] hover:shadow-[0_16px_40px_rgba(181,155,51,0.3)] hover:-translate-y-1 active:scale-95"
              >
                <span>Czytaj artykuł</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides)}
                    className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 transition hover:bg-white hover:border-[var(--gold)]/40 hover:text-[var(--gold)] active:scale-95 shadow-sm"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 transition hover:bg-white hover:border-[var(--gold)]/40 hover:text-[var(--gold)] active:scale-95 shadow-sm"
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
                          ? "w-8 h-2 bg-[var(--imperial-blue)]"
                          : "w-2 h-2 bg-slate-200 hover:bg-slate-300"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <span className="hidden sm:block font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 ml-2">
                  {String(current + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(totalSlides).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* ─── RIGHT: Side news list ─── */}
          <div className="hidden lg:flex flex-col py-12 lg:py-16 gap-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="h-1 w-6 bg-gradient-to-r from-[var(--gold)] to-[var(--gold)]/40" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">
                Pozostałe wiadomości
              </span>
            </div>

            <div className="flex flex-col gap-4 flex-1">
              {sideItems.map((item, idx) => (
                <Link
                  key={item.slug + idx}
                  href={`/artykul/${item.slug}`}
                  className="group flex gap-3 rounded-2xl border border-slate-100/80 bg-white/60 backdrop-blur-sm p-4 shadow-sm transition-all hover:border-[var(--gold)]/30 hover:shadow-md hover:bg-white"
                >
                  <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-lg border border-slate-100/60 bg-gradient-to-br from-slate-50 to-slate-100">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex flex-col justify-center min-w-0 flex-1">
                    {item.category && (
                      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[var(--gold)] mb-1.5 font-bold">
                        {item.category}
                      </span>
                    )}
                    <h3 className="font-serif text-sm font-semibold leading-snug text-[var(--imperial-blue)] group-hover:text-[var(--gold)] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-2 text-[8px] font-bold tracking-wider text-slate-400 uppercase">
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
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 transition hover:text-[var(--gold)] group"
              >
                Wszystkie aktualności
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
