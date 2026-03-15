"use client"

import { getDashboardDictionary } from "@/lib/dashboard-dictionary"
import type { MonthlyAnalytics } from "@/lib/overview-data"
import { Card } from "@workspace/ui/components/card"
import { useTheme } from "next-themes"
import {
CartesianGrid,
Line,
LineChart,
ResponsiveContainer,
Tooltip,
XAxis,
YAxis,
} from "recharts"

/* ── Props ─────────────────────────────────────────────── */

type AnalyticsChartProps = {
    data: MonthlyAnalytics[]
}

/* ── Custom tooltip ────────────────────────────────────── */

function ChartTooltip({
    active,
    payload,
    label,
}: {
    active?: boolean
    payload?: { name: string; value: number; color: string }[]
    label?: string
}) {
    const dict = getDashboardDictionary()

    if (!active || !payload?.length) return null

    const nameMap: Record<string, string> = {
        families: dict.overview.chart.families,
        children: dict.overview.chart.children,
        tasks: dict.overview.chart.tasks,
    }

    return (
        <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-lg">
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                {label}
            </p>
            {payload.map((entry) => (
                <div
                    key={entry.name}
                    className="flex items-center gap-2 text-sm"
                >
                    <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-muted-foreground">
                        {nameMap[entry.name] ?? entry.name}
                    </span>
                    <span className="ms-auto font-semibold text-foreground">
                        {entry.value.toLocaleString("he-IL")}
                    </span>
                </div>
            ))}
        </div>
    )
}

/* ── Chart colors (CSS variable references) ────────────── */

const CHART_COLORS = {
    families: "oklch(0.606 0.25 292.717)",     // chart-2
    children: "oklch(0.541 0.281 293.009)",     // chart-3
    tasks: "oklch(0.811 0.111 293.571)",        // chart-1
}

/* ── Component ─────────────────────────────────────────── */

export function AnalyticsChart({ data }: AnalyticsChartProps) {
    const dict = getDashboardDictionary()
    const { resolvedTheme } = useTheme()

    const gridColor =
        resolvedTheme === "dark"
            ? "rgba(255,255,255,0.06)"
            : "rgba(0,0,0,0.06)"

    const axisColor =
        resolvedTheme === "dark"
            ? "rgba(255,255,255,0.4)"
            : "rgba(0,0,0,0.4)"

    return (
        <Card className="p-5">
            <h3 className="mb-4 text-base font-semibold text-foreground">
                {dict.overview.chart.title}
            </h3>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={gridColor}
                            vertical={false}
                        />
                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 12, fill: axisColor }}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 12, fill: axisColor }}
                            tickLine={false}
                            axisLine={false}
                            width={45}
                        />
                        <Tooltip
                            content={<ChartTooltip />}
                            cursor={{ stroke: axisColor, strokeWidth: 1 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="families"
                            stroke={CHART_COLORS.families}
                            strokeWidth={2.5}
                            dot={{ r: 4, fill: CHART_COLORS.families }}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="children"
                            stroke={CHART_COLORS.children}
                            strokeWidth={2.5}
                            dot={{ r: 4, fill: CHART_COLORS.children }}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="tasks"
                            stroke={CHART_COLORS.tasks}
                            strokeWidth={2.5}
                            dot={{ r: 4, fill: CHART_COLORS.tasks }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
                {Object.entries(CHART_COLORS).map(([key, color]) => (
                    <div key={key} className="flex items-center gap-1.5">
                        <span
                            className="size-2.5 rounded-full"
                            style={{ backgroundColor: color }}
                        />
                        {dict.overview.chart[key as keyof typeof dict.overview.chart]}
                    </div>
                ))}
            </div>
        </Card>
    )
}
