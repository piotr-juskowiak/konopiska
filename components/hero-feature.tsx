"use client"

import Link from "next/link"
import { ArrowUpRight, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { formatPolishDate, type NewsItem } from "@/lib/news-data"
import { useState, useEffect, useCallback } from "react"

export function HeroFeature({ items }: { items: NewsItem[] }) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % items.length)
  }, [items.length])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [nextSlide, isPaused])

  if (!items || items.length === 0) return null

  return (
    <section 
      id="aktualnosci" 
      className="relative w-full bg-[var(--imperial-blue)] overflow-hidden min-h-[600px] lg:min-h-[750px] flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {items.map((item, idx) => (
          <div
            key={item.slug}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              idx === current ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={item.image || "/placeholder.svg"}
              alt=""
              className="h-full w-full object-cover"
            />
            {/* Dynamic Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--imperial-blue)] via-[var(--imperial-blue)]/60 to-transparent z-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--imperial-blue)] via-transparent to-transparent z-20" />
          </div>
        ))}
      </div>

      <div className="relative z-30 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-32 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Content Area */}
          <div className="lg:col-span-7 xl:col-span-8 relative">
            <div className="flex items-center gap-4 mb-8 animate-in fade-in slide-in-from-left-4 duration-700">
              <span className="h-px w-10 bg-[var(--gold)]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--gold)]">
                Najnowsze wieści
              </span>
            </div>

            <div className="relative min-h-[300px]">
              {items.map((item, idx) => (
                <div
                  key={item.slug}
                  className={`transition-all duration-700 absolute inset-0 ${
                    idx === current 
                      ? "opacity-100 translate-y-0 pointer-events-auto" 
                      : "opacity-0 translate-y-8 pointer-events-none"
                  }`}
                >
                  <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 mb-6">
                    <span className="flex items-center gap-2 text-[var(--school-bus-yellow)]">
                      <Clock className="h-3.5 w-3.5" />
                      {formatPolishDate(item.date)}
                    </span>
                    {item.category && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="px-2 py-0.5 rounded bg-white/10 text-white backdrop-blur-sm">{item.category}</span>
                      </>
                    )}
                  </div>

                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.1] text-white mb-8 text-balance drop-shadow-2xl">
                    <Link href={`/artykul/${item.slug}`} className="hover:text-[var(--gold)] transition-colors duration-300">
                      {item.title}
                    </Link>
                  </h1>

                  <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-2xl line-clamp-2 leading-relaxed">
                    {item.excerpt}
                  </p>

                  <Link
                    href={`/artykul/${item.slug}`}
                    className="inline-flex items-center gap-3 rounded-full bg-[var(--gold)] px-10 py-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--imperial-blue)] shadow-[0_15px_30px_-10px_rgba(255,213,0,0.3)] transition-all hover:scale-105 hover:bg-[var(--school-bus-yellow)] hover:shadow-[0_20px_40px_-10px_rgba(255,213,0,0.5)]"
                  >
                    Czytaj historię
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Thumbnails / Vertical Navigation */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-4 pl-12 border-l border-white/10">
            {items.map((item, idx) => (
              <button
                key={item.slug}
                onClick={() => setCurrent(idx)}
                className={`group relative flex items-center gap-5 p-4 text-left transition-all duration-500 rounded-2xl ${
                  idx === current 
                    ? "bg-white/10 border border-white/20 shadow-2xl backdrop-blur-md" 
                    : "hover:bg-white/5 border border-transparent"
                }`}
              >
                {/* Active Indicator Bar */}
                {idx === current && (
                  <div className="absolute -left-[3rem] top-1/2 -translate-y-1/2 w-1 h-12 bg-[var(--gold)] rounded-full shadow-[0_0_15px_var(--gold)]" />
                )}
                
                <div className={`relative w-20 h-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-500 ${
                  idx === current ? "border-[var(--gold)]" : "border-white/10 group-hover:border-white/30"
                }`}>
                  <img 
                    src={item.image || "/placeholder.svg"} 
                    className={`w-full h-full object-cover transition-transform duration-700 ${idx === current ? "scale-110" : "scale-100"}`} 
                    alt="" 
                  />
                </div>

                <div className="min-w-0">
                  <p className={`text-[9px] font-bold uppercase tracking-[0.2em] mb-2 transition-colors ${
                    idx === current ? "text-[var(--gold)]" : "text-white/40"
                  }`}>
                    {item.category || "Aktualności"}
                  </p>
                  <h3 className={`font-serif text-sm leading-snug line-clamp-2 transition-all ${
                    idx === current ? "text-white font-medium" : "text-white/60 group-hover:text-white"
                  }`}>
                    {item.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Controls Overlay */}
        <div className="mt-20 flex items-center justify-between lg:justify-start gap-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + items.length) % items.length)}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white transition-all hover:bg-white/10 hover:border-white/40 active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white transition-all hover:bg-white/10 hover:border-white/40 active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Progress Indicators */}
          <div className="flex gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  idx === current ? "w-10 bg-[var(--gold)]" : "w-4 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <div className="hidden lg:block text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 ml-auto">
            0{current + 1} / 0{items.length}
          </div>
        </div>
      </div>
    </section>
  )
}
