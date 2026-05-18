"use client"

import { Mail } from "lucide-react"

export function NewsletterBand() {
  return (
    <section 
      id="newsletter" 
      aria-labelledby="newsletter-heading" 
      className="relative overflow-hidden bg-gradient-to-b from-[#0a1021] to-[#0f172a] text-white border-t border-[var(--gold)]/15"
    >
      {/* Premium Decorative Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--gold)]/20 blur-[130px]" />
      </div>

      <div className="relative mx-auto grid max-w-[90rem] gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:py-20">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--gold)]">
            Niedzielne wydanie
          </p>
          <h2
            id="newsletter-heading"
            className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl"
          >
            Co tydzień najważniejsze sprawy z Konopisk w Twojej skrzynce.
          </h2>
          <p className="mt-4 max-w-md text-xs leading-relaxed text-slate-300 font-medium">
            Bez spamu. Bez reklam. Po prostu uważnie wybrany przegląd lokalnych
            historii, komunikatów i wydarzeń — każdej niedzieli rano.
          </p>
        </div>

        <form
          className="relative flex flex-col gap-3 rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-md sm:flex-row sm:items-center shadow-2xl"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="email" className="sr-only">
            Adres e-mail
          </label>
          <div className="flex flex-1 items-center gap-3.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-white transition-all focus-within:border-[var(--gold)]/40 focus-within:ring-4 focus-within:ring-[var(--gold)]/5">
            <Mail className="h-4 w-4 text-slate-400" />
            <input
              id="email"
              type="email"
              required
              placeholder="Twój adres e-mail..."
              className="w-full bg-transparent text-xs font-semibold outline-none placeholder:text-slate-500"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-[var(--gold)] px-6 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--imperial-blue)] shadow-lg shadow-[var(--gold)]/10 transition-all hover:bg-[#cbb03e] hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            Zapisz mnie
          </button>
        </form>
      </div>
    </section>
  )
}
