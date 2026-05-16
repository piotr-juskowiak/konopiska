"use client"

import Link from "next/link"
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowUpRight,
  Rss,
  Send
} from "lucide-react"

const sections = [
  {
    title: "Działy",
    links: [
      { label: "Aktualności", href: "/?cat=Aktualno%C5%9Bci#archiwum" },
      { label: "Wydarzenia", href: "/?cat=Wydarzenia#archiwum" },
      { label: "Samorząd", href: "/?cat=Samorz%C4%85d#archiwum" },
      { label: "Mieszkańcy", href: "/?cat=Mieszka%C5%84cy#archiwum" },
      { label: "Kultura", href: "/?cat=Kultura#archiwum" },
      { label: "Sport", href: "/?cat=Sport#archiwum" },
    ],
  },
  {
    title: "Redakcja",
    links: [
      { label: "O Serwisie", href: "#" },
      { label: "Zespół", href: "#" },
      { label: "Kontakt z redakcją", href: "/kontakt" },
      { label: "Reklama i patronaty", href: "#" },
      { label: "Prenumerata papierowa", href: "#" },
      { label: "Polityka prywatności", href: "#" },
    ],
  },
  {
    title: "Gmina",
    links: [
      { label: "Urząd Gminy", href: "https://www.konopiska.pl" },
      { label: "Rada Gminy", href: "https://www.konopiska.pl" },
      { label: "Sołectwa", href: "https://www.konopiska.pl" },
      { label: "Inwestycje", href: "https://www.konopiska.pl" },
      { label: "Komunikaty", href: "https://www.konopiska.pl" },
      { label: "BIP", href: "https://www.konopiska.pl" },
    ],
  },
]

const socials = [
  { label: "Facebook", href: "#", Icon: Facebook },
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "YouTube", href: "#", Icon: Youtube },
  { label: "Twitter", href: "#", Icon: Twitter },
  { label: "RSS", href: "#", Icon: Rss },
]

export function SiteFooter() {
  return (
    <footer className="relative mt-24 bg-[var(--imperial-blue)] text-white border-t-[6px] border-[var(--gold)] overflow-hidden">
      {/* Decorative background effects */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-[var(--french-blue)] rounded-full blur-[120px] opacity-20 pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-[var(--gold)] rounded-full blur-[100px] opacity-10 pointer-events-none -translate-x-1/3 translate-y-1/3" />

      {/* Main grid */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Brand block */}
          <div className="lg:col-span-4 flex flex-col">
            <Link href="/" className="inline-flex items-center gap-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-[var(--gold)] rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
                <img
                  src="/logo.png"
                  alt=""
                  className="relative h-16 w-16 rounded-full object-cover border-2 border-[var(--gold)]/30"
                />
              </div>
              <span>
                <span className="block font-serif text-2xl font-medium leading-none text-white tracking-tight">
                  Serwis Informacyjny
                </span>
                <span className="mt-1.5 block font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--gold)]">
                  Konopiska · Est. 2024
                </span>
              </span>
            </Link>

            <p className="mt-10 max-w-sm text-sm leading-relaxed text-white/60 font-medium">
              Rzetelność, niezależność i pasja do lokalnych historii. Jesteśmy głosem mieszkańców Gminy Konopiska, dbając o najwyższą jakość przekazu i estetykę słowa.
            </p>

            <div className="mt-10 rounded-2xl bg-white/5 p-6 border border-white/10 backdrop-blur-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--gold)]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
               <p className="font-serif text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--gold)] mb-4">Deklaracja Niezależności</p>
               <p className="text-[11px] leading-relaxed text-white/50 relative z-10">
                 Portal <span className="text-white font-bold">GminaKonopiska.pl</span> jest inicjatywą obywatelską. 
                 Działamy w pełni <span className="text-[var(--school-bus-yellow)] font-bold">niezależnie od Urzędu Gminy</span>, co pozwala nam na bezstronne informowanie o sprawach lokalnych.
               </p>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 grid-cols-2 md:grid-cols-3 lg:col-span-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h4 className="font-serif text-sm font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
                  {section.title}
                </h4>
                <div aria-hidden className="mt-4 flex gap-1">
                   <div className="h-0.5 w-8 bg-[var(--french-blue)]" />
                   <div className="h-0.5 w-1 bg-[var(--gold)]" />
                </div>
                <ul className="mt-8 space-y-4">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-2 text-sm text-white/60 transition-all hover:text-[var(--gold)]"
                      >
                        <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                        <span className="transition-transform group-hover:translate-x-1">{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter Column - now part of the grid */}
            <div className="col-span-2 md:col-span-3 xl:col-span-1 pt-10 lg:pt-0">
               <h4 className="font-serif text-sm font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
                 Newsletter
               </h4>
               <div aria-hidden className="mt-4 flex gap-1">
                  <div className="h-0.5 w-8 bg-[var(--french-blue)]" />
                  <div className="h-0.5 w-1 bg-[var(--gold)]" />
               </div>
               <p className="mt-8 text-sm text-white/50 leading-relaxed mb-8">
                 Otrzymuj przegląd tygodnia prosto na swoją skrzynkę. Bez reklam, tylko fakty.
               </p>

               <form
                 className="relative group/form"
                 onSubmit={(e) => e.preventDefault()}
               >
                 <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--gold)]/50" />
                      <input
                        type="email"
                        required
                        placeholder="Twój adres e-mail"
                        className="h-12 w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-xs font-medium outline-none focus:border-[var(--gold)]/50 focus:bg-white/10 transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      className="h-12 px-6 rounded-xl bg-[var(--gold)] text-[var(--imperial-blue)] text-[10px] font-extrabold uppercase tracking-widest transition-all hover:bg-[var(--school-bus-yellow)] hover:scale-105 active:scale-95 shadow-lg shadow-[var(--gold)]/10"
                    >
                      Zapisz
                    </button>
                 </div>
               </form>

               <div className="mt-12 flex flex-col gap-5 pt-8 border-t border-white/5">
                 <div className="flex items-center gap-4 group/item">
                   <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover/item:bg-[var(--gold)]/20 transition-colors">
                     <MapPin className="h-4 w-4 text-[var(--gold)]" />
                   </div>
                   <span className="text-xs text-white/50">ul. Lipowa 5, 42-274 Konopiska</span>
                 </div>
                 <div className="flex items-center gap-4 group/item">
                   <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover/item:bg-[var(--gold)]/20 transition-colors">
                     <Mail className="h-4 w-4 text-[var(--gold)]" />
                   </div>
                   <a href="mailto:redakcja@serwis-konopiska.pl" className="text-xs text-white/50 hover:text-[var(--gold)] transition-colors">
                     redakcja@serwis-konopiska.pl
                   </a>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/5 bg-black/20 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 py-10 sm:px-6 lg:flex-row">
          <div className="flex flex-col items-center lg:items-start gap-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
              © {new Date().getFullYear()} Serwis Informacyjny Konopiska
            </p>
            <p className="text-[9px] font-medium uppercase tracking-widest text-white/20">
              Niezależny portal społecznościowy · Wszystkie prawa zastrzeżone
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 text-white/40 transition-all hover:bg-[var(--gold)] hover:text-[var(--imperial-blue)] hover:scale-110 active:scale-95 shadow-sm"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 hover:text-[var(--gold)] transition-colors"
          >
            Wróć na górę
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[var(--gold)] transition-colors">
              <ChevronRight className="h-4 w-4 -rotate-90" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  )
}

// Helper to make the component work since I missed importing ChevronRight
import { ChevronRight } from "lucide-react"

