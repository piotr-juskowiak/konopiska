"use client"

import Link from "next/link"
import { Trophy, Home, Music, Trees, ArrowRight, Calendar, Layers, Activity, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"

const groups = [
  {
    title: "Sport i rekreacja",
    subtitle: "Turnieje, relacje meczowe, zalew Pająk i aktywność fizyczna mieszkańców.",
    icon: Trophy,
    iconColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    totalCount: 14,
    galleryImages: [
      {
        id: 1,
        url: "https://www.konopiska.pl/img/media/500x250/500x250-IMG_1472-Duży.jpeg.webp",
        title: "80 lat historii GLKS LOT",
        slug: "80-lat-historii-pasji-i-ludzi-jubileusz-glks-lot-konopiska-6296"
      },
      {
        id: 2,
        url: "https://www.konopiska.pl/img/media/500x250/500x250-Baner1GminaKonopiska.jpg.webp",
        title: "Biegi przełajowe o Puchar Wójta",
        slug: "#"
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=250&fit=crop",
        title: "Zalew Pająk gotowy do sezonu",
        slug: "#"
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=250&fit=crop",
        title: "Turnieje i zawody",
        slug: "#"
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
    galleryImages: [
      {
        id: 1,
        url: "https://www.konopiska.pl/img/media/500x250/500x250-mmo.jpg.webp",
        title: "Konkurs Moja Mała Ojczyzna",
        slug: "konkurs-wiedzy-o-gminie-konopiska-moja-mala-ojczyzna-6304"
      },
      {
        id: 2,
        url: "https://www.konopiska.pl/img/media/500x250/500x250-IMG_1921.JPG.webp",
        title: "Rocker Music Festival vol. 2",
        slug: "rocker-music-festival-vol2-6305"
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1496450866810-d506b6f32e5e?w=500&h=250&fit=crop",
        title: "Gminny Dzień Dziecka",
        slug: "#"
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=250&fit=crop",
        title: "Imprezy kulturalne",
        slug: "#"
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
    galleryImages: [
      {
        id: 1,
        url: "https://www.konopiska.pl/img/media/500x250/500x250-d1a49047-66b3-4c68-b4f6-2920225295b8.jpeg.webp",
        title: "Porozumienie ze Stowarzyszeniem YAVA",
        slug: "porozumienie-o-wspolpracy-pomiedzy-stowarzyszeniem-yava-zs-w-czestochowie-a-gmina-konopiska-6316"
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=250&fit=crop",
        title: "Modernizacja oświetlenia ulicznego",
        slug: "#"
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1581578731548-c64695aadad0?w=500&h=250&fit=crop",
        title: "Drogi gminne",
        slug: "#"
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=500&h=250&fit=crop",
        title: "Infrastruktura lokalna",
        slug: "#"
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

      <div className="grid gap-12 sm:grid-cols-1 lg:grid-cols-3">
        {groups.map((group, idx) => {
          const Icon = group.icon
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

              <p className="text-[10px] text-slate-500 font-medium leading-relaxed mb-6 relative z-10">
                {group.subtitle}
              </p>

              {/* Gallery Carousel */}
              <div className="flex flex-col gap-4 flex-grow relative z-10">
                <Carousel className="w-full">
                  <CarouselContent className="-ml-2">
                    {group.galleryImages.map((image) => (
                      <CarouselItem key={image.id} className="pl-2 basis-full">
                        <Link 
                          href={image.slug.startsWith("#") ? "#" : `/artykul/${image.slug}`}
                          className="group/gallery block relative overflow-hidden rounded-2xl"
                        >
                          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-50 border border-slate-100/50">
                            <img 
                              src={image.url} 
                              alt={image.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover/gallery:scale-[1.08]" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--imperial-blue)]/80 via-transparent to-transparent opacity-85" />
                            <div className="absolute inset-0 flex flex-col justify-end p-4">
                              <h4 className="text-sm font-bold leading-snug text-white group-hover/gallery:text-[var(--gold)] transition-colors">
                                {image.title}
                              </h4>
                            </div>
                          </div>
                        </Link>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="!static ml-0 mt-3 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-100 bg-white hover:bg-slate-50 shadow-sm transition-all" />
                  <CarouselNext className="!static ml-2 mt-3 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-100 bg-white hover:bg-slate-50 shadow-sm transition-all" />
                </Carousel>
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
