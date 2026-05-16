import Link from "next/link"
import { Calendar, ArrowUpRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/page-hero"
import { newsItems } from "@/lib/news-data"

export const metadata = {
  title: "Aktualności · Serwis Informacyjny Konopiska",
  description: "Najnowsze wiadomości i doniesienia z Gminy Konopiska.",
}

export default function AktualnosciPage() {
  const updatedAt = new Date().toLocaleString("pl-PL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  const [lead, ...rest] = newsItems

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader updatedAt={updatedAt} />

      <PageHero
        eyebrow="Wydanie z dnia"
        title="Aktualności z Gminy Konopiska"
        description="Bieżące doniesienia, decyzje samorządu, wydarzenia kulturalne i sprawy mieszkańców — wszystko, czym żyje gmina, w jednym miejscu."
        breadcrumb={[
          { label: "Serwis", href: "/" },
          { label: "Aktualności" },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        {/* Lead story */}
        {lead && (
          <Link
            href={`/artykul/${lead.slug}`}
            className="group mb-16 grid gap-8 overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:shadow-lg md:grid-cols-2"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-secondary md:aspect-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lead.image || "/placeholder.svg"}
                alt={lead.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute left-5 top-5 inline-flex items-center rounded-full bg-background/95 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground backdrop-blur">
                Wiadomość dnia
              </span>
            </div>
            <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
                {lead.category}
              </span>
              <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-foreground text-balance md:text-4xl">
                {lead.title}
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground line-clamp-4 text-pretty">
                {lead.excerpt}
              </p>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" aria-hidden />
                <time>{lead.date}</time>
                <span aria-hidden>·</span>
                <span>{lead.readTime}</span>
              </div>
              <span className="mt-2 inline-flex items-center gap-1.5 font-medium text-primary">
                Czytaj relację
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        )}

        {/* Stream */}
        <div className="mb-10 flex items-end justify-between gap-6 border-b border-border pb-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
              Strumień wiadomości
            </p>
            <h3 className="mt-2 font-serif text-2xl font-semibold tracking-tight text-foreground">
              Wszystkie artykuły
            </h3>
          </div>
          <Link
            href="/archiwum"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary"
          >
            Pełne archiwum
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <ul className="divide-y divide-border">
          {rest.map((item, i) => (
            <li key={item.slug}>
              <Link
                href={`/artykul/${item.slug}`}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 py-6 md:grid-cols-[auto_1fr_140px_auto]"
              >
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {String(i + 2).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                    {item.category}
                  </span>
                  <h4 className="mt-1.5 font-serif text-xl font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary md:text-2xl">
                    {item.title}
                  </h4>
                  <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {item.excerpt}
                  </p>
                </div>
                <div className="hidden text-xs text-muted-foreground md:block">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" aria-hidden />
                    <time>{item.date}</time>
                  </div>
                  <p className="mt-1">{item.readTime}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter />
    </main>
  )
}
