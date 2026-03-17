"use client"

import { SidebarNavItem } from "@/components/dashboard/SidebarNavItem"
import { useSidebar } from "@/hooks/use-sidebar"
import { dashboardNavItems } from "@/lib/dashboard-nav"
import { cn } from "@workspace/ui/lib/utils"
import { motion } from "framer-motion"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { getDashboardDictionary } from "@/lib/dashboard-dictionary"

/* ── Constants ──────────────────────────────────────── */

const SIDEBAR_WIDTH_EXPANDED = 256 // 16rem
const SIDEBAR_WIDTH_COLLAPSED = 72 // 4.5rem

/* ── Component ──────────────────────────────────────── */

export function Sidebar() {
    const { isCollapsed, toggleSidebar } = useSidebar()
    const dict = getDashboardDictionary()

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
                "fixed inset-y-0 start-0 z-30 hidden flex-col border-e border-sidebar-border bg-sidebar lg:flex",
                "overflow-hidden"
            )}
        >
            {/* ── Brand ────────────────────────────────────── */}
            <div className="flex h-16 shrink-0 items-center gap-3 border-b border-sidebar-border px-5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-xs font-bold text-sidebar-primary-foreground">
                    K
                </div>
                {!isCollapsed && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-sm font-semibold tracking-tight text-sidebar-foreground"
                    >
                        Kaspi
                    </motion.span>
                )}
            </div>

            {/* ── Navigation ──────────────────────────────── */}
            <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
                {dashboardNavItems.map((item) => (
                    <SidebarNavItem key={item.id} item={item} />
                ))}
            </nav>

            {/* ── Collapse toggle ─────────────────────────── */}
            <div className="shrink-0 border-t border-sidebar-border p-3">
                <button
                    type="button"
                    onClick={toggleSidebar}
                    className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/60 transition-colors",
                        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        "cursor-pointer",
                        isCollapsed && "justify-center px-0"
                    )}
                    aria-label={isCollapsed ? dict.shell.expandMenu : dict.shell.collapseMenu}
                >
                    {isCollapsed ? (
                        <PanelLeftOpen className="size-[18px] shrink-0 rtl:scale-x-[-1]" />
                    ) : (
                        <>
                            <PanelLeftClose className="size-[18px] shrink-0 rtl:scale-x-[-1]" />
                            <span className="truncate">{dict.shell.collapseMenu}</span>
                        </>
                    )}
                </button>
            </div>
        </motion.aside>
    )
}

export { SIDEBAR_WIDTH_COLLAPSED, SIDEBAR_WIDTH_EXPANDED }

