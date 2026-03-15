"use client"

import { getDashboardDictionary } from "@/lib/dashboard-dictionary"
import type { Task } from "@lib/seed"
import type { Child } from "@lib/seed"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import { motion } from "framer-motion"
import { Calendar, Check, Coins, X } from "lucide-react"

/* ── Helpers ───────────────────────────────────────────── */

const categoryColors: Record<Task["category"], string> = {
    chores: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    school: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    habits: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    education: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
}

function formatDate(iso: string): string {
    const d = new Date(iso)
    return d.toLocaleDateString("he-IL", {
        day: "numeric",
        month: "short",
    })
}

/* ── Props ─────────────────────────────────────────────── */

type TaskCardProps = {
    task: Task
    child: Child | undefined
    /** local status override — "rejected" hides the card entirely */
    localStatus?: Task["status"] | "rejected"
    index: number
    onApprove?: (taskId: string) => void
    onReject?: (taskId: string) => void
}

/* ── Component ─────────────────────────────────────────── */

export function TaskCard({
    task,
    child,
    localStatus,
    index,
    onApprove,
    onReject,
}: TaskCardProps) {
    const dict = getDashboardDictionary()
    const t = dict.tasks

    const status = localStatus ?? task.status
    const isPending = status === "pending"

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
            layout
        >
            <Card className="group relative overflow-hidden p-4 transition-shadow hover:shadow-md cursor-pointer">
                {/* accent bar */}
                <div className="absolute inset-y-0 start-0 w-1 rounded-s-xl bg-primary/40" />

                {/* ── Top row: avatar + title + category ── */}
                <div className="flex items-start gap-3">
                    {/* Child avatar */}
                    <div
                        className="flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                        style={{ backgroundColor: child?.avatarColor ?? "#6366F1" }}
                    >
                        {child?.fullName?.charAt(0) ?? "?"}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                            <h3 className="truncate text-sm font-semibold text-foreground">
                                {task.title}
                            </h3>
                            <Badge
                                variant="secondary"
                                className={cn(
                                    "shrink-0 text-[11px]",
                                    categoryColors[task.category]
                                )}
                            >
                                {t.categories[task.category]}
                            </Badge>
                        </div>

                        <p className="mt-0.5 text-xs text-muted-foreground">
                            {child?.fullName}
                        </p>
                    </div>
                </div>

                {/* ── Meta row: reward + due date ── */}
                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                        <Coins className="size-3.5 text-amber-500" />
                        <span className="font-medium text-foreground">
                            ₪{task.rewardShekels}
                        </span>
                    </span>

                    <span className="inline-flex items-center gap-1">
                        <Calendar className="size-3.5" />
                        {formatDate(task.dueDate)}
                    </span>
                </div>

                {/* ── Action buttons (pending only) ── */}
                {isPending && (onApprove || onReject) && (
                    <div className="mt-3 flex items-center gap-2 border-t border-border/50 pt-3">
                        {onApprove && (
                            <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
                                <Button
                                    size="sm"
                                    variant="default"
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                                    onClick={() => onApprove(task.id)}
                                >
                                    <Check className="size-3.5" data-icon="inline-start" />
                                    {t.approve}
                                </Button>
                            </motion.div>
                        )}
                        {onReject && (
                            <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    className="w-full"
                                    onClick={() => onReject(task.id)}
                                >
                                    <X className="size-3.5" data-icon="inline-start" />
                                    {t.reject}
                                </Button>
                            </motion.div>
                        )}
                    </div>
                )}
            </Card>
        </motion.div>
    )
}
