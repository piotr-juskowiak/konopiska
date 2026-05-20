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
      }
    ],
    catFilter: "Sport"
  },
  {
    title: "Kultura i rozrywka",
    subtitle: "Konkursy, festiwale muzyczne i wydarzenia kulturalne w naszej gminie.",
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
        title: "Gminny Dzień Dziecka w GCKiS — moc bezpłatnych atrakcji",
        slug: "#",
        date: "02.05.2026",
        readingTime: 5
      }
    ],
    catFilter: "Kultura"
  },
  {
    title: "Sołectwa",
    subtitle: "Inwestycje, zebrania sołeckie, infrastruktura drogowa i lokalne sprawy.",
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
      }
    ],
    catFilter: "Samorząd"
  }
]

export function NewsGroups() {
  return (
    <section className="relative w-full pt-4 pb-12">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span aria-hidden className="h-0.5 w-10 bg-[var(--gold)]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--gold)]">
              KATEGORIE TEMATYCZNE
            </span>
          </div>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-[var(--imperial-blue)] sm:text-4xl">
            Polecane sekcje tematyczne
          </h2>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, idx) => {
          const Icon = group.icon
          const featured = group.featured
          return (
            <div 
              key={idx}
              className="flex flex-col h-full rounded-[2.5rem] bg-white/70 backdrop-blur-md border border-slate-100 p-6 hover:border-[var(--gold)]/30 hover:shadow-[0_20px_45px_rgba(15,23,42,0.06)] shadow-[0_8px_30px_rgba(15,23,42,0.02)] transition-all duration-500 group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100 relative z-10">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${group.iconColor} bg-white shadow-sm`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-[var(--imperial-blue)] tracking-tight leading-snug group-hover:text-[var(--gold)] transition-colors">
                    {group.title}
                  </h3>
                </div>
                <span className="text-[8px] font-black uppercase tracking-wider bg-white/60 border border-slate-100 shadow-sm rounded-lg px-2.5 py-1 text-slate-400">
                  {group.totalCount} wpisów
                </span>
              </div>

              <p className="text-[10px] text-slate-500 font-medium leading-relaxed mb-6 h-10 line-clamp-2 relative z-10">
                {group.subtitle}
              </p>

              <div className="flex flex-col gap-6 flex-grow relative z-10">
                {/* Featured Item with Image */}
                <Link 
                  href={featured.slug.startsWith("#") ? "#" : `/artykul/${featured.slug}`}
                  className="group/feat block relative overflow-hidden rounded-2xl bg-white/40 border border-slate-100/60 hover:border-[var(--gold)]/20 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-50 border border-slate-100/50">
                    <img 
                      src={featured.image || "/placeholder.svg"} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/feat:scale-[1.03]" 
                      alt="" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--imperial-blue)]/80 via-transparent to-transparent opacity-85" />
                    <span className="absolute left-3 top-3 rounded-lg bg-[var(--gold)]/95 backdrop-blur-sm px-2.5 py-1 text-[8px] font-black uppercase tracking-widest text-[var(--imperial-blue)] shadow-md">
                      {featured.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      <Calendar className="h-3 w-3 text-[var(--gold)]/80" />
                      <span>{featured.date}</span>
                    </div>
                    <h4 className="text-xs font-bold leading-snug text-[var(--imperial-blue)] group-hover/feat:text-[var(--gold)] transition-colors line-clamp-2">
                      {featured.title}
                    </h4>
                  </div>
                </Link>

                {/* Secondary Items */}
                <div className="flex flex-col gap-4">
                  {group.rest.map((item, itemIdx) => (
                    <Link 
                      key={itemIdx}
                      href={item.slug.startsWith("#") ? "#" : `/artykul/${item.slug}`}
                      className="flex flex-col gap-1 group/item pb-3.5 border-b border-slate-100 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-400 group-hover/item:text-[var(--gold)] transition-colors">
                        <span>{item.date}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                        <span>{item.readingTime} min</span>
                      </div>
                      <h5 className="text-[11px] font-bold leading-snug text-slate-600 group-hover/item:text-[var(--imperial-blue)] transition-colors line-clamp-2">
                        {item.title}
                      </h5>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 relative z-10">
                <Link 
                  href={`/?kategoria=${encodeURIComponent(group.catFilter)}#archiwum`}
                  className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--gold)] hover:text-[var(--imperial-blue)] transition-colors"
                >
                  Wszystkie wpisy
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
