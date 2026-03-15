export type PlanTier = "free" | "standard" | "premium"

export type SubscriptionStatus = "trialing" | "active" | "past_due" | "canceled"

export type TaskStatus = "pending" | "approved" | "completed"

export type TransactionType = "reward" | "withdrawal" | "bonus"

export type EducationType = "lesson" | "quiz" | "challenge"

export interface Family {
  id: string
  name: string
  parentEmail: string
  plan: PlanTier
  joinedAt: string
  status: "active" | "trial" | "canceled"
  childIds: string[]
}

export interface Child {
  id: string
  familyId: string
  fullName: string
  avatarColor: string
  age: number
}

export interface Task {
  id: string
  familyId: string
  childId: string
  title: string
  rewardShekels: number
  dueDate: string
  status: TaskStatus
  category: "chores" | "school" | "habits" | "education"
}

export interface Transaction {
  id: string
  familyId: string
  childId: string
  type: TransactionType
  amount: number
  currency: "ILS"
  createdAt: string
  description: string
  taskId?: string
}

export interface EducationContent {
  id: string
  title: string
  subject: "saving" | "budgeting" | "spending" | "investing"
  type: EducationType
  rewardPoints: number
  difficulty: "beginner" | "intermediate" | "advanced"
  estimatedMinutes: number
}

export interface Subscription {
  id: string
  familyId: string
  plan: PlanTier
  status: SubscriptionStatus
  billingDate: string
  amount: number
  currency: "ILS"
  startedAt: string
  canceledAt?: string
}

export interface AnalyticsPoint {
  month: string
  monthlyMrr: number
  monthlySignups: number
}

export function getFamilyById(id: string): Family | undefined {
  return families.find((family) => family.id === id)
}

export function getChildrenForFamily(familyId: string): Child[] {
  return children.filter((child) => child.familyId === familyId)
}

export function getTasksForFamily(familyId: string): Task[] {
  return tasks.filter((task) => task.familyId === familyId)
}

export function getTasksForChild(childId: string, status?: TaskStatus): Task[] {
  return tasks.filter(
    (task) => task.childId === childId && (status ? task.status === status : true),
  )
}

export function getTransactionsForFamily(familyId: string): Transaction[] {
  return transactions.filter((tx) => tx.familyId === familyId)
}

export function getSubscriptionForFamily(familyId: string): Subscription | undefined {
  return subscriptions.find((sub) => sub.familyId === familyId)
}

export function getOverviewStats() {
  const totalFamilies = families.length
  const activeChildren = children.length

  const now = new Date("2026-03-15")
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - 7)

  const tasksThisWeek = tasks.filter((task) => {
    const due = new Date(task.dueDate)
    return due >= startOfWeek && due <= now
  }).length

  const currentMonth = "2026-03"
  const currentAnalytics = analytics.find((point) => point.month === currentMonth)
  const mrr = currentAnalytics?.monthlyMrr ?? 0

  return {
    totalFamilies,
    activeChildren,
    tasksThisWeek,
    mrr,
  }
}

export interface RecentActivityItem {
  id: string
  familyName: string
  childName: string
  type: TransactionType
  amount: number
  createdAt: string
  description: string
}

export function getRecentActivity(limit = 10): RecentActivityItem[] {
  const items: RecentActivityItem[] = transactions
    .map((tx) => {
      const family = getFamilyById(tx.familyId)
      const child = children.find((c) => c.id === tx.childId)

      return {
        id: tx.id,
        familyName: family?.name ?? "",
        childName: child?.fullName ?? "",
        type: tx.type,
        amount: tx.amount,
        createdAt: tx.createdAt,
        description: tx.description,
      }
    })
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))

  return items.slice(0, limit)
}

export interface SubscriptionsSummary {
  totalMrr: number
  activeSubs: number
  churnedThisMonth: number
}

export function getSubscriptionsSummary(currentMonth = "2026-03"): SubscriptionsSummary {
  const activeSubs = subscriptions.filter((sub) => sub.status === "active")
  const totalMrr = activeSubs.reduce((sum, sub) => sum + sub.amount, 0)

  const churnedThisMonth = subscriptions.filter((sub) => {
    if (!sub.canceledAt) return false
    return sub.canceledAt.startsWith(currentMonth)
  }).length

  return {
    totalMrr,
    activeSubs: activeSubs.length,
    churnedThisMonth,
  }
}

