"use client"

import { getDashboardDictionary } from "@/lib/dashboard-dictionary"
import type { Child, ChildEducationProgress } from "@lib/seed"
import { Card, CardHeader, CardTitle, CardContent } from "@workspace/ui/components/card"
import { motion } from "framer-motion"

type EducationProgressProps = {
    childrenList: Child[]
    progress: ChildEducationProgress[]
}

export function EducationProgress({ childrenList, progress }: EducationProgressProps) {
    const dict = getDashboardDictionary()
    const t = dict.education

    return (
        <Card>
            <CardHeader className="pb-3 border-b">
                <CardTitle className="text-sm font-medium">
                    {t.progressTitle}
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                {childrenList.map((child, i) => {
                    const childData = progress.find((p) => p.childId === child.id)
                    const completionRate = childData?.completionRate || 0

                    return (
                        <motion.div 
                            key={child.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            className="space-y-2"
                        >
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="size-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                                        style={{ backgroundColor: child.avatarColor }}
                                    >
                                        {child.fullName.charAt(0)}
                                    </div>
                                    <span className="font-medium text-foreground">{child.fullName}</span>
                                </div>
                                <span className="font-semibold text-muted-foreground">{completionRate}%</span>
                            </div>
                            
                            {/* Simple Tailwind Progress Bar */}
                            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary/50">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${completionRate}%` }}
                                    transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
                                    style={{ backgroundColor: child.avatarColor }}
                                />
                            </div>
                        </motion.div>
                    )
                })}
            </CardContent>
        </Card>
    )
}
