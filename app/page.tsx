import { Suspense } from "react"
import { BreakingTicker } from "@/components/breaking-ticker"
import { HeroFeature } from "@/components/hero-feature"
import { EventsCalendar } from "@/components/events-calendar"
import { NewsGrid } from "@/components/news-grid"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { newsItems } from "@/lib/news-data"

export default function Page() {
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
      <HeroFeature items={newsItems.slice(0, 5)} />
      <EventsCalendar />
      <Suspense fallback={null}>
        <NewsGrid items={newsItems} />
      </Suspense>
      <SiteFooter />
    </main>
  )
}
