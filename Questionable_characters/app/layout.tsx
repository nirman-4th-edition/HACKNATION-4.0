import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { MoodProvider } from "@/components/mood-provider"
import { AudioProvider } from "@/components/audio-provider"
import { Header } from "@/components/header"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Mindful Sanctuary",
  description: "Your safe space for mental wellness",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MoodProvider>
            <AudioProvider>
              <div className="flex flex-col min-h-screen">
                {/* Conditionally render the Header */}
                {children.type.name !== "GetStartedPage" && children.type.name !== "LoginPage" && <Header />}
                {children}
              </div>
            </AudioProvider>
          </MoodProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

