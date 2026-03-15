import type { LandingDictionary } from "@/lib/landing-dictionary"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

type HeroProps = {
  dictionary: LandingDictionary["hero"]
}

export function Hero({ dictionary }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[80vh] items-center justify-center px-4 pb-16 pt-28"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.18),transparent_55%),radial-gradient(circle_at_bottom,rgba(15,23,42,0.9),#020617)]" />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-stretch gap-10 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
            <span>{dictionary.badge}</span>
          </div>

          <div className="space-y-3 text-right lg:text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
              {dictionary.eyebrow}
            </p>
            <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              {dictionary.title}
            </h1>
            <p className="max-w-xl text-sm text-muted-foreground lg:text-base lg:leading-relaxed">
              {dictionary.subtitle}
            </p>
          </div>

          <div className="flex flex-col items-stretch justify-end gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button size="lg" className="text-sm">
              {dictionary.primaryCtaLabel}
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-sm"
            >
              <a href={dictionary.secondaryCtaHref}>{dictionary.secondaryCtaLabel}</a>
            </Button>
          </div>
        </div>

        <div className="flex-1">
          <Card className="relative overflow-hidden border border-primary/20 bg-background/80 shadow-lg shadow-primary/10 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-sm">
                <span>תמונת מצב חודשית</span>
                <span className="text-xs text-muted-foreground">
                  Kaspi Preview
                </span>
              </CardTitle>
              <CardDescription className="text-[11px]">
                לוח מחוונים לדוגמה המציג הכנסות, הוצאות ויעדים במקום אחד.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="rounded-xl bg-primary/10 px-3 py-2">
                  <p className="text-[11px] text-muted-foreground">יתרה חזויה</p>
                  <p className="mt-1 text-sm font-semibold text-primary">
                    ₪ 3,250 +
                  </p>
                </div>
                <div className="rounded-xl bg-emerald-500/10 px-3 py-2">
                  <p className="text-[11px] text-muted-foreground">
                    עמידה ביעדים
                  </p>
                  <p className="mt-1 text-sm font-semibold text-emerald-400">
                    92%
                  </p>
                </div>
                <div className="rounded-xl bg-sky-500/10 px-3 py-2">
                  <p className="text-[11px] text-muted-foreground">
                    ילדים וחיסכון
                  </p>
                  <p className="mt-1 text-sm font-semibold text-sky-400">
                    ₪ 850
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[11px] font-medium text-muted-foreground">
                  מגמת תזרים חודשי
                </p>
                <div className="h-24 rounded-xl bg-linear-to-b from-slate-900 via-slate-950 to-black p-3">
                  <div className="flex h-full items-end gap-1">
                    <div className="h-[20%] flex-1 rounded-t-sm bg-slate-700/80" />
                    <div className="h-[45%] flex-1 rounded-t-sm bg-slate-600/80" />
                    <div className="h-[30%] flex-1 rounded-t-sm bg-slate-700/70" />
                    <div className="h-[65%] flex-1 rounded-t-sm bg-primary/80" />
                    <div className="h-[55%] flex-1 rounded-t-sm bg-primary/70" />
                    <div className="h-[80%] flex-1 rounded-t-sm bg-emerald-500/80" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

