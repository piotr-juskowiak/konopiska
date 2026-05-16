import type { Metadata } from "next"
import { Fraunces, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
})

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
  display: "swap",
  axes: ["opsz"],
})

export const metadata: Metadata = {
  title: "Magazyn Konopiska — Aktualności z Gminy",
  description:
    "Niezależny magazyn z najświeższymi wiadomościami, komunikatami i zapowiedziami wydarzeń z Gminy Konopiska.",
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
    <html lang="pl" className={`${inter.variable} ${fraunces.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
