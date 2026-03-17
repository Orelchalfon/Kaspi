"use client"

import { getDashboardDictionary } from "@/lib/dashboard-dictionary"
import type { Child, Family, Task } from "@lib/seed"
import { Badge } from "@workspace/ui/components/badge"
import {
Sheet,
SheetContent,
SheetDescription,
SheetHeader,
SheetTitle,
} from "@workspace/ui/components/sheet"
import { CheckCircle2, Clock, Loader2 } from "lucide-react"

/* ── Props ─────────────────────────────────────────────── */

type FamilySheetProps = {
    family: Family | null
    children: Child[]
    tasks: Task[]
    open: boolean
    onOpenChange: (open: boolean) => void
}

/* ── Helpers ───────────────────────────────────────────── */

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("he-IL", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })
}

const taskStatusIcons = {
    pending: <Clock className="size-3.5 text-amber-500" />,
    approved: <Loader2 className="size-3.5 text-blue-500" />,
    completed: <CheckCircle2 className="size-3.5 text-emerald-500" />,
}


/* ── Component ─────────────────────────────────────────── */

export function FamilySheet({
    family,
    children: familyChildren,
    tasks: familyTasks,
    open,
    onOpenChange,
}: FamilySheetProps) {
    const dict = getDashboardDictionary()
    const t = dict.families.sheet

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="left" className="overflow-y-auto">
                <SheetHeader className="border-b border-border pb-4">
                    <SheetTitle>{family?.name ?? t.title}</SheetTitle>
                    <SheetDescription>
                        {t.title}
                    </SheetDescription>
                </SheetHeader>

                {family && (
                    <div className="space-y-6 p-4">
                        {/* ── Family info ─────────────────────── */}
                        <div className="space-y-2.5">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">{t.email}</span>
                                <span className="font-medium text-foreground">{family.parentEmail}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">{t.plan}</span>
                                <Badge variant="secondary" className="text-xs">
                                    {dict.families.plans[family.plan]}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">{t.joined}</span>
                                <span className="font-medium text-foreground">{formatDate(family.joinedAt)}</span>
                            </div>
                        </div>

                        {/* ── Children ────────────────────────── */}
                        <div>
                            <h4 className="mb-3 text-sm font-semibold text-foreground">
                                {t.childrenTitle} ({familyChildren.length})
                            </h4>
                            <div className="space-y-2">
                                {familyChildren.map((child) => {
                                    const childTasks = familyTasks.filter(
                                        (task) => task.childId === child.id
                                    )

                                    return (
                                        <div
                                            key={child.id}
                                            className="rounded-lg bg-muted/40 p-3"
                                        >
                                            {/* child header */}
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                                                    style={{ backgroundColor: child.avatarColor }}
                                                >
                                                    {child.fullName.charAt(0)}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-medium text-foreground">
                                                        {child.fullName}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {t.age} {child.age}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* child tasks */}
                                            {childTasks.length > 0 ? (
                                                <ul className="mt-2.5 space-y-1.5 border-t border-border/40 pt-2.5">
                                                    {childTasks.map((task) => (
                                                        <li
                                                            key={task.id}
                                                            className="flex items-center gap-2 text-xs"
                                                        >
                                                            {taskStatusIcons[task.status]}
                                                            <span className="flex-1 truncate text-foreground/80">
                                                                {task.title}
                                                            </span>
                                                            <span className="shrink-0 text-muted-foreground">
                                                                ₪{task.rewardShekels}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="mt-2 text-xs text-muted-foreground/60">
                                                    {t.noTasks}
                                                </p>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
