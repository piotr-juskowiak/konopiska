"use client"

import { MessageSquare, Clock, Sparkles, ArrowRight, Bell } from "lucide-react"

const announcements = [
  {
    title: "Harmonogram wywozu odpadów w czerwcu",
    tag: "Harmonogram",
    tagColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    date: "15.05.2026",
  },
  {
    title: "Przerwy w dostawie wody przy ul. Lipowej i Leśnej",
    tag: "Ważne",
    tagColor: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    date: "14.05.2026",
  },
  {
    title: "Bezpłatne szczepienia dla seniorów 65+",
    tag: "Medycyna",
    tagColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    date: "12.05.2026",
  },
  {
    title: "Konsultacje budżetu obywatelskiego 2027",
    tag: "Ogłoszenie",
    tagColor: "bg-[var(--gold)]/10 text-[var(--gold)] border-[var(--gold)]/20",
    date: "10.05.2026",
  },
]

const comments = [
  {
    author: "Jan Kowalski",
    avatar: "JK",
    time: "2 godz. temu",
    content: "Wspaniała wiadomość o EkoStrefie w Kopalni! Dzieciaki zyskają nowoczesne miejsce do nauki biologii i chemii.",
    articleTitle: "EkoStrefa w SP w Kopalni",
  },
  {
    author: "Marta_K",
    avatar: "MK",
    time: "5 godz. temu",
    content: "Świetna inicjatywa z bezpłatnymi badaniami na Dzień Mamy i Taty. Profilaktyka to podstawa, na pewno zapiszę rodziców.",
    articleTitle: "Otwarte badania profilaktyczne",
  },
  {
    author: "Krzysztof",
    avatar: "KR",
    time: "1 dzień temu",
    content: "Wreszcie przyspieszono ten poranny kurs linii 104 ze Starczy do Częstochowy. Dotychczas spóźnienia do pracy były normą.",
    articleTitle: "Zmiany w Komunikacji Jurajskiej",
  },
  {
    author: "Sołtys",
    avatar: "SO",
    time: "2 dni temu",
    content: "Ogród nauki w Aleksandrii wygląda fantastycznie! Uczniowie mają super warunki pod chmurką. Gratulacje dla dyrekcji.",
    articleTitle: "Aleksandryjski Ogród Nauki",
  },
]

export function EventsWidget() {
  return (
    <aside className="sticky top-28 space-y-10">
      {/* Editorial Widget Header */}
      <div className="rounded-[2rem] bg-gradient-to-br from-[var(--imperial-blue)] to-[#0f172a] p-8 text-white shadow-xl overflow-hidden relative group">
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-[var(--gold)]/10 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-150" />
        <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-[var(--gold)]/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-[var(--gold)]" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--gold)]">Wydarzenia</span>
          </div>
          <h3 className="font-serif text-3xl font-medium leading-[1.1] mb-5 tracking-tight">
            Co przyniesie <br />
            <span className="font-light text-[var(--school-bus-yellow)]">najbliższy tydzień?</span>
          </h3>
          <p className="text-xs text-white/40 mb-8 leading-relaxed font-medium max-w-[200px]">
            Nie przegap najważniejszych spotkań w naszej gminie.
          </p>
          
          <button className="group/link inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--gold)] transition-all hover:gap-5">
            ZOBACZ WSZYSTKIE
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--gold)]/30 group-hover/link:bg-[var(--gold)] group-hover/link:text-[var(--imperial-blue)] transition-all">
              <ArrowRight className="h-4 w-4" />
            </div>
          </button>
        </div>
      </div>

      {/* Municipal Announcements Widget */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 px-1 mb-6">
          <div className="h-px flex-1 bg-slate-100" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">Ogłoszenia Urzędu Gminy</span>
          <div className="h-px w-4 bg-slate-100" />
        </div>
        
        <div className="rounded-3xl border border-slate-100 bg-white/40 p-4 space-y-3">
          {announcements.map((ann, i) => (
            <a 
              key={i} 
              href="https://www.konopiska.pl" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-start gap-3.5 p-3 rounded-2xl bg-white hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-300 group/ann"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--imperial-blue)]/5 border border-[var(--imperial-blue)]/10 text-[var(--imperial-blue)] group-hover/ann:bg-[var(--imperial-blue)] group-hover/ann:text-white transition-colors">
                <Bell className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border ${ann.tagColor}`}>
                    {ann.tag}
                  </span>
                  <span className="text-[8px] font-bold text-slate-400">{ann.date}</span>
                </div>
                <h4 className="text-xs font-bold leading-snug text-[var(--imperial-blue)] line-clamp-2 group-hover/ann:text-[var(--gold)] transition-colors">
                  {ann.title}
                </h4>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Latest Comments Widget */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 px-1 mb-6">
          <div className="h-px flex-1 bg-slate-100" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">Najnowsze komentarze</span>
          <div className="h-px w-4 bg-slate-100" />
        </div>
        
        {comments.map((comment, i) => (
          <div key={i} className="group cursor-pointer relative p-5 rounded-3xl border border-slate-100 bg-white/50 shadow-sm transition-all duration-500 hover:shadow-lg hover:border-[var(--gold)]/20 hover:bg-white">
            <div className="flex items-start gap-3.5">
              {/* Author Initial Bubble */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--imperial-blue)]/5 border border-[var(--imperial-blue)]/10 text-[var(--imperial-blue)] font-bold text-xs shadow-inner transition-colors group-hover:bg-[var(--gold)]/10 group-hover:border-[var(--gold)]/30">
                {comment.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[var(--imperial-blue)]">{comment.author}</span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5" />
                    {comment.time}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-3 mb-2.5">
                  „{comment.content}”
                </p>
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="h-3 w-3 text-[var(--gold)]" />
                  <span className="text-[9px] font-bold text-[var(--gold)]/80 uppercase tracking-widest truncate max-w-[220px]">
                    {comment.articleTitle}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Illustrative Calendar Box */}
      <div className="rounded-[2rem] bg-slate-50 border border-slate-100 p-6 shadow-inner shadow-white">
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="flex flex-col gap-0.5">
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-300">Kalendarz</span>
            <span className="text-xs font-bold text-[var(--imperial-blue)] tracking-tight">Maj 2026</span>
          </div>
          <div className="flex -space-x-1">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-2 h-2 rounded-full border-2 border-slate-50 bg-[var(--gold)]" style={{ opacity: 1 - i*0.2 }} />
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center">
          {["P", "W", "Ś", "C", "P", "S", "N"].map((d, idx) => (
            <span key={idx} className="text-[9px] font-black text-slate-300 h-6 flex items-center justify-center">{d}</span>
          ))}
          {Array.from({ length: 31 }).map((_, i) => {
            const day = i + 1
            const isEvent = [18, 23].includes(day)
            return (
              <span 
                key={i} 
                className={`text-[10px] font-bold h-7 w-7 mx-auto flex items-center justify-center rounded-lg transition-all duration-300 ${
                  isEvent 
                    ? "bg-[var(--imperial-blue)] text-white shadow-md shadow-[var(--imperial-blue)]/20 scale-105 cursor-pointer" 
                    : "text-slate-400 hover:bg-white hover:text-[var(--imperial-blue)]"
                }`}
              >
                {day}
              </span>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
