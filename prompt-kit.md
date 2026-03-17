---
description: Kaspi UI-only MVP rules for Cursor
alwaysApply: false
---

# Kaspi — Cursor Rules

You are building **Kaspi**, a UI-only MVP for a family financial literacy platform for the Israeli market.

## Source of truth
When implementing UI, styling, or component usage, prefer these verified references first:- `@tailwindcss-docs`
- `@shadcnui-docs`
- `@nextjs-docs`
- `@framer-motion-docs`

If project code conflicts with a referenced doc, prefer the project codebase unless explicitly asked to refactor.
Do not invent APIs, component props, or utility classes when the referenced docs already define them.

## Product context
Kaspi helps parents and children manage chores, rewards, balances, transactions, financial education, and subscription plans in a family-friendly interface.

This phase is frontend-only and mock-data-only.

## Non-negotiable rules
- Use `pnpm` only. Never use npm or yarn.
- Do not add real API calls.
- Do not add Clerk.
- Do not add Stripe.
- Do not add Supabase client.
- Do not add Prisma, Firebase, or any backend/database integration.
- Do not add server actions that call real services.
- All data must come only from `/lib/seed.ts`.
- All UI interactions must work locally in memory using React state only.
- All forms are local-only and non-persistent.
- Do not replace the required stack with alternatives.
- Do not introduce another component library such as MUI, Chakra, Mantine, Ant Design, or Bootstrap.
- Do not change the design direction unless explicitly asked.

## Required stack
- Next.js 14+ App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Recharts
- next-themes
- react-hook-form
- zod
- next/font

## Package manager
Use `pnpm` exclusively.
All shadcn components must be installed with:
`pnpm dlx shadcn@latest add [component]`

## Architecture rules
- Use App Router.
- Keep all route files in `/app`.
- Keep reusable components in `/components`.
- Organize components into:
  - `/components/shared`
  - `/components/landing`
  - `/components/dashboard`
  - `/components/providers`
  - `/components/charts`
- Use strong TypeScript types everywhere.
- Create reusable UI abstractions rather than duplicating markup.
- Use functional components only.
- Prefer server components by default where possible, but use client components when needed for interactivity, local state, and Framer Motion.
- Use descriptive names.
- Keep pages thin and delegate UI to reusable components.
- Put seeded mock analytics in helpers or seed modules, not inline in pages.

## Design system
- Brand primary: `#0F172A`
- Accent: `#F59E0B`
- Surface: white / dark elevated cards
- Rounded cards: `rounded-2xl`
- Subtle shadows
- Glassmorphism panels where appropriate
- Dark mode by default
- Light mode toggle required
- Font: Heebo via `next/font/google`
- Mobile-first responsive design
- Minimum supported width: 375px

## RTL + localization rules
- Hebrew is the default locale.
- All visible strings must support both Hebrew and English.
- Do not hardcode visible text directly inside page markup unless it comes from a local translation object.
- Create `/lib/i18n.ts` with a simple dictionary for `he` and `en`.
- Default language = `he`.
- All layouts must fully support RTL.
- Use RTL-safe spacing and alignment.
- Prefer logical spacing and directional awareness.
- All visible UI text must come from translation objects or typed label maps.

## UI quality rules
- The UI must look polished and production-ready.
- Avoid placeholder-looking layouts.
- Avoid giant empty gaps.
- Avoid unstyled default forms and tables.
- Build realistic SaaS-grade dashboard density, spacing, and hierarchy.
- Every page must feel complete and intentionally designed.
- Prioritize polished spacing, visual hierarchy, and realistic dashboard composition.

## Seed data rules
Create `/lib/seed.ts` and define:
- typed interfaces/types for:
  - families
  - users
  - tasks
  - transactions
  - education content
  - subscriptions
  - analytics
- export the exact seeded arrays provided in the spec
- add typed helper selectors/derived data helpers where useful

All pages must import from the seed file only.
No inline fake arrays inside pages unless derived from seed.

## Shared components required
Build these reusable components first:
- `StatCard`
- `TaskCard`
- `ChildAvatar`
- `PlanBadge`
- `StatusChip`
- `SectionHeader`

All shared components must be:
- typed
- reusable
- RTL-aware
- theme-aware
- visually polished

## Required global features
Every page must include:
- skeleton loading state using shadcn Skeleton
- empty state with helper text
- responsive behavior down to 375px
- bilingual support through local dictionary
- dark mode support
- RTL correctness

## Animation rules
Use Framer Motion for:
- page transitions
- staggered card entrances
- sidebar collapse/expand
- stat count-in feel on mount
- hover micro-interactions
- skeleton-to-content crossfade

Animation style rules:
- subtle, smooth, premium
- no excessive motion
- respect reduced motion preferences
- prioritize performance
- only animate where it meaningfully improves UX

## Landing page requirements
Route: `/`
Sections:
- Navbar
- Hero
- Features
- How It Works
- Pricing
- Testimonials
- Footer

## Dashboard requirements
Route: `/dashboard`
Include:
- collapsible sidebar
- header bar
- active nav states
- mobile bottom-sheet/drawer behavior

## Dashboard pages required
- `/dashboard/overview`
- `/dashboard/families`
- `/dashboard/tasks`
- `/dashboard/education`
- `/dashboard/subscriptions`
- `/dashboard/settings`

## Page-specific expectations
### Overview
- 4 stat cards
- line chart with 6 months mock data
- recent activity feed from seed transactions
- use typed mock analytics data

### Families
- searchable/filterable table
- plan filter dropdown
- clickable row opens Sheet with child profiles

