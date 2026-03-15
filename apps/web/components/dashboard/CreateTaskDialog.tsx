"use client"

import { getDashboardDictionary } from "@/lib/dashboard-dictionary"
import { children as seedChildren, type Task } from "@lib/seed"
import { Button } from "@workspace/ui/components/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@workspace/ui/components/dialog"
import { cn } from "@workspace/ui/lib/utils"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { useState } from "react"

/* ── Props ─────────────────────────────────────────────── */

type CreateTaskDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (task: Task) => void
}

/* ── Component ─────────────────────────────────────────── */

export function CreateTaskDialog({
    open,
    onOpenChange,
    onSubmit,
}: CreateTaskDialogProps) {
    const dict = getDashboardDictionary()
    const t = dict.tasks.dialog

    const [title, setTitle] = useState("")
    const [childId, setChildId] = useState("")
    const [reward, setReward] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [category, setCategory] = useState<Task["category"]>("chores")

    const inputCls = cn(
        "h-9 w-full rounded-lg border border-input bg-background/60 px-3 text-sm text-foreground placeholder:text-muted-foreground",
        "outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
    )

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!title.trim() || !childId || !reward || !dueDate) return

        const child = seedChildren.find((c) => c.id === childId)

        const newTask: Task = {
            id: `task_${Date.now()}`,
            familyId: child?.familyId ?? "",
            childId,
            title: title.trim(),
            rewardShekels: Number(reward),
            dueDate,
            status: "pending",
            category,
        }

        onSubmit(newTask)
        onOpenChange(false)

        // reset form
        setTitle("")
        setChildId("")
        setReward("")
        setDueDate("")
        setCategory("chores")
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-lg">{t.title}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Task title */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground">
                            {t.taskTitle}
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={t.taskTitlePlaceholder}
                            className={inputCls}
                            required
                        />
                    </div>

                    {/* Child selector */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground">
                            {t.child}
                        </label>
                        <select
                            value={childId}
                            onChange={(e) => setChildId(e.target.value)}
                            className={cn(inputCls, "cursor-pointer appearance-none")}
                            required
                        >
                            <option value="">{t.childPlaceholder}</option>
                            {seedChildren.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.fullName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Reward + Due date row */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-foreground">
                                {t.rewardAmount}
                            </label>
                            <input
                                type="number"
                                min={1}
                                value={reward}
                                onChange={(e) => setReward(e.target.value)}
                                placeholder="10"
                                className={inputCls}
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-foreground">
                                {t.dueDateLabel}
                            </label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className={inputCls}
                                required
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground">
                            {t.category}
                        </label>
                        <select
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value as Task["category"])
                            }
                            className={cn(inputCls, "cursor-pointer appearance-none")}
                        >
                            {(
                                ["chores", "school", "habits", "education"] as const
                            ).map((cat) => (
                                <option key={cat} value={cat}>
                                    {dict.tasks.categories[cat]}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Footer */}
                    <DialogFooter className="pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            {t.cancel}
                        </Button>
                        <motion.div whileTap={{ scale: 0.97 }}>
                            <Button type="submit">
                                <Plus className="size-4" data-icon="inline-start" />
                                {t.submit}
                            </Button>
                        </motion.div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
