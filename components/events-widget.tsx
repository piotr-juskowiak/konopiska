"use client"

import { MessageSquare, Clock, Sparkles, Bell } from "lucide-react"

const announcements = [
  {
    title: "Harmonogram wywozu odpadów w czerwcu",
    tag: "Harmonogram",
    tagColor: "bg-[var(--imperial-blue)]/5 text-[var(--imperial-blue)] border-[var(--imperial-blue)]/10",
    date: "15.05.2026",
  },
  {
    title: "Przerwy w dostawie wody przy ul. Lipowej i Leśnej",
    tag: "Ważne",
    tagColor: "bg-[var(--gold)]/10 text-[var(--gold)] border-[var(--gold)]/20",
    date: "14.05.2026",
  },
  {
    title: "Bezpłatne szczepienia dla seniorów 65+",
    tag: "Medycyna",
    tagColor: "bg-[var(--imperial-blue)]/5 text-[var(--imperial-blue)] border-[var(--imperial-blue)]/10",
    date: "12.05.2026",
  },
  {
    title: "Konsultacje budżetu obywatelskiego 2027",
    tag: "Ogłoszenie",
    tagColor: "bg-[var(--imperial-blue)]/5 text-[var(--imperial-blue)] border-[var(--imperial-blue)]/10",
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
      <div className="rounded-[2rem] bg-gradient-to-br from-[var(--imperial-blue)] to-[#0f2d6b] p-8 text-white shadow-xl overflow-hidden relative group">
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-[var(--gold)]/10 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-150" />
        <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-[var(--gold)]/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-[var(--gold)]" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--gold)]">Wydarzenia</span>
          </div>
          <h3 className="font-serif text-3xl font-medium leading-[1.1] tracking-tight">
            Co przyniesie <br />
            <span className="text-[var(--school-bus-yellow)]">najbliższy tydzień?</span>
          </h3>
        </div>
      </div>
    </aside>
  )
}
