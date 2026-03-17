"use client"

import { EmptyState } from "@/components/dashboard/EmptyState"
import { SubscriptionsSkeleton } from "@/components/dashboard/subscriptions/SubscriptionsSkeleton"
import { SubscriptionsSummaryCards } from "@/components/dashboard/subscriptions/SubscriptionsSummaryCards"
import { SubscriptionsTable } from "@/components/dashboard/subscriptions/SubscriptionsTable"
import { getDashboardDictionary } from "@/lib/dashboard-dictionary"
import { subscriptions as seedSubscriptions, type Subscription, type SubscriptionStatus } from "@lib/seed"
import { motion } from "framer-motion"
import { CreditCard } from "lucide-react"
import { useEffect, useState } from "react"

/* ── Types ─────────────────────────────────────────────── */

type LocalStatus = SubscriptionStatus | "canceling" | "upgrading" | "downgrading"

/* ── Page ──────────────────────────────────────────────── */

export default function SubscriptionsPage() {
    const dict = getDashboardDictionary()
    const t = dict.subscriptions

    /* simulated loading */
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800)
        return () => clearTimeout(timer)
    }, [])

    /* local subscriptions + status overrides */
    const [localSubs] = useState<Subscription[]>(seedSubscriptions)
    const [statusOverrides, setStatusOverrides] = useState<Record<string, LocalStatus>>({})

    function handleCancel(id: string) {
        setStatusOverrides((prev) => ({ ...prev, [id]: "canceled" }))
    }

    function handleUpgrade(id: string) {
        setStatusOverrides((prev) => ({ ...prev, [id]: "upgrading" }))
        /* optimistic: just mark the plan visually — in a real app this would hit an API */
        setTimeout(() => {
            setStatusOverrides((prev) => {
                const copy = { ...prev }
                delete copy[id]
                return copy
            })
        }, 2000)
    }

    function handleDowngrade(id: string) {
        setStatusOverrides((prev) => ({ ...prev, [id]: "downgrading" }))
        setTimeout(() => {
            setStatusOverrides((prev) => {
                const copy = { ...prev }
                delete copy[id]
                return copy
            })
        }, 2000)
    }

    /* ── Render ── */

    if (isLoading) return <SubscriptionsSkeleton />

    if (localSubs.length === 0) {
        return (
            <div className="space-y-6">
                <motion.h1
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="text-2xl font-bold tracking-tight text-foreground"
                >
                    {t.pageTitle}
                </motion.h1>
                <EmptyState
                    icon={CreditCard}
                    title={t.empty.title}
                    description={t.empty.description}
                />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.h1
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="text-2xl font-bold tracking-tight text-foreground"
            >
                {t.pageTitle}
            </motion.h1>

            {/* Summary cards */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
            >
                <SubscriptionsSummaryCards />
            </motion.div>

            {/* Table */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
            >
                <SubscriptionsTable
                    subscriptions={localSubs}
                    statusOverrides={statusOverrides}
                    onCancel={handleCancel}
                    onUpgrade={handleUpgrade}
                    onDowngrade={handleDowngrade}
                />
            </motion.div>
        </div>
    )
}
