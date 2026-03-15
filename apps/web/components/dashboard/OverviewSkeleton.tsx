import { cn } from "@workspace/ui/lib/utils"

/* ── Skeleton primitive ────────────────────────────────── */

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

/* ── Stat card skeleton ────────────────────────────────── */

function StatCardSkeleton() {
    return (
        <div className="rounded-xl bg-card p-5 shadow-xs ring-1 ring-foreground/10">
            <div className="flex items-start justify-between">
                <Skeleton className="size-10 rounded-xl" />
                <Skeleton className="h-5 w-14 rounded-full" />
            </div>
            <div className="mt-4 space-y-2">
                <Skeleton className="h-7 w-24" />
                <Skeleton className="h-4 w-20" />
            </div>
        </div>
    )
}

/* ── Chart skeleton ────────────────────────────────────── */

function ChartSkeleton() {
    return (
        <div className="rounded-xl bg-card p-5 shadow-xs ring-1 ring-foreground/10">
            <Skeleton className="mb-4 h-5 w-52" />
            <Skeleton className="h-[300px] w-full rounded-lg" />
            <div className="mt-3 flex justify-center gap-4">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-16" />
            </div>
        </div>
    )
}

/* ── Activity skeleton ─────────────────────────────────── */

function ActivitySkeleton() {
    return (
        <div className="rounded-xl bg-card p-5 shadow-xs ring-1 ring-foreground/10">
            <Skeleton className="mb-4 h-5 w-28" />
            <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <Skeleton className="size-8 rounded-lg" />
                        <div className="flex-1 space-y-1.5">
                            <Skeleton className="h-3.5 w-3/4" />
                            <Skeleton className="h-3 w-1/3" />
                        </div>
                        <Skeleton className="h-4 w-12" />
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ── Full overview skeleton ────────────────────────────── */

export function OverviewSkeleton() {
    return (
        <div className="space-y-6">
            {/* Page title */}
            <Skeleton className="h-8 w-36" />

            {/* Stat cards grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <StatCardSkeleton key={i} />
                ))}
            </div>

            {/* Chart + Activity */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
                <ChartSkeleton />
                <ActivitySkeleton />
            </div>
        </div>
    )
}
