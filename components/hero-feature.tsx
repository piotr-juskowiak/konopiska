import Link from "next/link"
import { ArrowUpRight, Clock } from "lucide-react"
import { formatPolishDate, type NewsItem } from "@/lib/news-data"

export function HeroFeature({ feature, secondary }: { feature: NewsItem; secondary: NewsItem[] }) {
  return (
    <section
      id="aktualnosci"
      aria-labelledby="hero-heading"
      className="mx-auto max-w-7xl px-4 pt-10 pb-12 sm:px-6 lg:pt-16"
    >
      {/* Masthead */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-foreground/15 pb-6 md:flex-row md:items-end">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
            Wydanie · Maj 2026
          </p>
          <h1
            id="hero-heading"
            className="mt-3 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl"
          >
            Tygodnik z życia <em className="italic text-primary">Gminy Konopiska</em>
          </h1>
        </div>
        <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          Wybrane historie, komunikaty samorządu i zapowiedzi wydarzeń —
          starannie wyselekcjonowane dla mieszkańców i przyjaciół gminy.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Featured card */}
        <article className="group lg:col-span-8">
          <Link
            href={`/artykul/${feature.slug}`}
            className="block overflow-hidden rounded-xl border border-border bg-card transition hover:border-primary/40"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
              <img
                src={feature.image || "/placeholder.svg"}
                alt={feature.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent-foreground">
                  Wyróżnione
                </span>
                {feature.category && (
                  <span className="rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-foreground">
                    {feature.category}
                  </span>
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-background sm:p-8">
                <div className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-widest opacity-90">
                  <Clock className="h-3 w-3" />
                  <time>{formatPolishDate(feature.date)}</time>
                </div>
                <h2 className="font-serif text-2xl font-medium leading-tight text-balance sm:text-3xl lg:text-4xl">
                  {feature.title}
                </h2>
                <p className="mt-3 hidden max-w-2xl text-sm leading-relaxed text-background/90 sm:block">
                  {feature.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                  Czytaj historię
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          </Link>
        </article>

        {/* Side: 3 secondary stories */}
        <div className="flex flex-col divide-y divide-border lg:col-span-4">
          <p className="pb-4 font-serif text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Także w wydaniu
          </p>
          {secondary.slice(0, 3).map((item) => (
            <Link
              key={item.slug}
              href={`/artykul/${item.slug}`}
              className="group flex gap-4 py-5 first:pt-4"
            >
              <div className="relative aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-secondary">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="min-w-0 flex-1">
                {item.category && (
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                    {item.category}
                  </p>
                )}
                <h3 className="mt-1 font-serif text-base font-medium leading-snug text-foreground text-pretty group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[11px] uppercase tracking-widest text-muted-foreground">
                  {formatPolishDate(item.date)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
