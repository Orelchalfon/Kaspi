"use client"

import { getDashboardDictionary } from "@/lib/dashboard-dictionary"
import type { EducationContent, Child } from "@lib/seed"
import { Badge } from "@workspace/ui/components/badge"
import { Card } from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import { motion } from "framer-motion"
import { BookOpen, Trophy, Lightbulb, Pickaxe, Coins } from "lucide-react"
import { AssignEducationPopover } from "./AssignEducationPopover"

/* ── Helpers ───────────────────────────────────────────── */

const subjectColors: Record<EducationContent["subject"], string> = {
    saving: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    budgeting: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    spending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    investing: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
}

const typeIcons: Record<EducationContent["type"], React.ElementType> = {
    lesson: BookOpen,
    quiz: Lightbulb,
    challenge: Pickaxe,
}

const difficultyColors: Record<EducationContent["difficulty"], string> = {
    beginner: "text-emerald-500",
    intermediate: "text-amber-500",
    advanced: "text-rose-500",
}

/* ── Props ─────────────────────────────────────────────── */

type EducationCardProps = {
    content: EducationContent
    childrenList: Child[]
    index: number
}

/* ── Component ─────────────────────────────────────────── */

export function EducationCard({ content, childrenList, index }: EducationCardProps) {
    const dict = getDashboardDictionary()
    const t = dict.education
    
    const Icon = typeIcons[content.type] || BookOpen
    const colorClass = subjectColors[content.subject] ?? subjectColors.saving ?? ""
    const firstColor = colorClass.split(" ")[0] ?? ""
    const topBorderClass = firstColor.replace("/10", "")

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
            layout
        >
            <Card className="group relative overflow-hidden flex flex-col h-full bg-card hover:bg-muted/40 transition-colors shadow-sm hover:shadow-md">
                {/* Accent line indicating subject */}
                <div className={cn("absolute top-0 inset-x-0 h-1", topBorderClass)} />
                
                <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-3 mb-4">
                        <div className={cn("p-2 rounded-xl bg-card border shadow-sm shrink-0", colorClass)}>
                            <Icon className="size-5" />
                        </div>
                        <Badge variant="outline" className={cn("shrink-0 capitalize", colorClass)}>
                            {t.tabs[content.subject as keyof typeof t.tabs]}
                        </Badge>
                    </div>

                    <h3 className="text-lg font-semibold leading-tight tracking-tight mb-2 group-hover:text-primary transition-colors">
                        {content.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mt-auto text-xs text-muted-foreground font-medium mb-4">
                        <span className={cn("capitalize", difficultyColors[content.difficulty] || difficultyColors.beginner)}>
                            {t.difficulties[content.difficulty]}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <span>{content.estimatedMinutes} דק׳</span>
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <span className="capitalize">{t.types[content.type]}</span>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t">
                        <div className="flex items-center gap-1.5 font-medium">
                            <Coins className="size-4 text-amber-500" />
                            <span>{content.rewardPoints} <span className="text-muted-foreground text-xs font-normal">{t.points}</span></span>
                        </div>
                    </div>
                </div>

                <div className="p-3 pt-0 mt-auto">
                    <AssignEducationPopover childrenList={childrenList} contentId={content.id} />
                </div>
            </Card>
        </motion.div>
    )
}
