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
    <aside className="sticky top-28 space-y-8">
      {/* Editorial Widget Header */}
      <div className="rounded-2xl bg-[var(--imperial-blue)] p-6 text-white shadow-xl overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--gold)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-[var(--gold)]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--gold)]">Wydarzenia</span>
          </div>
          <h3 className="font-serif text-2xl font-medium leading-tight mb-2">
            Zapisz w <br />
            <span className="italic text-[var(--school-bus-yellow)]">kalendarzu</span>
          </h3>
          <p className="text-xs text-white/60 mb-6 leading-relaxed">
            Nie przegap najważniejszych spotkań i imprez w naszej gminie.
          </p>
          
          <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--gold)] hover:text-white transition-colors">
            Wszystkie wydarzenia
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Calendar List */}
      <div className="space-y-6">
        {events.map((event, i) => (
          <div key={i} className="flex gap-5 group cursor-pointer">
            <div className="flex flex-col items-center justify-center shrink-0 w-14 h-16 rounded-xl bg-white border border-border shadow-sm group-hover:border-[var(--gold)] group-hover:shadow-md transition-all">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--imperial-blue)]/40 mb-0.5">{event.month}</span>
              <span className="text-xl font-serif font-bold text-[var(--imperial-blue)] leading-none">{event.date}</span>
            </div>
            
            <div className="flex-1 pt-1">
              <h4 className="text-sm font-medium leading-snug text-[var(--imperial-blue)] mb-2 group-hover:text-[var(--steel-azure)] transition-colors line-clamp-2">
                {event.title}
              </h4>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <div className="flex items-center gap-1.5 text-[10px] text-foreground/40 font-bold uppercase tracking-wider">
                  <Clock className="h-3 w-3 text-[var(--gold)]" />
                  {event.time}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-foreground/40 font-bold uppercase tracking-wider">
                  <MapPin className="h-3 w-3 text-[var(--gold)]" />
                  {event.location}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Illustrative Calendar Box */}
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--imperial-blue)]/40">Maj 2026</span>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]/30" />
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center">
          {["P", "W", "Ś", "C", "P", "S", "N"].map(d => (
            <span key={d} className="text-[9px] font-bold text-foreground/30 py-1">{d}</span>
          ))}
          {Array.from({ length: 31 }).map((_, i) => {
            const day = i + 1
            const isEvent = [18, 23].includes(day)
            return (
              <span 
                key={i} 
                className={`text-[10px] font-medium py-1.5 rounded-lg transition-colors ${
                  isEvent 
                    ? "bg-[var(--gold)] text-[var(--imperial-blue)] font-bold cursor-pointer" 
                    : "text-foreground/60 hover:bg-muted"
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
