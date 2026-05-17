"use client"

import Link from "next/link"
import { Trophy, Home, Music, Trees, ArrowRight, Calendar, Layers, Activity } from "lucide-react"

const groups = [
  {
    title: "Sport i rekreacja",
    subtitle: "Turnieje, relacje meczowe, zalew Pająk i aktywność fizyczna mieszkańców.",
    icon: Trophy,
    iconColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    totalCount: 14,
    featured: {
      title: "80 lat historii, pasji i ludzi — Jubileusz GLKS LOT Konopiska",
      slug: "80-lat-historii-pasji-i-ludzi-jubileusz-glks-lot-konopiska-6296",
      image: "https://www.konopiska.pl/img/media/500x250/500x250-IMG_1472-Duży.jpeg.webp",
      date: "18.04.2026",
      category: "Sport",
      readingTime: 4
    },
    rest: [
      {
        title: "Gminne Biegi Przełajowe o Puchar Wójta Gminy Konopiska",
        slug: "#",
        date: "04.05.2026",
        readingTime: 3
      },
      {
        title: "Zalew Pająk gotowy do sezonu letniego. Oficjalne otwarcie kąpieliska",
        slug: "#",
        date: "28.04.2026",
        readingTime: 5
      },
      {
        title: "Sukces młodych piłkarzy LOT Konopiska w turnieju okręgowym",
        slug: "#",
        date: "20.04.2026",
        readingTime: 2
      },
      {
        title: "Bezpłatne zajęcia jogi dla seniorów organizowane w GCKiS",
        slug: "#",
        date: "15.04.2026",
        readingTime: 3
      }
    ],
    catFilter: "Sport"
  },
  {
    title: "Samorząd i sołectwa",
    subtitle: "Inwestycje, uchwały Rady Gminy, zebrania sołeckie i lokalne drogi.",
    icon: Home,
    iconColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    totalCount: 18,
    featured: {
      title: "Porozumienie o współpracy ze Stowarzyszeniem YAVA z Częstochowy",
      slug: "porozumienie-o-wspolpracy-pomiedzy-stowarzyszeniem-yava-zs-w-czestochowie-a-gmina-konopiska-6316",
      image: "https://www.konopiska.pl/img/media/500x250/500x250-d1a49047-66b3-4c68-b4f6-2920225295b8.jpeg.webp",
      date: "08.05.2026",
      category: "Społeczność",
      readingTime: 3
    },
    rest: [
      {
        title: "Delegacja Gminy Konopiska z oficjalną wizytą w Sejmie RP",
        slug: "delegacja-gminy-konopiska-z-wizyta-w-sejmie-6295",
        date: "17.04.2026",
        readingTime: 4
      },
      {
        title: "Budowa nowoczesnego oświetlenia ulicznego w sołectwie Aleksandria",
        slug: "#",
        date: "12.05.2026",
        readingTime: 3
      },
      {
        title: "Modernizacja drogi gminnej w sołectwie Wąsosz została zakończona",
        slug: "#",
        date: "06.05.2026",
        readingTime: 4
      },
      {
        title: "Projekt „Promykowe dzieci” — dotacja na rozwój świetlicy",
        slug: "projekt-promykowe-dzieci-6315",
        date: "07.05.2026",
        readingTime: 3
      }
    ],
    catFilter: "Samorząd"
  },
  {
    title: "Edukacja i kultura",
    subtitle: "Konkursy, festiwale muzyczne, zielone ekopracownie i szkoły.",
    icon: Music,
    iconColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    totalCount: 16,
    featured: {
      title: "Konkurs wiedzy o Gminie Konopiska „Moja Mała Ojczyzna”",
      slug: "konkurs-wiedzy-o-gminie-konopiska-moja-mala-ojczyzna-6304",
      image: "https://www.konopiska.pl/img/media/500x250/500x250-mmo.jpg.webp",
      date: "07.05.2026",
      category: "Kultura",
      readingTime: 3
    },
    rest: [
      {
        title: "Rocker Music Festival vol. 2 — rockowa energia w gminie",
        slug: "rocker-music-festival-vol2-6305",
        date: "25.04.2026",
        readingTime: 4
      },
      {
        title: "Aleksandryjski Ogród Nauki — nowoczesna ekopracownia otwarta",
        slug: "aleksandryjski-ogrod-nauki-oficjalnie-otwarty-6319",
        date: "11.05.2026",
        readingTime: 3
      },
      {
        title: "Ostatnie dni rekrutacji podstawowej na bezpłatne kursy LOWE",
        slug: "ostatnie-dni-rekrutacji-podstawowej-projekt-lowe-6317",
        date: "08.05.2026",
        readingTime: 3
      },
      {
        title: "Gminny Dzień Dziecka w GCKiS — moc bezpłatnych atrakcji",
        slug: "#",
        date: "02.05.2026",
        readingTime: 5
      }
    ],
    catFilter: "Kultura"
  },
  {
    title: "Rozwój i ekologia",
    subtitle: "Ochrona środowiska, dotacje WFOŚiGW i zmiany w transporcie.",
    icon: Trees,
    iconColor: "text-teal-400 bg-teal-400/10 border-teal-400/20",
    totalCount: 12,
    featured: {
      title: "Zielona Pracownia w SP w ZSP im. Jana Pawła II w Kopalni – EkoStrefa",
      slug: "zielona-pracownia-w-sp-w-zsp-im-jana-pawla-ii-w-kopalni-ekostrefa-6322",
      image: "https://www.konopiska.pl/img/media/500x250/500x250-WFOSiGW.jpg.webp",
      date: "15.05.2026",
      category: "Ekologia",
      readingTime: 4
    },
    rest: [
      {
        title: "Gmina Konopiska z dofinansowaniem na nową pracownię ekologiczną",
        slug: "gmina-konopiska-z-dofinansowaniem-na-zielona-pracownie-w-kopalni-6320",
        date: "12.05.2026",
        readingTime: 3
      },
      {
        title: "Dofinansowanie dla stowarzyszeń w konkursie Kultywowania Tradycji",
        slug: "dofinansowanie-for-stowarzyszen-z-terenu-gminy-konopiska-6314",
        date: "07.05.2026",
        readingTime: 3
      },
      {
        title: "Zmiany rozkładu jazdy w ramach Komunikacji Jurajskiej od 18 maja",
        slug: "zmiany-w-ramach-komunikacji-jurajskiej-od-18-maja-6318",
        date: "11.05.2026",
        readingTime: 4
      },
      {
        title: "Montaż instalacji fotowoltaicznych na budynkach użyteczności publicznej",
        slug: "#",
        date: "05.05.2026",
        readingTime: 5
      }
    ],
    catFilter: "Ekologia"
  }
]

