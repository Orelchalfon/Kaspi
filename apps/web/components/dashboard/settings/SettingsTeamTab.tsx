"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Trash2, UserPlus, Users } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import type { DashboardDictionary } from "@/lib/dashboard-dictionary"

/* ── Types ─────────────────────────────────────────────── */

type Props = { t: DashboardDictionary["settings"]["team"] }

type Role = "admin" | "viewer"

interface TeamMember {
    id: string
    email: string
    role: Role
    initials: string
    joinedAt: string
}

/* ── Seed data ──────────────────────────────────────────── */

const SEED_MEMBERS: TeamMember[] = [
    { id: "1", email: "yael.cohen@kaspi.app", role: "admin", initials: "YC", joinedAt: "2024-01-15" },
    { id: "2", email: "moshe.levi@kaspi.app", role: "viewer", initials: "ML", joinedAt: "2024-03-02" },
    { id: "3", email: "dana.mizrahi@kaspi.app", role: "viewer", initials: "DM", joinedAt: "2024-06-18" },
]

/* ── Schema ─────────────────────────────────────────────── */

const inviteSchema = z.object({
    email: z.string().email("כתובת אימייל אינה תקינה"),
    role: z.enum(["admin", "viewer"]),
})

type InviteValues = z.infer<typeof inviteSchema>

/* ── Helpers ────────────────────────────────────────────── */

function avatarColor(initials: string) {
    const colors = [
        "bg-violet-500", "bg-blue-500", "bg-emerald-500",
        "bg-amber-500", "bg-rose-500", "bg-cyan-500",
    ]
    const idx = (initials.charCodeAt(0) + initials.charCodeAt(1)) % colors.length
    return colors[idx]
}

/* ── Component ──────────────────────────────────────────── */

export function SettingsTeamTab({ t }: Props) {
    const [members, setMembers] = useState<TeamMember[]>(SEED_MEMBERS)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<InviteValues>({
        resolver: zodResolver(inviteSchema),
        defaultValues: { role: "viewer" },
    })

    function onInvite(data: InviteValues) {
        const localPart = data.email.split("@")[0] || ""
        const parts = localPart.split(".")
        const initials = parts
            .slice(0, 2)
            .map((p: string) => p[0]?.toUpperCase() ?? "")
            .join("")
        const newMember: TeamMember = {
            id: crypto.randomUUID(),
            email: data.email,
            role: data.role,
            initials: initials || data.email[0]!.toUpperCase(),
            joinedAt: new Date().toISOString().slice(0, 10),
        }
        setMembers((prev) => [newMember, ...prev])
        reset()
    }

    function removeMember(id: string) {
        setMembers((prev) => prev.filter((m) => m.id !== id))
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold text-foreground">{t.sectionTitle}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    {members.length} {t.sectionTitle.toLowerCase()}
                </p>
            </div>

            {/* Invite form Card */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm mb-8 relative overflow-hidden group">
                {/* Subtle gradient accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:bg-primary/10 transition-colors" />
                
                <div className="mb-5">
                    <h3 className="text-sm font-semibold text-foreground">הוספת חבר צוות</h3>
                </div>
                <form
                    onSubmit={handleSubmit(onInvite)}
                    noValidate
                    className="flex flex-col sm:flex-row items-start gap-3 w-full"
                >
                    <div className="flex-1 space-y-1.5 w-full">
                        <Label htmlFor="inviteEmail">{t.inviteEmail}</Label>
                        <Input
                            id="inviteEmail"
                            type="email"
                            placeholder={t.inviteEmailPlaceholder}
                            {...register("email")}
                            className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                        />
                        {errors.email && (
                            <p className="text-xs text-destructive">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-1.5 w-full sm:w-40 shrink-0">
                        <Label htmlFor="inviteRole">{t.role}</Label>
                        <select
                            id="inviteRole"
                            {...register("role")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-muted/30 transition-colors"
                        >
                            <option value="admin">{t.roles.admin}</option>
                            <option value="viewer">{t.roles.viewer}</option>
                        </select>
                    </div>

                    <Button type="submit" className="sm:self-end shrink-0 gap-1.5 w-full sm:w-auto mt-2 sm:mt-0 shadow-sm">
                        <UserPlus className="w-4 h-4" />
                        {t.invite}
                    </Button>
                </form>
            </div>

                    {/* Member grid */}
            {members.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 py-20 rounded-xl border border-dashed border-border text-center bg-card/30">
                    <div className="p-4 bg-muted/50 rounded-full">
                        <Users className="w-8 h-8 text-muted-foreground/70" />
                    </div>
                    <div className="space-y-1">
                        <p className="font-semibold text-foreground">{t.empty.title}</p>
                        <p className="text-sm text-muted-foreground">{t.empty.description}</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {members.map((member) => (
                        <div
                            key={member.id}
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-card rounded-xl border border-border shadow-sm hover:border-primary/20 hover:shadow-md transition-all group"
                        >
                            <div className="flex items-center gap-4 flex-1 min-w-0 w-full">
                                {/* Avatar */}
                                <span
                                    className={`flex items-center justify-center w-10 h-10 rounded-full text-xs font-bold text-white shrink-0 ${avatarColor(member.initials)} shadow-sm`}
                                >
                                    {member.initials}
                                </span>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-foreground truncate" title={member.email}>{member.email}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">הצטרף. ב-{member.joinedAt}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end mt-2 sm:mt-0">
                                {/* Role badge */}
                                <span
                                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold shrink-0 border uppercase tracking-wider ${
                                        member.role === "admin"
                                            ? "bg-violet-50/50 text-violet-700 border-violet-200 dark:bg-violet-900/20 dark:text-violet-300 dark:border-violet-800"
                                            : "bg-zinc-50/50 text-zinc-600 border-zinc-200 dark:bg-zinc-800/50 dark:text-zinc-400 dark:border-zinc-700"
                                    }`}
                                >
                                    {member.role === "admin" ? t.roles.admin : t.roles.viewer}
                                </span>

                                {/* Remove */}
                                <button
                                    type="button"
                                    onClick={() => removeMember(member.id)}
                                    aria-label={t.remove}
                                    className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-100 sm:opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
                                    title={t.remove}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
