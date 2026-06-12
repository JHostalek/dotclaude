---
name: audit-patterns
description: Use when auditing and unifying pattern consistency in a scope — divergent implementations of the same concern, reimplementations of existing utilities, naming violations, import disorder, unused dependencies. Triggers on "audit patterns", "fix inconsistencies", "unify conventions", "fix reimplementations", "pattern review".
argument-hint: [path]
---

!`cat ~/.claude/skills/audit-workflow.md`

Run as the `patterns` dimension.

Count occurrences — >60% of the codebase solves a problem one way → that's the target. Never introduce a pattern the project doesn't already use, even if theoretically superior: consistency outweighs local optimality. Priority order:
1. Same problem solved the same way (data access, error handling, async, validation, configuration)
2. Reimplementations of existing utilities — inline duplicate is the divergence; fix is to import
3. Naming conventions detected from existing code, not imposed
4. Predictable API/CLI/interface shape across public surfaces
5. Import ordering; zero unused imports or dependencies

Justified variance exists — external library requirements, proven constraints, framework boundaries. Check `git log` on divergent files: recent divergence → usually accidental; old divergence → may be intentional.

Auto-fix (behavior-preserving, internal only): import existing utility, rename to dominant convention, reorder imports, drop unused dependencies. Sign-off required when the dominant pattern itself is wrong — name it, sketch the right unified fix, surface it. Sweeping the majority pattern is a separate decision from cleaning up outliers.
