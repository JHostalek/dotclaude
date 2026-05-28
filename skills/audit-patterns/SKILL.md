---
name: audit-patterns
description: Use when auditing and unifying pattern consistency in a scope — divergent implementations of the same concern, reimplementations of existing utilities, naming violations, import disorder, unused dependencies. Triggers on "audit patterns", "fix inconsistencies", "unify conventions", "fix reimplementations", "pattern review".
argument-hint: [path]
---

target = $ARGUMENTS

If target provided, audit that path. Otherwise, files changed since the default branch. Full-codebase audit requires explicit user request.

Find and fix unjustified deviations from the codebase's own conventions, unifying outliers toward what already dominates.

Count occurrences — if >60% of the codebase solves a problem one way, unify outliers toward it. Never introduce a pattern the project doesn't already use, even if theoretically superior: consistency outweighs local optimality. What matters most, in order: same problem solved the same way (data access, error handling, async, validation, configuration); reimplementations of utilities that already exist in the codebase — the inline duplicate is the divergence, the fix is to import; naming conventions detected from existing code, not imposed; predictable API/CLI/interface shape across public surfaces; import ordering and zero unused imports or dependencies. Justified variance exists — external library requirements, proven constraints, framework boundaries — so check `git log` on divergent files: recent divergence is usually accidental, old divergence may be intentional.

Apply the unification fixes directly: import the existing utility, rename to the dominant convention, reorder imports, drop unused dependencies. Run tests and lint after the batch; report `git diff --stat` and the dominant patterns enforced. When the dominant pattern itself is wrong, name it, sketch the right unified fix, and surface for sign-off before propagating — sweeping the majority pattern is a separate decision from cleaning up outliers.