export function getEducationBySubject(
  subject?: EducationContent["subject"],
): EducationContent[] {
  if (!subject) return educationContent
  return educationContent.filter((content) => content.subject === subject)
}

export interface ChildEducationProgress {
  childId: string
  completedIds: string[]
  completionRate: number
}

export function getChildEducationProgress(): ChildEducationProgress[] {
  const totalContent = educationContent.length || 1

  return children.map((child, index) => {
    const completedCount = Math.max(1, Math.min(totalContent, index + 1))
    const completedIds = educationContent.slice(0, completedCount).map((c) => c.id)

    return {
      childId: child.id,
      completedIds,
      completionRate: Math.round((completedCount / totalContent) * 100),
    }
  })
}


export const families: Family[] = [
  {
    id: "fam_levi",
    name: "משפחת לוי",
    parentEmail: "parent@levi.co.il",
    plan: "premium",
    joinedAt: "2025-10-01",
    status: "active",
    childIds: ["child_noam", "child_aya"],
  },
  {
    id: "fam_cohen",
    name: "משפחת כהן",
    parentEmail: "cohen.parent@example.com",
    plan: "standard",
    joinedAt: "2025-09-15",
    status: "active",
    childIds: ["child_yuval"],
  },
  {
    id: "fam_dror",
    name: "משפחת דרור",
    parentEmail: "dror.family@example.com",
    plan: "free",
    joinedAt: "2025-08-20",
    status: "trial",
    childIds: ["child_tamir"],
  },
  {
    id: "fam_mizrahi",
    name: "משפחת מזרחי",
    parentEmail: "mizrahi.parent@example.com",
    plan: "standard",
    joinedAt: "2025-06-10",
    status: "canceled",
    childIds: ["child_shira"],
  },
]

export const children: Child[] = [
  {
    id: "child_noam",
    familyId: "fam_levi",
    fullName: "נועם לוי",
    avatarColor: "#0F172A",
    age: 11,
  },
  {
    id: "child_aya",
    familyId: "fam_levi",
    fullName: "איה לוי",
    avatarColor: "#F59E0B",
    age: 8,
  },
  {
    id: "child_yuval",
    familyId: "fam_cohen",
    fullName: "יובל כהן",
    avatarColor: "#22C55E",
    age: 13,
  },
  {
    id: "child_tamir",
    familyId: "fam_dror",
    fullName: "תמיר דרור",
    avatarColor: "#6366F1",
    age: 10,
  },
  {
    id: "child_shira",
    familyId: "fam_mizrahi",
    fullName: "שירה מזרחי",
    avatarColor: "#EC4899",
    age: 9,
  },
]

export const tasks: Task[] = [
  {
    id: "task_room_noam",
    familyId: "fam_levi",
    childId: "child_noam",
    title: "סידור החדר",
    rewardShekels: 10,
    dueDate: "2026-03-17",
    status: "pending",
    category: "chores",
  },
  {
    id: "task_dishes_aya",
    familyId: "fam_levi",
    childId: "child_aya",
    title: "עזרה בשטיפת כלים",
    rewardShekels: 8,
    dueDate: "2026-03-16",
    status: "approved",
    category: "chores",
  },
  {
    id: "task_math_yuval",
    familyId: "fam_cohen",
    childId: "child_yuval",
    title: "תרגול מתמטיקה ל-30 דקות",
    rewardShekels: 15,
    dueDate: "2026-03-18",
    status: "pending",
    category: "school",
  },
  {
    id: "task_savings_tamir",
    familyId: "fam_dror",
    childId: "child_tamir",
    title: "בדיקת יעד חיסכון שבועי",
    rewardShekels: 12,
    dueDate: "2026-03-19",
    status: "completed",
    category: "habits",
  },
  {
    id: "task_reading_shira",
    familyId: "fam_mizrahi",
    childId: "child_shira",
    title: "קריאת פרק בספר על כסף חכם",
    rewardShekels: 9,
    dueDate: "2026-03-20",
    status: "approved",
    category: "education",
  },
]

