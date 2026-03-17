"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { CreditCard, Shield, Zap } from "lucide-react"
import { useState } from "react"
import type { DashboardDictionary } from "@/lib/dashboard-dictionary"

/* ── Types ─────────────────────────────────────────────── */

type Props = { t: DashboardDictionary["settings"]["billing"] }

/* ── Component ──────────────────────────────────────────── */

export function SettingsBillingTab({ t }: Props) {
    const [confirmText, setConfirmText] = useState("")
    const [deleted, setDeleted] = useState(false)

    const canConfirm = confirmText === t.deleteConfirmWord

    function handleDeleteConfirm() {
        setDeleted(true)
    }

    if (deleted) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-24 text-center rounded-xl border border-destructive/20 bg-destructive/5">
                <Shield className="w-12 h-12 text-destructive mb-2" />
                <p className="text-xl font-bold text-foreground">החשבון נמחק (מקומית בלבד)</p>
                <p className="text-sm text-muted-foreground">זה היה סימולציה בלבד — אין מחיקה אמיתית.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Section header */}
            <div>
                <h2 className="text-lg font-semibold text-foreground">{t.sectionTitle}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t.currentPlan}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Plan card */}
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between hover:border-primary/20 transition-all relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full blur-2xl -z-10 group-hover:bg-violet-500/10 transition-colors" />
                    
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <div className="p-2.5 rounded-lg bg-violet-100 dark:bg-violet-900/30">
                                <Zap className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                            </div>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase">
                                Active
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mt-4 mb-1">Premium Plan</h3>
                        <p className="text-sm text-muted-foreground">כולל את כל תכונות המערכת</p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border">
                        <Button variant="outline" className="w-full">
                            שדרוג תוכנית
                        </Button>
                    </div>
                </div>

                {/* Payment Method card */}
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between hover:border-primary/20 transition-all">
                    <div>
                        <div className="p-2.5 w-fit rounded-lg bg-zinc-100 dark:bg-zinc-800 mb-6">
                            <CreditCard className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                        </div>
                        <h3 className="text-sm font-semibold text-foreground mb-1">{t.cardOnFile}</h3>
                        <div className="flex items-center gap-3 mt-4 p-3 rounded-lg border border-border bg-muted/40 font-mono text-sm">
                            <div className="w-8 h-5 bg-zinc-200 dark:bg-zinc-700 rounded-sm flex items-center justify-center text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
                                VISA
                            </div>
                            <span>•••• •••• •••• 4242</span>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border">
                        <Button variant="ghost" className="w-full text-foreground">
                            עדכון אמצעי תשלום
                        </Button>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="md:col-span-2 rounded-xl border border-destructive/20 bg-destructive/5 overflow-hidden shadow-sm">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-2.5 rounded-lg bg-destructive/10 shrink-0 mt-1 sm:mt-0">
                                <Shield className="w-5 h-5 text-destructive" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-destructive mb-1">{t.dangerZone}</h3>
                                <p className="text-sm font-medium text-foreground">{t.deleteAccount}</p>
                                <p className="text-xs text-muted-foreground mt-1 max-w-md">{t.deleteWarning}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{t.dangerZoneDesc}</p>
                            </div>
                        </div>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="destructive"
                                    className="shrink-0 shadow-sm w-full sm:w-auto"
                                    onClick={() => setConfirmText("")}
                                >
                                    {t.deleteAccount}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>{t.deleteAccount}</AlertDialogTitle>
                                    <AlertDialogDescription>{t.deleteWarning}</AlertDialogDescription>
                                </AlertDialogHeader>

                                <div className="space-y-2 py-2">
                                    <p className="text-sm text-foreground font-medium">{t.deleteConfirmPrompt}</p>
                                    <Input
                                        id="deleteConfirmInput"
                                        value={confirmText}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmText(e.target.value)}
                                        placeholder={t.deleteConfirmWord}
                                        className="font-mono bg-muted/50 focus-visible:ring-destructive"
                                        autoComplete="off"
                                    />
                                </div>

                                <AlertDialogFooter className="gap-2 sm:gap-0 mt-2">
                                    <AlertDialogCancel onClick={() => setConfirmText("")}>
                                        {t.deleteCancel}
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        disabled={!canConfirm}
                                        onClick={handleDeleteConfirm}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50 transition-all font-semibold"
                                    >
                                        {t.deleteConfirm}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>

            </div>
        </div>
    )
}
