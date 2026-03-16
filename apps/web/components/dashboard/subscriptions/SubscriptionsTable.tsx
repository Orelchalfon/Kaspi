"use client"

import { getDashboardDictionary } from "@/lib/dashboard-dictionary"
import {
    families as seedFamilies,
    type PlanTier,
    type Subscription,
    type SubscriptionStatus,
} from "@lib/seed"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { motion } from "framer-motion"

/* ── Props ─────────────────────────────────────────────── */

type LocalSubscriptionStatus = SubscriptionStatus | "canceling" | "upgrading" | "downgrading"

type SubscriptionsTableProps = {
    subscriptions: Subscription[]
    statusOverrides: Record<string, LocalSubscriptionStatus>
    onCancel: (id: string) => void
    onUpgrade: (id: string) => void
    onDowngrade: (id: string) => void
}

/* ── Helpers ───────────────────────────────────────────── */

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("he-IL", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })
}

const planColors: Record<PlanTier, string> = {
    free: "bg-muted text-muted-foreground",
    standard: "bg-chart-2/15 text-chart-2",
    premium: "bg-chart-4/15 text-chart-4",
}

const statusColors: Record<SubscriptionStatus, string> = {
    trialing: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    active: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    past_due: "bg-orange-500/15 text-orange-600 dark:text-orange-400",
    canceled: "bg-red-500/15 text-red-500 dark:text-red-400",
}

/* ── Component ─────────────────────────────────────────── */

export function SubscriptionsTable({
    subscriptions,
    statusOverrides,
    onCancel,
    onUpgrade,
    onDowngrade,
}: SubscriptionsTableProps) {
    const dict = getDashboardDictionary()
    const t = dict.subscriptions

    const familyMap = Object.fromEntries(seedFamilies.map((f) => [f.id, f]))

    return (
        <div className="overflow-x-auto rounded-xl bg-card shadow-xs ring-1 ring-foreground/10">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-border text-muted-foreground">
                        <th className="px-4 py-3 text-start font-medium">{t.columns.family}</th>
                        <th className="px-4 py-3 text-center font-medium">{t.columns.plan}</th>
                        <th className="px-4 py-3 text-center font-medium">{t.columns.status}</th>
                        <th className="hidden px-4 py-3 text-start font-medium md:table-cell">
                            {t.columns.billingDate}
                        </th>
                        <th className="px-4 py-3 text-end font-medium">{t.columns.amount}</th>
                        <th className="px-4 py-3 text-center font-medium">{t.columns.actions}</th>
                    </tr>
                </thead>
                <tbody>
                    {subscriptions.map((sub, i) => {
                        const family = familyMap[sub.familyId]
                        const effectiveStatus = statusOverrides[sub.id] ?? sub.status
                        const isCanceled =
                            effectiveStatus === "canceled" || effectiveStatus === "canceling"

                        return (
                            <motion.tr
                                key={sub.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                className="border-b border-border/50 transition-colors last:border-b-0 hover:bg-muted/40"
                            >
                                {/* Family */}
                                <td className="px-4 py-3.5 font-medium text-foreground">
                                    {family?.name ?? sub.familyId}
                                </td>

                                {/* Plan */}
                                <td className="px-4 py-3.5 text-center">
                                    <Badge
                                        variant="secondary"
                                        className={cn("border-0 text-xs", planColors[sub.plan])}
                                    >
                                        {t.plans[sub.plan]}
                                    </Badge>
                                </td>

                                {/* Status */}
                                <td className="px-4 py-3.5 text-center">
                                    <Badge
                                        variant="secondary"
                                        className={cn(
                                            "border-0 text-xs",
                                            isCanceled
                                                ? statusColors.canceled
                                                : statusColors[sub.status]
                                        )}
                                    >
                                        {isCanceled
                                            ? t.statuses.canceled
                                            : t.statuses[sub.status]}
                                    </Badge>
                                </td>

                                {/* Billing Date */}
                                <td className="hidden px-4 py-3.5 text-muted-foreground md:table-cell">
                                    {formatDate(sub.billingDate)}
                                </td>

                                {/* Amount */}
                                <td className="px-4 py-3.5 text-end font-medium tabular-nums text-foreground">
                                    {sub.amount === 0 ? "—" : `₪${sub.amount}`}
                                </td>

                                {/* Actions */}
                                <td className="px-4 py-3.5">
                                    <div className="flex items-center justify-center gap-1.5">
                                        {isCanceled ? (
                                            <span className="rounded-md bg-muted px-3 py-1 text-xs text-muted-foreground">
                                                {t.actions.canceled}
                                            </span>
                                        ) : (
                                            <>
                                                {/* Upgrade: only show for free / standard */}
                                                {sub.plan !== "premium" && (
                                                    <Button
                                                        id={`upgrade-${sub.id}`}
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-7 px-2.5 text-xs"
                                                        onClick={() => onUpgrade(sub.id)}
                                                    >
                                                        {t.actions.upgrade}
                                                    </Button>
                                                )}

                                                {/* Downgrade: only show for standard / premium */}
                                                {sub.plan !== "free" && (
                                                    <Button
                                                        id={`downgrade-${sub.id}`}
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-7 px-2.5 text-xs"
                                                        onClick={() => onDowngrade(sub.id)}
                                                    >
                                                        {t.actions.downgrade}
                                                    </Button>
                                                )}

                                                {/* Cancel */}
                                                <Button
                                                    id={`cancel-${sub.id}`}
                                                    size="sm"
                                                    variant="outline"
                                                    className="h-7 px-2.5 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                    onClick={() => onCancel(sub.id)}
                                                >
                                                    {t.actions.cancel}
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </motion.tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
