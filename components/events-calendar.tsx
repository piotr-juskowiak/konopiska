import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react"

const events = [
  {
    date: "18",
    month: "Maj",
    title: "Bieg Pamięci Bohaterów Monte Cassino",
    time: "10:00",
    location: "Stadion Gminny",
    category: "Sport",
  },
  {
    date: "23",
    month: "Maj",
    title: "Ekopiknik Rodzinny w Konopiskach",
    time: "14:00",
    location: "Park Gminny",
    category: "Ekologia",
  },
  {
    date: "01",
    month: "Cze",
    title: "Dzień Dziecka — Festiwal Radości",
    time: "11:00",
    location: "Centrum Kultury",
    category: "Wydarzenia",
  },
  {
    date: "15",
    month: "Cze",
    title: "Koncert: Beach Party z TEDE",
    time: "20:00",
    location: "Zalew Pająk",
    category: "Rozrywka",
  },
]

export function EventsCalendar() {
  return (
    <section className="mx-auto max-w-[90rem] px-4 py-16 sm:px-6">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end mb-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-0.5 w-8 bg-[var(--gold)]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--gold)]">
              Co nas czeka?
            </span>
          </div>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-[var(--imperial-blue)] sm:text-4xl">
            Kalendarium <em className="text-[var(--steel-azure)]">wydarzeń</em>
          </h2>
        </div>
        <button className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--imperial-blue)] hover:text-[var(--gold)] transition-colors">
          Zobacz pełny kalendarz
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {events.map((event, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-2xl border border-border bg-white p-6 transition-all hover:border-[var(--gold)] hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex flex-col items-center justify-center rounded-xl bg-[var(--imperial-blue)] px-4 py-2 text-white shadow-lg">
                <span className="text-xl font-bold leading-none">{event.date}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold)]">{event.month}</span>
              </div>
              <span className="rounded-full bg-[var(--gold)]/10 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-[var(--imperial-blue)]">
                {event.category}
              </span>
            </div>
            
            <h3 className="font-serif text-lg font-medium leading-tight text-[var(--imperial-blue)] mb-6 group-hover:text-[var(--steel-azure)] transition-colors">
              {event.title}
            </h3>

            <div className="space-y-3 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2.5 text-xs text-foreground/60">
                <Clock className="h-3.5 w-3.5 text-[var(--gold)]" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-foreground/60">
                <MapPin className="h-3.5 w-3.5 text-[var(--gold)]" />
                <span className="truncate">{event.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