### Tasks
- pending approval column
- active tasks column
- local approve/reject interactions
- create task template dialog

### Education
- education content grid
- assign-to-child popover
- progress per child via bars

### Subscriptions
- subscriptions table
- top summary cards
- local-only action buttons

### Settings
- tabs layout
- react-hook-form + zod UI-only forms
- toggles
- destructive danger zone section

## Implementation order
Always build in this order:
1. scaffold project and dependencies
2. configure Tailwind, shadcn, theme provider, Heebo font, dark mode, RTL, i18n
3. create seed data, types, and derived helpers
4. build shared components
5. build landing page
6. build dashboard shell
7. build dashboard pages one by one
8. do a final polish pass for responsiveness, accessibility, empty states, loading states, and animations

## Output expectations
When asked to build a step:
- create all required files for that step
- keep imports working
- do not leave pseudo-code unless explicitly asked
- ensure the project can continue incrementally without rewrites
- preserve consistency with previous steps
- if a step is too large, break it into smaller internal substeps while still completing the requested scope

## Acceptance criteria
The project is only considered complete if:
- it runs with `pnpm dev`
- no route is broken
- no real APIs exist
- all data comes from seed only
- all pages are responsive
- dark mode works
- RTL works correctly
- reusable components are consistently used
- all strings come from local dictionaries
- README includes setup with `pnpm install` and `pnpm dev`
```

---

---
## 1. Agile Build Prompts for Cursor
---
# Step 1 — Project Scaffold + Core Setup
---
```text
Scope for this step only:
1. initialize the Next.js app structure for App Router
2. configure Tailwind CSS
3. configure shadcn/ui foundation
4. add `next-themes` provider
5. add Heebo font via `next/font/google`
6. configure dark mode default + light mode toggle support
7. set up RTL-ready root layout
8. create `/components/providers/theme-provider.tsx`
9. create a clean `README.md` with pnpm-only setup instructions
10. ensure the app boots successfully with a simple placeholder homepage

Constraints:
- no seed data yet
- no business pages yet
- no real APIs
- keep the setup clean and production-grade

Deliverables:
- working project scaffold
- layout.tsx
- globals.css
- theme provider
- font setup
- base README
```

## Step 2 — i18n + Seed Data + Types

```text
Implement the data and localization foundations for Kaspi.

Scope for this step only:
1. create `/lib/i18n.ts` with local dictionaries for `he` and `en`
2. set Hebrew as the default locale
3. create `/lib/seed.ts`
4. define TypeScript types/interfaces for families, users, tasks, transactions, education, subscriptions, and mock analytics
5. add the exact seeded data from the product spec
6. add typed derived helper functions/selectors where useful
7. ensure all future pages can consume only this seed data

Constraints:
- do not create any API routes
- do not create backend code
- do not introduce external services
- do not hardcode page-level strings outside the dictionary pattern

Deliverables:
- typed seed file
- typed i18n dictionaries
- clear exports usable by page components
```

## Step 3 — Shared Components Library

```text
Build the reusable shared components for Kaspi.

Scope for this step only:
Create and style these reusable components:
- `StatCard`
- `TaskCard`
- `ChildAvatar`
- `PlanBadge`
- `StatusChip`
- `SectionHeader`

Requirements:
- each component must be fully typed
- each component must be RTL-aware
- each component must support dark mode
- visuals must feel polished and production-ready
- include realistic variants where useful
- use shadcn/ui primitives when appropriate
- use Framer Motion only where it materially improves UX

Also:
- create simple usage examples or a small internal preview page if helpful
- do not build full pages yet

Deliverables:
- reusable shared components in `/components/shared`
- clean props APIs
- no duplication
```

## Step 4 — Landing Page

```text
Build the full landing page for Kaspi at `/` using the shared components and project rules.

Required sections:
1. Navbar
2. Hero
3. Features
4. How It Works
5. Pricing
6. Testimonials
7. Footer

Requirements:
- Hebrew default content from dictionary
- English fallback available in the local dictionary structure
- strong visual hierarchy
- animated hero illustration area
- 6 animated feature cards
- 3-step how-it-works section with visual flow
- pricing cards with middle plan highlighted
- testimonial cards with avatars and ratings
- responsive and polished
- dark mode by default
- light mode toggle visible
- use Framer Motion for stagger and subtle section motion

Constraints:
- no backend
- no auth
- no real forms
- CTA buttons are UI-only

Deliverables:
- complete landing page
- all text sourced from dictionary
- high-quality responsive layout
```

## Step 5 — Dashboard Shell

```text
Build the dashboard shell at `/dashboard` and the shared dashboard layout structure.

Requirements:
- collapsible sidebar
- active nav item states
- nav items:
  - Overview
  - Families
  - Tasks
  - Rewards
  - Transactions
  - Education
  - Subscriptions
  - Settings
- top header bar with:
  - search
  - notifications bell
  - user avatar dropdown
- medium screens: collapsed/icon-focused behavior
- mobile: drawer or bottom sheet style navigation
- Framer Motion spring animation for sidebar width changes

Constraints:
- no real routing logic beyond app routes
- no real notifications backend
- no auth integrations

Deliverables:
- dashboard layout component(s)
- reusable sidebar/header pieces
- route-ready shell for the subpages
```

## Step 6 — Overview Page

```text
Build `/dashboard/overview`.

Requirements:
- 4 stat cards with staggered entrance animation:
  - Total Families
  - Active Children
  - Tasks This Week
  - MRR
- line chart using Recharts with 6 months mock analytics
- recent activity feed derived from seed transactions
- skeleton state
- empty state
- responsive layout
- Hebrew default text from dictionary

