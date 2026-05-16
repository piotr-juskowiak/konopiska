"use client"

import { Calendar, Clock, MapPin, ChevronRight, Sparkles, ArrowRight } from "lucide-react"

const events = [
  {
    date: "18",
    month: "Maj",
    title: "Bieg Pamięci Bohaterów Monte Cassino",
    time: "10:00",
    location: "Stadion Gminny",
  },
  {
    date: "23",
    month: "Maj",
    title: "Ekopiknik Rodzinny w Konopiskach",
    time: "14:00",
    location: "Park Gminny",
  },
  {
    date: "01",
    month: "Cze",
    title: "Dzień Dziecka — Festiwal Radości",
    time: "11:00",
    location: "Centrum Kultury",
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

      {/* Calendar List */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 px-1 mb-6">
          <div className="h-px flex-1 bg-slate-100" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">Lista spotkań</span>
          <div className="h-px w-4 bg-slate-100" />
        </div>
        
        {events.map((event, i) => (
          <div key={i} className="flex gap-4 group cursor-pointer relative p-4 rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-500 hover:shadow-lg hover:border-[var(--imperial-blue)]/10 hover:-translate-y-0.5">
            <div className="flex flex-col items-center justify-center shrink-0 w-14 h-16 rounded-xl bg-slate-50 border border-slate-100 transition-all duration-500 group-hover:bg-[var(--imperial-blue)] group-hover:border-[var(--imperial-blue)]">
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-0.5 transition-colors group-hover:text-white/40">{event.month}</span>
              <span className="text-xl font-serif font-black text-[var(--imperial-blue)] transition-colors group-hover:text-white">{event.date}</span>
            </div>
            
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h4 className="text-[11px] font-bold leading-snug text-[var(--imperial-blue)] mb-2 transition-colors line-clamp-2 tracking-tight group-hover:text-[var(--gold)]">
                {event.title}
              </h4>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                  <Clock className="h-3 w-3 text-[var(--imperial-blue)]/20" />
                  {event.time}
                </div>
                <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                  <MapPin className="h-3 w-3 text-[var(--imperial-blue)]/20" />
                  {event.location}
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
