---
name: audit
description: Use when running the full audit sweep on a scope — runs the focused audit dimensions (necessity, structure, patterns, correctness, error handling, logs, perf, security, tests, complexity, comments) as a parallel-worktree workflow that integrates in dependency order. Triggers on "audit", "full audit", "audit everything".
argument-hint: [path]
---

!`cat ~/.claude/skills/audit-workflow.md`

Run all eleven dimensions through the workflow above, in the integration order it lists. Each dimension's lens: `~/.claude/skills/audit-<dimension>/SKILL.md`. Skip `tests` if scope has no tests.