Use seed and derived helper data only.
No inline hardcoded analytics arrays unless exported from seed/helpers.

Deliverables:
- finished overview page
- clean use of shared components
- polished chart section
```

## Step 7 — Families Page

```text
Build `/dashboard/families`.

Requirements:
- table view for families
- columns:
  - Family Name
  - Parent Email
  - Number of Children
  - Plan Badge
  - Joined
  - Status
- search input
- plan filter dropdown
- clicking a row opens a Sheet with child profiles
- data derived from seed families + seed users only
- skeleton state
- empty state
- responsive behavior

Keep the page production-looking and not like a default table demo.

Deliverables:
- families page
- filter/search interactions using local state only
- child profile sheet wired to row clicks
```

## Step 8 — Tasks Page

```text
Build `/dashboard/tasks`.

Requirements:
- two-column layout:
  - pending approval
  - active tasks
- task cards with:
  - child avatar
  - title
  - reward badge
  - due date
  - status chip
- Approve and Reject buttons with local-only interactions
- Create Task Template dialog using shadcn Dialog
- subtle motion on card mount and button press
- skeleton state
- empty state
- responsive layout

Constraints:
- all interactions stay in local component state
- no persistence

Deliverables:
- polished tasks page
- strong visual status separation between columns
```

## Step 9 — Education Page

```text
Build `/dashboard/education`.

Requirements:
- responsive grid of education cards using seeded education content
- each card includes:
  - type icon
  - title
  - subject tag
  - reward points badge
- Assign to Child button opens a popover with child selector
- progress tracker section showing completion rate per child using horizontal progress bars
- skeleton state
- empty state
- local-only interactions

Deliverables:
- finished education page
- polished card grid
- child assignment popover UI
```

## Step 10 — Subscriptions Page

```text
Build `/dashboard/subscriptions`.

Requirements:
- summary cards at top:
  - Total MRR
  - Active Subs
  - Churned This Month
- subscriptions table with:
  - family name
  - plan
  - status
  - billing date
  - amount
- action buttons:
  - Cancel
  - Upgrade
  - Downgrade
- UI-only actions with no Stripe integration
- skeleton state
- empty state
- responsive layout

Deliverables:
- polished subscriptions page
- summary cards + table
- local-only interaction buttons
```

## Step 11 — Settings Page

```text
Build `/dashboard/settings`.

Requirements:
- tabs layout using shadcn Tabs:
  - General
  - Notifications
  - Team
  - Billing
- form fields using react-hook-form + zod
- no real submission
- toggle switches for notification preferences
- danger zone section with destructive button styling
- skeleton state
- empty state
- responsive layout
- Hebrew default from dictionary

Constraints:
- form validation can exist locally
- no backend submission

Deliverables:
- finished settings page
- polished tabbed settings interface
```

## Step 12 — Final Polish Pass

```text
Perform a final polish pass across the entire Kaspi project.

Audit and improve:
1. responsiveness at all key breakpoints down to 375px
2. RTL correctness across all routes
3. dark mode and light mode consistency
4. animation consistency and reduced-motion behavior
5. skeleton states and empty states
6. typography, spacing, density, and visual hierarchy
7. dictionary usage for all visible strings
8. reuse of shared components
9. remove dead code, duplicate markup, and inconsistent styling
10. make sure the app runs cleanly with pnpm dev

