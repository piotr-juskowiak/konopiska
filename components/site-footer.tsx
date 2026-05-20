"use client"

import Link from "next/link"
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  ChevronRight,
  Rss,
  Mail,
  ExternalLink,
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
    <footer className="relative text-white overflow-hidden border-t-[4px] border-[var(--gold)]">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/footer-bg.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        {/* Dark gradient overlay — ensures readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--imperial-blue-dark)]/96 via-[var(--imperial-blue-dark)]/90 to-black/95" />
        {/* Subtle texture layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--imperial-blue)]/30 via-transparent to-[var(--imperial-blue)]/20" />
      </div>

      {/* Decorative top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)]/60 to-transparent" />

      {/* Main Footer Content */}
      <div className="relative z-10 mx-auto max-w-[90rem] px-4 pt-20 pb-12 sm:px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-12 xl:gap-20">
          
          {/* Left: Brand & Info */}
          <div className="flex flex-col max-w-xs shrink-0">
            <Link href="/" className="inline-flex items-center gap-4 group mb-6">
              <div className="relative">
                <img
                  src="/logo.png"
                  alt=""
                  className="h-16 w-16 rounded-2xl object-cover border-2 border-white/10 group-hover:border-[var(--gold)] transition-colors shadow-xl"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[var(--gold)] flex items-center justify-center shadow-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold leading-none text-white tracking-tight group-hover:text-[var(--gold)] transition-colors">
                  Serwis Gminny
                </span>
                <span className="mt-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--gold)]">
                  Konopiska
                </span>
              </div>
            </Link>

            <p className="text-sm text-white/55 leading-relaxed mb-8 font-medium">
              Oficjalne i niezależne źródło informacji. Codzienne aktualności, zapowiedzi wydarzeń oraz najważniejsze komunikaty dla mieszkańców gminy.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-3 mb-8">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/8 border border-white/10">
                  <Mail className="h-4 w-4 text-[var(--gold)]" />
                </div>
                <p className="text-xs font-semibold text-white/65">
                  kontakt@gminakonopiska.pl
                </p>
              </div>
            </div>

            {/* External link to ug */}
            <a
              href="https://www.konopiska.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-xl bg-[var(--gold)]/15 border border-[var(--gold)]/30 text-[var(--gold)] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[var(--gold)] hover:text-[var(--imperial-blue-dark)] transition-all group"
            >
              Oficjalna strona gminy
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Right: Navigation Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 w-full lg:w-auto flex-grow justify-end">
            {sections.map((section) => (
              <div key={section.title} className="flex flex-col">
                <h4 className="font-serif text-base font-bold text-white mb-5 flex items-center gap-2.5">
                  <span className="w-5 h-[2px] bg-[var(--gold)] rounded-full" />
                  {section.title}
                </h4>
                <ul className="flex flex-col gap-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group/link text-sm font-medium text-white/45 hover:text-white inline-flex items-center gap-1.5 transition-all"
                      >
                        <span className="w-0 h-px bg-[var(--gold)] group-hover/link:w-3 transition-all duration-300 shrink-0" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Newsletter strip */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-serif text-lg font-bold text-white">Bądź na bieżąco</p>
            <p className="text-xs text-white/50 font-medium mt-0.5">Zapisz się na newsletter i nie przegap żadnej ważnej informacji.</p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="Twój adres e-mail"
              className="flex-1 sm:w-64 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/35 text-xs font-medium px-4 py-2.5 focus:outline-none focus:border-[var(--gold)]/60 transition-colors"
            />
            <button className="shrink-0 px-5 py-2.5 rounded-xl bg-[var(--gold)] text-[var(--imperial-blue-dark)] text-[10px] font-black uppercase tracking-[0.15em] hover:bg-white transition-colors">
              Zapisz
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/8 bg-black/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-[90rem] flex-col items-center justify-between gap-4 px-4 py-4 sm:px-6 md:flex-row">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
            © 2026 Serwis Informacyjny Gminy Konopiska
          </p>

          <div className="flex items-center gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/40 border border-white/8 hover:bg-[var(--gold)] hover:text-[var(--imperial-blue)] hover:border-[var(--gold)] hover:scale-110 transition-all"
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
