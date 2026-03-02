import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/lib/components/navbar"
import Footer from "@/lib/components/footer"

export const metadata: Metadata = {
  title: "Commonwealth Bar — Park Slope, Brooklyn",
  description: "A pretty decent bar at the corner of 5th Ave. and 12th St. in Park Slope, Brooklyn. Open every night until 4 AM.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}