/* ── Dashboard dictionary ─────────────────────────────── */

export type DashboardDictionary = {
    overview: {
        pageTitle: string
        stats: {
            totalFamilies: string
            activeChildren: string
            tasksThisWeek: string
            mrr: string
        }
        chart: {
            title: string
            families: string
            children: string
            tasks: string
        }
        activity: {
            title: string
            emptyTitle: string
            emptyDescription: string
        }
        empty: {
            title: string
            description: string
        }
    }
}

/* ── Hebrew ────────────────────────────────────────────── */

const he: DashboardDictionary = {
    overview: {
        pageTitle: "סקירה כללית",
        stats: {
            totalFamilies: "סה״כ משפחות",
            activeChildren: "ילדים פעילים",
            tasksThisWeek: "משימות השבוע",
            mrr: "הכנסה חודשית חוזרת",
        },
        chart: {
            title: "ניתוח מגמות – 6 חודשים אחרונים",
            families: "משפחות",
            children: "ילדים",
            tasks: "משימות",
        },
        activity: {
            title: "פעילות אחרונה",
            emptyTitle: "אין פעילות עדיין",
            emptyDescription: "כאן תופיע פעילות אחרונה ברגע שיתחילו ליצור משימות ותגמולים.",
        },
        empty: {
            title: "אין נתונים להצגה",
            description: "כאן יופיעו סטטיסטיקות, גרפים ופעילות אחרונה ברגע שמשפחות יצטרפו לפלטפורמה.",
        },
    },
}

/* ── English ───────────────────────────────────────────── */

const en: DashboardDictionary = {
    overview: {
        pageTitle: "Overview",
        stats: {
            totalFamilies: "Total Families",
            activeChildren: "Active Children",
            tasksThisWeek: "Tasks This Week",
            mrr: "Monthly Recurring Revenue",
        },
        chart: {
            title: "Trend Analysis – Last 6 Months",
            families: "Families",
            children: "Children",
            tasks: "Tasks",
        },
        activity: {
            title: "Recent Activity",
            emptyTitle: "No activity yet",
            emptyDescription: "Recent activity will appear here once tasks and rewards start flowing.",
        },
        empty: {
            title: "No data to display",
            description: "Stats, charts, and recent activity will appear here once families join the platform.",
        },
    },
}

/* ── Accessor ──────────────────────────────────────────── */

export type SupportedDashboardLanguage = "he" | "en"

export function getDashboardDictionary(
    lang: SupportedDashboardLanguage = "he"
): DashboardDictionary {
    return lang === "en" ? en : he
}
