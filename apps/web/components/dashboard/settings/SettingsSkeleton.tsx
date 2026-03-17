import { Skeleton } from "@workspace/ui/components/skeleton"

export function SettingsSkeleton() {
    return (
        <div className="space-y-6">
            {/* Page title */}
            <Skeleton className="h-8 w-40" />

            {/* Tab strip */}
            <div className="flex gap-2">
                {[100, 120, 80, 90].map((w, i) => (
                    <Skeleton key={i} className="h-9 rounded-md" style={{ width: w }} />
                ))}
            </div>

            {/* Tab body */}
            <div className="rounded-xl border border-border bg-card p-6 space-y-5">
                <Skeleton className="h-6 w-48" />
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-2">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    ))}
                </div>
                <Skeleton className="h-10 w-32" />
            </div>
        </div>
    )
}
