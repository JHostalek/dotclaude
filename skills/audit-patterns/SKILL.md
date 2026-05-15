---
name: audit-patterns
description: Use when auditing pattern consistency in a scope — divergent implementations of the same concern, reimplementations of existing utilities, naming violations, import disorder, unused dependencies. Triggers on "audit patterns", "find inconsistencies", "unify conventions", "find reimplementations", "pattern review".
argument-hint: [path]
---

target = $ARGUMENTS

If target provided, audit that path. Otherwise, files changed since the default branch. Full-codebase audit requires explicit user request.

Find unjustified deviations from the codebase's own conventions and unify toward what already dominates.

Count occurrences — if >60% of the codebase solves a problem one way, outliers unify toward it. Never introduce a pattern the project doesn't already use, even if theoretically superior: consistency outweighs local optimality. What matters most, in order: same problem solved the same way (data access, error handling, async, validation, configuration); reimplementations of utilities that already exist in the codebase — the inline duplicate is the divergence, the fix is to import; naming conventions detected from existing code, not imposed; predictable API/CLI/interface shape across public surfaces; import ordering and zero unused imports or dependencies. Justified variance exists — external library requirements, proven constraints, framework boundaries — so use `git log` on divergent files: recent divergence is usually accidental, old divergence may be intentional. Demand evidence, not vibes. When the dominant pattern itself is wrong, flag it separately as a refactor candidate rather than spreading it further.
