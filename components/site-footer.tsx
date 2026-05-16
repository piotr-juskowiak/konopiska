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
      { label: "O Magazynie", href: "#" },
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
    <footer className="relative mt-24 bg-[#001d4a] text-white border-t-[6px] border-[var(--gold)] overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[var(--french-blue)] rounded-full blur-[100px] opacity-20 pointer-events-none translate-x-1/3 -translate-y-1/3" />

      {/* Main grid */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Brand block */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-4">
              <img
                src="/logo.png"
                alt=""
                className="h-14 w-14 rounded-full object-cover shadow-[0_0_20px_var(--gold)]/30"
              />
              <span>
                <span className="block font-serif text-2xl font-medium leading-none text-white tracking-tight">
                  Magazyn Konopiska
                </span>
                <span className="mt-1.5 block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--gold)]/80">
                  Dziennik gminny · Est. 2024
                </span>
              </span>
            </Link>

            <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/70">
              Niezależny, czytelniczy przegląd wiadomości z Gminy Konopiska.
              Łączymy rzetelne dziennikarstwo z dbałością o lokalną pamięć i najwyższą estetykę słowa.
            </p>

            <div className="mt-8 rounded-2xl bg-white/5 p-6 border border-white/10">
               <p className="font-serif text-sm font-bold uppercase tracking-widest text-[var(--gold)] mb-3">Informacje</p>
               <p className="text-xs leading-relaxed text-white/60">
                 Serwis internetowy <span className="text-white font-medium">GminaKonopiska.pl</span> stawia sobie za cel rzetelne informowanie o życiu gminy Konopiska. 
                 Niniejszy serwis jest <span className="text-[var(--school-bus-yellow)] font-bold">całkowicie niezależny</span> i nie jest w żaden sposób związany z Urzędem Gminy Konopiska.
               </p>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-4">
            {sections.slice(0, 2).map((section) => (
              <div key={section.title}>
                <p className="font-serif text-sm font-medium uppercase tracking-[0.2em] text-[var(--gold)]">
                  {section.title}
                </p>
                <span aria-hidden className="mt-4 block h-px w-12 bg-[var(--french-blue)]" />
                <ul className="mt-6 space-y-4 text-sm text-white/70">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-2 transition-colors hover:text-white"
                      >
                        <span className="h-1 w-1 rounded-full bg-[var(--gold)] opacity-0 transition-opacity group-hover:opacity-100" />
                        <span className="border-b border-transparent group-hover:border-[var(--school-bus-yellow)]">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4">
            <p className="font-serif text-sm font-medium uppercase tracking-[0.2em] text-[var(--gold)]">
              Zostań w kontakcie
            </p>
            <span aria-hidden className="mt-4 block h-px w-12 bg-[var(--french-blue)]" />
            
            <p className="mt-6 text-sm leading-relaxed text-white/70">
              Otrzymuj najważniejsze wiadomości i wydarzenia prosto na swoją skrzynkę e-mail.
            </p>

            <form
              className="mt-8 flex flex-col gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-1 items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus-within:border-[var(--gold)]/50 transition-colors">
                <Mail className="h-4 w-4 text-[var(--gold)]/60" />
                <input
                  type="email"
                  required
                  placeholder="Twój adres e-mail"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-white/30"
                />
              </div>
              <button
                type="submit"
                className="group flex items-center justify-center gap-2 rounded-xl bg-[var(--gold)] px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest text-[var(--imperial-blue)] transition-all hover:bg-[var(--school-bus-yellow)]"
              >
                Zapisz się
                <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            <ul className="mt-12 space-y-4 text-sm text-white/80">
              <li className="flex items-center gap-4 group">
                <MapPin className="h-4 w-4 text-[var(--gold)]/60" />
                <span className="text-xs">ul. Lipowa 5, 42-274 Konopiska</span>
              </li>
              <li className="flex items-center gap-4 group">
                <Mail className="h-4 w-4 text-[var(--gold)]/60" />
                <a href="mailto:redakcja@magazyn-konopiska.pl" className="text-xs hover:text-[var(--gold)] transition-colors">
                  redakcja@magazyn-konopiska.pl
                </a>
              </li>
              <li className="flex items-center gap-4 group">
                <Phone className="h-4 w-4 text-[var(--gold)]/60" />
                <a href="tel:+48340000000" className="text-xs hover:text-[var(--gold)] transition-colors">
                  +48 34 000 00 00
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/10 bg-[#001538]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-8 sm:px-6 lg:flex-row">
          <p className="text-[10px] uppercase tracking-widest text-white/40 text-center lg:text-left">
            © {new Date().getFullYear()} Magazyn Konopiska. Niezależny portal informacyjny.
          </p>

          <div className="flex items-center gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/70 transition-all hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--imperial-blue)] shadow-sm"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
