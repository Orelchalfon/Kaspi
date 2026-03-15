import type { LandingDictionary } from "@/lib/landing-dictionary"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

type FeaturesProps = {
  dictionary: LandingDictionary["features"]
}

export function Features({ dictionary }: FeaturesProps) {
  return (
    <section
      id="features"
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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dictionary.items.map((item) => (
            <Card
              key={item.id}
              className="cursor-pointer border border-border/70 bg-card/80 transition-all duration-200 hover:-translate-y-1 hover:border-primary/70 hover:shadow-md"
            >
              <CardHeader>
                <CardTitle className="text-sm font-semibold">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

