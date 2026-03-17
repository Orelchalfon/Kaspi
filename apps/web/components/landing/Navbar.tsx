"use client"

import { Menu, Moon, Sun, X } from "lucide-react"
import { useTheme } from "next-themes"
import { redirect, usePathname, useRouter, useSearchParams } from "next/navigation"

import type {
  LandingDictionary,
  SupportedLandingLanguage,
} from "@/lib/landing-dictionary"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { Suspense, useEffect, useState } from "react"

type NavbarProps = {
  dictionary: LandingDictionary["navbar"]
  lang: SupportedLandingLanguage
}

/**
 * Public export – wraps the real navbar in <Suspense> so that
 * useSearchParams() doesn't force the whole page to client-render
 * synchronously (fixes bfcache + reduces main-thread blocking).
 */
export function Navbar(props: NavbarProps) {
  return (
    <Suspense
      fallback={
        <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4">
          <div className="w-full max-w-6xl">
            <nav className="flex h-[52px] items-center justify-between rounded-2xl border border-border/60 bg-background/80 px-4 py-2.5 shadow-md backdrop-blur-md" />
          </div>
        </header>
      }
    >
      <NavbarInner {...props} />
    </Suspense>
  )
}

function NavbarInner({ dictionary, lang }: NavbarProps) {

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const { theme, setTheme } = useTheme()


  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [mounted, setMounted] = useState<boolean>(false)




  const isDark = !mounted || theme === "dark"



  useEffect(() => setMounted(true), [])

  useEffect(() => {
    // Close the mobile menu when the route changes
    setIsMenuOpen(false)
  }, [pathname])



  function toggleTheme() {
    setTheme(prev => prev === "dark" ? "light" : "dark")
  }

  function toggleLanguage() {
    const nextLang: SupportedLandingLanguage = lang === "he" ? "en" : "he"
    const params = new URLSearchParams(searchParams ?? undefined)
    params.set("lang", nextLang)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4">
      <div className="w-full max-w-6xl">
        <nav
          className={cn(
            "flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-background/80 px-4 py-2.5 shadow-md backdrop-blur-md transition-colors",
            "dark:bg-background/70"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-primary">
              K
            </div>
            <a href="#top-page" className="text-sm font-semibold tracking-tight">
              {dictionary.logo}
            </a>
          </div>

          <div className="hidden items-center gap-6 text-xs font-medium text-muted-foreground md:flex">
            {dictionary.links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="cursor-pointer transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background/60 text-xs text-muted-foreground transition-colors hover:bg-muted cursor-pointer"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <Sun className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={toggleLanguage}
              className="hidden items-center justify-center rounded-full border border-border/60 bg-background/70 px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted cursor-pointer sm:inline-flex"
              aria-label={dictionary.languageToggleAria}
            >
              {lang === "he" ? "עברית" : "English"}
            </button>

            <Button onClick={() => {
              redirect("/dashboard")
            }} size="sm" className="hidden text-xs sm:inline-flex">
              {dictionary.ctaLabel}
            </Button>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background/60 text-xs text-muted-foreground transition-colors hover:bg-muted cursor-pointer md:hidden"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {isMenuOpen && (
          <div className="mt-2 space-y-2 rounded-2xl border border-border/60 bg-background/95 p-3 text-xs shadow-md backdrop-blur-md md:hidden">
            <div className="flex flex-col gap-1 text-right text-muted-foreground">
              {dictionary.links.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="cursor-pointer rounded-lg px-2 py-1 text-[12px] transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-2 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={toggleLanguage}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-border/60 bg-background/80 px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted cursor-pointer"
                aria-label={dictionary.languageToggleAria}
              >
                {lang === "he" ? "עברית" : "English"}
              </button>
              <Button size="sm" className="flex-1 text-[12px]">
                {dictionary.ctaLabel}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