Deliverables:
- final refined codebase
- consistent polished UI
- no broken imports or unfinished sections
```

---

# 3. XML Prompt for Cursor

```xml
<cursor-rules version="1.0" project="Kaspi FinFam UI MVP">
  <meta>
    <name>Kaspi</name>
    <market>Israel</market>
    <mode>UI-only</mode>
    <packageManager>pnpm</packageManager>
    <defaultLocale>he</defaultLocale>
    <supportsRTL>true</supportsRTL>
  </meta>

  <stack>
    <framework>Next.js 14+ App Router</framework>
    <language>TypeScript</language>
    <styling>Tailwind CSS</styling>
    <components>shadcn/ui</components>
    <animation>Framer Motion</animation>
    <charts>Recharts</charts>
    <theme>next-themes</theme>
    <forms>react-hook-form</forms>
    <validation>zod</validation>
    <font>Heebo via next/font</font>
  </stack>

  <constraints>
    <rule>No real API calls</rule>
    <rule>No Clerk</rule>
    <rule>No Stripe</rule>
    <rule>No Supabase client</rule>
    <rule>No Prisma, Firebase, or backend/database integrations</rule>
    <rule>No server actions that call real services</rule>
    <rule>Use only /lib/seed.ts as the data source</rule>
    <rule>All interactions must use local React state only</rule>
    <rule>All forms are local-only and non-persistent</rule>
    <rule>Do not replace the required stack</rule>
    <rule>Do not introduce another UI library</rule>
  </constraints>

  <architecture>
    <rule>Keep routes in /app</rule>
    <rule>Keep reusable components in /components</rule>
    <rule>Organize components into shared, landing, dashboard, providers, charts</rule>
    <rule>Use strong TypeScript typing everywhere</rule>
    <rule>Use functional components only</rule>
    <rule>Keep pages thin and delegate UI to reusable components</rule>
    <rule>Prefer server components unless interactivity is needed</rule>
  </architecture>

  <designSystem>
    <primary>#0F172A</primary>
    <accent>#F59E0B</accent>
    <rounded>rounded-2xl</rounded>
    <style>Polished SaaS dashboard, subtle shadows, occasional glassmorphism</style>
    <darkMode>default</darkMode>
    <responsive>mobile-first down to 375px</responsive>
  </designSystem>

  <localization>
    <default>he</default>
    <locales>
      <locale>he</locale>
      <locale>en</locale>
    </locales>
    <rule>All visible strings must come from /lib/i18n.ts</rule>
    <rule>All layouts must support RTL</rule>
  </localization>

  <data>
    <source>/lib/seed.ts</source>
    <entities>
      <entity>families</entity>
      <entity>users</entity>
      <entity>tasks</entity>
      <entity>transactions</entity>
      <entity>education</entity>
      <entity>subscriptions</entity>
      <entity>analytics</entity>
    </entities>
  </data>

  <sharedComponents>
    <component>StatCard</component>
    <component>TaskCard</component>
    <component>ChildAvatar</component>
    <component>PlanBadge</component>
    <component>StatusChip</component>
    <component>SectionHeader</component>
  </sharedComponents>

  <routes>
    <route>/</route>
    <route>/dashboard</route>
    <route>/dashboard/overview</route>
    <route>/dashboard/families</route>
    <route>/dashboard/tasks</route>
    <route>/dashboard/education</route>
    <route>/dashboard/subscriptions</route>
    <route>/dashboard/settings</route>
  </routes>

  <requirements>
    <global>
      <item>Skeleton loading state on every page</item>
      <item>Empty state on every page</item>
      <item>Responsive down to 375px</item>
      <item>Dark mode support</item>
      <item>RTL correctness</item>
    </global>
    <landing>
      <item>Navbar</item>
      <item>Hero</item>
      <item>Features</item>
      <item>How It Works</item>
      <item>Pricing</item>
      <item>Testimonials</item>
      <item>Footer</item>
    </landing>
    <overview>
      <item>4 stat cards</item>
      <item>Line chart with 6 months mock data</item>
      <item>Recent activity feed</item>
    </overview>
    <families>
      <item>Searchable/filterable table</item>
      <item>Plan filter</item>
      <item>Row click opens Sheet with children</item>
    </families>
    <tasks>
      <item>Pending approval and active tasks columns</item>
      <item>Local approve/reject interactions</item>
      <item>Create task template dialog</item>
    </tasks>
    <education>
      <item>Education content grid</item>
      <item>Assign-to-child popover</item>
      <item>Progress bars per child</item>
    </education>
    <subscriptions>
      <item>Summary cards</item>
      <item>Subscriptions table</item>
      <item>Local-only action buttons</item>
    </subscriptions>
    <settings>
      <item>Tabs layout</item>
      <item>react-hook-form + zod local forms</item>
      <item>Toggles</item>
      <item>Danger zone</item>
    </settings>
  </requirements>

  <animations>
    <item>Page transitions</item>
    <item>Staggered card entrances</item>
    <item>Sidebar collapse/expand</item>
    <item>Hover micro-interactions</item>
    <item>Skeleton-to-content crossfade</item>
    <rule>Respect reduced motion and performance</rule>
  </animations>

  <implementationOrder>
    <step>Scaffold project and dependencies</step>
    <step>Configure Tailwind, shadcn, theme provider, font, dark mode, RTL, i18n</step>
    <step>Create seed data, types, and derived helpers</step>
    <step>Build shared components</step>
    <step>Build landing page</step>
    <step>Build dashboard shell</step>
    <step>Build dashboard pages one by one</step>
    <step>Final polish pass</step>
  </implementationOrder>

  <acceptanceCriteria>
    <item>Runs with pnpm dev</item>
    <item>No broken routes</item>
    <item>No real APIs exist</item>
    <item>All data comes from seed only</item>
    <item>All pages are responsive</item>
    <item>Dark mode works</item>
    <item>RTL works correctly</item>
    <item>All strings come from local dictionaries</item>
    <item>README includes pnpm install and pnpm dev</item>
  </acceptanceCriteria>
</cursor-rules>
```

---

# 4. Tempo Prompt

```text
Build a polished UI-only MVP for “Kaspi (FinFam)”, a family financial literacy platform for the Israeli market.

## Product Context
Kaspi helps parents and children manage chores, rewards, balances, transactions, educational content, and family subscription plans.

## Important Constraints
- UI only
- no real API calls
- no Clerk
- no Stripe
- no Supabase client
- use seeded mock data only
- all interactions should work locally in-memory
- Hebrew default
- bilingual Hebrew/English support
- full RTL support

## Required Stack
- Next.js 14+ App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Recharts
- next-themes
- react-hook-form
- zod
- Heebo font via next/font/google

## Design Direction
- dark mode by default
- light mode toggle
- navy primary #0F172A
- gold accent #F59E0B
- rounded-2xl cards
- subtle shadows
- premium SaaS dashboard quality
- polished spacing and visual hierarchy
- responsive down to 375px

## Project Structure
Create:
- landing page at `/`
- dashboard shell at `/dashboard`
- dashboard pages:
  - `/dashboard/overview`
  - `/dashboard/families`
  - `/dashboard/tasks`
  - `/dashboard/education`
  - `/dashboard/subscriptions`
  - `/dashboard/settings`
- shared components:
  - StatCard
  - TaskCard
  - ChildAvatar
  - PlanBadge
  - StatusChip
  - SectionHeader
- `/lib/seed.ts`
- `/lib/i18n.ts`
- `/components/providers/theme-provider.tsx`

## Landing Page Sections
- Navbar
- Hero
- Features
- How It Works
- Pricing
- Testimonials
- Footer

## Dashboard Shell
- collapsible sidebar
- active navigation items
- top header with search, notifications, avatar
- mobile drawer behavior

