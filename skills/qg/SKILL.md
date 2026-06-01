---
name: qg
description: Use after making changes to run the project's quality gates and report pass or fail for each relevant check.
argument-hint: [path]
---

Run the project's quality gates — format, lint (auto-fix), typecheck, tests, build — scoped to $ARGUMENTS when provided, else to the **touched package/workspace** by default (e.g. `pnpm --filter <pkg> typecheck`), NOT the whole tree. Whole-tree (`pnpm -r …`) only on explicit `/qg all` — that's the pre-push/CI backstop, not the inner loop. Detect configured gates from the project; skip what isn't there (no test script → skip Tests).

## Report Format

| Gate      | Status    | Issues               |
| --------- | --------- | -------------------- |
| Format    | PASS/FAIL | — or N files changed |
| Lint      | PASS/FAIL | — or N errors        |
| Typecheck | PASS/FAIL | — or N errors        |
| Tests     | PASS/FAIL | N/M passed           |
| Build     | PASS/FAIL | — or error           |

On failure: top 3 issues as `file:line` — not full error dumps.
