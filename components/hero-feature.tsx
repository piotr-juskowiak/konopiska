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
      className="relative w-full bg-white border-b border-slate-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] min-h-[580px] lg:divide-x divide-slate-100">

          {/* ─── LEFT: Main Slider ─── */}
          <div className="relative flex flex-col py-10 lg:py-14 pr-0 lg:pr-10">

            {/* Meta bar */}
            <div className="flex items-center gap-3 mb-6 text-[10px] font-black uppercase tracking-[0.25em]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--imperial-blue)]/5 text-[var(--imperial-blue)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
                Aktualności
              </span>
              <span className="text-slate-200">·</span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <Clock className="h-3 w-3 text-[var(--gold)]" />
                {formatPolishDate(mainItem.date)}
              </span>
              {mainItem.category && (
                <>
                  <span className="text-slate-200">·</span>
                  <span className="text-[var(--gold)]">{mainItem.category}</span>
                </>
              )}
            </div>

            {/* Animated headline */}
            <div className="relative min-h-[8rem] mb-5">
              {items.slice(0, totalSlides).map((item, idx) => (
                <div
                  key={item.slug + idx}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    idx === current
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-4 pointer-events-none"
                  }`}
                >
                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-bold leading-[1.1] text-[var(--imperial-blue)] mb-3">
                    <Link href={`/artykul/${item.slug}`} className="hover:text-[var(--gold)] transition-colors duration-300">
                      {item.title}
                    </Link>
                  </h1>
                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 max-w-xl">
                    {item.excerpt}
                  </p>
                </div>
              ))}
            </div>

            {/* Hero image */}
            <div className="relative aspect-[16/7] overflow-hidden rounded-[2rem] border border-slate-100 shadow-[0_16px_48px_-16px_rgba(15,23,42,0.1)] mb-8">
              {items.slice(0, totalSlides).map((item, idx) => (
                <div
                  key={item.slug + "_img_" + idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    idx === current ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--imperial-blue)]/10 to-transparent" />
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <Link
                href={`/artykul/${mainItem.slug}`}
                className="inline-flex items-center gap-2.5 rounded-xl bg-[var(--imperial-blue)] px-7 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-[0_8px_20px_rgba(15,23,42,0.15)] transition-all hover:bg-[var(--gold)] hover:text-[var(--imperial-blue)] hover:shadow-[0_12px_28px_rgba(181,155,51,0.25)] hover:-translate-y-0.5 active:scale-95"
              >
                Czytaj artykuł
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides)}
                  className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 transition hover:bg-slate-50 hover:border-slate-300 active:scale-95"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 transition hover:bg-slate-50 hover:border-slate-300 active:scale-95"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

                <div className="flex gap-1.5 ml-1">
                  {Array.from({ length: totalSlides }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrent(idx)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        idx === current
                          ? "w-8 bg-[var(--imperial-blue)]"
                          : "w-2.5 bg-slate-200 hover:bg-slate-300"
                      }`}
                    />
                  ))}
                </div>

                <span className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.3em] text-slate-300 ml-1">
                  0{current + 1}&nbsp;/&nbsp;0{totalSlides}
                </span>
              </div>
            </div>
          </div>

          {/* ─── RIGHT: Side news list ─── */}
          <div className="hidden lg:flex flex-col py-10 lg:py-14 pl-10 gap-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-0.5 w-5 bg-[var(--gold)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                Pozostałe wiadomości
              </span>
            </div>

            <div className="flex flex-col gap-4 flex-1">
              {sideItems.map((item, idx) => (
                <Link
                  key={item.slug + idx}
                  href={`/artykul/${item.slug}`}
                  className="group flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:border-[var(--gold)]/20 hover:shadow-md"
                >
                  <div className="relative w-24 h-16 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col justify-center min-w-0 flex-1">
                    {item.category && (
                      <span className="text-[8px] font-black uppercase tracking-[0.25em] text-[var(--gold)] mb-1">
                        {item.category}
                      </span>
                    )}
                    <h3 className="font-serif text-sm font-semibold leading-snug text-[var(--imperial-blue)] group-hover:text-[var(--gold)] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1.5 text-[9px] font-bold tracking-wider text-slate-300 uppercase">
                      <Clock className="h-3 w-3" />
                      {formatPolishDate(item.date)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/aktualnosci"
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 transition hover:text-[var(--gold)] group"
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
