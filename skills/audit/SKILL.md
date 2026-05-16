---
name: audit
description: Use when running the full audit sweep on a scope — sequences the focused audit skills (necessity, patterns, correctness, silent failures, perf, security, tests, complexity, comments) one after another, committing after each. Triggers on "audit", "full audit", "audit everything".
argument-hint: [path]
---

Trigger following skills as subagents.
One by one sequentially.
Commit after each step.

/audit-necessity
/audit-patterns
/audit-correctness
/audit-silent-failures
/audit-perf
/audit-security
/audit-tests (if there are any)
/audit-complexity
/audit-comments
