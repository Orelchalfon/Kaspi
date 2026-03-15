import { cn } from "@workspace/ui/lib/utils"


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


export function FamiliesSkeleton() {
    return (
        <div className="space-y-6">
            {/* Page title */}
            <Skeleton className="h-8 w-28" />

            {/* Search + filter bar */}
            <div className="flex gap-3">
                <Skeleton className="h-9 flex-1 max-w-md" />
                <Skeleton className="h-9 w-32" />
            </div>

            <div className="rounded-xl bg-card shadow-xs ring-1 ring-foreground/10">
                <div className="flex items-center gap-4 border-b border-border px-4 py-3">
                    {[120, 160, 60, 70, 90, 70].map((w, i) => (
                        <Skeleton key={i} className="h-4 w-28" />
                    ))}
                </div>

                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-4 border-b border-border/50 px-4 py-3.5 last:border-b-0"
                    >
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="hidden h-4 w-40 md:block" />
                        <Skeleton className="h-4 w-8" />
                        <Skeleton className="h-5 w-14 rounded-full" />
                        <Skeleton className="hidden h-4 w-24 lg:block" />
                        <Skeleton className="h-5 w-14 rounded-full" />
                    </div>
                ))}
            </div>
        </div>
    )
}