export function NewsGroups() {
  return (
    <section className="relative w-full bg-[var(--imperial-blue)] text-white overflow-hidden py-24 lg:py-28 border-t border-white/5">
      {/* Decorative ambient lights */}
      <div className="absolute -left-1/4 -top-1/4 w-[600px] h-[600px] bg-[var(--gold)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-1/4 -bottom-1/4 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-6">
        {/* Title Area */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span aria-hidden className="h-0.5 w-10 bg-[var(--gold)]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--gold)]">
                KATEGORIE TEMATYCZNE
              </span>
            </div>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
              Centrum Informacyjne <em className="text-[var(--gold)]">Gminy</em>
            </h2>
            <p className="text-white/40 text-xs font-medium mt-4 max-w-xl leading-relaxed">
              Kompleksowy i rozbudowany przegląd najnowszych spraw lokalnych, inwestycji, kultury i sportu pogrupowany w cztery główne piony tematyczne.
            </p>
          </div>

          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] font-bold text-white/50 uppercase tracking-widest shrink-0 self-start md:self-end">
            <Layers className="h-4 w-4 text-[var(--gold)] animate-pulse" />
            <span>20 DOKUMENTÓW W PANELU</span>
          </div>
        </div>

        {/* Grid of Groups */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, idx) => {
            const Icon = group.icon
            const featured = group.featured
            return (
              <div 
                key={idx}
                className="flex flex-col h-full rounded-[2.5rem] bg-white/[0.02] border border-white/5 p-6 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 group relative overflow-hidden"
              >
                {/* Subtle gradient pattern card background */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${group.iconColor} shadow-inner`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-serif text-base font-semibold text-white tracking-tight leading-snug group-hover:text-[var(--gold)] transition-colors">
                      {group.title}
                    </h3>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-wider bg-white/5 border border-white/10 rounded-lg px-2 py-0.5 text-white/40">
                    {group.totalCount} wpisów
                  </span>
                </div>

                {/* Subtitle / Catchphrase */}
                <p className="text-[10px] text-white/40 font-medium leading-relaxed mb-6 h-10 line-clamp-2 relative z-10">
                  {group.subtitle}
                </p>

                {/* News List */}
                <div className="flex flex-col gap-6 flex-grow relative z-10">
                  {/* Featured Item with Image */}
                  <Link 
                    href={featured.slug.startsWith("#") ? "#" : `/artykul/${featured.slug}`}
                    className="group/feat block relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[var(--gold)]/20 transition-all duration-300"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-900/40">
                      <img 
                        src={featured.image || "/placeholder.svg"} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/feat:scale-105" 
                        alt="" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--imperial-blue)]/80 via-transparent to-transparent opacity-85" />
                      <span className="absolute left-3 top-3 rounded-lg bg-[var(--gold)]/90 backdrop-blur-sm px-2.5 py-1 text-[8px] font-black uppercase tracking-widest text-[var(--imperial-blue)] shadow-md">
                        {featured.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-white/40 mb-1.5">
                        <Calendar className="h-3 w-3 text-[var(--gold)]/70" />
                        <span>{featured.date}</span>
                      </div>
                      <h4 className="text-xs font-bold leading-snug text-white group-hover/feat:text-[var(--gold)] transition-colors line-clamp-2">
                        {featured.title}
                      </h4>
                    </div>
                  </Link>

                  {/* Secondary Items (4 additional news!) */}
                  <div className="flex flex-col gap-4">
                    {group.rest.map((item, itemIdx) => (
                      <Link 
                        key={itemIdx}
                        href={item.slug.startsWith("#") ? "#" : `/artykul/${item.slug}`}
                        className="flex flex-col gap-1 group/item pb-3.5 border-b border-white/[0.03] last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-white/30 group-hover/item:text-[var(--gold)] transition-colors">
                          <span>{item.date}</span>
                          <span className="w-1 h-1 rounded-full bg-white/10" />
                          <span>{item.readingTime} min</span>
                        </div>
                        <h5 className="text-[11px] font-bold leading-snug text-white/60 group-hover/item:text-white transition-colors line-clamp-2">
                          {item.title}
                        </h5>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <div className="mt-8 pt-4 border-t border-white/5 relative z-10">
                  <Link 
                    href={`/?kategoria=${encodeURIComponent(group.catFilter)}#archiwum`}
                    className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--gold)] hover:text-white transition-colors"
                  >
                    Wszystkie wpisy
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
