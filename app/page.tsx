import { Suspense } from "react"
import { BreakingTicker } from "@/components/breaking-ticker"
import { HeroFeature } from "@/components/hero-feature"
import { NewsList } from "@/components/news-list"
import { EventsWidget } from "@/components/events-widget"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { newsItems } from "@/lib/news-data"

import { NewsGroups } from "@/components/news-groups"
import { CategoryTiles } from "@/components/category-tiles"
import { AdBannerHorizontal } from "@/components/ad-banner-horizontal"

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
      <HeroFeature items={newsItems.slice(0, 5)} />
      <CategoryTiles />
      
      {/* Grand Unified News & Thematic Hub */}
      <section className="relative w-full py-20 lg:py-28 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50 border-t border-slate-100/80 overflow-hidden">
        {/* Artistic ambient glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <div className="absolute top-[10%] -left-[10%] w-[600px] h-[600px] rounded-full bg-[var(--gold)]/5 blur-[120px]" />
          <div className="absolute bottom-[20%] -right-[10%] w-[700px] h-[700px] rounded-full bg-[var(--imperial-blue)]/5 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6">
          <div className="flex flex-col gap-24">
            {/* Main Content: News List */}
            <Suspense fallback={null}>
              <NewsList items={newsItems} />
            </Suspense>

          </div>
        </div>
      </section>

      <AdBannerHorizontal />
      <SiteFooter />
    </main>
  )
}
