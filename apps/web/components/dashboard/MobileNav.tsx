"use client"

import { SidebarNavItem } from "@/components/dashboard/SidebarNavItem"
import { useSidebar } from "@/hooks/use-sidebar"
import { dashboardNavItems } from "@/lib/dashboard-nav"
import { cn } from "@workspace/ui/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { getDashboardDictionary } from "@/lib/dashboard-dictionary"

/* ── Helpers ────────────────────────────────────────── */

function useIsRtl() {
    const [isRtl, setIsRtl] = useState(false)
    useEffect(() => {
        setIsRtl(document.documentElement.dir === "rtl")
    }, [])
    return isRtl
}

/* ── Component ──────────────────────────────────────── */

export function MobileNav() {
    const { isMobileOpen, setMobileOpen } = useSidebar()
    const isRtl = useIsRtl()
    const dict = getDashboardDictionary()

    /* In RTL end-0 = left side, so the drawer slides from -100% (visual-left offscreen) */
    const offscreenX = isRtl ? "-100%" : "100%"

    return (
        <AnimatePresence>
            {isMobileOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="mobile-nav-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                        onClick={() => setMobileOpen(false)}
                        aria-hidden="true"
                    />

                    {/* Drawer panel — slides from inline-end */}
                    <motion.div
                        key="mobile-nav-panel"
                        initial={{ x: offscreenX }}
                        animate={{ x: 0 }}
                        exit={{ x: offscreenX }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={cn(
                            "fixed inset-y-0 end-0 z-50 flex w-72 flex-col border-s border-sidebar-border bg-sidebar shadow-2xl lg:hidden"
                        )}
                    >
                        {/* ── Header ──────────────────────────────── */}
                        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
                            <div className="flex items-center gap-3">
                                <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-xs font-bold text-sidebar-primary-foreground">
                                    K
                                </div>
                                <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">
                                    Kaspi
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setMobileOpen(false)}
                                className="flex size-8 items-center justify-center rounded-lg text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer"
                                aria-label={dict.shell.closeMenu}
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        {/* ── Navigation ──────────────────────────── */}
                        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
                            {dashboardNavItems.map((item) => (
                                <SidebarNavItem key={item.id} item={item} />
                            ))}
                        </nav>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
