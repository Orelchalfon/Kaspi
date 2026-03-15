"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart"
import { OverviewSkeleton } from "@/components/dashboard/OverviewSkeleton"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { StatCard } from "@/components/dashboard/StatCard"
import { getDashboardDictionary } from "@/lib/dashboard-dictionary"
import {
    getMonthlyAnalytics,
    getRecentActivity,
    getStatCards,
    type ActivityItem,
    type MonthlyAnalytics,
    type StatCardData,
} from "@/lib/overview-data"

/* ── Component ─────────────────────────────────────────── */

export default function DashboardPage() {
    const dict = getDashboardDictionary()

    const [isLoading, setIsLoading] = useState(true)
    const [stats, setStats] = useState<StatCardData[]>([])
    const [analytics, setAnalytics] = useState<MonthlyAnalytics[]>([])
    const [activity, setActivity] = useState<ActivityItem[]>([])

    /* Simulate fetching data */
    useEffect(() => {
        const timer = setTimeout(() => {
            setStats(getStatCards())
            setAnalytics(getMonthlyAnalytics())
            setActivity(getRecentActivity())
            setIsLoading(false)
        }, 800)

        return () => clearTimeout(timer)
    }, [])

    /* ── Loading state ─────────────────────────────────── */
    if (isLoading) {
        return <OverviewSkeleton />
    }

    /* ── Main content ──────────────────────────────────── */
    return (
        <div className="space-y-6">
            {/* ── Page title ────────────────────────────── */}
            <motion.h1
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="text-2xl font-bold tracking-tight text-foreground"
            >
                {dict.overview.pageTitle}
            </motion.h1>

            {/* ── Stat cards ────────────────────────────── */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                    <StatCard key={stat.id} data={stat} index={i} />
                ))}
            </div>

            {/* ── Chart + Activity ──────────────────────── */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.3 }}
                >
                    <AnalyticsChart data={analytics} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.4 }}
                >
                    <RecentActivity items={activity} />
                </motion.div>
            </div>
        </div>
    )
}
