import type { LandingDictionary } from "@/lib/landing-dictionary"

type FooterProps = {
  dictionary: LandingDictionary["footer"]
}

export function Footer({ dictionary }: FooterProps) {
  return (
    <footer className="border-t border-border/60 bg-background px-4 py-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 text-center text-[11px] text-muted-foreground sm:flex-row sm:text-left">
        <p>{dictionary.copyright}</p>
        <div className="flex flex-wrap items-center gap-3">
          {dictionary.links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="cursor-pointer text-[11px] transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

