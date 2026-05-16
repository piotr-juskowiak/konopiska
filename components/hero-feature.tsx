"use client"

import Link from "next/link"
import { ArrowUpRight, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { formatPolishDate, type NewsItem } from "@/lib/news-data"
import { useState, useEffect } from "react"

export function HeroFeature({ items }: { items: NewsItem[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [items.length])

  if (!items || items.length === 0) return null

  return (
    <section id="aktualnosci" className="relative w-full bg-[#001538] overflow-hidden">
      {/* Background with subtle animation */}
      <div className="absolute inset-0 z-0">
        {items.map((item, idx) => (
          <div
            key={item.slug}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={item.image || "/placeholder.svg"}
              alt=""
              className="h-full w-full object-cover opacity-30 mix-blend-overlay transition-transform duration-[10000ms] scale-100 animate-in zoom-in-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--imperial-blue)] via-[var(--imperial-blue)]/90 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--imperial-blue)] to-transparent" />
            <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-[var(--french-blue)] opacity-40 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/4" />
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mb-12 flex items-center gap-4">
          <span className="h-0.5 w-12 bg-[var(--gold)]" />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--school-bus-yellow)]">
            Najnowsze wieści
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-8 min-h-[350px] flex flex-col justify-center relative">
            {items.map((item, idx) => (
              <div
                key={item.slug}
                className={`transition-all duration-700 absolute inset-0 lg:relative ${
                  idx === current ? "opacity-100 translate-y-0 z-10 pointer-events-auto" : "opacity-0 translate-y-8 z-0 pointer-events-none"
                }`}
              >
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-[var(--gold)] mb-5">
                  <Clock className="h-4 w-4" />
                  <time>{formatPolishDate(item.date)}</time>
                  {item.category && (
                    <>
                      <span className="opacity-40">•</span>
                      <span className="bg-white/10 px-2.5 py-1 rounded-md backdrop-blur-sm text-white">{item.category}</span>
                    </>
                  )}
                </div>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] text-white mb-6 text-balance drop-shadow-lg">
                  <Link href={`/artykul/${item.slug}`} className="hover:text-[var(--school-bus-yellow)] transition-colors">
                    {item.title}
                  </Link>
                </h1>
                <p className="text-base sm:text-lg text-[var(--steel-azure)] text-white/80 mb-10 max-w-2xl line-clamp-3">
                  {item.excerpt}
                </p>
                <Link
                  href={`/artykul/${item.slug}`}
                  className="inline-flex w-fit items-center gap-3 rounded-full bg-[var(--gold)] px-8 py-4 text-xs font-bold uppercase tracking-widest text-[var(--imperial-blue)] shadow-[0_0_40px_-10px_var(--gold)] transition-all hover:scale-105 hover:bg-[var(--school-bus-yellow)]"
                >
                  Czytaj artykuł
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex lg:col-span-4 flex-col gap-3 pl-8 xl:pl-12 border-l border-white/10">
            {items.map((item, idx) => (
              <button
                key={item.slug}
                onClick={() => setCurrent(idx)}
                className={`text-left group relative p-4 transition-all duration-300 ${
                  idx === current
                    ? "bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md shadow-xl"
                    : "hover:bg-white/5 rounded-2xl border border-transparent"
                }`}
              >
                {idx === current && (
                  <div className="absolute -left-8 xl:-left-12 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-[var(--gold)] rounded-r-full shadow-[0_0_15px_var(--gold)]" />
                )}
                <div className="flex gap-4 items-center">
                   <div className={`w-16 h-16 shrink-0 overflow-hidden rounded-xl border transition-colors ${idx === current ? 'border-[var(--gold)]/50' : 'border-white/10'}`}>
                      <img src={item.image || "/placeholder.svg"} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                   </div>
                   <div>
                     <p className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 transition-colors ${idx === current ? 'text-[var(--gold)]' : 'text-[var(--gold)]/60'}`}>
                       {formatPolishDate(item.date)}
                     </p>
                     <h3 className={`font-serif text-sm leading-snug line-clamp-2 transition-colors ${idx === current ? "text-white" : "text-white/60 group-hover:text-white"}`}>
                       {item.title}
                     </h3>
                   </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile controls */}
        <div className="mt-72 sm:mt-64 flex lg:hidden items-center justify-between gap-4">
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + items.length) % items.length)}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 backdrop-blur-sm"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === current ? "w-8 bg-[var(--gold)] shadow-[0_0_10px_var(--gold)]" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % items.length)}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 backdrop-blur-sm"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
