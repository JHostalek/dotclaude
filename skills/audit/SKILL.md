---
name: audit
description: Use when running the full audit sweep on a scope — runs the focused audit dimensions (necessity, structure, patterns, correctness, error handling, logs, perf, security, tests, complexity, comments) as a parallel-worktree workflow that integrates in dependency order. Triggers on "audit", "full audit", "audit everything".
argument-hint: [path]
---

!`cat "${CLAUDE_SKILL_DIR}/../shared/audit-workflow.md"`

!`cat "${CLAUDE_SKILL_DIR}/../shared/audit-integration.md"`

Run all eleven baseline dimensions through the workflow above, in its phase groups. Each dimension's lens: `${CLAUDE_SKILL_DIR}/../audit-<dimension>/SKILL.md`. Skip `tests` if scope has no tests.
