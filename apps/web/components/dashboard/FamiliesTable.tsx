"use client"

import { getDashboardDictionary } from "@/lib/dashboard-dictionary"
import type { Family, PlanTier } from "@lib/seed"
import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"
import { motion } from "framer-motion"

/* ── Props ─────────────────────────────────────────────── */

type FamiliesTableProps = {
    families: Family[]
    childCountMap: Record<string, number>
    onSelectFamily: (family: Family) => void
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

const statusColors: Record<Family["status"], string> = {
    active: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    trial: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    canceled: "bg-red-500/15 text-red-500 dark:text-red-400",
}

/* ── Component ─────────────────────────────────────────── */

export function FamiliesTable({
    families,
    childCountMap,
    onSelectFamily,
}: FamiliesTableProps) {
    const dict = getDashboardDictionary()
    const t = dict.families

    return (
        <div className="overflow-x-auto rounded-xl bg-card shadow-xs ring-1 ring-foreground/10">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-border text-muted-foreground">
                        <th className="px-4 py-3 text-start font-medium">{t.columns.name}</th>
                        <th className="hidden px-4 py-3 text-start font-medium md:table-cell">{t.columns.email}</th>
                        <th className="px-4 py-3 text-center font-medium">{t.columns.children}</th>
                        <th className="px-4 py-3 text-center font-medium">{t.columns.plan}</th>
                        <th className="hidden px-4 py-3 text-start font-medium lg:table-cell">{t.columns.joined}</th>
                        <th className="px-4 py-3 text-center font-medium">{t.columns.status}</th>
                    </tr>
                </thead>
                <tbody>
                    {families.map((family, i) => (
                        <motion.tr
                            key={family.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.04 }}
                            onClick={() => onSelectFamily(family)}
                            className="cursor-pointer border-b border-border/50 transition-colors last:border-b-0 hover:bg-muted/40"
                        >
                            <td className="px-4 py-3.5 font-medium text-foreground">
                                {family.name}
                            </td>
                            <td className="hidden px-4 py-3.5 text-muted-foreground md:table-cell">
                                {family.parentEmail}
                            </td>
                            <td className="px-4 py-3.5 text-center text-foreground">
                                {childCountMap[family.id] ?? 0}
                            </td>
                            <td className="px-4 py-3.5 text-center">
                                <Badge
                                    variant="secondary"
                                    className={cn(
                                        "border-0 text-xs",
                                        planColors[family.plan]
                                    )}
                                >
                                    {t.plans[family.plan]}
                                </Badge>
                            </td>
                            <td className="hidden px-4 py-3.5 text-muted-foreground lg:table-cell">
                                {formatDate(family.joinedAt)}
                            </td>
                            <td className="px-4 py-3.5 text-center">
                                <Badge
                                    variant="secondary"
                                    className={cn(
                                        "border-0 text-xs",
                                        statusColors[family.status]
                                    )}
                                >
                                    {t.statuses[family.status]}
                                </Badge>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
