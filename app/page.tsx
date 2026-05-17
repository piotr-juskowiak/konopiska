import { Suspense } from "react"
import { BreakingTicker } from "@/components/breaking-ticker"
import { HeroFeature } from "@/components/hero-feature"
import { NewsList } from "@/components/news-list"
import { EventsWidget } from "@/components/events-widget"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { newsItems } from "@/lib/news-data"

import { NewsGroups } from "@/components/news-groups"

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
      
      <div className="mx-auto max-w-[90rem] px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Main Content: News List */}
          <div className="min-w-0 lg:col-span-8">
            <Suspense fallback={null}>
              <NewsList items={newsItems} />
            </Suspense>
          </div>

          {/* Sidebar: Events Widget */}
          <div className="min-w-0 lg:col-span-4">
            <EventsWidget />
          </div>
        </div>
      </div>

      <NewsGroups items={newsItems} />
      <SiteFooter />
    </main>
  )
}
