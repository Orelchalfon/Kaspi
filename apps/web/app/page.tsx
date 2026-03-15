import { use } from "react"
import { LandingPage } from "@/components/landing/LandingPage"
import type { SupportedLandingLanguage } from "@/lib/landing-dictionary"

type PageProps = {
  searchParams: Promise<{ lang?: string }>  // ← Promise, לא object
}

export default function Page({ searchParams }: PageProps) {
  const { lang: qpLang } = use(searchParams)  // ← use() לפתוח את ה-Promise

  const lang: SupportedLandingLanguage =
    qpLang === "en" || qpLang === "he" ? qpLang : "he"

  return <LandingPage lang={lang} />
}