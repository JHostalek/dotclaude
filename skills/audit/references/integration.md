# Integrating audit dimensions

Follow [workflow.md](workflow.md). Review a tiny scope inline. For larger scopes, delegate independent groups only where parallel work helps; choose groups around dependencies and overlapping files, without a fixed agent quota. Preserve all selected coverage.

Integrate corrections in this order so content edits follow the settled layout:
1. `necessity → structure`
2. `patterns → contracts → correctness → data-integrity → error-handling`
3. `logs → perf → reliability → security`
4. `tests → complexity → comments`

Start independent reviews from the same base. Use isolated worktrees when the user and calling workflow permit them, or candidate copies outside Git. Isolate ports, databases, and caches when checks use them. Keep changes attributable to their dimensions.

When the calling workflow requires the current checkout, reviewers inspect the same unchanged state read-only. The orchestrator applies validated findings sequentially in the order above, rechecking against evolving files and running relevant gates. Create no branches or worktrees. If delegation is unavailable, perform the selected passes sequentially with the same coverage.

Integrate successful results sequentially, verifying each. If integration fails, undo only the failing audit changes while preserving pre-existing work. Resolve intent using [conflict heuristics](../../shared/conflict-heuristics.md) and, when applicable, [migration reconciliation](../../shared/migration-reconciliation.md). A clean textual merge is insufficient evidence of correctness.

Run the final gate and clean up only audit-created workspaces. Publication requires the user's authorization; otherwise leave corrections local. Report deferred coverage and failed gates explicitly.
