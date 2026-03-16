"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getDashboardDictionary } from "@/lib/dashboard-dictionary"
import type { Child } from "@lib/seed"
import { Check, ChevronRight } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@workspace/ui/components/dropdown-menu"

type AssignEducationPopoverProps = {
    childrenList: Child[]
    contentId: string
}

export function AssignEducationPopover({ childrenList, contentId }: AssignEducationPopoverProps) {
    const dict = getDashboardDictionary()
    const t = dict.education
    
    const [assignedTo, setAssignedTo] = useState<string | null>(null)
    const [open, setOpen] = useState(false)

    const handleAssign = (childId: string) => {
        setAssignedTo(childId)
        setTimeout(() => setOpen(false), 600) // Keep open briefly to show the checkmark
    }

    return (
        <DropdownMenu open={open} onOpenChange={setOpen} dir="rtl">
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="secondary" className="w-full">
                    {t.assignTo}
                    <ChevronRight className="size-4 rtl:rotate-180 transition-transform data-[state=open]:rotate-90 rtl:data-[state=open]:-rotate-90" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">{t.assignTo}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {childrenList.map((child) => {
                    const isAssigned = assignedTo === child.id

                    return (
                        <DropdownMenuItem
                            key={child.id}
                            className="flex items-center justify-between cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault()
                                handleAssign(child.id)
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <div
                                    className="size-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                                    style={{ backgroundColor: child.avatarColor }}
                                >
                                    {child.fullName.charAt(0)}
                                </div>
                                <span>{child.fullName}</span>
                            </div>
                            <AnimatePresence>
                                {isAssigned && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                    >
                                        <Check className="size-4 text-emerald-500" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
