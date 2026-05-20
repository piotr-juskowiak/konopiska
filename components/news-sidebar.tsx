"use client"

import { MessageSquare, Megaphone, TrendingUp, ChevronRight, Sun, Cloud, CloudRain, CloudSnow, Wind, Droplets, CloudLightning, CloudDrizzle } from "lucide-react"

// Mock data for announcements
const ugAnnouncements = [
  {
    id: 1,
    title: "Harmonogram wywozu odpadów w czerwcu",
    tag: "Harmonogram",
    date: "15.05.2026",
  },
  {
    id: 2,
    title: "Przerwy w dostawie wody przy ul. Lipowej i Leśnej",
    tag: "Ważne",
    date: "14.05.2026",
  },
  {
    id: 3,
    title: "Bezpłatne szczepienia dla seniorów 65+",
    tag: "Medycyna",
    date: "12.05.2026",
  },
]

// Mock data for most commented articles
const mostCommentedArticles = [
  {
    id: 1,
    title: "EkoStrefa w SP w Kopalni oficjalnie otwarta",
    comments: 24,
  },
  {
    id: 2,
    title: "Otwarte badania profilaktyczne w gminie",
    comments: 18,
  },
  {
    id: 3,
    title: "Aleksandryjski Ogród Nauki zaprasza",
    comments: 16,
  },
  {
    id: 4,
    title: "Zmiany w Komunikacji Jurajskiej",
    comments: 12,
  },
]

// 14-day weather forecast mock data
const weatherDays = [
  { day: "Dziś",   icon: "sun",        high: 22, low: 13, rain: 0  },
  { day: "Jut.",   icon: "cloud",      high: 19, low: 11, rain: 10 },
  { day: "Śr",     icon: "rain",       high: 16, low: 10, rain: 80 },
  { day: "Czw",    icon: "drizzle",    high: 15, low: 9,  rain: 60 },
  { day: "Pt",     icon: "cloud",      high: 18, low: 11, rain: 20 },
  { day: "Sob",    icon: "sun",        high: 23, low: 14, rain: 0  },
  { day: "Nd",     icon: "sun",        high: 25, low: 15, rain: 0  },
  { day: "Pn",     icon: "cloud",      high: 21, low: 13, rain: 15 },
  { day: "Wt",     icon: "thunder",    high: 17, low: 10, rain: 70 },
  { day: "Śr",     icon: "rain",       high: 14, low: 9,  rain: 85 },
  { day: "Czw",    icon: "cloud",      high: 16, low: 10, rain: 30 },
  { day: "Pt",     icon: "sun",        high: 20, low: 12, rain: 5  },
  { day: "Sob",    icon: "sun",        high: 24, low: 14, rain: 0  },
  { day: "Nd",     icon: "cloud",      high: 22, low: 13, rain: 10 },
]

function WeatherIcon({ icon, size = 16 }: { icon: string; size?: number }) {
  const cls = `shrink-0`
  const style = { width: size, height: size }
  switch (icon) {
    case "sun":      return <Sun       className={cls} style={style} />
    case "cloud":    return <Cloud     className={cls} style={style} />
    case "rain":     return <CloudRain className={cls} style={style} />
    case "snow":     return <CloudSnow className={cls} style={style} />
    case "thunder":  return <CloudLightning className={cls} style={style} />
    case "drizzle":  return <CloudDrizzle  className={cls} style={style} />
    default:         return <Sun       className={cls} style={style} />
  }
}

function weatherIconColor(icon: string) {
  switch (icon) {
    case "sun":     return "text-amber-400"
    case "cloud":   return "text-slate-300"
    case "rain":    return "text-blue-400"
    case "drizzle": return "text-blue-300"
    case "thunder": return "text-violet-400"
    case "snow":    return "text-sky-200"
    default:        return "text-amber-400"
  }
}

