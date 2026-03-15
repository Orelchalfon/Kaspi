import { LayoutDashboard } from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
                <LayoutDashboard className="size-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">סקירה כללית</h1>
            <p className="max-w-sm text-sm text-muted-foreground">
                דף זה יכיל בקרוב סטטיסטיקות, גרפים ופעילות אחרונה.
            </p>
        </div>
    )
}
