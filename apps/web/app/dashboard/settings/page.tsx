"use client"

import { SettingsBillingTab } from "@/components/dashboard/settings/SettingsBillingTab"
import { SettingsGeneralTab } from "@/components/dashboard/settings/SettingsGeneralTab"
import { SettingsNotificationsTab } from "@/components/dashboard/settings/SettingsNotificationsTab"
import { SettingsSkeleton } from "@/components/dashboard/settings/SettingsSkeleton"
import { SettingsTeamTab } from "@/components/dashboard/settings/SettingsTeamTab"
import { getDashboardDictionary } from "@/lib/dashboard-dictionary"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function SettingsPage() {
    const dict = getDashboardDictionary()
    const t = dict.settings

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 600)
        return () => clearTimeout(timer)
    }, [])

    if (isLoading) {
        return <SettingsSkeleton />
    }

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
            >
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                    {t.pageTitle}
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
            >
                <Tabs defaultValue="general" className="w-full">
                    <TabsList className="mb-8 h-auto p-1.5 bg-muted/40 w-full sm:w-auto overflow-x-auto justify-start flex-nowrap hide-scrollbar rounded-xl border border-border/50">
                        <TabsTrigger value="general" className="px-5 py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all" data-testid="tab-general">
                            {t.tabs.general}
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="px-5 py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all" data-testid="tab-notifications">
                            {t.tabs.notifications}
                        </TabsTrigger>
                        <TabsTrigger value="team" className="px-5 py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all" data-testid="tab-team">
                            {t.tabs.team}
                        </TabsTrigger>
                        <TabsTrigger value="billing" className="px-5 py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all" data-testid="tab-billing">
                            {t.tabs.billing}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="general" className="mt-0 outline-none">
                        <SettingsGeneralTab t={t.general} />
                    </TabsContent>

                    <TabsContent value="notifications" className="mt-0 outline-none">
                        <SettingsNotificationsTab t={t.notifications} />
                    </TabsContent>

                    <TabsContent value="team" className="mt-0 outline-none">
                        <SettingsTeamTab t={t.team} />
                    </TabsContent>

                    <TabsContent value="billing" className="mt-0 outline-none">
                        <SettingsBillingTab t={t.billing} />
                    </TabsContent>
                </Tabs>
            </motion.div>
        </div>
    )
}
