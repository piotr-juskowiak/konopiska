import Link from "next/link"
import { Radio } from "lucide-react"
import type { NewsItem } from "@/lib/news-data"

export function BreakingTicker({ items }: { items: NewsItem[] }) {
  const headlines = items.slice(0, 8)
  return (
    <div className="border-y border-white/10 bg-[var(--imperial-blue)] text-white">
      <div className="mx-auto flex max-w-7xl items-stretch gap-0 overflow-hidden px-4 sm:px-6">
        <div className="flex shrink-0 items-center gap-2 border-r border-white/10 bg-[var(--school-bus-yellow)] px-5 py-2.5 text-[var(--imperial-blue)]">
          <Radio className="h-4 w-4 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-widest">Na żywo</span>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex w-max animate-ticker gap-10 whitespace-nowrap py-2.5 text-sm">
            {[...headlines, ...headlines].map((item, i) => (
              <Link
                key={`${item.slug}-${i}`}
                href={`/artykul/${item.slug}`}
                className="flex items-center gap-3 text-white/80 hover:text-[var(--gold)] transition-colors"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--gold)]/70">
                  {item.date}
                </span>
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                <span className="font-medium">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
