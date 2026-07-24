# Audit Workflow Engine

Shared discipline for every audit dimension, whether it runs alone or inside a sweep. Handle branch setup and commits inline — don't invoke the `merge`/`rebase`/`pr` skills mid-audit, they gate and push on their own terms.

Running more than one dimension? Orchestration — phase groups, parallel worktrees, integration order, reconcile, PR — is in `skills/audit-integration.md`.

**Scope first.** Path arg → that subtree; none → files changed vs the default branch; full repo only on explicit request. Tiny scope or a single dimension → skip the worktrees and run inline.

**Find wide, then filter.** Collect every candidate the lens surfaces before judging any of them, then make one pass over the collected list applying the dimension's noise bar. The noise bars say what to drop in that second pass, never what to skip seeing — a filter applied while searching lowers what you find. A dimension's probe list is a floor: skip one of its listed probes only when the scoped system cannot exercise it.

**auto-fix vs sign-off.** Apply auto-fix: behavior-preserving or unambiguously correct, no user-facing change, safe pattern already present in the codebase. Never apply sign-off: removes/changes a user-facing capability, rotates secrets, migrates auth/crypto/token format, or is genuinely ambiguous (could be the bug *or* the spec) — collect it into the PR body with evidence + recommendation. Hard-coded secret → stop and surface; a delete-only "fix" doesn't help, it's already in history.

Keep "move a file" and "edit its contents" in separate commits so rename detection survives.

**Reporting.** Dimensions run, auto-fixes applied, findings escalated, gate result. The PR body carries the sign-off findings — evidence and recommendation each; it is not a prose retelling of the diff.
