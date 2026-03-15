"use client"

import { useSidebar } from "@/hooks/use-sidebar"
import type { NavItem } from "@/lib/dashboard-nav"
import { cn } from "@workspace/ui/lib/utils"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

/* ── Props ──────────────────────────────────────────── */

type SidebarNavItemProps = {
    item: NavItem
}

/* ── Component ──────────────────────────────────────── */

export function SidebarNavItem({ item }: SidebarNavItemProps) {
    const pathname = usePathname()
    const { isCollapsed } = useSidebar()

    const isActive =
        item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href)

    const Icon = item.icon

    return (
        <Link
            href={item.href}
            className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70",
                isCollapsed && "justify-center px-0"
            )}
            title={isCollapsed ? item.labelHe : undefined}
        >
            {/* Active indicator — accent bar on inline-start side */}
            {isActive && (
                <motion.span
                    layoutId="sidebar-active-indicator"
                    className="absolute inset-y-1 start-0 w-[3px] rounded-full bg-sidebar-primary"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
            )}

            <Icon
                className={cn(
                    "size-[18px] shrink-0 transition-colors",
                    isActive
                        ? "text-sidebar-primary"
                        : "text-sidebar-foreground/50 group-hover:text-sidebar-accent-foreground"
                )}
            />

            {!isCollapsed && (
                <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.15 }}
                    className="truncate"
                >
                    {item.labelHe}
                </motion.span>
            )}
        </Link>
    )
}
