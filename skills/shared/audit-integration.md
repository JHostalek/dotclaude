# Audit Integration

Orchestration for a sweep of two or more dimensions: fan out in parallel isolated workspaces, integrate in dependency order, land one PR. Assumes the shared discipline in `audit-workflow.md`. Requesting a sweep is the authorization to delegate the phase groups without asking; the one-agent-per-group rule is the damper.

**Phase groups — restructuring before content, comments last:**

1. `necessity → structure` — changes which files exist
2. `patterns → contracts → correctness → data-integrity → error-handling` — behavior, interfaces, and state
3. `logs → perf → reliability → security` — operations and cross-cutting concerns
4. `tests → complexity → comments` — coverage and surface

`necessity`/`structure` change which files exist, so content edits must land on the settled layout: a content edit rebased onto a moved file is a path remap; the reverse conflicts on every pending diff.

One agent per group, each in an isolated worktree off the same base. Use the host's native delegation and workspace-isolation mechanisms; this workflow does not prescribe tool syntax. Fan out the groups in parallel. Each agent runs its dimensions in order, applies validated fixes, gates, and commits on its branch. One worktree per group, not per dimension: fourteen agents multiply cost and contention for work that integrates in four ordered batches. Split a group only when the scope is large enough and its subscopes do not overlap.

The fourteen dimensions are required baseline coverage, not a claim that every repository risk fits one of them. When the scope exposes a materially distinct concern, add a focused pass or assign it to the closest dimension; do not silently drop baseline coverage. Place an added pass in the group whose dependencies make it safest to integrate.

**Integrate the green branches sequentially** (never octopus) in phase order, gating after each. Revert-on-red. Then gate once on the result, commit, open/update the PR, tear the worktrees down.

The failure that matters is a textually-clean merge that's semantically broken — only the gate catches it, never the merge algorithm. So gate every branch before it joins, attribute hunks to their dimension so a red reverts surgically, and isolate anything stateful (ports, DB, caches) two worktrees would contend on. A merge that conflicts or turns the gate red goes to a reconcile agent handed both sides' *findings* — resolve by intent, never by splicing diffs; hand it `skills/shared/conflict-heuristics.md`, plus `skills/shared/migration-reconciliation.md` when migrations are in the conflict set.
