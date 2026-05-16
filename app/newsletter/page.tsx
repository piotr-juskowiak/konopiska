"use client"

import { useState } from "react"
import { Check, Mail, Clock, Newspaper, ShieldCheck, Quote } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/page-hero"

const benefits = [
  {
    icon: Newspaper,
    title: "Wybór redakcji",
    text: "Co tydzień przegląd 5–7 najważniejszych tekstów z gminy w jednym mailu.",
  },
  {
    icon: Clock,
    title: "Bez spamu",
    text: "Jedna wiadomość w piątek o 7:30. Bez reklam i bez śledzenia czytelników.",
  },
  {
    icon: ShieldCheck,
    title: "Twoje dane są bezpieczne",
    text: "Adres przechowujemy wyłącznie do wysyłki. Wypisujesz się jednym kliknięciem.",
  },
]

export default function NewsletterPage() {
  const [email, setEmail] = useState("")
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
    if (!email.includes("@")) return
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader updatedAt={updatedAt} />

      <PageHero
        eyebrow="List redakcji"
        title="Cotygodniowy newsletter z Konopisk"
        description="Zapisz się, a w każdy piątek o świcie otrzymasz starannie wybrany przegląd tygodnia, krótki komentarz redakcji i jedno wydarzenie do zaplanowania w weekend."
        breadcrumb={[
          { label: "Magazyn", href: "/" },
          { label: "Newsletter" },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          {/* Form card */}
          <div className="overflow-hidden rounded-3xl border border-border bg-primary text-primary-foreground shadow-sm">
            <div className="relative p-8 md:p-12">
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/30 blur-3xl"
              />
              <span className="inline-flex items-center gap-2 rounded-full bg-background/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em]">
                <Mail className="h-3 w-3" aria-hidden /> Zapisz się
              </span>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight md:text-4xl">
                Czytaj gminę w jeden poranek.
              </h2>
              <p className="mt-4 max-w-lg text-primary-foreground/80">
                Dołącz do ponad 1 200 mieszkańców, którzy zaczynają piątek od kawy i krótkiego przeglądu wydarzeń.
              </p>

              {submitted ? (
                <div className="mt-8 flex items-start gap-3 rounded-2xl border border-background/20 bg-background/10 p-5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-foreground">
                    <Check className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-serif text-lg font-semibold">Dziękujemy!</p>
                    <p className="text-sm text-primary-foreground/80">
                      Wysłaliśmy potwierdzenie na <span className="font-medium">{email}</span>. Sprawdź swoją skrzynkę.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-8 space-y-3">
                  <label className="block">
                    <span className="sr-only">Adres e-mail</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="twoj@email.pl"
                      className="h-14 w-full rounded-full border border-background/20 bg-background/10 px-6 text-base text-primary-foreground placeholder:text-primary-foreground/60 outline-none focus:border-accent"
                    />
                  </label>
                  <button
                    type="submit"
                    className="inline-flex h-14 w-full items-center justify-center rounded-full bg-accent px-6 font-medium text-foreground transition hover:bg-background hover:text-foreground"
                  >
                    Zapisz mnie do newslettera
                  </button>
                  <p className="pt-2 text-xs text-primary-foreground/70">
                    Klikając „Zapisz mnie", akceptujesz naszą politykę prywatności. Wypiszesz się w każdej chwili.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
              Co znajdziesz w środku
            </p>
            <h3 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-foreground">
              Lekkie czytanie, ciężka robota redakcyjna.
            </h3>

            <ul className="mt-8 space-y-6">
              {benefits.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-secondary text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-serif text-lg font-semibold text-foreground">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <figure className="mt-10 rounded-2xl border border-border bg-card p-6">
              <Quote className="h-6 w-6 text-accent" aria-hidden />
              <blockquote className="mt-3 font-serif text-lg leading-relaxed text-foreground">
                „Najlepszy sposób, żeby w piątek rano wiedzieć, co naprawdę dzieje się w gminie."
              </blockquote>
              <figcaption className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">
                Anna K., czytelniczka z Aleksandrii
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
