"use client"

import { getDashboardDictionary } from "@/lib/dashboard-dictionary"
import { EmptyState } from "@/components/dashboard/EmptyState"
import { BookOpen } from "lucide-react"

export function EducationEmptyState() {
    const dict = getDashboardDictionary()
    const t = dict.education

    return (
        <EmptyState
            icon={BookOpen}
            title={t.emptyTitle}
            description={t.emptyDescription}
        />
    )
}
