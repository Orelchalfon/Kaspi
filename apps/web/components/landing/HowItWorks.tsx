import type { LandingDictionary } from "@/lib/landing-dictionary"
import { Card, CardContent } from "@workspace/ui/components/card"

type HowItWorksProps = {
  dictionary: LandingDictionary["howItWorks"]
}

export function HowItWorks({ dictionary }: HowItWorksProps) {
  return (
    <section
      id="how-it-works"
      className="bg-background px-4 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="space-y-3 text-right text-foreground">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {dictionary.title}
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base sm:leading-relaxed">
            {dictionary.subtitle}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {dictionary.steps.map((step, index) => (
            <Card
              key={step.id}
              className="relative flex cursor-pointer flex-col border border-border/70 bg-card/80 p-4 text-card-foreground shadow-md shadow-black/10 transition-all duration-200 hover:-translate-y-1 hover:border-primary/70 hover:shadow-lg"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-[11px] font-semibold text-primary">
                  {index + 1}
                </div>
              </div>
              <CardContent className="px-0 pb-0 pt-0">
                <h3 className="mb-1 text-sm font-semibold">{step.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

