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
        <div className="rounded-xl bg-card p-5 shadow-xs ring-1 ring-foreground/10 flex flex-col h-full min-h-[220px]">
            <div className="flex items-start justify-between gap-3 mb-4">
                <Skeleton className="size-9 rounded-xl" />
                <Skeleton className="h-5 w-16" />
            </div>
            
            <Skeleton className="h-6 w-3/4 mb-4" />
            
            <div className="flex gap-2 mt-auto mb-4">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-12" />
            </div>
            
            <div className="border-t pt-4">
                <Skeleton className="h-4 w-20" />
            </div>
            
            <div className="mt-4">
                <Skeleton className="h-8 w-full rounded-md" />
            </div>
        </div>
    )
}

/* ── Full page skeleton ────────────────────────────────── */

export function EducationSkeleton() {
    return (
        <div className="space-y-6">
            {/* Page title placeholder */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Skeleton className="size-6 rounded-md" />
                    <Skeleton className="h-8 w-40" />
                </div>
            </div>
            
            <div className="space-y-8">
                {/* Progress Tracker Skeleton */}
                <div className="rounded-xl border bg-card text-card-foreground shadow-xs">
                    <div className="border-b p-6 pb-3">
                        <Skeleton className="h-5 w-32" />
                    </div>
                    <div className="p-6 pt-6 space-y-6">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="size-6 rounded-full" />
                                        <Skeleton className="h-4 w-24" />
                                    </div>
                                    <Skeleton className="h-4 w-8" />
                                </div>
                                <Skeleton className="h-2 w-full rounded-full" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Filter Tabs Skeleton */}
                <div className="flex gap-2 overflow-x-hidden">
                    <Skeleton className="h-8 w-16 rounded-full" />
                    <Skeleton className="h-8 w-20 rounded-full" />
                    <Skeleton className="h-8 w-24 rounded-full" />
                    <Skeleton className="h-8 w-20 rounded-full" />
                    <Skeleton className="h-8 w-24 rounded-full" />
                </div>

                {/* Grid Skeleton */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    )
}
