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
    families: {
        pageTitle: string
        searchPlaceholder: string
        filterAll: string
        columns: {
            name: string
            email: string
            children: string
            plan: string
            joined: string
            status: string
        }
        plans: {
            free: string
            standard: string
            premium: string
        }
        statuses: {
            active: string
            trial: string
            canceled: string
        }
        sheet: {
            title: string
            email: string
            plan: string
            joined: string
            childrenTitle: string
            age: string
            tasksTitle: string
            noTasks: string
        }
        empty: {
            title: string
            description: string
        }
        noResults: {
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
    families: {
        pageTitle: "משפחות",
        searchPlaceholder: "חיפוש לפי שם משפחה או אימייל…",
        filterAll: "כל המנויים",
        columns: {
            name: "שם המשפחה",
            email: "אימייל הורה",
            children: "ילדים",
            plan: "מנוי",
            joined: "הצטרפו",
            status: "סטטוס",
        },
        plans: {
            free: "חינמי",
            standard: "רגיל",
            premium: "פרמיום",
        },
        statuses: {
            active: "פעיל",
            trial: "ניסיון",
            canceled: "בוטל",
        },
        sheet: {
            title: "פרטי משפחה",
            email: "אימייל",
            plan: "מנוי",
            joined: "תאריך הצטרפות",
            childrenTitle: "ילדים",
            age: "גיל",
            tasksTitle: "משימות",
            noTasks: "אין משימות פעילות",
        },
        empty: {
            title: "אין משפחות עדיין",
            description: "משפחות שיצטרפו לפלטפורמה יופיעו כאן.",
        },
        noResults: {
            title: "לא נמצאו תוצאות",
            description: "נסה לחפש במילים אחרות או לשנות את הסינון.",
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
    families: {
        pageTitle: "Families",
        searchPlaceholder: "Search by family name or email…",
        filterAll: "All plans",
        columns: {
            name: "Family Name",
            email: "Parent Email",
            children: "Children",
            plan: "Plan",
            joined: "Joined",
            status: "Status",
        },
        plans: {
            free: "Free",
            standard: "Standard",
            premium: "Premium",
        },
        statuses: {
            active: "Active",
            trial: "Trial",
            canceled: "Canceled",
        },
        sheet: {
            title: "Family Details",
            email: "Email",
            plan: "Plan",
            joined: "Joined",
            childrenTitle: "Children",
            age: "Age",
            tasksTitle: "Tasks",
            noTasks: "No active tasks",
        },
        empty: {
            title: "No families yet",
            description: "Families that join the platform will appear here.",
        },
        noResults: {
            title: "No results found",
            description: "Try a different search term or adjust your filters.",
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
