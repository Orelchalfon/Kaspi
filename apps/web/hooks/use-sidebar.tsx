"use client"

import { usePathname } from "next/navigation"
import {
createContext,
useCallback,
useContext,
useEffect,
useState,
type ReactNode,
} from "react"

/* ── Types ──────────────────────────────────────────── */

type SidebarContextValue = {
    /** Desktop collapse state */
    isCollapsed: boolean
    toggleSidebar: () => void
    setCollapsed: (v: boolean) => void
    /** Mobile drawer open state */
    isMobileOpen: boolean
    toggleMobile: () => void
    setMobileOpen: (v: boolean) => void
}

/* ── Context ────────────────────────────────────────── */

const SidebarContext = createContext<SidebarContextValue | null>(null)

/* ── Provider ───────────────────────────────────────── */

type SidebarProviderProps = {
    children: ReactNode
}

function SidebarProvider({ children }: SidebarProviderProps) {
    const pathname = usePathname()

    const [isCollapsed, setCollapsed] = useState(false)
    const [isMobileOpen, setMobileOpen] = useState(false)

    const toggleSidebar = useCallback(() => setCollapsed((p) => !p), [])
    const toggleMobile = useCallback(() => setMobileOpen((p) => !p), [])

    /* Auto-collapse on medium screens */
    useEffect(() => {
        const mql = window.matchMedia("(max-width: 1023px)")

        function handleChange(e: MediaQueryListEvent | MediaQueryList) {
            setCollapsed(e.matches)
        }

        handleChange(mql) // initial check
        mql.addEventListener("change", handleChange)
        return () => mql.removeEventListener("change", handleChange)
    }, [])

    /* Close mobile drawer on route change */
    useEffect(() => {
        setMobileOpen(false)
    }, [pathname])

    return (
        <SidebarContext.Provider
            value={{
                isCollapsed,
                toggleSidebar,
                setCollapsed,
                isMobileOpen,
                toggleMobile,
                setMobileOpen,
            }}
        >
            {children}
        </SidebarContext.Provider>
    )
}

/* ── Hook ───────────────────────────────────────────── */

function useSidebar() {
    const ctx = useContext(SidebarContext)
    if (!ctx) {
        throw new Error("useSidebar must be used within <SidebarProvider>")
    }
    return ctx
}

export { SidebarProvider, useSidebar }

