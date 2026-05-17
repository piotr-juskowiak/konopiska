import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Clock, Share2 } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getArticleBySlug, newsItems, formatPolishDate } from "@/lib/news-data"
import { ArticleComments } from "@/components/article-comments"

export function generateStaticParams() {
  return newsItems.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: "Artykuł nie znaleziony" }
  return {
    title: `${article.title} — Serwis Informacyjny Konopiska`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const related = newsItems
    .filter((n) => n.slug !== article.slug && n.category === article.category)
    .slice(0, 3)
  const fallbackRelated = newsItems.filter((n) => n.slug !== article.slug).slice(0, 3)
  const relatedFinal = related.length ? related : fallbackRelated

  const updatedAt = new Date().toLocaleString("pl-PL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader updatedAt={updatedAt} />

      <article className="mx-auto max-w-3xl px-4 pt-10 pb-16 sm:px-6 lg:pt-16">
        <Link
          href="/#archiwum"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Wróć do archiwum
        </Link>

        <header className="mt-8 border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-2">
            {article.category && (
              <Link
                href={`/?kategoria=${encodeURIComponent(article.category)}#archiwum`}
                className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary-foreground hover:opacity-90"
              >
                {article.category}
              </Link>
            )}
            <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              <time>{formatPolishDate(article.date)}</time>
            </span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-muted-foreground/60" />
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              <Clock className="h-3 w-3" /> {article.readingTime} min czytania
            </span>
          </div>

          <h1 className="mt-5 font-serif text-3xl font-medium leading-tight tracking-tight text-foreground text-balance sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
            {article.excerpt}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <div
              aria-hidden
              className="grid h-10 w-10 place-items-center rounded-full bg-secondary font-serif text-sm font-semibold text-foreground"
            >
              MK
            </div>
            <div className="text-sm">
              <p className="font-medium text-foreground">Redakcja Serwisu Informacyjnego Konopiska</p>
              <p className="text-xs text-muted-foreground">Newsroom lokalny</p>
            </div>
          </div>
        </header>

        <figure className="my-10 overflow-hidden rounded-xl border border-border bg-secondary">
          <img
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        </figure>

        <div className="prose-content space-y-6 font-serif text-lg leading-relaxed text-foreground/90">
          {article.body.map((para, i) => (
            <p key={i} className={i === 0 ? "first-letter:font-serif first-letter:text-5xl first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none first-letter:text-primary" : ""}>
              {para}
            </p>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
              Źródło oficjalne
            </p>
            <p className="mt-1 font-serif text-base text-foreground">
              Przeczytaj komunikat na stronie konopiska.pl
            </p>
          </div>
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition hover:bg-primary"
          >
            Otwórz oryginał
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-8 flex items-center justify-between text-sm">
          <Link
            href="/#archiwum"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Wszystkie artykuły
          </Link>
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <Share2 className="h-4 w-4" /> Udostępnij ten materiał
          </span>
        </div>

        <ArticleComments />
      </article>

      {/* Related */}
      <section
        aria-labelledby="related-heading"
        className="border-t border-border bg-card/40 paper-grain"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
                Czytaj dalej
              </p>
              <h2
                id="related-heading"
                className="mt-2 font-serif text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
              >
                Powiązane historie
              </h2>
            </div>
            <Link
              href="/#archiwum"
              className="hidden text-sm font-semibold text-primary hover:underline sm:inline"
            >
              Pełne archiwum →
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedFinal.map((item) => (
              <article key={item.slug} className="group flex flex-col">
                <Link
                  href={`/artykul/${item.slug}`}
                  className="block overflow-hidden rounded-lg border border-border bg-card"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    {item.category && (
                      <span className="absolute left-3 top-3 rounded-full bg-background/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-foreground">
                        {item.category}
                      </span>
                    )}
                  </div>
                </Link>
                <div className="flex flex-1 flex-col px-1 pt-5">
                  <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                    <time>{formatPolishDate(item.date)}</time>
                  </p>
                  <h3 className="mt-2 font-serif text-lg font-medium leading-snug text-foreground text-pretty">
                    <Link
                      href={`/artykul/${item.slug}`}
                      className="transition-colors hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