## Page Requirements
### Overview
- 4 stat cards
- line chart with 6 months mock analytics
- recent activity feed

### Families
- searchable/filterable families table
- plan filter
- row opens sheet with child profiles

### Tasks
- pending approval column
- active tasks column
- local approve/reject UI
- create task template dialog

### Education
- education content grid
- assign-to-child popover
- completion progress bars

### Subscriptions
- summary cards
- subscriptions table
- local-only actions

### Settings
- tabs layout
- local form UI with react-hook-form + zod
- toggles
- danger zone

## UX Rules
- every page must include skeleton state
- every page must include empty state
- all text must come from local dictionary objects
- all layouts must work in RTL
- use Framer Motion for page transitions, staggered entrances, sidebar motion, hover micro-interactions
- keep animations subtle and premium

## Output Goal
Generate a clean, realistic, production-style SaaS UI with all routes, reusable components, typed mock data, local dictionaries, and polished responsive layouts.
```

---

# 5. `i18n.ts` Starter File

```ts
export type Locale = 'he' | 'en';

export const defaultLocale: Locale = 'he';

export const messages = {
  he: {
    common: {
      appName: 'Kaspi',
      search: 'חיפוש',
      notifications: 'התראות',
      settings: 'הגדרות',
      save: 'שמור',
      cancel: 'ביטול',
      create: 'יצירה',
      edit: 'עריכה',
      delete: 'מחיקה',
      upgrade: 'שדרוג',
      downgrade: 'שנמוך',
      loading: 'טוען...',
      emptyTitle: 'אין נתונים להצגה',
      emptyDescription: 'כאן יוצג מידע ברגע שיתווסף תוכן.',
      darkMode: 'מצב כהה',
      lightMode: 'מצב בהיר',
      language: 'שפה',
    },
    nav: {
      home: 'דף הבית',
      overview: 'סקירה',
      families: 'משפחות',
      tasks: 'משימות',
      rewards: 'תגמולים',
      transactions: 'תנועות',
      education: 'חינוך פיננסי',
      subscriptions: 'מנויים',
      settings: 'הגדרות',
    },
    landing: {
      heroTitle: 'פלטפורמה חכמה לחינוך פיננסי משפחתי',
      heroDescription: 'Kaspi עוזרת להורים ולילדים לנהל משימות, תגמולים, חסכונות והרגלים פיננסיים בצורה פשוטה, מהנה ומותאמת למשפחות בישראל.',
      primaryCta: 'התחילו עכשיו',
      secondaryCta: 'צפו בדמו',
      featuresTitle: 'כל מה שמשפחה צריכה במקום אחד',
      howItWorksTitle: 'איך זה עובד',
      pricingTitle: 'מסלולים שמתאימים לכל משפחה',
      testimonialsTitle: 'מה הורים אומרים עלינו',
    },
    overview: {
      title: 'סקירה כללית',
      totalFamilies: 'סך כל המשפחות',
      activeChildren: 'ילדים פעילים',
      tasksThisWeek: 'משימות השבוע',
      mrr: 'הכנסה חודשית חוזרת',
      recentActivity: 'פעילות אחרונה',
      monthlySignups: 'הרשמות חודשיות',
    },
    families: {
      title: 'משפחות',
      familyName: 'שם המשפחה',
      parentEmail: 'אימייל הורה',
      childrenCount: 'מספר ילדים',
      plan: 'מסלול',
      joined: 'תאריך הצטרפות',
      status: 'סטטוס',
      childProfiles: 'פרופילי ילדים',
      searchPlaceholder: 'חיפוש לפי משפחה או אימייל...',
    },
    tasks: {
      title: 'משימות',
      pendingApproval: 'ממתין לאישור',
      activeTasks: 'משימות פעילות',
      createTemplate: 'צור תבנית משימה',
      approve: 'אשר',
      reject: 'דחה',
      dueDate: 'תאריך יעד',
      reward: 'תגמול',
    },
    education: {
      title: 'חינוך פיננסי',
      assignToChild: 'הקצה לילד',
      rewardPoints: 'נקודות תגמול',
      progressTitle: 'התקדמות לפי ילד',
    },
    subscriptions: {
      title: 'מנויים',
      totalMrr: 'סה"כ MRR',
      activeSubs: 'מנויים פעילים',
      churnedThisMonth: 'עזיבות החודש',
      billingDate: 'תאריך חיוב',
      amount: 'סכום',
    },
    settingsPage: {
      title: 'הגדרות',
      general: 'כללי',
      notifications: 'התראות',
      team: 'צוות',
      billing: 'חיוב',
      dangerZone: 'אזור מסוכן',
      deleteAccount: 'מחק חשבון',
    },
  },
  en: {
    common: {
      appName: 'Kaspi',
      search: 'Search',
      notifications: 'Notifications',
      settings: 'Settings',
      save: 'Save',
      cancel: 'Cancel',
      create: 'Create',
      edit: 'Edit',
      delete: 'Delete',
      upgrade: 'Upgrade',
      downgrade: 'Downgrade',
      loading: 'Loading...',
      emptyTitle: 'No data to display',
      emptyDescription: 'Content will appear here once data is available.',
      darkMode: 'Dark mode',
      lightMode: 'Light mode',
      language: 'Language',
    },
    nav: {
      home: 'Home',
      overview: 'Overview',
      families: 'Families',
      tasks: 'Tasks',
      rewards: 'Rewards',
      transactions: 'Transactions',
      education: 'Education',
      subscriptions: 'Subscriptions',
      settings: 'Settings',
    },
    landing: {
      heroTitle: 'A smarter family financial literacy platform',
      heroDescription: 'Kaspi helps parents and children manage chores, rewards, savings, and financial habits in a simple and engaging way for Israeli families.',
      primaryCta: 'Get started',
      secondaryCta: 'Watch demo',
      featuresTitle: 'Everything a family needs in one place',
      howItWorksTitle: 'How it works',
      pricingTitle: 'Plans for every family',
      testimonialsTitle: 'What parents say about us',
    },
    overview: {
      title: 'Overview',
      totalFamilies: 'Total Families',
      activeChildren: 'Active Children',
      tasksThisWeek: 'Tasks This Week',
      mrr: 'Monthly Recurring Revenue',
      recentActivity: 'Recent Activity',
      monthlySignups: 'Monthly Signups',
    },
    families: {
      title: 'Families',
      familyName: 'Family Name',
      parentEmail: 'Parent Email',
      childrenCount: 'Children',
      plan: 'Plan',
      joined: 'Joined',
      status: 'Status',
      childProfiles: 'Child Profiles',
      searchPlaceholder: 'Search by family or email...',
    },
    tasks: {
      title: 'Tasks',
      pendingApproval: 'Pending Approval',
      activeTasks: 'Active Tasks',
      createTemplate: 'Create Task Template',
      approve: 'Approve',
      reject: 'Reject',
      dueDate: 'Due Date',
      reward: 'Reward',
    },
    education: {
      title: 'Education',
      assignToChild: 'Assign to Child',
      rewardPoints: 'Reward Points',
      progressTitle: 'Progress per Child',
    },
    subscriptions: {
      title: 'Subscriptions',
      totalMrr: 'Total MRR',
      activeSubs: 'Active Subs',
      churnedThisMonth: 'Churned This Month',
      billingDate: 'Billing Date',
      amount: 'Amount',
    },
    settingsPage: {
      title: 'Settings',
      general: 'General',
      notifications: 'Notifications',
      team: 'Team',
      billing: 'Billing',
      dangerZone: 'Danger Zone',
      deleteAccount: 'Delete Account',
    },
  },
} as const;

