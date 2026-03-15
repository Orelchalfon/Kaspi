"use client"

import { Header } from "@/components/dashboard/Header"
import { MobileNav } from "@/components/dashboard/MobileNav"
import { Sidebar, SIDEBAR_WIDTH_COLLAPSED, SIDEBAR_WIDTH_EXPANDED } from "@/components/dashboard/Sidebar"
import { SidebarProvider, useSidebar } from "@/hooks/use-sidebar"
import { cn } from "@workspace/ui/lib/utils"
import { motion } from "framer-motion"

/* ── Inner layout (needs sidebar context) ───────────── */

function ShellInner({ children }: { children: React.ReactNode }) {
    const { isCollapsed } = useSidebar()

    return (
        <div className="relative min-h-screen bg-background">
            {/* ── Desktop sidebar ──────────────────────────── */}
            <Sidebar />

            {/* ── Mobile drawer ────────────────────────────── */}
            <MobileNav />

            {/* ── Main area ────────────────────────────────── */}
            <motion.div
                initial={false}
                animate={{
                    marginInlineStart: `${isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED}px`,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={cn(
                    "flex min-h-screen flex-col transition-[margin] lg:ms-0",
                    /* On mobile there's no sidebar offset */
                    "max-lg:ms-0!"
                )}
            >
                <Header />

                <main className="flex-1 p-4 sm:p-6">
                    {children}
                </main>
            </motion.div>
        </div>
    )
}

/* ── Public export — wraps in provider ──────────────── */

export function DashboardShell({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <ShellInner>{children}</ShellInner>
        </SidebarProvider>
    )
}
