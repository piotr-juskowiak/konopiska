"use client"

import { Calendar, Clock, MapPin, ChevronRight, Sparkles } from "lucide-react"

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
    <aside className="sticky top-28 space-y-12">
      {/* Editorial Widget Header */}
      <div className="rounded-3xl bg-gradient-to-br from-[var(--imperial-blue)] to-[#0f172a] p-8 text-white shadow-2xl overflow-hidden relative group">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-[var(--gold)]/10 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150" />
        <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-[var(--french-blue)]/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-[var(--gold)]" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--gold)]">Kalendarz</span>
          </div>
          <h3 className="font-serif text-3xl font-medium leading-[1.1] mb-4">
            Nadchodzące <br />
            <span className="italic font-light text-[var(--school-bus-yellow)]">wydarzenia</span>
          </h3>
          <p className="text-sm text-white/50 mb-8 leading-relaxed font-medium">
            Bądź na bieżąco z tym, co dzieje się w Twojej najbliższej okolicy.
          </p>
          
          <button className="group/link flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--gold)] transition-colors hover:text-white">
            Pełny harmonogram
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--gold)]/30 group-hover/link:bg-[var(--gold)] group-hover/link:text-[var(--imperial-blue)] transition-all">
              <ChevronRight className="h-4 w-4" />
            </div>
          </button>
        </div>
      </div>

      {/* Calendar List */}
      <div className="space-y-8 pl-1">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[1px] w-6 bg-[var(--gold)]" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Lista spotkań</span>
        </div>
        
        {events.map((event, i) => (
          <div key={i} className="flex gap-6 group cursor-pointer relative">
            <div className="flex flex-col items-center justify-center shrink-0 w-16 h-20 rounded-2xl bg-white border border-slate-100 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] group-hover:border-[var(--gold)] group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-500">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--imperial-blue)]/30 mb-1">{event.month}</span>
              <span className="text-2xl font-serif font-black text-[var(--imperial-blue)]">{event.date}</span>
            </div>
            
            <div className="flex-1 pt-2">
              <h4 className="text-base font-bold leading-snug text-[var(--imperial-blue)] mb-3 group-hover:text-[var(--primary)] transition-colors line-clamp-2 tracking-tight">
                {event.title}
              </h4>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                <div className="flex items-center gap-2 text-[9px] text-slate-400 font-black uppercase tracking-widest">
                  <div className="p-1 rounded-md bg-slate-50">
                    <Clock className="h-3 w-3 text-[var(--gold)]" />
                  </div>
                  {event.time}
                </div>
                <div className="flex items-center gap-2 text-[9px] text-slate-400 font-black uppercase tracking-widest">
                  <div className="p-1 rounded-md bg-slate-50">
                    <MapPin className="h-3 w-3 text-[var(--gold)]" />
                  </div>
                  {event.location}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Illustrative Calendar Box */}
      <div className="rounded-3xl border border-white bg-white/40 backdrop-blur-xl p-8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Przegląd</span>
            <span className="text-sm font-bold text-[var(--imperial-blue)] tracking-tight">Maj 2026</span>
          </div>
          <div className="flex -space-x-1">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-2 h-2 rounded-full border border-white bg-[var(--gold)]" style={{ opacity: 1 - i*0.2 }} />
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-2 text-center">
          {["P", "W", "Ś", "C", "P", "S", "N"].map(d => (
            <span key={d} className="text-[10px] font-black text-slate-300 py-2">{d}</span>
          ))}
          {Array.from({ length: 31 }).map((_, i) => {
            const day = i + 1
            const isEvent = [18, 23].includes(day)
            return (
              <span 
                key={i} 
                className={`text-[11px] font-bold h-8 flex items-center justify-center rounded-xl transition-all duration-300 ${
                  isEvent 
                    ? "bg-[var(--imperial-blue)] text-[var(--gold)] shadow-lg scale-110 cursor-pointer" 
                    : "text-slate-500 hover:bg-white hover:shadow-sm hover:text-[var(--imperial-blue)]"
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