export function getMessages(locale: Locale = defaultLocale) {
  return messages[locale];
}
```

---

# 6. Ready-to-Paste `.mdc` Templates for All 12 Phase Files

להלן תבניות מוכנות להדבקה עבור כל קבצי ה-`.mdc` הפאזיים.

---

## `/.cursor/rules/01-foundation.mdc`

```mdc
---
description: Kaspi foundation setup rules
globs:
  - "app/**"
  - "components/providers/**"
  - "styles/**"
  - "lib/**"
alwaysApply: false
---

# Phase 01 — Foundation

This phase is only for project foundation and app bootstrapping.

## Allowed scope
- Configure Tailwind CSS
- Configure shadcn/ui foundation
- Configure next-themes
- Configure Heebo font via next/font/google
- Create root layout
- Create RTL-ready app shell
- Create theme provider
- Create globals.css
- Create README with pnpm instructions
- Create a minimal placeholder homepage only if required to verify app boot

## Do not do in this phase
- Do not create full seed.ts business data
- Do not implement i18n content beyond placeholder wiring if absolutely required
- Do not build landing page sections
- Do not build dashboard pages
- Do not build business-specific shared components
- Do not introduce APIs or backend logic

## Success criteria
- App boots with pnpm dev
- Theme provider works
- Heebo is configured
- Dark mode is default
- Root layout supports RTL structure
- README includes pnpm install and pnpm dev
```

---

## `/.cursor/rules/02-seed-and-i18n.mdc`

```mdc
---
description: Kaspi seed data and localization rules
globs:
  - "lib/**"
  - "app/**"
alwaysApply: false
---

# Phase 02 — Seed and i18n

This phase is only for typed mock data and localization foundations.

## Allowed scope
- Create /lib/seed.ts
- Define typed interfaces for families, users, tasks, transactions, education, subscriptions, analytics
- Export the exact seeded data from the spec
- Create typed selectors and derived helpers
- Create /lib/i18n.ts
- Add Hebrew and English dictionaries
- Set Hebrew as default locale
- Ensure future UI strings can come from dictionary objects

## Do not do in this phase
- Do not build full pages
- Do not build shared UI components
- Do not add backend logic
- Do not add API routes
- Do not hardcode final page content outside the dictionary system

## Success criteria
- /lib/seed.ts exists and is strongly typed
- /lib/i18n.ts exists and exports he/en dictionaries
- Seed helpers are reusable and page-friendly
- No real data fetching exists
```

---

## `/.cursor/rules/03-shared-components.mdc`

```mdc
---
description: Kaspi shared UI components rules
globs:
  - "components/shared/**"
  - "components/ui/**"
  - "lib/**"
alwaysApply: false
---

# Phase 03 — Shared Components

This phase is only for reusable shared UI components.

## Allowed scope
Build these components:
- StatCard
- TaskCard
- ChildAvatar
- PlanBadge
- StatusChip
- SectionHeader

## Component requirements
- Fully typed props
- RTL-aware
- Dark-mode aware
- Reusable and generic
- Polished SaaS visual quality
- Use shadcn/ui primitives when appropriate
- Add motion only when it meaningfully improves UX

## Do not do in this phase
- Do not build full landing page sections
- Do not build dashboard pages
- Do not add page-specific business logic

## Success criteria
- Components live in /components/shared
- Props APIs are clean and reusable
- Components visually align with the Kaspi design system
```

---

## `/.cursor/rules/04-landing-page.mdc`

```mdc
---
description: Kaspi landing page rules
globs:
  - "app/page.tsx"
  - "components/landing/**"
  - "components/shared/**"
  - "lib/**"
