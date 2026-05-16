import Link from "next/link"
import { ChevronRight } from "lucide-react"

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
}: {
  eyebrow: string
  title: string
  description?: string
  breadcrumb: { label: string; href?: string }[]
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-card">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, var(--primary) 0, transparent 35%), radial-gradient(circle at 80% 60%, var(--accent) 0, transparent 30%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <nav aria-label="Okruszki" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            {breadcrumb.map((b, i) => (
              <li key={b.label} className="flex items-center gap-1.5">
                {b.href ? (
                  <Link href={b.href} className="hover:text-primary">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{b.label}</span>
                )}
                {i < breadcrumb.length - 1 && (
                  <ChevronRight className="h-3 w-3" aria-hidden />
                )}
              </li>
            ))}
          </ol>
        </nav>

        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
          {eyebrow}
        </p>
        <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
