"use client"

import Link from "next/link"
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  MapPin,
  ChevronRight,
  Rss,
} from "lucide-react"

const sections = [
  {
    title: "Działy",
    links: [
      { label: "Aktualności", href: "/aktualnosci" },
      { label: "Wydarzenia", href: "/wydarzenia" },
      { label: "Samorząd", href: "/polityka" },
      { label: "Mieszkańcy", href: "/?cat=Mieszka%C5%84cy#archiwum" },
      { label: "Kultura", href: "/wydarzenia" },
      { label: "Sport", href: "/sport" },
    ],
  },
  {
    title: "Redakcja",
    links: [
      { label: "O Serwisie", href: "#" },
      { label: "Zespół", href: "#" },
      { label: "Kontakt z redakcją", href: "/kontakt" },
      { label: "Reklama i patronaty", href: "#" },
      { label: "Prenumerata", href: "#" },
      { label: "Prywatność", href: "#" },
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
    <footer className="relative bg-[var(--imperial-blue-dark)] text-white overflow-hidden border-t-[6px] border-[var(--gold)]">
      {/* Abstract geometric background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[var(--imperial-blue)] opacity-50 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 mx-auto max-w-[90rem] px-4 pt-16 pb-12 sm:px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-12 xl:gap-20">
          
          {/* Left: Brand & Info */}
          <div className="flex flex-col max-w-sm shrink-0">
            <Link href="/" className="inline-flex items-center gap-4 group mb-8">
              <img
                src="/logo.png"
                alt=""
                className="h-16 w-16 rounded-2xl object-cover border-2 border-white/10 group-hover:border-[var(--gold)] transition-colors shadow-xl"
              />
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold leading-none text-white tracking-tight group-hover:text-[var(--gold)] transition-colors">
                  Serwis Gminny
                </span>
                <span className="mt-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--gold)]">
                  Konopiska
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed mb-8 font-medium">
              Oficjalne i niezależne źródło informacji. Codzienne aktualności, zapowiedzi wydarzeń oraz najważniejsze komunikaty dla mieszkańców.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 shadow-inner">
                <MapPin className="h-4 w-4 text-[var(--gold)]" />
              </div>
              <p className="text-xs font-semibold text-white/70">
                ul. Lipowa 5, 42-274 Konopiska
              </p>
            </div>
          </div>

          {/* Right: Navigation Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 w-full lg:w-auto flex-grow justify-end">
            {sections.map((section) => (
              <div key={section.title} className="flex flex-col">
                <h4 className="font-serif text-lg font-bold text-white mb-6 flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] shadow-[0_0_8px_rgba(181,155,51,0.8)]" />
                  {section.title}
                </h4>
                <ul className="flex flex-col gap-3.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-white/50 hover:text-[var(--gold)] hover:translate-x-1 inline-block transition-all"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom bar - Reduced height */}
      <div className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-[90rem] flex-col items-center justify-between gap-4 px-4 py-4 sm:px-6 md:flex-row">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
            © 2026 Serwis Informacyjny
          </p>

          <div className="flex items-center gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/40 border border-white/5 hover:bg-[var(--gold)] hover:text-[var(--imperial-blue)] hover:border-[var(--gold)] hover:scale-110 transition-all"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-[var(--gold)] transition-colors group"
          >
            W górę
            <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[var(--gold)] group-hover:bg-[var(--gold)]/20 transition-all">
              <ChevronRight className="h-3 w-3 -rotate-90 group-hover:text-[var(--gold)] transition-colors" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  )
}
