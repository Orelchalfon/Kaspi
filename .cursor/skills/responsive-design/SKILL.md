---
name: responsive-design
description: Guides the agent to use the responsive design Skill installed via `pnpm dlx skills add https://github.com/supercent-io/skills-template --skill responsive-design` and to apply mobile-first, production-grade responsive layout practices in this project.
---

# Responsive Design Skill (Project Wrapper)

## Purpose

This Skill tells the agent **how and when to use the `responsive-design` tooling** that has been added via:

```bash
pnpm dlx skills add https://github.com/supercent-io/skills-template --skill responsive-design
```

Use this Skill whenever:

- The user asks to **fix**, **improve**, or **implement** responsive layout or breakpoints.
- You are working on UI components or pages that must be:
  - Mobile-first (375px and up)
  - Tablet and desktop friendly (768px, 1024px, 1440px)
  - Polished and production-ready.

This wrapper **does not re-implement** the external responsive design logic; instead, it:

- Describes **when** to apply responsive guidelines in this repo.
- Points to the underlying responsive design instructions already available in the project.

---

## Where the Detailed Rules Live

This project already contains a more detailed responsive design Skill generated from the template at:

- `.agents/skills/responsive-design/SKILL.md`

As the agent, when you need **deep responsive guidance**, you should:

1. Read `.agents/skills/responsive-design/SKILL.md` (one level deep).
2. Apply its rules to layout, spacing, breakpoints, and component structure.

Use this wrapper Skill as a **lightweight trigger and summary**, and delegate specifics to the underlying Skill file.

---

## When to Apply This Skill

Apply this Skill in these situations:

- The user mentions:
  - “Responsive design”, “breakpoints”, or “mobile/desktop layout”
  - “Looks broken on mobile”, “overflow”, or “horizontal scroll”
  - Specific widths like 375px, 768px, 1024px, 1440px
- You are building or refactoring:
  - Landing pages
  - Marketing sections (hero, features, pricing, testimonials)
  - Navigation or layout shells that must adapt across devices

---

## Agent Workflow

When this Skill is relevant, follow this workflow:

1. **Identify target components/pages**
   - Determine which file(s) control the layout (e.g. `app/page.tsx`, `components/landing/*`).

2. **Consult the detailed responsive Skill**
   - Read `.agents/skills/responsive-design/SKILL.md`.
   - Note its recommended breakpoints, layout patterns, and checklists.

3. **Apply mobile-first patterns**
   - Start from the smallest viewport (≈375px).
   - Ensure:
     - No horizontal scrolling on mobile.
     - Content stacks vertically with clear spacing.
     - CTAs remain visible and usable.

4. **Scale up to tablet and desktop**
   - Introduce grids and multi-column layouts at the recommended breakpoints.
   - Keep a consistent max width (e.g., `max-w-6xl` / `max-w-7xl`) for content containers.
   - Maintain readable line length and spacing.

5. **Run a responsive checklist**
   - Verify:
     - Layout holds at 375px, 768px, 1024px, and 1440px.
     - No overlapping content or clipped components.
     - Navbars and sticky elements don’t hide or obscure content.

---

## Example Usage

### Example 1 – Landing page layout

User: “Make the landing page fully responsive down to 375px.”

Agent should:

1. Recognize this as a responsive-design use case.
2. Apply this Skill and then consult `.agents/skills/responsive-design/SKILL.md`.
3. Adjust section components:
   - Use single-column stacks on mobile.
   - Switch to 2–3 column grids on wider screens.
   - Ensure consistent container widths and padding.

### Example 2 – Fixing horizontal scroll

User: “On mobile there’s horizontal scrolling – please fix it.”

Agent should:

1. Use this Skill to remember responsive debugging patterns.
2. Inspect padding, fixed widths, and overflow rules per the detailed responsive-design instructions.
3. Remove or constrain elements causing overflow while preserving the intended design.

---

## Notes & Best Practices

- Treat this as the **entrypoint Skill** for responsive work in this repo.
- Always favor **mobile-first** strategies and test via the key breakpoints used in this project.
- When in doubt, re-open `.agents/skills/responsive-design/SKILL.md` to refresh the exact rules instead of guessing.

