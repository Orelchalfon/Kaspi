import * as React from "react"
import { motion } from "framer-motion"
import type { PlanTier, SubscriptionStatus, TaskStatus } from "@workspace/web/lib/seed"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"

// Shared layout tokens
const statCardBase =
  "rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm shadow-sm"

const sectionHeaderBase = "flex items-start justify-between gap-3 sm:gap-4"

// StatCard

export type StatTrend = "up" | "down" | "neutral"

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string | number
  change?: {
    value: string
    trend: StatTrend
  }
  icon?: React.ReactNode
  hint?: string
  variant?: "default" | "accent" | "soft"
}

export function StatCard({
  label,
  value,
  change,
  icon,
  hint,
  className,
  variant = "default",
  ...props
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      className={cn(statCardBase, className)}
    >
      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader className="flex flex-row items-start justify-between gap-3">
          <div className="flex flex-col items-start gap-1 text-right rtl:text-right">
            <CardDescription className="text-xs sm:text-sm">
              {label}
            </CardDescription>
            <CardTitle className="text-2xl font-semibold sm:text-3xl">
              {value}
            </CardTitle>
          </div>
          {icon && (
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {icon}
            </div>
          )}
        </CardHeader>
        <CardFooter className="flex items-center justify-between gap-3 text-xs sm:text-sm">
          {change && (
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.7rem] font-medium",
                change.trend === "up" && "bg-emerald-500/10 text-emerald-500",
                change.trend === "down" && "bg-red-500/10 text-red-500",
                change.trend === "neutral" && "bg-muted text-muted-foreground",
              )}
            >
              <span aria-hidden="true">
                {change.trend === "up" && "↑"}
                {change.trend === "down" && "↓"}
                {change.trend === "neutral" && "•"}
              </span>
              {change.value}
            </span>
          )}
          {hint && (
            <span className="ms-auto text-[0.7rem] text-muted-foreground">
              {hint}
            </span>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

// ChildAvatar

export type ChildAvatarSize = "sm" | "md" | "lg"

export interface ChildAvatarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  color?: string
  size?: ChildAvatarSize
  status?: "online" | "offline"
}

export function ChildAvatar({
  name,
  color,
  size = "md",
  status,
  className,
  ...props
}: ChildAvatarProps) {
  const initials = React.useMemo(
    () =>
      name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join(""),
    [name],
  )

  const sizeClasses =
    size === "sm"
      ? "size-8 text-xs"
      : size === "lg"
        ? "size-12 text-base"
        : "size-10 text-sm"

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      aria-label={status ? `${name} – ${status}` : name}
      {...props}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full border border-border/60 bg-card text-foreground shadow-xs",
          sizeClasses,
        )}
        style={color ? { backgroundColor: color } : undefined}
      >
        <span className="font-medium">{initials}</span>
      </div>
      {status && (
        <span
          className={cn(
            "absolute -bottom-0.5 -start-0.5 size-2.5 rounded-full border border-background",
            status === "online" ? "bg-emerald-500" : "bg-muted-foreground",
          )}
        />
      )}
    </div>
  )
}

// PlanBadge

export interface PlanBadgeProps extends React.ComponentProps<"span"> {
  plan: PlanTier
  compact?: boolean
}

export function PlanBadge({ plan, compact, className, ...props }: PlanBadgeProps) {
  const variant =
    plan === "premium" ? "default" : plan === "standard" ? "secondary" : "outline"

  const label =
    plan === "premium" ? "Premium" : plan === "standard" ? "Standard" : "Free"

  return (
    <Badge
      variant={variant}
      className={cn(
        compact && "px-1.5 py-0.5 text-[0.65rem]",
        "rtl:[&>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {label}
    </Badge>
  )
}

// StatusChip

export type StatusChipType = "task" | "subscription"

export interface StatusChipProps extends React.ComponentProps<"span"> {
  type: StatusChipType
  status: TaskStatus | SubscriptionStatus
}

export function StatusChip({ type, status, className, ...props }: StatusChipProps) {
  const { label, colorClass } = getStatusMeta(type, status)

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.7rem] font-medium",
        colorClass,
        className,
      )}
      {...props}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {label}
    </span>
  )
}

function getStatusMeta(
  type: StatusChipType,
  status: TaskStatus | SubscriptionStatus,
) {
  if (type === "task") {
    const s = status as TaskStatus
    if (s === "pending") {
      return { label: "ממתין לאישור", colorClass: "bg-amber-500/10 text-amber-500" }
    }
    if (s === "approved") {
      return { label: "מאושר", colorClass: "bg-emerald-500/10 text-emerald-500" }
    }
    return { label: "הושלם", colorClass: "bg-sky-500/10 text-sky-500" }
  }

  const s = status as SubscriptionStatus
  if (s === "active") {
    return { label: "פעיל", colorClass: "bg-emerald-500/10 text-emerald-500" }
  }
  if (s === "trialing") {
    return { label: "ניסיון", colorClass: "bg-amber-500/10 text-amber-500" }
  }
  if (s === "past_due") {
    return { label: "בעיית חיוב", colorClass: "bg-red-500/10 text-red-500" }
  }
  return { label: "בוטל", colorClass: "bg-slate-500/10 text-slate-500" }
}

// TaskCard

export interface TaskCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  childName: string
  rewardShekels: number
  dueDate: string | Date
  status: TaskStatus
  avatarColor?: string
  onApprove?: () => void
  onReject?: () => void
}

export function TaskCard({
  title,
  childName,
  rewardShekels,
  dueDate,
  status,
  avatarColor,
  onApprove,
  onReject,
  className,
  ...props
}: TaskCardProps) {
  const formattedDate =
    typeof dueDate === "string"
      ? new Date(dueDate).toLocaleDateString("he-IL")
      : dueDate.toLocaleDateString("he-IL")

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn("rounded-2xl border border-border/60 bg-card shadow-sm", className)}
      {...props}
    >
      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader className="flex flex-row items-center justify-between gap-3">
          <div className="flex flex-row-reverse items-center gap-3">
            <ChildAvatar name={childName} color={avatarColor} size="sm" />
            <div className="flex flex-col items-start gap-1 text-right">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                {childName}
              </CardDescription>
            </div>
          </div>
          <StatusChip type="task" status={status} />
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex flex-col items-start gap-0.5 text-right">
            <span className="text-muted-foreground">תגמול</span>
            <span className="font-medium">{rewardShekels} ₪</span>
          </div>
          <div className="flex flex-col items-start gap-0.5 text-right">
            <span className="text-muted-foreground">תאריך יעד</span>
            <span className="font-medium">{formattedDate}</span>
          </div>
        </CardContent>
        {(onApprove || onReject) && (
          <CardFooter className="flex items-center justify-end gap-2">
            {onReject && (
              <Button
                variant="ghost"
                size="sm"
                type="button"
                onClick={onReject}
                className="text-xs"
              >
                דחה
              </Button>
            )}
            {onApprove && (
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={onApprove}
                className="text-xs"
              >
                אשר
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </motion.div>
  )
}

// SectionHeader

export interface SectionHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export function SectionHeader({
  title,
  subtitle,
  actions,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div className={cn(sectionHeaderBase, className)} {...props}>
      <div className="flex flex-col items-start gap-1 text-right">
        <h2 className="text-lg font-semibold sm:text-xl">{title}</h2>
        {subtitle && (
          <p className="text-xs text-muted-foreground sm:text-sm">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      )}
    </div>
  )
}

