import type { LandingDictionary } from "@/lib/landing-dictionary"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

type TestimonialsProps = {
  dictionary: LandingDictionary["testimonials"]
}

export function Testimonials({ dictionary }: TestimonialsProps) {
  return (
    <section
      id="testimonials"
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
          {dictionary.items.map((item) => (
            <Card
              key={item.id}
              className="cursor-pointer border border-border/70 bg-card/80 text-card-foreground shadow-md shadow-black/10 transition-all duration-200 hover:-translate-y-1 hover:border-primary/70 hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle className="text-sm font-semibold">
                  {item.name}
                </CardTitle>
                <CardDescription className="text-[11px] text-muted-foreground">
                  {item.role}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {item.quote}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

