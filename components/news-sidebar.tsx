"use client"

import { MessageSquare, Calendar, Megaphone, TrendingUp, ChevronRight } from "lucide-react"

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

// Mock calendar events
const upcomingEvents = [
  {
    id: 1,
    date: "18.05",
    title: "Zmiany rozkładu jazdy",
    category: "Transport",
  },
  {
    id: 2,
    date: "20.05",
    title: "Bieg Pamięci Bohaterów",
    category: "Sport",
  },
  {
    id: 3,
    date: "25.05",
    title: "Ekopiknik dla rodzin",
    category: "Ekologia",
  },
  {
    id: 4,
    date: "31.05",
    title: "Festiwal Światła i Wody",
    category: "Kultura",
  },
]

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

      {/* Events Calendar */}
      <div className="space-y-4 bg-gradient-to-br from-[var(--imperial-blue)] to-[var(--imperial-blue-dark)] p-8 rounded-[2rem] text-white shadow-xl shadow-[var(--imperial-blue)]/10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 shadow-inner">
              <Calendar className="h-5 w-5 text-[var(--gold)]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">
              Kalendarz
            </h3>
          </div>
          <button className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-[var(--gold)] hover:text-[var(--imperial-blue-dark)] transition-colors">
             <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex flex-col gap-0 divide-y divide-white/10">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="group flex items-center gap-5 py-4 cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center min-w-[3.5rem] rounded-xl bg-white/5 border border-white/10 p-2 group-hover:bg-white/20 transition-colors shadow-inner">
                <span className="text-lg font-black text-white leading-none">
                  {event.date.split(".")[0]}
                </span>
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider mt-1">
                  maj
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white/90 group-hover:text-[var(--gold)] transition-colors line-clamp-1">
                  {event.title}
                </p>
                <span className="text-[10px] font-black uppercase tracking-[0.1em] text-[var(--gold)] mt-1.5 block">
                  {event.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
