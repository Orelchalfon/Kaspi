import { DashboardShell } from "@/components/dashboard/DashboardShell"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Kaspi — לוח מחוונים",
    description: "נהל את המשפחה, המשימות והתגמולים שלך במקום אחד.",
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <DashboardShell>{children}</DashboardShell>
}