export const transactions: Transaction[] = [
  {
    id: "tx1",
    familyId: "fam_levi",
    childId: "child_noam",
    type: "reward",
    amount: 10,
    currency: "ILS",
    createdAt: "2026-03-10T09:00:00Z",
    description: "סיום משימת סידור חדר",
    taskId: "task_room_noam",
  },
  {
    id: "tx2",
    familyId: "fam_levi",
    childId: "child_aya",
    type: "reward",
    amount: 8,
    currency: "ILS",
    createdAt: "2026-03-11T16:30:00Z",
    description: "עזרה בשטיפת כלים",
    taskId: "task_dishes_aya",
  },
  {
    id: "tx3",
    familyId: "fam_cohen",
    childId: "child_yuval",
    type: "withdrawal",
    amount: 20,
    currency: "ILS",
    createdAt: "2026-03-12T14:15:00Z",
    description: "קניית משחק דיגיטלי",
  },
  {
    id: "tx4",
    familyId: "fam_dror",
    childId: "child_tamir",
    type: "bonus",
    amount: 15,
    currency: "ILS",
    createdAt: "2026-03-09T18:45:00Z",
    description: "עמידה ביעד חיסכון חודשי",
    taskId: "task_savings_tamir",
  },
  {
    id: "tx5",
    familyId: "fam_mizrahi",
    childId: "child_shira",
    type: "reward",
    amount: 9,
    currency: "ILS",
    createdAt: "2026-03-08T10:20:00Z",
    description: "קריאת ספר על כסף חכם",
    taskId: "task_reading_shira",
  },
]

export const educationContent: EducationContent[] = [
  {
    id: "edu_saving_basics",
    title: "יסודות החיסכון",
    subject: "saving",
    type: "lesson",
    rewardPoints: 50,
    difficulty: "beginner",
    estimatedMinutes: 15,
  },
  {
    id: "edu_budget_quiz",
    title: "חידון תקציב חכם",
    subject: "budgeting",
    type: "quiz",
    rewardPoints: 80,
    difficulty: "intermediate",
    estimatedMinutes: 20,
  },
  {
    id: "edu_spending_challenge",
    title: "אתגר קניות חכמות",
    subject: "spending",
    type: "challenge",
    rewardPoints: 100,
    difficulty: "intermediate",
    estimatedMinutes: 25,
  },
  {
    id: "edu_investing_intro",
    title: "היכרות עם השקעות",
    subject: "investing",
    type: "lesson",
    rewardPoints: 120,
    difficulty: "advanced",
    estimatedMinutes: 30,
  },
]

export const subscriptions: Subscription[] = [
  {
    id: "sub_levi",
    familyId: "fam_levi",
    plan: "premium",
    status: "active",
    billingDate: "2026-03-01",
    amount: 69,
    currency: "ILS",
    startedAt: "2025-10-01",
  },
  {
    id: "sub_cohen",
    familyId: "fam_cohen",
    plan: "standard",
    status: "active",
    billingDate: "2026-03-05",
    amount: 49,
    currency: "ILS",
    startedAt: "2025-09-15",
  },
  {
    id: "sub_dror",
    familyId: "fam_dror",
    plan: "free",
    status: "trialing",
    billingDate: "2026-03-10",
    amount: 0,
    currency: "ILS",
    startedAt: "2025-08-20",
  },
  {
    id: "sub_mizrahi",
    familyId: "fam_mizrahi",
    plan: "standard",
    status: "canceled",
    billingDate: "2026-02-20",
    amount: 49,
    currency: "ILS",
    startedAt: "2025-06-10",
    canceledAt: "2026-02-25",
  },
]

export const analytics: AnalyticsPoint[] = [
  { month: "2025-10", monthlyMrr: 69, monthlySignups: 10 },
  { month: "2025-11", monthlyMrr: 118, monthlySignups: 18 },
  { month: "2025-12", monthlyMrr: 167, monthlySignups: 24 },
  { month: "2026-01", monthlyMrr: 216, monthlySignups: 30 },
  { month: "2026-02", monthlyMrr: 216, monthlySignups: 22 },
  { month: "2026-03", monthlyMrr: 216, monthlySignups: 16 },
]


