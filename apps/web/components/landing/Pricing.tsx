import type { LandingDictionary } from "@/lib/landing-dictionary"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"

type PricingProps = {
  dictionary: LandingDictionary["pricing"]
}

export function Pricing({ dictionary }: PricingProps) {
  return (
    <section
      id="pricing"
      className="bg-background px-4 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="space-y-3 text-right">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {dictionary.title}
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base sm:leading-relaxed">
            {dictionary.subtitle}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
          {dictionary.tiers.map((tier) => (
            <Card
              key={tier.id}
              className="flex cursor-pointer flex-col border border-border/70 bg-card/80 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/70 hover:shadow-md"
            >
              <CardHeader>
                <CardTitle className="flex items-baseline justify-between text-sm">
                  <span>{tier.name}</span>
                  <span className="text-lg font-semibold">{tier.price}</span>
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  {tier.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto flex items-center justify-between">
                <Button
                  size="sm"
                  variant={tier.highlight ? "default" : "outline"}
                  className="text-xs"
                >
                  {tier.ctaLabel}
                </Button>
                {tier.highlight && (
                  <span className="text-[11px] font-medium text-primary">
                    מיועד לקבוצת הבטא המוקדמת
                  </span>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <p className="text-[11px] text-muted-foreground">{dictionary.disclaimer}</p>
      </div>
    </section>
  )
}