alwaysApply: false
---

# Phase 04 — Landing Page

This phase is only for the public landing page at /.

## Required sections
- Navbar
- Hero
- Features
- How It Works
- Pricing
- Testimonials
- Footer

## Requirements
- Hebrew default content from dictionary
- English fallback available via i18n
- Strong visual hierarchy
- Responsive down to 375px
- Dark mode by default
- Light mode toggle visible
- Use Framer Motion for subtle section motion and staggered entrances

## Do not do in this phase
- Do not build dashboard shell
- Do not build dashboard data pages
- Do not add backend logic

## Success criteria
- Landing page feels complete and production-ready
- All visible strings come from dictionary objects
- Responsive, polished, RTL-correct implementation
```
---

---

## `/.cursor/rules/05-dashboard-shell.mdc`

```mdc
---
description: Kaspi dashboard shell rules
globs:
  - "app/dashboard/**"
  - "components/dashboard/**"
  - "components/shared/**"
  - "lib/**"
alwaysApply: false
---

# Phase 05 — Dashboard Shell

This phase is only for the shared dashboard layout and navigation shell.

## Allowed scope
- Build the `/dashboard` layout
- Create a collapsible sidebar
- Add active navigation states
- Add a top header bar with:
  - search
  - notifications bell
  - user avatar dropdown
- Add medium-screen collapsed behavior
- Add mobile drawer or sheet navigation behavior
- Add route-ready shell for dashboard subpages
- Add responsive dashboard spacing and layout behavior
- Add subtle Framer Motion transitions for sidebar expand/collapse

## Navigation items
- Overview
- Families
- Tasks
- Rewards
- Transactions
- Education
- Subscriptions
- Settings

## Requirements
- Must support dark mode
- Must support RTL
- Must feel polished and production-ready
- Keep shell reusable across all dashboard pages
- Use local UI state only
- Use shared styling conventions from the project rules

## Do not do in this phase
- Do not build the actual content for overview, families, tasks, education, subscriptions, or settings
- Do not add real notification systems
- Do not add auth integrations
- Do not add backend logic
- Do not add API routes

## Success criteria
- Dashboard shell is reusable and route-ready
- Sidebar collapses and expands correctly
- Active navigation state is visually clear
- Header layout works across desktop and mobile
- Shell is responsive, RTL-correct, and polished
```

---

## `/.cursor/rules/06-overview-page.mdc`

```mdc
---
description: Kaspi overview page rules
globs:
  - "app/dashboard/overview/**"
  - "components/dashboard/**"
  - "components/shared/**"
  - "components/charts/**"
  - "lib/**"
alwaysApply: false
---

# Phase 06 — Overview Page

This phase is only for `/dashboard/overview`.

## Allowed scope
- Build the overview page layout
- Add 4 stat cards:
  - Total Families
  - Active Children
  - Tasks This Week
  - MRR
- Add a Recharts line chart with 6 months of mock analytics
- Add a recent activity feed derived from seeded transactions
- Add skeleton loading state
- Add empty state
- Add responsive behavior down to 375px
- Use shared components wherever possible

## Requirements
- All visible text must come from the dictionary
- Analytics data must be typed
- Do not hardcode analytics arrays directly in the page if they belong in seed/helpers
- Use subtle Framer Motion stagger/entrance animations
- Keep the layout visually strong and SaaS-like

## Do not do in this phase
- Do not build other dashboard pages
- Do not add real analytics APIs
- Do not add backend logic
- Do not introduce unrelated page-specific components unless truly necessary

## Success criteria
- Overview page is complete and polished
- All data comes from seed/helpers only
- Chart renders correctly
- Recent activity is readable and visually clean
- Page is responsive, RTL-correct, and dark-mode compatible
```

---

## `/.cursor/rules/07-families-page.mdc`

```mdc
---
description: Kaspi families page rules
globs:
  - "app/dashboard/families/**"
  - "components/dashboard/**"
  - "components/shared/**"
  - "lib/**"
alwaysApply: false
---

# Phase 07 — Families Page

This phase is only for `/dashboard/families`.

## Allowed scope
- Build a production-style families page
- Add a searchable and filterable table
- Add columns:
  - Family Name
  - Parent Email
  - Number of Children
  - Plan
  - Joined
  - Status
- Add search input
- Add plan filter dropdown
- Make table rows clickable
- Open a Sheet when a row is clicked
- Show child profiles in the Sheet using seeded family/user data
- Add skeleton loading state
- Add empty state

## Requirements
- Use local state only for search/filter UI
- Derive all displayed data from `seedFamilies` and `seedUsers`
- Keep the page visually polished, not like a default data table demo
- Maintain RTL correctness and responsive behavior

## Do not do in this phase
- Do not add backend search or filtering
- Do not add real persistence
- Do not build other dashboard pages
- Do not fetch from APIs

## Success criteria
- Search works locally in memory
- Plan filter works locally in memory
- Clicking a row opens the correct child profiles
- Table and Sheet feel consistent with the Kaspi design system
- Page is responsive, polished, and dark-mode compatible
```

---

## `/.cursor/rules/08-tasks-page.mdc`

```mdc
---
description: Kaspi tasks page rules
globs:
  - "app/dashboard/tasks/**"
  - "components/dashboard/**"
  - "components/shared/**"
  - "lib/**"
alwaysApply: false
---

# Phase 08 — Tasks Page

This phase is only for `/dashboard/tasks`.

## Allowed scope
- Build a two-column task workflow layout:
  - Pending Approval
  - Active Tasks
