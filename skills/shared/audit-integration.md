# Audit Integration

Orchestration for a sweep of two or more dimensions: fan out in parallel worktrees, integrate in dependency order, land one PR. Assumes the shared discipline in `audit-workflow.md`. Requesting a sweep is the authorization to fan out — spawn the group agents without asking; the one-agent-per-group rule is the damper.

**Phase groups — restructuring before content, comments last:**

1. `necessity → structure` — changes which files exist
2. `patterns → correctness → error-handling` — behavior and convention
3. `logs → perf → security` — cross-cutting concerns
4. `tests → complexity → comments` — coverage and surface

`necessity`/`structure` change which files exist, so content edits must land on the settled layout: a content edit rebased onto a moved file is a path remap; the reverse conflicts on every pending diff.

One agent per group, each in its own worktree (`Agent(..., { isolation: 'worktree' })`) off the same base — fan out in parallel; each runs its dimensions' lenses, applies its auto-fix findings, gates, commits on its branch. One worktree per group, not per dimension: eleven agents multiply cost and contention for work that integrates in four ordered batches. Split a group across worktrees only when its scope is large enough that its dimensions won't finish together.

The eleven dimensions are required baseline coverage, not a claim that every repository risk fits one of them. When the scope exposes a materially distinct concern, add a focused pass or assign it to the closest dimension; do not silently drop baseline coverage. Place an added pass in the group whose dependencies make it safest to integrate.

**Integrate the green branches sequentially** (never octopus) in phase order, gating after each. Revert-on-red. Then gate once on the result, commit, open/update the PR, tear the worktrees down.

The failure that matters is a textually-clean merge that's semantically broken — only the gate catches it, never the merge algorithm. So gate every branch before it joins, attribute hunks to their dimension so a red reverts surgically, and isolate anything stateful (ports, DB, caches) two worktrees would contend on. A merge that conflicts or turns the gate red goes to a reconcile agent handed both sides' *findings* — resolve by intent, never by splicing diffs; hand it `skills/shared/conflict-heuristics.md`, plus `skills/shared/migration-reconciliation.md` when migrations are in the conflict set.
