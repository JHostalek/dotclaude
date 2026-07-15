# Audit Workflow Engine

Shared shape for the audit skills. Run it with the `Workflow` tool; handle branch setup and integration inline instead of pulling in separate git-workflow skills.

**Shape.** One agent per dimension, each in its own worktree (`agent(..., { isolation: 'worktree' })`) off the same base — fan out in parallel; each finds → verifies by trying to refute → applies its auto-fix findings → gates → commits on its branch. Then integrate the green branches **sequentially** (never octopus) in the order below, gating after each. A merge that conflicts or turns the gate red goes to a reconcile agent handed both sides' *findings* — resolve by intent, not by splicing diffs. Revert-on-red. Then gate once on the result, commit, open/update the PR, tear the worktrees down.

**Order — restructuring before content, comments last:**

`necessity → structure → patterns → correctness → error-handling → logs → perf → security → tests → complexity → comments`

These eleven dimensions are required baseline coverage, not a claim that every repository risk fits one of them. When the scope exposes a materially distinct concern, add a focused pass or assign it explicitly to the closest dimension; combine overlapping work where that improves the result, but do not silently drop baseline coverage. Place any added pass where its dependencies make it safest to integrate.

`necessity`/`structure` change which files exist; content edits must land on the settled layout (a content edit rebased onto a moved file is a path remap; the reverse conflicts on every pending diff). Keep "move a file" and "edit its contents" in separate commits so rename detection survives.

**auto-fix vs sign-off.** Apply auto-fix: behavior-preserving or unambiguously correct, no user-facing change, safe pattern already present in the codebase. Never apply sign-off: removes/changes a user-facing capability, rotates secrets, migrates auth/crypto/token format, or is genuinely ambiguous (could be the bug *or* the spec) — collect it into the PR body with evidence + recommendation. Hard-coded secret → stop and surface; a delete-only "fix" doesn't help, it's already in history.

**Reconcile watch-out.** The failure that matters is a textually-clean merge that's semantically broken — only the gate catches it, never the merge algorithm. So gate every branch before it joins, attribute hunks to their dimension so a red reverts surgically, and isolate anything stateful (ports, DB, caches) two worktrees would contend on.

**Scope.** Path arg → that subtree; none → files changed vs the default branch; full repo only on explicit request. Tiny scope or a single dimension → skip the worktrees, run inline.
