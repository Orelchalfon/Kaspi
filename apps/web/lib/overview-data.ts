import {
ArrowLeftRight,
CheckCircle2,
Gift,
Star,
UserPlus,
Users,
Wallet,
type LucideIcon,
} from "lucide-react"

/* ── Stat card types ──────────────────────────────────── */

export type TrendDirection = "up" | "down" | "neutral"

export type StatCardData = {
    id: string
    /** dictionary key for the label */
    labelKey: "totalFamilies" | "activeChildren" | "tasksThisWeek" | "mrr"
    value: string
    trend: { value: string; direction: TrendDirection }
    icon: LucideIcon
    color: string // tailwind bg-class for the icon badge
}

/* ── Monthly analytics types ──────────────────────────── */

export type MonthlyAnalytics = {
    month: string
    families: number
    children: number
    tasks: number
}

/* ── Activity feed types ──────────────────────────────── */

export type ActivityItem = {
    id: string
    icon: LucideIcon
    description: string
    amount?: string
    amountType?: "income" | "expense"
    timestamp: string
}

/* ── Seed data ────────────────────────────────────────── */

export function getStatCards(): StatCardData[] {
    return [
        {
            id: "total-families",
            labelKey: "totalFamilies",
            value: "1,248",
            trend: { value: "+12.5%", direction: "up" },
            icon: Users,
            color: "bg-chart-1/15 text-chart-1",
        },
        {
            id: "active-children",
            labelKey: "activeChildren",
            value: "3,672",
            trend: { value: "+8.2%", direction: "up" },
            icon: UserPlus,
            color: "bg-chart-2/15 text-chart-2",
        },
        {
            id: "tasks-this-week",
            labelKey: "tasksThisWeek",
            value: "842",
            trend: { value: "-3.1%", direction: "down" },
            icon: CheckCircle2,
            color: "bg-chart-3/15 text-chart-3",
        },
        {
            id: "mrr",
            labelKey: "mrr",
            value: "₪48,290",
            trend: { value: "+18.7%", direction: "up" },
            icon: Wallet,
            color: "bg-chart-4/15 text-chart-4",
        },
    ]
}

export function getMonthlyAnalytics(): MonthlyAnalytics[] {
    return [
        { month: "אוק׳", families: 820, children: 2410, tasks: 580 },
        { month: "נוב׳", families: 910, children: 2680, tasks: 650 },
        { month: "דצמ׳", families: 975, children: 2890, tasks: 710 },
        { month: "ינו׳", families: 1050, children: 3120, tasks: 760 },
        { month: "פבר׳", families: 1150, children: 3400, tasks: 800 },
        { month: "מרץ", families: 1248, children: 3672, tasks: 842 },
    ]
}

export function getRecentActivity(): ActivityItem[] {
    return [
        {
            id: "a1",
            icon: UserPlus,
            description: "משפחת כהן הצטרפה לפלטפורמה",
            timestamp: "לפני 12 דקות",
        },
        {
            id: "a2",
            icon: CheckCircle2,
            description: "נועה סיימה את המשימה ״סידור החדר״",
            amount: "+₪15",
            amountType: "income",
            timestamp: "לפני 25 דקות",
        },
        {
            id: "a3",
            icon: Gift,
            description: "תומר מימש תגמול ״זמן מסך נוסף״",
            amount: "-50 נק׳",
            amountType: "expense",
            timestamp: "לפני שעה",
        },
        {
            id: "a4",
            icon: ArrowLeftRight,
            description: "העברה בין חשבונות – משפחת לוי",
            amount: "₪120",
            timestamp: "לפני שעתיים",
        },
        {
            id: "a5",
            icon: Star,
            description: "שירה קיבלה בונוס על רצף של 7 ימים",
            amount: "+₪25",
            amountType: "income",
            timestamp: "לפני 3 שעות",
        },
        {
            id: "a6",
            icon: CheckCircle2,
            description: "יאיר סיים את המשימה ״קריאה יומית״",
            amount: "+₪10",
            amountType: "income",
            timestamp: "לפני 4 שעות",
        },
        {
            id: "a7",
            icon: UserPlus,
            description: "משפחת אברהם הצטרפה לפלטפורמה",
            timestamp: "לפני 5 שעות",
        },
        {
            id: "a8",
            icon: Gift,
            description: "מיכל מימשה תגמול ״ארוחה במסעדה״",
            amount: "-200 נק׳",
            amountType: "expense",
            timestamp: "לפני 6 שעות",
        },
    ]
}
