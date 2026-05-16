import { Suspense } from "react"
import { BreakingTicker } from "@/components/breaking-ticker"
import { HeroFeature } from "@/components/hero-feature"
import { NewsGrid } from "@/components/news-grid"
import { NewsletterBand } from "@/components/newsletter-band"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { newsItems } from "@/lib/news-data"

export default function Page() {
  const [feature, ...rest] = newsItems
  const secondary = rest.slice(0, 3)

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
      <HeroFeature feature={feature} secondary={secondary} />
      <Suspense fallback={null}>
        <NewsGrid items={newsItems} />
      </Suspense>
      <NewsletterBand />
      <SiteFooter />
    </main>
  )
}
