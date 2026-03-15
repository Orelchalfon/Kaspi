"use client"

import { getDashboardDictionary } from "@/lib/dashboard-dictionary"
import type { StatCardData } from "@/lib/overview-data"
import { Card } from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import { motion } from "framer-motion"
import { TrendingDown, TrendingUp } from "lucide-react"

/* ── Props ─────────────────────────────────────────────── */

type StatCardProps = {
    data: StatCardData
    index: number
}

/* ── Component ─────────────────────────────────────────── */

export function StatCard({ data, index }: StatCardProps) {
    const dict = getDashboardDictionary()
    const label = dict.overview.stats[data.labelKey]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
        >
            <Card className="relative overflow-hidden p-5 transition-shadow hover:shadow-md">
                {/* subtle gradient accent */}
                <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-l from-primary/60 via-primary/30 to-transparent" />

                <div className="flex items-start justify-between gap-3">
                    {/* icon badge */}
                    <div
                        className={cn(
                            "flex size-10 shrink-0 items-center justify-center rounded-xl",
                            data.color
                        )}
                    >
                        <data.icon className="size-5" />
                    </div>

                    {/* trend */}
                    <span
                        className={cn(
                            "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold",
                            data.trend.direction === "up"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : data.trend.direction === "down"
                                    ? "bg-red-500/10 text-red-600 dark:text-red-400"
                                    : "bg-muted text-muted-foreground"
                        )}
                    >
                        {data.trend.direction === "up" ? (
                            <TrendingUp className="size-3" />
                        ) : data.trend.direction === "down" ? (
                            <TrendingDown className="size-3" />
                        ) : null}
                        {data.trend.value}
                    </span>
                </div>

                {/* value + label */}
                <div className="mt-4 space-y-0.5">
                    <p className="text-2xl font-bold tracking-tight text-foreground">
                        {data.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{label}</p>
                </div>
            </Card>
        </motion.div>
    )
}
