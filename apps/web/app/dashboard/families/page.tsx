"use client"

import { motion } from "framer-motion"
import { Search, SlidersHorizontal, Users } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import { EmptyState } from "@/components/dashboard/EmptyState"
import { FamiliesSkeleton } from "@/components/dashboard/FamiliesSkeleton"
import { FamiliesTable } from "@/components/dashboard/FamiliesTable"
import { FamilySheet } from "@/components/dashboard/FamilySheet"
import { getDashboardDictionary } from "@/lib/dashboard-dictionary"
import {
getChildrenForFamily,
getTasksForFamily,
families as seedFamilies,
type Family,
type PlanTier
} from "@lib/seed"
import { cn } from "@workspace/ui/lib/utils"

/* ── Component ─────────────────────────────────────────── */

export default function FamiliesPage() {
    const dict = getDashboardDictionary()
    const t = dict.families

    /* ── Loading simulation ────────────────────────────── */
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800)
        return () => clearTimeout(timer)
    }, [])

    /* ── Search & filter state ─────────────────────────── */
    const [search, setSearch] = useState("")
    const [planFilter, setPlanFilter] = useState<PlanTier | "all">("all")

    /* ── Sheet state ───────────────────────────────────── */
    const [selectedFamily, setSelectedFamily] = useState<Family | null>(null)
    const [sheetOpen, setSheetOpen] = useState(false)

    /* ── Derived data ──────────────────────────────────── */
    const childCountMap = useMemo(() => {
        const map: Record<string, number> = {}
        for (const family of seedFamilies) {
            map[family.id] = family.childIds.length
        }
        return map
    }, [])

    const filteredFamilies = useMemo(() => {
        let result = [...seedFamilies]

        // search
        if (search.trim()) {
            const q = search.trim().toLowerCase()
            result = result.filter(
                (f) =>
                    f.name.toLowerCase().includes(q) ||
                    f.parentEmail.toLowerCase().includes(q)
            )
        }

        // plan filter
        if (planFilter !== "all") {
            result = result.filter((f) => f.plan === planFilter)
        }

        return result
    }, [search, planFilter])

    /* ── Sheet data ────────────────────────────────────── */
    const sheetChildren = useMemo(
        () => (selectedFamily ? getChildrenForFamily(selectedFamily.id) : []),
        [selectedFamily]
    )
    const sheetTasks = useMemo(
        () => (selectedFamily ? getTasksForFamily(selectedFamily.id) : []),
        [selectedFamily]
    )

    function handleSelectFamily(family: Family) {
        setSelectedFamily(family)
        setSheetOpen(true)
    }

    /* ── Loading ───────────────────────────────────────── */
    if (isLoading) return <FamiliesSkeleton />

    /* ── Render ─────────────────────────────────────────── */
    return (
        <div className="space-y-6">
            {/* ── Page title ────────────────────────────── */}
            <motion.h1
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="text-2xl font-bold tracking-tight text-foreground"
            >
                {t.pageTitle}
            </motion.h1>

            {/* ── Search + filter bar ───────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                    <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="search"
                        placeholder={t.searchPlaceholder}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={cn(
                            "h-9 w-full rounded-lg border border-input bg-background/60 ps-9 pe-3 text-sm text-foreground placeholder:text-muted-foreground",
                            "outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
                        )}
                    />
                </div>

                {/* Plan filter */}
                <div className="relative">
                    <SlidersHorizontal className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <select
                        value={planFilter}
                        onChange={(e) =>
                            setPlanFilter(e.target.value as PlanTier | "all")
                        }
                        className={cn(
                            "h-9 cursor-pointer appearance-none rounded-lg border border-input bg-background/60 ps-9 pe-8 text-sm text-foreground",
                            "outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
                        )}
                    >
                        <option value="all">{t.filterAll}</option>
                        <option value="free">{t.plans.free}</option>
                        <option value="standard">{t.plans.standard}</option>
                        <option value="premium">{t.plans.premium}</option>
                    </select>
                </div>
            </motion.div>

            {/* ── Table or empty state ──────────────────── */}
            {seedFamilies.length === 0 ? (
                <EmptyState
                    icon={Users}
                    title={t.empty.title}
                    description={t.empty.description}
                />
            ) : filteredFamilies.length === 0 ? (
                <EmptyState
                    icon={Search}
                    title={t.noResults.title}
                    description={t.noResults.description}
                />
            ) : (
                <FamiliesTable
                    families={filteredFamilies}
                    childCountMap={childCountMap}
                    onSelectFamily={handleSelectFamily}
                />
            )}

            {/* ── Family detail sheet ──────────────────── */}
            <FamilySheet
                family={selectedFamily}
                children={sheetChildren}
                tasks={sheetTasks}
                open={sheetOpen}
                onOpenChange={setSheetOpen}
            />
        </div>
    )
}
