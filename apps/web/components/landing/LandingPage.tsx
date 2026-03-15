'use client'
import { Hero } from "@/components/landing/Hero"
import { Navbar } from "@/components/landing/Navbar"
import type { SupportedLandingLanguage } from "@/lib/landing-dictionary"
import { getLandingDictionary } from "@/lib/landing-dictionary"
import dynamic from "next/dynamic"

/* ── Lazy-load below-the-fold sections ──────────────── */
const Features = dynamic(
  () => import("@/components/landing/Features").then((m) => m.Features),
  { loading: () => <SectionSkeleton />, ssr: false }
)
const HowItWorks = dynamic(
  () => import("@/components/landing/HowItWorks").then((m) => m.HowItWorks),
  { loading: () => <SectionSkeleton />, ssr: false }
)
const Pricing = dynamic(
  () => import("@/components/landing/Pricing").then((m) => m.Pricing),
  { loading: () => <SectionSkeleton />, ssr: false }
)
const Testimonials = dynamic(
  () =>
    import("@/components/landing/Testimonials").then((m) => m.Testimonials),
  { loading: () => <SectionSkeleton />, ssr: false }
)
const Footer = dynamic(
  () => import("@/components/landing/Footer").then((m) => m.Footer),
  { loading: () => <SectionSkeleton height="h-20" />, ssr: false }
)

function SectionSkeleton({ height = "h-64" }: { height?: string }) {
  return (
    <div
      className={`${height} w-full animate-pulse bg-muted/30`}
      aria-hidden="true"
    />
  )
}

type LandingPageProps = {
  lang: SupportedLandingLanguage
}

export function LandingPage({ lang }: LandingPageProps) {
  const dictionary = getLandingDictionary(lang)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div id="top-page" style={{ height: 0, margin: 0, padding: 0 }}></div>
      <Navbar dictionary={dictionary.navbar} lang={lang} />
      <main className="pt-24 space-y-0">
        <Hero dictionary={dictionary.hero} />
        <Features dictionary={dictionary.features} />
        <HowItWorks dictionary={dictionary.howItWorks} />
        <Pricing dictionary={dictionary.pricing} />
        <Testimonials dictionary={dictionary.testimonials} />
      </main>
      <Footer dictionary={dictionary.footer} />
    </div>
  )
}

