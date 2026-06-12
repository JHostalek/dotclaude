---
name: qg
description: Run the project's quality gates (format, lint, typecheck, tests, build) and report pass/fail. Manual-only — invoke ONLY when the user explicitly types /qg or /qg all; do NOT auto-trigger after edits during implementation (pre-push hooks are the gate enforcer).
argument-hint: [path]
---

Run format, lint (auto-fix), typecheck, tests, build — scoped to $ARGUMENTS when provided, else **touched package/workspace** (e.g. `pnpm --filter <pkg> typecheck`), NOT the whole tree. Whole-tree (`pnpm -r …`) only on explicit `/qg all` — pre-push/CI backstop, not the inner loop. Detect configured gates; skip absent ones (no test script → skip Tests).

## Report Format

| Gate      | Status    | Issues               |
| --------- | --------- | -------------------- |
| Format    | PASS/FAIL | — or N files changed |
| Lint      | PASS/FAIL | — or N errors        |
| Typecheck | PASS/FAIL | — or N errors        |
| Tests     | PASS/FAIL | N/M passed           |
| Build     | PASS/FAIL | — or error           |

On failure: top 3 issues as `file:line` — not full error dumps.
