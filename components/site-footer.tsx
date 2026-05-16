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
    <footer className="relative mt-24 bg-foreground text-background">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-accent via-primary to-accent" aria-hidden />

      {/* Newsletter / CTA strip */}
      <div className="border-b border-background/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
              Codzienne wydanie
            </p>
            <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight text-background md:text-3xl">
              Otrzymuj najważniejsze wiadomości z gminy prosto na skrzynkę.
            </h3>
          </div>
          <Link
            href="/newsletter"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-foreground transition hover:bg-background hover:text-foreground"
          >
            Zapisz się do newslettera
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand block */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <span
                aria-hidden
                className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground font-serif text-xl font-semibold"
              >
                K
              </span>
              <span>
                <span className="block font-serif text-2xl font-semibold leading-none text-background">
                  Magazyn Konopiska
                </span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.3em] text-background/60">
                  Dziennik gminny · Est. 2024
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-background/70">
              Niezależny, czytelniczy przegląd wiadomości z Gminy Konopiska.
              Łączymy rzetelne dziennikarstwo z dbałością o lokalną pamięć i estetykę słowa.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-background/80">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>ul. Lipowa 5, 42-274 Konopiska</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href="mailto:redakcja@magazyn-konopiska.pl" className="hover:text-accent">
                  redakcja@magazyn-konopiska.pl
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href="tel:+48340000000" className="hover:text-accent">
                  +48 34 000 00 00
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>pon.–pt. 8:00–16:00</span>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-3 md:col-span-8">
            {sections.map((section) => (
              <div key={section.title}>
                <p className="font-serif text-sm font-semibold uppercase tracking-[0.2em] text-background">
                  {section.title}
                </p>
                <span aria-hidden className="mt-3 block h-px w-10 bg-accent" />
                <ul className="mt-5 space-y-3 text-sm text-background/70">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 transition-colors hover:text-background"
                      >
                        <span className="border-b border-transparent group-hover:border-accent">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Awards / stats row */}
        <div className="mt-16 grid gap-6 border-t border-background/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { stat: "12 lat", label: "tradycji lokalnego dziennikarstwa" },
            { stat: "240+", label: "artykułów rocznie" },
            { stat: "8 sołectw", label: "objętych stałą relacją" },
            { stat: "100%", label: "treści tworzonych lokalnie" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span className="font-serif text-3xl font-semibold text-accent">{item.stat}</span>
              <span className="text-xs uppercase tracking-wider text-background/60">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10 bg-foreground/60">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center">
          <p className="text-xs text-background/60">
            © {new Date().getFullYear()} Magazyn Konopiska. Wszystkie prawa zastrzeżone.
            Treści źródłowe pochodzą z serwisu{" "}
            <a
              href="https://www.konopiska.pl"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              konopiska.pl
            </a>
            .
          </p>

          <div className="flex items-center gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-background/15 text-background/70 transition hover:border-accent hover:bg-accent hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-background/40">
            Wydanie internetowe · v1.0
          </p>
        </div>
      </div>
    </footer>
  )
}
