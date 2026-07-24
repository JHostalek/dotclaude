# Audit Workflow Engine

Shared shape for the audit skills. Run it with the `Workflow` tool; handle branch setup and integration inline instead of pulling in separate git-workflow skills.

**Find wide, then filter.** Collect every candidate the lens surfaces before judging any of them, then make one pass over the collected list applying the dimension's noise bar. The noise bars say what to drop in that second pass, never what to skip seeing — a filter applied while searching lowers what you find.

**Shape.** One agent per phase group, each in its own worktree (`agent(..., { isolation: 'worktree' })`) off the same base — fan out in parallel; each runs its dimensions' lenses, applies its auto-fix findings, gates, commits on its branch. Then integrate the green branches **sequentially** (never octopus) in phase order, gating after each. A merge that conflicts or turns the gate red goes to a reconcile agent handed both sides' *findings* — resolve by intent, not by splicing diffs. Revert-on-red. Then gate once on the result, commit, open/update the PR, tear the worktrees down.

**Phase groups — restructuring before content, comments last:**

1. `necessity → structure` — changes which files exist
2. `patterns → correctness → error-handling` — behavior and convention
3. `logs → perf → security` — cross-cutting concerns
4. `tests → complexity → comments` — coverage and surface

One worktree per group, not per dimension: eleven agents multiply cost and contention for work that integrates in four ordered batches. Split a group across worktrees only when its scope is large enough that its dimensions won't finish together.

These eleven dimensions are required baseline coverage, not a claim that every repository risk fits one of them. When the scope exposes a materially distinct concern, add a focused pass or assign it to the closest dimension; do not silently drop baseline coverage. Place an added pass in the group whose dependencies make it safest to integrate.

`necessity`/`structure` change which files exist; content edits must land on the settled layout (a content edit rebased onto a moved file is a path remap; the reverse conflicts on every pending diff). Keep "move a file" and "edit its contents" in separate commits so rename detection survives.

**auto-fix vs sign-off.** Apply auto-fix: behavior-preserving or unambiguously correct, no user-facing change, safe pattern already present in the codebase. Never apply sign-off: removes/changes a user-facing capability, rotates secrets, migrates auth/crypto/token format, or is genuinely ambiguous (could be the bug *or* the spec) — collect it into the PR body with evidence + recommendation. Hard-coded secret → stop and surface; a delete-only "fix" doesn't help, it's already in history.

**Reconcile watch-out.** The failure that matters is a textually-clean merge that's semantically broken — only the gate catches it, never the merge algorithm. So gate every branch before it joins, attribute hunks to their dimension so a red reverts surgically, and isolate anything stateful (ports, DB, caches) two worktrees would contend on.

**Scope.** Path arg → that subtree; none → files changed vs the default branch; full repo only on explicit request. Tiny scope or a single dimension → skip the worktrees, run inline.
