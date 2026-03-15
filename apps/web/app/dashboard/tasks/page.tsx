"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ListChecks, Plus } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"

import { CreateTaskDialog } from "@/components/dashboard/CreateTaskDialog"
import { EmptyState } from "@/components/dashboard/EmptyState"
import { TaskCard } from "@/components/dashboard/TaskCard"
import { TasksSkeleton } from "@/components/dashboard/TasksSkeleton"
import { getDashboardDictionary } from "@/lib/dashboard-dictionary"
import {
    children as seedChildren,
    tasks as seedTasks,
    type Task,
} from "@lib/seed"
import { Button } from "@workspace/ui/components/button"


export default function TasksPage() {
    const dict = getDashboardDictionary()
    const t = dict.tasks

    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800)
        return () => clearTimeout(timer)
    }, [])

    const [localTasks, setLocalTasks] = useState<Task[]>(seedTasks)
    const [statusOverrides, setStatusOverrides] = useState<
        Record<string, Task["status"] | "rejected">
    >({})

    const [dialogOpen, setDialogOpen] = useState(false)

    const childMap = useMemo(() => {
        const map: Record<string, (typeof seedChildren)[number]> = {}
        for (const child of seedChildren) {
            map[child.id] = child
        }
        return map
    }, [])

    const effectiveStatus = useCallback(
        (task: Task) => statusOverrides[task.id] ?? task.status,
        [statusOverrides]
    )

    const pendingTasks = useMemo(
        () => localTasks.filter((t) => effectiveStatus(t) === "pending"),
        [localTasks, effectiveStatus]
    )

    const activeTasks = useMemo(
        () => localTasks.filter((t) => effectiveStatus(t) === "approved"),
        [localTasks, effectiveStatus]
    )

    function handleApprove(taskId: string) {
        setStatusOverrides((prev) => ({ ...prev, [taskId]: "approved" }))
    }

    function handleReject(taskId: string) {
        setStatusOverrides((prev) => ({ ...prev, [taskId]: "rejected" }))
    }

    function handleCreateTask(newTask: Task) {
        setLocalTasks((prev) => [newTask, ...prev])
    }

    if (isLoading) return <TasksSkeleton />

    if (localTasks.length === 0) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <motion.h1
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className="text-2xl font-bold tracking-tight text-foreground"
                    >
                        {t.pageTitle}
                    </motion.h1>
                </div>
                <EmptyState
                    icon={ListChecks}
                    title={t.empty.title}
                    description={t.empty.description}
                />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <motion.h1
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="text-2xl font-bold tracking-tight text-foreground"
                >
                    {t.pageTitle}
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                >
                    <Button onClick={() => setDialogOpen(true)}>
                        <Plus className="size-4" data-icon="inline-start" />
                        {t.createTask}
                    </Button>
                </motion.div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <motion.section
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="space-y-4"
                >
                    <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-amber-500" />
                        <h2 className="text-base font-semibold text-foreground">
                            {t.pendingApproval}
                        </h2>
                        <span className="ms-auto rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                            {pendingTasks.length}
                        </span>
                    </div>

                    <AnimatePresence mode="popLayout">
                        {pendingTasks.length === 0 ? (
                            <motion.div
                                key="empty-pending"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 py-12 text-center"
                            >
                                <p className="text-sm text-muted-foreground">
                                    {t.empty.title}
                                </p>
                            </motion.div>
                        ) : (
                            pendingTasks.map((task, i) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    child={childMap[task.childId]}
                                    localStatus={effectiveStatus(task)}
                                    index={i}
                                    onApprove={handleApprove}
                                    onReject={handleReject}
                                />
                            ))
                        )}
                    </AnimatePresence>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="space-y-4"
                >
                    <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-emerald-500" />
                        <h2 className="text-base font-semibold text-foreground">
                            {t.activeTasks}
                        </h2>
                        <span className="ms-auto rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                            {activeTasks.length}
                        </span>
                    </div>

                    <AnimatePresence mode="popLayout">
                        {activeTasks.length === 0 ? (
                            <motion.div
                                key="empty-active"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 py-12 text-center"
                            >
                                <p className="text-sm text-muted-foreground">
                                    {t.empty.title}
                                </p>
                            </motion.div>
                        ) : (
                            activeTasks.map((task, i) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    child={childMap[task.childId]}
                                    localStatus={effectiveStatus(task)}
                                    index={i}
                                />
                            ))
                        )}
                    </AnimatePresence>
                </motion.section>
            </div>

            <CreateTaskDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onSubmit={handleCreateTask}
            />
        </div>
    )
}
