"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState, useMemo } from "react"
import { BookOpen } from "lucide-react"

import { getDashboardDictionary } from "@/lib/dashboard-dictionary"
import { EducationSkeleton } from "@/components/dashboard/education/EducationSkeleton"
import { EducationEmptyState } from "@/components/dashboard/education/EducationEmptyState"
import { EducationCard } from "@/components/dashboard/education/EducationCard"
import { EducationProgress } from "@/components/dashboard/education/EducationProgress"
import { Button } from "@workspace/ui/components/button"

import {
    educationContent as seedEducationContent,
    children as seedChildren,
    getChildEducationProgress,
    type EducationContent
} from "@lib/seed"

export default function EducationPage() {
    const dict = getDashboardDictionary()
    const t = dict.education

    const [isLoading, setIsLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<"all" | EducationContent["subject"]>("all")
    
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800)
        return () => clearTimeout(timer)
    }, [])

    const filteredContent = useMemo(() => {
        if (activeTab === "all") return seedEducationContent
        return seedEducationContent.filter(c => c.subject === activeTab)
    }, [activeTab])

    const progress = useMemo(() => getChildEducationProgress(), [])

    if (isLoading) return <EducationSkeleton />

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <motion.h1
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3"
                >
                    <BookOpen className="size-6 text-primary" />
                    {t.pageTitle}
                </motion.h1>
            </div>

            {seedEducationContent.length === 0 ? (
                <EducationEmptyState />
            ) : (
                <div className="space-y-8">
                    {/* Progress Tracker Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <EducationProgress childrenList={seedChildren} progress={progress} />
                    </motion.section>

                    {/* Filter Tabs & Content Grid */}
                    <section className="space-y-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
                        >
                            {(["all", "saving", "budgeting", "spending", "investing"] as const).map((tab) => (
                                <Button
                                    key={tab}
                                    variant={activeTab === tab ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setActiveTab(tab)}
                                    className="rounded-full capitalize whitespace-nowrap"
                                >
                                    {t.tabs[tab as keyof typeof t.tabs]}
                                </Button>
                            ))}
                        </motion.div>

                        <AnimatePresence mode="popLayout">
                            <motion.div 
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {filteredContent.length === 0 ? (
                                    <EducationEmptyState />
                                ) : (
                                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                        {filteredContent.map((content, i) => (
                                            <EducationCard
                                                key={content.id}
                                                content={content}
                                                childrenList={seedChildren}
                                                index={i}
                                            />
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </section>
                </div>
            )}
        </div>
    )
}
