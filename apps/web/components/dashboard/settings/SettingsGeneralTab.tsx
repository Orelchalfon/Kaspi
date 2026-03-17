"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Building2, CheckCircle2, Globe } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import type { DashboardDictionary } from "@/lib/dashboard-dictionary"

/* ── Types ─────────────────────────────────────────────── */

type Props = { t: DashboardDictionary["settings"]["general"] }

const TIMEZONES = [
    "Asia/Jerusalem",
    "Europe/London",
    "America/New_York",
    "America/Los_Angeles",
    "Asia/Tokyo",
]

/* ── Schema ─────────────────────────────────────────────── */

const generalSchema = z.object({
    businessName: z.string().min(2, "שם העסק חייב להכיל לפחות 2 תווים"),
    email: z.string().email("כתובת אימייל אינה תקינה"),
    timezone: z.string().min(1, "יש לבחור אזור זמן"),
    language: z.enum(["he", "en"]),
})

type GeneralFormValues = z.infer<typeof generalSchema>

/* ── Component ──────────────────────────────────────────── */

export function SettingsGeneralTab({ t }: Props) {
    const [saved, setSaved] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<GeneralFormValues>({
        resolver: zodResolver(generalSchema),
        defaultValues: {
            businessName: "Kaspi Finance",
            email: "admin@kaspi.app",
            timezone: "Asia/Jerusalem",
            language: "he",
        },
    })

    function onSubmit(_data: GeneralFormValues) {
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Business Details Card (Spans 2 columns on lg) */}
                <div className="md:col-span-2 rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-primary/10 rounded-lg text-primary">
                            <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-foreground">{t.sectionTitle}</h2>
                            <p className="text-sm text-muted-foreground">{t.businessName} &amp; {t.email}</p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="businessName">{t.businessName}</Label>
                            <Input
                                id="businessName"
                                placeholder={t.businessNamePlaceholder}
                                {...register("businessName")}
                                className={errors.businessName ? "border-destructive focus-visible:ring-destructive" : ""}
                            />
                            {errors.businessName && (
                                <p className="text-xs text-destructive">{errors.businessName.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contactEmail">{t.email}</Label>
                            <Input
                                id="contactEmail"
                                type="email"
                                placeholder={t.emailPlaceholder}
                                {...register("email")}
                                className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                            />
                            {errors.email && (
                                <p className="text-xs text-destructive">{errors.email.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Preferences Card (1 column) */}
                <div className="md:col-span-1 rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
                            <Globe className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-foreground">העדפות מערכת</h2>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="timezone">{t.timezone}</Label>
                            <select
                                id="timezone"
                                {...register("timezone")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                {TIMEZONES.map((tz) => (
                                    <option key={tz} value={tz}>
                                        {tz}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="language">{t.language}</Label>
                            <select
                                id="language"
                                {...register("language")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                <option value="he">עברית</option>
                                <option value="en">English</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-end gap-4 p-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
                {saved && (
                    <span className="flex items-center gap-1.5 text-sm text-emerald-500 font-medium animate-in fade-in slide-in-from-left-2 duration-300">
                        <CheckCircle2 className="w-4 h-4" />
                        {t.savedMessage}
                    </span>
                )}
                <Button type="submit" size="lg" className="min-w-[120px] shadow-sm">
                    {t.save}
                </Button>
            </div>
        </form>
    )
}
