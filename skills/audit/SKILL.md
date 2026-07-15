---
name: audit
description: Use when running the full audit sweep on a scope — runs the focused audit dimensions (necessity, structure, patterns, correctness, error handling, logs, perf, security, tests, complexity, comments) as a parallel-worktree workflow that integrates in dependency order. Triggers on "audit", "full audit", "audit everything".
argument-hint: [path]
---

!`cat ~/.claude/skills/audit-workflow.md`

Run all eleven baseline dimensions through the workflow above, in the integration order it lists. Each dimension's lens: `~/.claude/skills/audit-<dimension>/SKILL.md`. Add or adapt a focused dimension when the repository exposes a material concern the baseline does not cover; this extends the sweep rather than excusing an applicable baseline pass. Skip `tests` if scope has no tests.
