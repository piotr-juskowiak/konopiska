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
    <aside className="sticky top-28 space-y-14">
      {/* Editorial Widget Header */}
      <div className="rounded-[2.5rem] bg-gradient-to-br from-[var(--imperial-blue)] to-[#0f172a] p-10 text-white shadow-2xl overflow-hidden relative group">
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-[var(--gold)]/10 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-150" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-inner">
              <Sparkles className="h-5 w-5 text-[var(--gold)]" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--gold)]">Wydarzenia</span>
          </div>
          <h3 className="font-serif text-4xl font-medium leading-[1.1] mb-6 tracking-tight">
            Co przyniesie <br />
            <span className="italic font-light text-[var(--school-bus-yellow)]">najbliższy tydzień?</span>
          </h3>
          <p className="text-sm text-white/40 mb-10 leading-relaxed font-medium max-w-[240px]">
            Nie przegap najważniejszych spotkań i wydarzeń kulturalnych w naszej gminie.
          </p>
          
          <button className="group/link inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-[var(--gold)] transition-all hover:gap-6">
            ZOBACZ WSZYSTKIE
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)]/30 group-hover/link:bg-[var(--gold)] group-hover/link:text-[var(--imperial-blue)] transition-all shadow-lg shadow-[var(--gold)]/10">
              <ArrowRight className="h-4 w-4" />
            </div>
          </button>
        </div>
      </div>

      {/* Calendar List */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 px-2 mb-8">
          <div className="h-px flex-1 bg-slate-100" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Lista spotkań</span>
          <div className="h-px w-6 bg-slate-100" />
        </div>
        
        {events.map((event, i) => (
          <div key={i} className="flex gap-6 group cursor-pointer relative p-5 rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/50 hover:border-[var(--imperial-blue)]/10 hover:-translate-y-1">
            <div className="flex flex-col items-center justify-center shrink-0 w-16 h-20 rounded-2xl bg-slate-50 border border-slate-100 transition-all duration-500 group-hover:bg-[var(--imperial-blue)] group-hover:border-[var(--imperial-blue)] group-hover:shadow-lg group-hover:shadow-[var(--imperial-blue)]/20">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 transition-colors group-hover:text-white/40">{event.month}</span>
              <span className="text-2xl font-serif font-black text-[var(--imperial-blue)] transition-colors group-hover:text-white">{event.date}</span>
            </div>
            
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h4 className="text-sm font-bold leading-snug text-[var(--imperial-blue)] mb-3 transition-colors line-clamp-2 tracking-tight group-hover:text-[var(--primary)]">
                {event.title}
              </h4>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <Clock className="h-3.5 w-3.5 text-[var(--imperial-blue)]/20" />
                  {event.time}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <MapPin className="h-3.5 w-3.5 text-[var(--imperial-blue)]/20" />
                  {event.location}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Illustrative Calendar Box */}
      <div className="rounded-[2.5rem] bg-slate-50 border border-slate-100 p-8 shadow-inner shadow-white">
        <div className="flex items-center justify-between mb-8 px-1">
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">Kalendarz</span>
            <span className="text-sm font-bold text-[var(--imperial-blue)] tracking-tight">Maj 2026</span>
          </div>
          <div className="flex -space-x-1.5">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-2.5 h-2.5 rounded-full border-2 border-slate-50 bg-[var(--gold)]" style={{ opacity: 1 - i*0.2 }} />
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center">
          {["P", "W", "Ś", "C", "P", "S", "N"].map(d => (
            <span key={d} className="text-[10px] font-black text-slate-300 h-8 flex items-center justify-center">{d}</span>
          ))}
          {Array.from({ length: 31 }).map((_, i) => {
            const day = i + 1
            const isEvent = [18, 23].includes(day)
            return (
              <span 
                key={i} 
                className={`text-[11px] font-bold h-8 w-8 mx-auto flex items-center justify-center rounded-xl transition-all duration-300 ${
                  isEvent 
                    ? "bg-[var(--imperial-blue)] text-white shadow-lg shadow-[var(--imperial-blue)]/20 scale-110 cursor-pointer" 
                    : "text-slate-400 hover:bg-white hover:text-[var(--imperial-blue)] hover:shadow-sm"
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
