"use client"

import { getDashboardDictionary } from "@/lib/dashboard-dictionary"
import { getSubscriptionsSummary } from "@lib/seed"
import { Card } from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import { motion } from "framer-motion"
import { TrendingDown, TrendingUp, Users, Wallet, XCircle } from "lucide-react"

/* ── Component ─────────────────────────────────────────── */

export function SubscriptionsSummaryCards() {
    const dict = getDashboardDictionary()
    const t = dict.subscriptions
    const summary = getSubscriptionsSummary()

    const cards = [
        {
            label: t.summary.totalMrr,
            value: `₪${summary.totalMrr.toLocaleString("he-IL")}`,
            icon: Wallet,
            color: "bg-chart-2/15 text-chart-2",
            trend: { direction: "up" as const, value: "+12%" },
        },
        {
            label: t.summary.activeSubs,
            value: summary.activeSubs.toString(),
            icon: Users,
            color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
            trend: { direction: "up" as const, value: "+2" },
        },
        {
            label: t.summary.churned,
            value: summary.churnedThisMonth.toString(),
            icon: XCircle,
            color: "bg-red-500/15 text-red-500 dark:text-red-400",
            trend: {
                direction: summary.churnedThisMonth > 0 ? ("down" as const) : ("neutral" as const),
                value: summary.churnedThisMonth > 0 ? `-${summary.churnedThisMonth}` : "0",
            },
        },
    ]

    return (
        <div className="grid gap-4 sm:grid-cols-3">
            {cards.map((card, index) => (
                <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
                >
                    <Card className="relative overflow-hidden p-5 transition-shadow hover:shadow-md">
                        {/* top accent */}
                        <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-l from-primary/60 via-primary/30 to-transparent" />

                        <div className="flex items-start justify-between gap-3">
                            {/* icon */}
                            <div
                                className={cn(
                                    "flex size-10 shrink-0 items-center justify-center rounded-xl",
                                    card.color
                                )}
                            >
                                <card.icon className="size-5" />
                            </div>

                            {/* trend badge */}
                            <span
                                className={cn(
                                    "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold",
                                    card.trend.direction === "up"
                                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                        : card.trend.direction === "down"
                                            ? "bg-red-500/10 text-red-600 dark:text-red-400"
                                            : "bg-muted text-muted-foreground"
                                )}
                            >
                                {card.trend.direction === "up" ? (
                                    <TrendingUp className="size-3" />
                                ) : card.trend.direction === "down" ? (
                                    <TrendingDown className="size-3" />
                                ) : null}
                                {card.trend.value}
                            </span>
                        </div>

                        <div className="mt-4 space-y-0.5">
                            <p className="text-2xl font-bold tracking-tight text-foreground">
                                {card.value}
                            </p>
                            <p className="text-sm text-muted-foreground">{card.label}</p>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
    )
}
