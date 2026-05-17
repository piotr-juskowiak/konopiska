import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/page-hero"
import { BreakingTicker } from "@/components/breaking-ticker"
import { NewsGrid } from "@/components/news-grid"
import { NewsletterBand } from "@/components/newsletter-band"
import { newsItems } from "@/lib/news-data"

export const metadata = {
  title: "Aktualności · Serwis Informacyjny Gmina Konopiska",
  description: "Najnowsze wiadomości, relacje i doniesienia z Gminy Konopiska. Bądź na bieżąco z życiem regionu.",
}

export default function AktualnosciPage() {
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
      <BreakingTicker items={newsItems} />

      <PageHero
        eyebrow="Dziennik Gminny"
        title="Aktualności z Gminy Konopiska"
        description="Bieżące doniesienia, decyzje samorządu, inwestycje, wydarzenia kulturalne i sportowe. Najważniejsze informacje o sprawach lokalnych w jednym, zintegrowanym miejscu."
        breadcrumb={[
          { label: "Serwis", href: "/" },
          { label: "Aktualności" },
        ]}
      />

      <Suspense fallback={
        <div className="mx-auto max-w-[90rem] px-4 py-24 text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[var(--gold)] mx-auto" />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Wczytywanie bazy artykułów...</p>
        </div>
      }>
        <NewsGrid items={newsItems} />
      </Suspense>

      <NewsletterBand />
      <SiteFooter />
    </main>
  )
}

