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

export function SubscriptionsSkeleton() {
    return (
        <div className="space-y-6">
            {/* Page title */}
            <Skeleton className="h-8 w-36" />

            {/* Summary cards */}
            <div className="grid gap-4 sm:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="rounded-xl bg-card p-5 shadow-xs ring-1 ring-foreground/10 space-y-4"
                    >
                        <div className="flex items-start justify-between">
                            <Skeleton className="size-10 rounded-xl" />
                            <Skeleton className="h-5 w-14 rounded-full" />
                        </div>
                        <div className="space-y-1.5">
                            <Skeleton className="h-7 w-20" />
                            <Skeleton className="h-4 w-28" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="rounded-xl bg-card shadow-xs ring-1 ring-foreground/10">
                <div className="flex items-center gap-4 border-b border-border px-4 py-3">
                    {["w-28", "w-16", "w-16", "w-24", "w-14", "w-28"].map((w, i) => (
                        <Skeleton key={i} className={`h-4 ${w}`} />
                    ))}
                </div>
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-4 border-b border-border/50 px-4 py-3.5 last:border-b-0"
                    >
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-5 w-14 rounded-full" />
                        <Skeleton className="hidden h-4 w-24 md:block" />
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="ms-auto h-8 w-24 rounded-md" />
                    </div>
                ))}
            </div>
        </div>
    )
}
