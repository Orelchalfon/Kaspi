import { cn } from "@workspace/ui/lib/utils"

/* ── Reusable pulse block ──────────────────────────────── */

function Skeleton({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-lg bg-muted/60",
                className
            )}
        />
    )
}

/* ── Single card skeleton ──────────────────────────────── */

function CardSkeleton() {
    return (
        <div className="rounded-xl bg-card p-4 shadow-xs ring-1 ring-foreground/10 space-y-3">
            {/* avatar + title */}
            <div className="flex items-start gap-3">
                <Skeleton className="size-9 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/3" />
                </div>
                <Skeleton className="h-5 w-14 rounded-full" />
            </div>
            {/* meta row */}
            <div className="flex gap-4">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-20" />
            </div>
            {/* buttons placeholder */}
            <div className="flex gap-2 border-t border-border/50 pt-3">
                <Skeleton className="h-8 flex-1 rounded-md" />
                <Skeleton className="h-8 flex-1 rounded-md" />
            </div>
        </div>
    )
}

/* ── Full page skeleton ────────────────────────────────── */

export function TasksSkeleton() {
    return (
        <div className="space-y-6">
            {/* Page title + button */}
            <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-28" />
                <Skeleton className="h-9 w-32 rounded-lg" />
            </div>

            {/* Two-column grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Pending column */}
                <div className="space-y-4">
                    <Skeleton className="h-6 w-36" />
                    {Array.from({ length: 3 }).map((_, i) => (
                        <CardSkeleton key={`p-${i}`} />
                    ))}
                </div>

                {/* Active column */}
                <div className="space-y-4">
                    <Skeleton className="h-6 w-32" />
                    {Array.from({ length: 3 }).map((_, i) => (
                        <CardSkeleton key={`a-${i}`} />
                    ))}
                </div>
            </div>
        </div>
    )
}
