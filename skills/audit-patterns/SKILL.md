---
name: audit-patterns
description: Use when auditing and unifying pattern consistency in a scope — divergent implementations of the same concern, reimplementations of existing utilities, naming violations, import disorder, unused dependencies. Triggers on "audit patterns", "fix inconsistencies", "unify conventions", "fix reimplementations", "pattern review".
argument-hint: [path]
---

!`cat ~/.claude/skills/audit-workflow.md`

Run as the `patterns` dimension. Lens:

Find unjustified deviations from the codebase's own conventions; unify outliers toward what already dominates. Count occurrences — if >60% of the codebase solves a problem one way, that's the target. Never introduce a pattern the project doesn't already use, even if theoretically superior: consistency outweighs local optimality. What matters, in order: same problem solved the same way (data access, error handling, async, validation, configuration); reimplementations of utilities that already exist — the inline duplicate is the divergence, the fix is to import; naming conventions detected from existing code, not imposed; predictable API/CLI/interface shape across public surfaces; import ordering and zero unused imports or dependencies.

Justified variance exists — external library requirements, proven constraints, framework boundaries — so check `git log` on divergent files: recent divergence is usually accidental, old divergence may be intentional.

Auto-fix: import the existing utility, rename to the dominant convention, reorder imports, drop unused dependencies — all behavior-preserving and internal. Sign-off: when the dominant pattern itself is wrong — name it, sketch the right unified fix, surface it. Sweeping the majority pattern is a separate decision from cleaning up outliers.