- Render task cards using seeded task data
- Show:
  - child avatar
  - title
  - reward
  - due date
  - status
- Add Approve and Reject buttons
- Support local-only interaction state for approvals/rejections
- Add a Create Task Template dialog using shadcn Dialog
- Add skeleton loading state
- Add empty state
- Add subtle Framer Motion motion on card mount and button interactions

## Requirements
- Use local React state only
- Do not persist status changes
- Keep visual separation between columns strong and readable
- Reuse shared components wherever possible
- Support RTL and dark mode

## Do not do in this phase
- Do not add backend persistence
- Do not add APIs
- Do not build unrelated dashboard pages

## Success criteria
- Task page feels responsive and realistic
- Approve/Reject interactions work locally
- Dialog opens and closes cleanly
- Layout is polished and easy to scan
- Page is responsive and RTL-correct
```

---

## `/.cursor/rules/09-education-page.mdc`

```mdc
---
description: Kaspi education page rules
globs:
  - "app/dashboard/education/**"
  - "components/dashboard/**"
  - "components/shared/**"
  - "lib/**"
alwaysApply: false
---

# Phase 09 — Education Page

This phase is only for `/dashboard/education`.

## Allowed scope
- Build a responsive education content grid
- Use seeded education content only
- Each card should display:
  - type icon
  - title
  - subject tag
  - reward points
- Add an Assign to Child button
- Open a popover with child selector
- Add a progress tracker section
- Show completion rate per child with horizontal progress bars
- Add skeleton loading state
- Add empty state

## Requirements
- Assignment interactions must be local-only
- Do not persist anything
- Keep the page visually engaging and child/family-friendly
- Use shared components and consistent design patterns
- Support RTL and dark mode

## Do not do in this phase
- Do not add backend assignment logic
- Do not add APIs
- Do not build unrelated dashboard pages

## Success criteria
- Education cards feel polished and consistent
- Popover interaction works locally
- Progress section is clear and visually useful
- Page is responsive, RTL-correct, and production-looking
```

---

## `/.cursor/rules/10-subscriptions-page.mdc`

```mdc
---
description: Kaspi subscriptions page rules
globs:
  - "app/dashboard/subscriptions/**"
  - "components/dashboard/**"
  - "components/shared/**"
  - "lib/**"
alwaysApply: false
---

# Phase 10 — Subscriptions Page

This phase is only for `/dashboard/subscriptions`.

## Allowed scope
- Build summary cards for:
  - Total MRR
  - Active Subs
  - Churned This Month
- Build a subscriptions table
- Show:
  - family name
  - plan
  - status
  - billing date
  - amount
- Add local-only action buttons:
  - Cancel
  - Upgrade
  - Downgrade
- Add skeleton loading state
- Add empty state

## Requirements
- Use seeded subscriptions and derived summary data only
- Actions are UI-only and local-only
- No Stripe logic
- Keep table and summary cards visually cohesive
- Support RTL, dark mode, and responsive layout

## Do not do in this phase
- Do not add Stripe
- Do not add billing APIs
- Do not add persistence
- Do not build unrelated dashboard pages

## Success criteria
- Summary cards are clear and well-designed
- Table is polished and readable
- Buttons behave as local-only interactions
- Page is responsive, RTL-correct, and consistent with the rest of the dashboard
```

---

## `/.cursor/rules/11-settings-page.mdc`

```mdc
---
description: Kaspi settings page rules
globs:
  - "app/dashboard/settings/**"
  - "components/dashboard/**"
  - "components/shared/**"
  - "lib/**"
alwaysApply: false
---

# Phase 11 — Settings Page

This phase is only for `/dashboard/settings`.

## Allowed scope
- Build a tabbed settings page using shadcn Tabs
- Tabs required:
  - General
  - Notifications
  - Team
  - Billing
- Add local-only forms using react-hook-form + zod
- Add notification toggles
- Add a danger zone section with destructive styling
- Add skeleton loading state
- Add empty state

## Requirements
- Validation can run locally only
- No submission to backend
- No billing integrations
- No auth account management
- All text comes from the dictionary
- Support RTL, dark mode, and responsive layout

## Do not do in this phase
- Do not add real persistence
- Do not add APIs
- Do not add Stripe
- Do not build unrelated pages

## Success criteria
- Tabs work correctly
- Forms validate locally
- Toggles and danger zone feel polished
- Page is responsive, RTL-correct, and visually complete
```

---

## `/.cursor/rules/12-final-polish.mdc`

```mdc
---
description: Kaspi final polish and QA rules
globs:
  - "app/**"
  - "components/**"
  - "lib/**"
  - "styles/**"
alwaysApply: false
---

# Phase 12 — Final Polish

This phase is only for final refinement and QA across the whole project.

## Allowed scope
- Audit and improve responsiveness down to 375px
- Audit and improve RTL correctness across all routes
- Audit and improve dark mode and light mode consistency
- Normalize animation behavior and reduced-motion handling
- Refine skeleton states and empty states
- Improve typography, spacing, hierarchy, and dashboard density
- Ensure all visible strings come from the dictionary
- Ensure shared components are reused consistently
- Remove dead code, duplicate markup, and inconsistent styling
- Ensure the project runs cleanly with `pnpm dev`

## Do not do in this phase
- Do not introduce major new features unless needed to complete an unfinished part
- Do not perform unnecessary rewrites of already-good sections
- Do not introduce backend or API work

## Success criteria
- Project feels cohesive across all routes
- No broken imports or unfinished sections remain
- UI feels polished and release-ready for a mock-data MVP
- App runs locally without avoidable warnings or structural issues
```



