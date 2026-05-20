"use client"

import { MessageSquare, Calendar, Megaphone, TrendingUp } from "lucide-react"
import { newsItems } from "@/lib/news-data"

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
    title: "EkoStrefa w SP w Kopalni",
    comments: 24,
  },
  {
    id: 2,
    title: "Otwarte badania profilaktyczne",
    comments: 18,
  },
  {
    id: 3,
    title: "Aleksandryjski Ogród Nauki",
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
    title: "Ekopiknik",
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
    <aside className="sticky top-0 space-y-6 lg:space-y-8">
      {/* Advertisement Section */}
      <div className="rounded-2xl bg-gradient-to-br from-[var(--imperial-blue)]/10 to-[var(--gold)]/5 p-8 border border-[var(--imperial-blue)]/10 min-h-[280px] flex items-center justify-center text-center">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-xl bg-[var(--gold)]/20">
            <Megaphone className="h-8 w-8 text-[var(--gold)]" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--imperial-blue)]/60 mb-2">
              Przestrzeń
            </p>
            <h4 className="font-serif text-xl font-bold text-[var(--imperial-blue)]">
              Reklamowa
            </h4>
            <p className="text-xs text-[var(--imperial-blue)]/50 mt-3">
              Twoja reklama tutaj
            </p>
          </div>
        </div>
      </div>

      {/* UG Announcements */}
      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[var(--imperial-blue)]/5 to-transparent px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5 mb-1">
            <Megaphone className="h-4 w-4 text-[var(--imperial-blue)]" />
            <h3 className="font-serif text-lg font-bold text-[var(--imperial-blue)]">
              Ogłoszenia UG
            </h3>
          </div>
          <p className="text-xs text-slate-500 ml-6">Urzędu Gminy</p>
        </div>
        <div className="space-y-3 p-4">
          {ugAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              className="group flex flex-col gap-2 p-3 rounded-lg bg-slate-50 hover:bg-[var(--gold)]/5 transition-colors border border-transparent hover:border-[var(--gold)]/20 cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-bold text-[var(--imperial-blue)] leading-snug group-hover:text-[var(--gold)] transition-colors flex-1">
                  {announcement.title}
                </p>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-[var(--imperial-blue)]/10 text-[7px] font-black uppercase tracking-[0.1em] text-[var(--imperial-blue)]">
                  {announcement.tag}
                </span>
                <span className="text-[7px] font-semibold text-slate-400">
                  {announcement.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Most Commented Articles */}
      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[var(--gold)]/5 to-transparent px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5 mb-1">
            <TrendingUp className="h-4 w-4 text-[var(--gold)]" />
            <h3 className="font-serif text-lg font-bold text-[var(--imperial-blue)]">
              Najczęściej komentowane
            </h3>
          </div>
          <p className="text-xs text-slate-500 ml-6">Ostatnie 7 dni</p>
        </div>
        <div className="space-y-3 p-4">
          {mostCommentedArticles.map((article, idx) => (
            <div
              key={article.id}
              className="group flex items-start gap-3 p-2 rounded-lg hover:bg-[var(--imperial-blue)]/5 transition-colors cursor-pointer"
            >
              <div className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded bg-[var(--gold)]/20 text-[10px] font-black text-[var(--gold)]">
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[var(--imperial-blue)] group-hover:text-[var(--gold)] transition-colors line-clamp-2">
                  {article.title}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <MessageSquare className="h-3 w-3 text-slate-300" />
                  <span className="text-[7px] font-semibold text-slate-500">
                    {article.comments} komentarzy
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Events Calendar */}
      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[var(--imperial-blue)]/5 to-[var(--gold)]/5 px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5 mb-1">
            <Calendar className="h-4 w-4 text-[var(--imperial-blue)]" />
            <h3 className="font-serif text-lg font-bold text-[var(--imperial-blue)]">
              Kalendarz
            </h3>
          </div>
          <p className="text-xs text-slate-500 ml-6">Nadchodzące wydarzenia</p>
        </div>
        <div className="space-y-2 p-4">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="group flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-[var(--gold)]/30 hover:bg-[var(--gold)]/5 transition-colors cursor-pointer"
            >
              <div className="flex-shrink-0 flex flex-col items-center justify-center rounded-lg bg-[var(--gold)]/20 px-2.5 py-1.5 text-center">
                <span className="text-xs font-black text-[var(--gold)]">
                  {event.date.split(".")[0]}
                </span>
                <span className="text-[9px] font-bold text-[var(--gold)]/70">
                  maj
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[var(--imperial-blue)] group-hover:text-[var(--gold)] transition-colors line-clamp-1">
                  {event.title}
                </p>
                <span className="text-[7px] font-semibold text-slate-400 uppercase tracking-[0.1em]">
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
