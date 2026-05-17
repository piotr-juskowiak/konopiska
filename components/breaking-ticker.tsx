import Link from "next/link"
import { Radio } from "lucide-react"
import type { NewsItem } from "@/lib/news-data"

export function BreakingTicker({ items }: { items: NewsItem[] }) {
  const headlines = items.slice(0, 8)
  const lead = headlines[0]

  return (
    <div className="overflow-hidden border-y border-white/5 bg-[var(--imperial-blue)]/95 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-[90rem] items-center gap-4 overflow-hidden px-4 sm:px-6">
        <div className="flex h-9 shrink-0 items-center gap-2.5 rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--school-bus-yellow)] px-4 text-[var(--imperial-blue)] shadow-[0_4px_12px_rgba(253,230,138,0.2)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--imperial-blue)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--imperial-blue)]"></span>
          </span>
          <span className="text-[11px] font-black uppercase tracking-[0.2em]">Na żywo</span>
        </div>

        <div className="ticker-viewport relative h-full min-w-0 flex-1 overflow-hidden">
          {lead && (
            <Link
              href={`/artykul/${lead.slug}`}
              className="flex h-full min-w-0 items-center gap-3 text-sm text-white/90 transition hover:text-[var(--gold)] sm:hidden"
            >
              <span className="truncate font-semibold tracking-tight">{lead.title}</span>
            </Link>
          )}

          <div className="absolute inset-y-0 left-0 hidden w-max animate-ticker items-center gap-12 whitespace-nowrap text-sm sm:flex">
            {[...headlines, ...headlines].map((item, i) => (
              <Link
                key={`${item.slug}-${i}`}
                href={`/artykul/${item.slug}`}
                className="group flex items-baseline gap-3 text-white/80 transition-all hover:text-white"
              >
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--gold)]/80 group-hover:text-[var(--gold)]">
                  {item.date}
                </span>
                <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/20 transition-colors group-hover:bg-[var(--gold)] self-center translate-y-[2px]" />
                <span className="font-medium tracking-tight group-hover:translate-x-1 transition-transform">
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
          <div aria-hidden className="absolute inset-y-0 left-0 hidden w-20 bg-gradient-to-r from-[var(--imperial-blue)] to-transparent sm:block" />
          <div aria-hidden className="absolute inset-y-0 right-0 hidden w-20 bg-gradient-to-l from-[var(--imperial-blue)] to-transparent sm:block" />
        </div>
      </div>
    </div>
  )
}
