import {
ArrowLeftRight,
CreditCard,
Gift,
GraduationCap,
LayoutDashboard,
ListChecks,
Settings,
Users,
type LucideIcon,
} from "lucide-react"

/* ── Navigation item type ───────────────────────────── */

export type NavItem = {
    id: string
    labelHe: string
    labelEn: string
    href: string
    icon: LucideIcon
}

/* ── Navigation items ───────────────────────────────── */

export const dashboardNavItems: NavItem[] = [
    {
        id: "overview",
        labelHe: "סקירה כללית",
        labelEn: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        id: "families",
        labelHe: "משפחות",
        labelEn: "Families",
        href: "/dashboard/families",
        icon: Users,
    },
    {
        id: "tasks",
        labelHe: "משימות",
        labelEn: "Tasks",
        href: "/dashboard/tasks",
        icon: ListChecks,
    },
    {
        id: "rewards",
        labelHe: "תגמולים",
        labelEn: "Rewards",
        href: "/dashboard/rewards",
        icon: Gift,
    },
    {
        id: "transactions",
        labelHe: "תנועות",
        labelEn: "Transactions",
        href: "/dashboard/transactions",
        icon: ArrowLeftRight,
    },
    {
        id: "education",
        labelHe: "חינוך פיננסי",
        labelEn: "Education",
        href: "/dashboard/education",
        icon: GraduationCap,
    },
    {
        id: "subscriptions",
        labelHe: "מנויים",
        labelEn: "Subscriptions",
        href: "/dashboard/subscriptions",
        icon: CreditCard,
    },
    {
        id: "settings",
        labelHe: "הגדרות",
        labelEn: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
]