export function NewsSidebar() {
  return (
    <aside className="sticky top-10 space-y-8 pb-10">
      
      {/* Advertisement Section - Minimalist */}
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-100 min-h-[280px] flex items-center justify-center text-center p-8 transition-colors hover:bg-slate-200 cursor-pointer">
        <div className="absolute inset-0 border-2 border-slate-200/50 rounded-[2rem] m-2 pointer-events-none" />
        <div className="space-y-4">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
            Przestrzeń Reklamowa
          </p>
          <div className="h-px w-12 bg-slate-300 mx-auto" />
          <p className="text-sm text-slate-500 font-medium">
            Zarezerwuj to miejsce dla swojej firmy
          </p>
        </div>
      </div>

      {/* UG Announcements */}
      <div className="space-y-6 bg-gradient-to-br from-[var(--imperial-blue)] to-[var(--imperial-blue-dark)] p-8 rounded-[2rem] text-white shadow-xl shadow-[var(--imperial-blue)]/10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 shadow-inner">
            <Megaphone className="h-5 w-5 text-[var(--gold)]" />
          </div>
          <h3 className="font-serif text-xl font-bold text-white">
            Ogłoszenia UG
          </h3>
        </div>
        
        <div className="flex flex-col gap-6 pl-5 border-l-2 border-white/10">
          {ugAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              className="group flex flex-col gap-1.5 cursor-pointer relative"
            >
              <div className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-white/30 group-hover:bg-[var(--gold)] transition-colors shadow-sm" />
              
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-[0.1em] text-[var(--gold)]">
                  {announcement.tag}
                </span>
                <span className="text-xs font-medium text-white/50">
                  {announcement.date}
                </span>
              </div>
              <p className="text-sm font-semibold text-white/90 leading-snug group-hover:text-white transition-colors">
                {announcement.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Most Commented Articles */}
      <div className="space-y-6 bg-gradient-to-br from-[var(--imperial-blue)] to-[var(--imperial-blue-dark)] p-8 rounded-[2rem] text-white shadow-xl shadow-[var(--imperial-blue)]/10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 shadow-inner">
            <TrendingUp className="h-5 w-5 text-[var(--gold)]" />
          </div>
          <h3 className="font-serif text-xl font-bold text-white">
            Najczęściej czytane
          </h3>
        </div>
        
        <div className="flex flex-col gap-5">
          {mostCommentedArticles.map((article, idx) => (
            <div
              key={article.id}
              className="group flex items-start gap-4 cursor-pointer"
            >
              <div className="text-3xl font-serif font-black text-white/20 group-hover:text-[var(--gold)] transition-colors leading-none pt-1">
                {idx + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors leading-snug">
                  {article.title}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <MessageSquare className="h-4 w-4 text-white/30" />
                  <span className="text-xs font-medium text-white/50">
                    {article.comments} komentarzy
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 14-Day Weather Widget */}
      <div className="bg-gradient-to-br from-[var(--imperial-blue)] to-[var(--imperial-blue-dark)] p-6 rounded-[2rem] text-white shadow-xl shadow-[var(--imperial-blue)]/10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 shadow-inner">
              <Sun className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-white leading-tight">Pogoda</h3>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">Konopiska · 14 dni</p>
            </div>
          </div>
          <button className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-[var(--gold)] hover:text-[var(--imperial-blue-dark)] transition-colors">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Today's highlight */}
        <div className="flex items-center justify-between bg-white/8 rounded-2xl px-4 py-3 mb-4 border border-white/10">
          <div className="flex items-center gap-3">
            <Sun className="h-8 w-8 text-amber-400" />
            <div>
              <p className="text-2xl font-black text-white">22°</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/50">Słonecznie</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 text-[11px] font-semibold text-white/60">
            <span className="flex items-center gap-1"><Droplets className="h-3 w-3 text-blue-300" /> 0%</span>
            <span className="flex items-center gap-1"><Wind className="h-3 w-3 text-white/40" /> 12 km/h</span>
          </div>
        </div>

        {/* 14-day list — vertical */}
        <div className="flex flex-col gap-1">
          {weatherDays.map((d, i) => (
            <div
              key={i}
              className={`flex items-center justify-between rounded-xl px-4 py-2 transition-colors cursor-pointer ${
                i === 0
                  ? "bg-white/15 border border-white/20"
                  : "bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10"
              }`}
            >
              <span className={`w-10 text-[11px] font-black uppercase tracking-wider ${i === 0 ? "text-[var(--gold)]" : "text-white/60"}`}>
                {d.day}
              </span>
              <div className="flex items-center gap-3 flex-1 justify-center">
                <span className={`${weatherIconColor(d.icon)}`}>
                  <WeatherIcon icon={d.icon} size={16} />
                </span>
                <div className="w-10 text-left">
                  {d.rain > 0 && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-blue-300">
                      <Droplets className="h-2.5 w-2.5" />
                      {d.rain}%
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 w-16">
                <span className="text-sm font-bold text-white w-5 text-right">{d.high}°</span>
                <span className="text-xs font-medium text-white/40 w-5 text-right">{d.low}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
