"use client"

import { useSidebar } from "@/hooks/use-sidebar"
import { Button } from "@workspace/ui/components/button"
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuLabel,
DropdownMenuSeparator,
DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { cn } from "@workspace/ui/lib/utils"
import { Bell, LogOut, Menu, Search, Settings, User } from "lucide-react"

/* ── Component ──────────────────────────────────────── */

export function Header() {
    const { toggleMobile, isCollapsed } = useSidebar()

    return (
        <header
            className={cn(
                "sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl transition-all duration-300 sm:px-6",
            )}
        >
            {/* ── Mobile menu trigger ──────────────────────── */}
            <Button
                variant="ghost"
                size="icon-sm"
                className="lg:hidden"
                onClick={toggleMobile}
                aria-label="פתח תפריט ניווט"
            >
                <Menu className="size-5" />
            </Button>

            {/* ── Search ──────────────────────────────────── */}
            <div className="relative flex-1 max-w-md">
                <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                    type="search"
                    placeholder="חיפוש..."
                    className={cn(
                        "h-9 w-full rounded-lg border border-input bg-background/60 ps-9 pe-3 text-sm text-foreground placeholder:text-muted-foreground",
                        "outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
                    )}
                />
            </div>

            {/* ── Spacer ──────────────────────────────────── */}
            <div className="flex-1" />

            {/* ── Actions ─────────────────────────────────── */}
            <div className="flex items-center gap-1.5">
                {/* Notifications */}
                <Button
                    variant="ghost"
                    size="icon-sm"
                    className="relative"
                    aria-label="התראות"
                >
                    <Bell className="size-[18px]" />
                    {/* Unread badge */}
                    <span className="absolute end-1.5 top-1.5 size-2 rounded-full bg-destructive ring-2 ring-background" />
                </Button>

                {/* User dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            type="button"
                            className={cn(
                                "flex size-8 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary ring-1 ring-primary/20 transition-colors",
                                "hover:bg-primary/25 focus-visible:ring-2 focus-visible:ring-primary/50",
                                "cursor-pointer outline-none"
                            )}
                            aria-label="תפריט משתמש"
                        >
                            OC
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col gap-0.5">
                                <p className="text-sm font-medium">אורל כהן</p>
                                <p className="text-xs text-muted-foreground">
                                    orel@kaspi.co.il
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="size-4" />
                            <span>פרופיל</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="size-4" />
                            <span>הגדרות</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                            <LogOut className="size-4" />
                            <span>התנתקות</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
