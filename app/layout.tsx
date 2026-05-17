import { Plus_Jakarta_Sans, Outfit } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const sans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Serwis Informacyjny Konopiska — Aktualności z Gminy",
  description:
    "Niezależny serwis z najświeższymi wiadomościami, komunikatami i zapowiedziami wydarzeń z Gminy Konopiska.",
  generator: "v0.app",
  icons: {
    icon: "/favicon-custom.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl" className={`${sans.variable} ${outfit.variable} bg-background`} suppressHydrationWarning>
      <body className="font-sans antialiased text-foreground" suppressHydrationWarning>
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
