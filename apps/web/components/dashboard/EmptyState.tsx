import type { LucideIcon } from "lucide-react"
import { Inbox } from "lucide-react"

/* ── Props ─────────────────────────────────────────────── */

type EmptyStateProps = {
    icon?: LucideIcon
    title: string
    description: string
}

/* ── Component ─────────────────────────────────────────── */

export function EmptyState({
    icon: Icon = Inbox,
    title,
    description,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
                <Icon className="size-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground">{title}</h2>
            <p className="max-w-sm text-sm text-muted-foreground">
                {description}
            </p>
        </div>
    )
}
