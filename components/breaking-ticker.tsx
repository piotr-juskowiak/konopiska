import Link from "next/link"
import { Radio } from "lucide-react"
import type { NewsItem } from "@/lib/news-data"

export function BreakingTicker({ items }: { items: NewsItem[] }) {
  const headlines = items.slice(0, 8)
  return (
    <div className="border-y border-border bg-secondary/60">
      <div className="mx-auto flex max-w-7xl items-stretch gap-0 overflow-hidden px-4 sm:px-6">
        <div className="flex shrink-0 items-center gap-2 border-r border-border bg-primary px-4 py-2.5 text-primary-foreground">
          <Radio className="h-3.5 w-3.5" />
          <span className="text-[11px] font-semibold uppercase tracking-widest">Na żywo</span>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex w-max animate-ticker gap-10 whitespace-nowrap py-2.5 text-sm">
            {[...headlines, ...headlines].map((item, i) => (
              <Link
                key={`${item.slug}-${i}`}
                href={`/artykul/${item.slug}`}
                className="flex items-center gap-3 text-foreground/80 hover:text-primary"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-accent-foreground/70">
                  {item.date}
                </span>
                <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
                <span className="font-medium">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
