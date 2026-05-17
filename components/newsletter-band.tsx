"use client"

import { Mail } from "lucide-react"

export function NewsletterBand() {
  return (
    <section id="newsletter" aria-labelledby="newsletter-heading" className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:py-20">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            Niedzielne wydanie
          </p>
          <h2
            id="newsletter-heading"
            className="mt-3 font-serif text-3xl font-medium leading-tight text-balance sm:text-4xl"
          >
            Co tydzień najważniejsze sprawy z Konopisk w Twojej skrzynce.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/80">
            Bez spamu. Bez reklam. Po prostu uważnie wybrany przegląd lokalnych
            historii, komunikatów i wydarzeń — każdej niedzieli rano.
          </p>
        </div>

        <form
          className="flex flex-col gap-3 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-5 backdrop-blur sm:flex-row sm:items-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="email" className="sr-only">
            Adres e-mail
          </label>
          <div className="flex flex-1 items-center gap-2 rounded-lg bg-background px-3 py-2.5 text-foreground">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <input
              id="email"
              type="email"
              required
              placeholder="jan.kowalski@example.com"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
          >
            Zapisz mnie
          </button>
        </form>
      </div>
    </section>
  )
}
