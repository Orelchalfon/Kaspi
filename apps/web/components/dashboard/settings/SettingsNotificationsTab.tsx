"use client"

import { Button } from "@workspace/ui/components/button"
import { Switch } from "@workspace/ui/components/switch"
import { Bell, CheckCircle2, CreditCard, Mail, UserPlus } from "lucide-react"
import { useState } from "react"
import type { DashboardDictionary } from "@/lib/dashboard-dictionary"

/* ── Types ─────────────────────────────────────────────── */

type Props = { t: DashboardDictionary["settings"]["notifications"] }

type TogglesState = {
    newSignup: boolean
    paymentFailed: boolean
    subscriptionCanceled: boolean
    weeklyReport: boolean
}

/* ── Component ──────────────────────────────────────────── */

export function SettingsNotificationsTab({ t }: Props) {
    const [toggles, setToggles] = useState<TogglesState>({
        newSignup: true,
        paymentFailed: true,
        subscriptionCanceled: false,
        weeklyReport: true,
    })
    const [saved, setSaved] = useState(false)

    function toggle(key: keyof TogglesState) {
        setToggles((prev) => ({ ...prev, [key]: !prev[key] }))
    }

    function handleSave() {
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
    }

    const cards: { key: keyof TogglesState; label: string; desc: string; icon: React.ReactNode; colorClass: string }[] = [
        { 
            key: "newSignup", 
            label: t.newSignup, 
            desc: t.newSignupDesc, 
            icon: <UserPlus className="w-5 h-5" />,
            colorClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        },
        { 
            key: "paymentFailed", 
            label: t.paymentFailed, 
            desc: t.paymentFailedDesc, 
            icon: <CreditCard className="w-5 h-5" />,
            colorClass: "bg-destructive/10 text-destructive"
        },
        { 
            key: "subscriptionCanceled", 
            label: t.subscriptionCanceled, 
            desc: t.subscriptionCanceledDesc, 
            icon: <Bell className="w-5 h-5" />,
            colorClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400"
        },
        { 
            key: "weeklyReport", 
            label: t.weeklyReport, 
            desc: t.weeklyReportDesc, 
            icon: <Mail className="w-5 h-5" />,
            colorClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
        },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold text-foreground">{t.sectionTitle}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    {t.newSignupDesc}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cards.map(({ key, label, desc, icon, colorClass }) => (
                    <div
                        key={key}
                        className="flex flex-col justify-between gap-4 p-5 rounded-xl border border-border bg-card shadow-sm hover:border-primary/20 hover:shadow-md transition-all group"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className={`p-2.5 rounded-lg shrink-0 ${colorClass}`}>
                                {icon}
                            </div>
                            <Switch
                                id={`toggle-${key}`}
                                checked={toggles[key]}
                                onCheckedChange={() => toggle(key)}
                                className="data-[state=checked]:bg-primary"
                            />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-foreground">{label}</p>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-end gap-4 p-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm mt-8">
                {saved && (
                    <span className="flex items-center gap-1.5 text-sm text-emerald-500 font-medium animate-in fade-in slide-in-from-left-2 duration-300">
                        <CheckCircle2 className="w-4 h-4" />
                        {t.savedMessage}
                    </span>
                )}
                <Button onClick={handleSave} size="lg" className="min-w-[120px] shadow-sm">
                    {t.save}
                </Button>
            </div>
        </div>
    )
}
