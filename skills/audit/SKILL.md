---
name: audit
description: Use when running the full audit sweep on a scope — runs all focused audit dimensions (necessity, structure, patterns, contracts, correctness, data integrity, error handling, logs, perf, reliability, security, tests, complexity, comments) as an isolated parallel workflow that integrates in dependency order. Triggers on "audit", "full audit", "audit everything".
argument-hint: [path]
---

!`cat "${CLAUDE_SKILL_DIR%/*}/shared/audit-workflow.md"`

!`cat "${CLAUDE_SKILL_DIR%/*}/shared/audit-integration.md"`

Run all fourteen baseline dimensions through the workflow above, in its phase groups. Each dimension's lens: `${CLAUDE_SKILL_DIR%/*}/audit-<dimension>/SKILL.md`. Skip `tests` if scope has no tests.
