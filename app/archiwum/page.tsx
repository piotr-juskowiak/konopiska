import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/page-hero"
import { NewsGrid } from "@/components/news-grid"
import { newsItems } from "@/lib/news-data"

export const metadata = {
  title: "Archiwum · Serwis Informacyjny Konopiska",
  description: "Przeszukiwalne archiwum wszystkich artykułów Serwisu Informacyjnego Konopiska.",
}

export default function ArchiwumPage() {
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

      <PageHero
        eyebrow="Archiwum redakcji"
        title="Wszystkie historie z gminy"
        description="Przeszukuj pełen katalog wydań — od najnowszych doniesień po starsze relacje. Filtruj po kategorii lub użyj wyszukiwarki."
        breadcrumb={[
          { label: "Serwis", href: "/" },
          { label: "Archiwum" },
        ]}
      />

      <Suspense fallback={null}>
        <NewsGrid items={newsItems} hideIntro />
      </Suspense>

      <SiteFooter />
    </main>
  )
}
