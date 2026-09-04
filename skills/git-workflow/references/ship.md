# End-to-end shipping

Use this mode only when explicitly requested, including through `/yeet`. It authorizes the requested implementation, commits, push, PR/MR creation or update, merge, and deletion of its remote source branch.

Work in the current checkout and branch. Do not create, select, switch, synchronize, or remove local branches or worktrees. If the current branch cannot support a PR into the intended target, report that specific blocker rather than changing checkouts. Preserve unrelated work.

Treat the standalone phrase `with audit` case-insensitively as the optional audit request. Remove that control phrase when identifying the actual work; if no work remains and none is established in context, ask for it.

Complete in order:

1. Implement the requested work, review the diff, and run the relevant checks.
2. Follow [commit conventions](commit.md), then [PR conventions](pr.md) to commit, push, and create or update the PR/MR.
3. If `with audit` was requested, run the [full audit procedure](../../audit/references/workflow.md) in its current-checkout mode: read-only reviews with sequential fixes, or sequential passes, without creating worktrees or branches. Fix validated in-scope findings, verify, commit, push, and update the PR. Audit authorization does not settle product decisions or other approvals reserved for the user.
4. Check the final pushed revision and PR state. Merge through the repository host only when required checks and approvals allow it. If the final revision changes during review, re-check its status before merging. Never bypass branch protection or failing checks.
5. Verify the remote merge and remove its remote source branch. Use cleanup that leaves the local branch and checkout unchanged; do not use a helper that switches or deletes local branches. Do not pull or synchronize the local checkout after merging.

Continue through transient pending checks. Stop for a missing required dependency, unresolved failure, permission, approval, or incompatible checkout, and state the completed steps and exact blocker. Keep any completed work available for resumption.

Report the merged PR/MR URL and remote merge commit, or a precise incomplete status. Report remote branch-cleanup failure separately from a successful merge.
