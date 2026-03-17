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
    tasks: {
        pageTitle: string
        pendingApproval: string
        activeTasks: string
        completedTasks: string
        createTask: string
        reward: string
        dueDate: string
        approve: string
        reject: string
        categories: {
            chores: string
            school: string
            habits: string
            education: string
        }
        statuses: {
            pending: string
            approved: string
            completed: string
            rejected: string
        }
        dialog: {
            title: string
            taskTitle: string
            taskTitlePlaceholder: string
            child: string
            childPlaceholder: string
            rewardAmount: string
            dueDateLabel: string
            category: string
            submit: string
            cancel: string
        }
        empty: {
            title: string
            description: string
        }
    }
    education: {
        pageTitle: string
        tabs: {
            all: string
            saving: string
            budgeting: string
            spending: string
            investing: string
        }
        assignTo: string
        progressTitle: string
        emptyTitle: string
        emptyDescription: string
        difficulties: {
            beginner: string
            intermediate: string
            advanced: string
        }
        types: {
            lesson: string
            quiz: string
            challenge: string
        }
        points: string
    }
    subscriptions: {
        pageTitle: string
        summary: {
            totalMrr: string
            activeSubs: string
            churned: string
        }
        columns: {
            family: string
            plan: string
            status: string
            billingDate: string
            amount: string
            actions: string
        }
        plans: {
            free: string
            standard: string
            premium: string
        }
        statuses: {
            trialing: string
            active: string
            past_due: string
            canceled: string
        }
        actions: {
            cancel: string
            upgrade: string
            downgrade: string
            canceled: string
        }
        empty: {
            title: string
            description: string
        }
    }
}


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
    tasks: {
        pageTitle: "משימות",
        pendingApproval: "ממתינות לאישור",
        activeTasks: "משימות פעילות",
        completedTasks: "משימות שהושלמו",
        createTask: "משימה חדשה",
        reward: "תגמול",
        dueDate: "תאריך יעד",
        approve: "אישור",
        reject: "דחייה",
        categories: {
            chores: "מטלות בית",
            school: "לימודים",
            habits: "הרגלים",
            education: "חינוך פיננסי",
        },
        statuses: {
            pending: "ממתין",
            approved: "מאושר",
            completed: "הושלם",
            rejected: "נדחה",
        },
        dialog: {
            title: "יצירת משימה חדשה",
            taskTitle: "שם המשימה",
            taskTitlePlaceholder: "לדוגמה: סידור החדר",
            child: "ילד/ה",
            childPlaceholder: "בחר ילד/ה",
            rewardAmount: "סכום תגמול (₪)",
            dueDateLabel: "תאריך יעד",
            category: "קטגוריה",
            submit: "יצירת משימה",
            cancel: "ביטול",
        },
        empty: {
            title: "אין משימות עדיין",
            description: "צור משימה חדשה כדי להתחיל.",
        },
    },
    education: {
        pageTitle: "חינוך פיננסי",
        tabs: {
            all: "הכל",
            saving: "חיסכון",
            budgeting: "תקצוב",
            spending: "הוצאות",
            investing: "השקעות",
        },
        assignTo: "שיוך לילד/ה",
        progressTitle: "התקדמות אישית",
        emptyTitle: "אין תכנים ללמידה",
        emptyDescription: "תכני חינוך פיננסי יופיעו כאן.",
        difficulties: {
            beginner: "מתחיל",
            intermediate: "בינוני",
            advanced: "מתקדם",
        },
        types: {
            lesson: "שיעור",
            quiz: "חידון",
            challenge: "אתגר",
        },
        points: "נקודות",
    },
    subscriptions: {
        pageTitle: "מנויים",
        summary: {
            totalMrr: "הכנסה חודשית חוזרת",
            activeSubs: "מנויים פעילים",
            churned: "ביטולים החודש",
        },
        columns: {
            family: "משפחה",
            plan: "מנוי",
            status: "סטטוס",
            billingDate: "תאריך חיוב",
            amount: "סכום",
            actions: "פעולות",
        },
        plans: {
            free: "חינמי",
            standard: "רגיל",
            premium: "פרמיום",
        },
        statuses: {
            trialing: "ניסיון",
            active: "פעיל",
            past_due: "באיחור",
            canceled: "בוטל",
        },
        actions: {
            cancel: "ביטול",
            upgrade: "שדרוג",
            downgrade: "הורדת דרגה",
            canceled: "בוטל",
        },
        empty: {
            title: "אין מנויים עדיין",
            description: "מנויים של משפחות יופיעו כאן.",
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
    tasks: {
        pageTitle: "Tasks",
        pendingApproval: "Pending Approval",
        activeTasks: "Active Tasks",
        completedTasks: "Completed Tasks",
        createTask: "New Task",
        reward: "Reward",
        dueDate: "Due Date",
        approve: "Approve",
        reject: "Reject",
        categories: {
            chores: "Chores",
            school: "School",
            habits: "Habits",
            education: "Financial Education",
        },
        statuses: {
            pending: "Pending",
            approved: "Approved",
            completed: "Completed",
            rejected: "Rejected",
        },
        dialog: {
            title: "Create New Task",
            taskTitle: "Task Title",
            taskTitlePlaceholder: "e.g. Clean the room",
            child: "Child",
            childPlaceholder: "Select a child",
            rewardAmount: "Reward Amount (₪)",
            dueDateLabel: "Due Date",
            category: "Category",
            submit: "Create Task",
            cancel: "Cancel",
        },
        empty: {
            title: "No tasks yet",
            description: "Create a new task to get started.",
        },
    },
    education: {
        pageTitle: "Financial Education",
        tabs: {
            all: "All",
            saving: "Saving",
            budgeting: "Budgeting",
            spending: "Spending",
            investing: "Investing",
        },
        assignTo: "Assign to Child",
        progressTitle: "Personal Progress",
        emptyTitle: "No education content",
        emptyDescription: "Financial education content will appear here.",
        difficulties: {
            beginner: "Beginner",
            intermediate: "Intermediate",
            advanced: "Advanced",
        },
        types: {
            lesson: "Lesson",
            quiz: "Quiz",
            challenge: "Challenge",
        },
        points: "Points",
    },
    subscriptions: {
        pageTitle: "Subscriptions",
        summary: {
            totalMrr: "Monthly Recurring Revenue",
            activeSubs: "Active Subscriptions",
            churned: "Churned This Month",
        },
        columns: {
            family: "Family",
            plan: "Plan",
            status: "Status",
            billingDate: "Billing Date",
            amount: "Amount",
            actions: "Actions",
        },
        plans: {
            free: "Free",
            standard: "Standard",
            premium: "Premium",
        },
        statuses: {
            trialing: "Trialing",
            active: "Active",
            past_due: "Past Due",
            canceled: "Canceled",
        },
        actions: {
            cancel: "Cancel",
            upgrade: "Upgrade",
            downgrade: "Downgrade",
            canceled: "Canceled",
        },
        empty: {
            title: "No subscriptions yet",
            description: "Family subscriptions will appear here.",
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
