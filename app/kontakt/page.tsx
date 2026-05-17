"use client"

import { useState } from "react"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Check,
  Newspaper,
  Megaphone,
  HelpCircle,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/page-hero"

const channels = [
  {
    icon: Newspaper,
    title: "Tematy i listy do redakcji",
    email: "redakcja@magazyn-konopiska.pl",
    desc: "Sygnały, propozycje materiałów, sprostowania.",
  },
  {
    icon: Megaphone,
    title: "Reklama i patronaty",
    email: "reklama@magazyn-konopiska.pl",
    desc: "Współpraca, ogłoszenia patronackie, prenumerata firmowa.",
  },
  {
    icon: HelpCircle,
    title: "Pomoc czytelnikom",
    email: "kontakt@magazyn-konopiska.pl",
    desc: "Problemy techniczne, prenumerata, archiwum papierowe.",
  },
]

export default function KontaktPage() {
  const [form, setForm] = useState({ name: "", email: "", topic: "Temat redakcyjny", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const updatedAt = new Date().toLocaleString("pl-PL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader updatedAt={updatedAt} />

      <PageHero
        eyebrow="Napisz do nas"
        title="Kontakt z redakcją"
        description="Masz temat, sygnał, sprostowanie albo propozycję współpracy? Piszemy o Twojej gminie — czekamy na Twoją wiadomość."
        breadcrumb={[
          { label: "Magazyn", href: "/" },
          { label: "Kontakt" },
        ]}
      />

      {/* Channels */}
      <section className="mx-auto max-w-[90rem] px-4 pt-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {channels.map(({ icon: Icon, title, email, desc }) => (
            <a
              key={email}
              href={`mailto:${email}`}
              className="group rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-5 font-serif text-xl font-semibold text-foreground">{title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              <p className="mt-5 font-mono text-sm text-primary group-hover:underline">{email}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Form + info */}
      <section className="mx-auto max-w-[90rem] px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm md:p-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
              Formularz kontaktowy
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Napisz do nas
            </h2>

            {submitted ? (
              <div className="mt-8 flex items-start gap-3 rounded-2xl border border-border bg-secondary p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-serif text-lg font-semibold text-foreground">
                    Dziękujemy, {form.name || "Czytelniku"}!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Odpowiemy z adresu redakcja@magazyn-konopiska.pl w ciągu 2 dni roboczych.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
                      Imię i nazwisko
                    </span>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none focus:border-primary"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
                      Adres e-mail
                    </span>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none focus:border-primary"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
                    W jakiej sprawie?
                  </span>
                  <select
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none focus:border-primary"
                  >
                    <option>Temat redakcyjny</option>
                    <option>Sprostowanie</option>
                    <option>Reklama i patronat</option>
                    <option>Współpraca</option>
                    <option>Pomoc techniczna</option>
                    <option>Inna sprawa</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
                    Wiadomość
                  </span>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full resize-none rounded-xl border border-border bg-background p-4 text-foreground outline-none focus:border-primary"
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground transition hover:bg-foreground"
                >
                  Wyślij wiadomość
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-border bg-foreground p-8 text-background">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
                Siedziba redakcji
              </p>
              <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight">
                Zajrzyj do nas osobiście
              </h3>

              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>
                    ul. Lipowa 5<br />
                    42-274 Konopiska
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <a href="tel:+48340000000" className="hover:text-accent">
                    +48 34 000 00 00
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <a href="mailto:redakcja@magazyn-konopiska.pl" className="hover:text-accent">
                    redakcja@magazyn-konopiska.pl
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>
                    pon.–pt. 8:00–16:00
                    <br />
                    <span className="text-background/60">sob.–niedz. zamknięte</span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-3xl border border-border">
              <iframe
                title="Mapa - Konopiska"
                src="https://www.openstreetmap.org/export/embed.html?bbox=19.1%2C50.71%2C19.18%2C50.76&layer=mapnik&marker=50.735%2C19.14"
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
