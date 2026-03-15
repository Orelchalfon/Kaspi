"use client"

import { getDashboardDictionary } from "@/lib/dashboard-dictionary"
import type { ActivityItem } from "@/lib/overview-data"
import { Card } from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import { motion } from "framer-motion"

/* ── Props ─────────────────────────────────────────────── */

type RecentActivityProps = {
    items: ActivityItem[]
}

/* ── Component ─────────────────────────────────────────── */

export function RecentActivity({ items }: RecentActivityProps) {
    const dict = getDashboardDictionary()

    return (
        <Card className="flex flex-col p-5">
            <h3 className="mb-4 text-base font-semibold text-foreground">
                {dict.overview.activity.title}
            </h3>

            {items.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-2 py-10 text-center">
                    <p className="text-sm font-medium text-muted-foreground">
                        {dict.overview.activity.emptyTitle}
                    </p>
                    <p className="max-w-xs text-xs text-muted-foreground/70">
                        {dict.overview.activity.emptyDescription}
                    </p>
                </div>
            ) : (
                <ul className="space-y-1">
                    {items.map((item, i) => (
                        <motion.li
                            key={item.id}
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.3,
                                delay: 0.15 + i * 0.04,
                                ease: "easeOut",
                            }}
                            className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-muted/50"
                        >
                            {/* icon */}
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted/70">
                                <item.icon className="size-4 text-muted-foreground" />
                            </div>

                            {/* description */}
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm text-foreground">
                                    {item.description}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {item.timestamp}
                                </p>
                            </div>

                            {/* amount */}
                            {item.amount && (
                                <span
                                    className={cn(
                                        "shrink-0 text-sm font-semibold",
                                        item.amountType === "income"
                                            ? "text-emerald-600 dark:text-emerald-400"
                                            : item.amountType === "expense"
                                                ? "text-red-500 dark:text-red-400"
                                                : "text-foreground"
                                    )}
                                >
                                    {item.amount}
                                </span>
                            )}
                        </motion.li>
                    ))}
                </ul>
            )}
        </Card>
    )
}
