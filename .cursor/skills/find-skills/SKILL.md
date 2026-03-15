---
name: find-skills
description: Helps the agent discover, search for, and add external Skills using `pnpm dlx skills` with the vercel-labs/skills repo. Use when the user asks to find new Skills, list or explore available Skills, or install Skills into this project.
---

# Find Skills Helper

## Purpose

This Skill teaches the agent how to **discover and add external Skills** into this project using the `pnpm dlx skills` CLI, specifically:

- `https://github.com/vercel-labs/skills` with `--skill find-skills`

Use it whenever:

- The user asks to **find, search, or browse Skills**
- The user mentions **`vercel-labs/skills`** or **`find-skills`**
- The agent wants to suggest new Skills to improve workflows in this repo

> This is a **project Skill** and should be applied only inside repositories where it exists.

---

## Installation & Setup (for this project)

The user has indicated the canonical command for adding the `find-skills` Skill via pnpm:

```bash
pnpm dlx skills add https://github.com/vercel-labs/skills --skill find-skills
```

When run from the project root, this:

- Uses `pnpm dlx` to execute the `skills` CLI
- Adds the `find-skills` Skill implementation from `vercel-labs/skills`
- Wires it into the current project so Cursor/VS Code can leverage it

> As the agent, you should **not** automatically run this command; instead, you can **suggest it** to the user if the Skill is not yet installed or needs to be refreshed.

---

## How to Use in This Project

### When to Apply This Skill

Apply this Skill when:

- The user says things like:
  - “Find a Skill that does X”
  - “Search available Skills for Y”
  - “Install the find-skills helper”
- You want to help the user discover Skills that:
  - Analyze code or PRs
  - Work with design systems
  - Automate common workflows

### Agent Behavior

1. **Check if the user wants discovery or installation**:
   - For discovery: explain that `find-skills` can search Skills and suggest a CLI usage.
   - For installation: show the exact `pnpm dlx skills add ...` command.
2. **Never assume global installation**:
   - Treat installation as **per-project** unless the user explicitly mentions a global setup.
3. **Prefer read-only usage first**:
   - When the user just wants to know “what’s possible”, describe how `find-skills` can be used instead of running shell commands automatically.

---

## Example Usages

### Example 1 – User asks “Can you help me find a Skill for analytics?”

Agent should:

1. Recognize this as a **Skill discovery** request.
2. Explain that the project can use `find-skills` from `vercel-labs/skills`.
3. Suggest a command the user can run locally:

```bash
pnpm dlx skills add https://github.com/vercel-labs/skills --skill find-skills
# then use the find-skills entrypoint in their editor/terminal flow
```

### Example 2 – User explicitly wants to install `find-skills`

Agent should respond with:

```bash
pnpm dlx skills add https://github.com/vercel-labs/skills --skill find-skills
```

And briefly explain that:

- This will add the `find-skills` capability from `vercel-labs/skills` into the current project.
- After it completes, the user can use the find-skills interface (via their editor integration) to search for additional Skills.

---

## Notes & Best Practices

- **Do not duplicate logic** from `vercel-labs/skills` here; this Skill is mainly a **router and explainer** for how/when to use `find-skills`.
- Keep explanations **short and action-oriented**; when the user seems familiar with pnpm and Skills, you can just surface the one-line command.
- If the user mentions permission constraints or restricted environments, provide the command but avoid assuming it has been run unless they confirm.

