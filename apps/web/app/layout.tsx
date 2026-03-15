import { ThemeProvider } from "@/components/theme-provider"
import "@workspace/ui/globals.css"
import { cn } from "@workspace/ui/lib/utils"
import { Heebo } from "next/font/google"

const heebo = Heebo({
  subsets: ["latin", "hebrew"],
  variable: "--font-sans",
  display: "swap",       // show fallback text instantly while font loads
  preload: true,
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      suppressHydrationWarning
      className={cn("antialiased", heebo.variable)}
    >
      <body className="font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}