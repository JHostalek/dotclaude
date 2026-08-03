---
name: yeet
description: Implement work in a dedicated worktree, open and merge a PR, optionally run and fix a full audit when invoked with "with audit", then sync the local default branch. Invoke only with /yeet.
---

input = $ARGUMENTS

Set `audit_requested` only when `input` contains the standalone phrase `with audit`, case-insensitively. Remove that phrase from `input`; the remainder is `work`. If no work remains, stop and ask for it.

Complete this workflow in order:

1. Before any remote, Git, or file mutation, run [resolve-skill.mjs](scripts/resolve-skill.mjs) once from the task's working directory. Resolve `mattpocock-skills:implement mattpocock-skills:tdd mattpocock-skills:code-review mattpocock-skills:setup-matt-pocock-skills jhostalek-skills:pr`; append `jhostalek-skills:audit` only when `audit_requested`. Command: `node <resolved-script-path> --cwd <task-cwd> <skills...>`. Read every returned `path` completely and follow those instructions when invoked below. Treat unqualified skill references in a loaded plugin skill as belonging to that plugin's namespace. Stop before making changes if any requested dependency is missing, disabled, ambiguous, or unreadable.
2. Fetch the remote and ensure the current checkout is a dedicated linked worktree on a non-default branch. Verify it with `git worktree list --porcelain` and the current branch. If not, create a dedicated worktree on a new feature branch from the latest `origin/<default-branch>` and continue there. Never move uncommitted changes or repurpose a dirty/shared checkout.
3. Use `mattpocock-skills:implement` for the requested work.
4. Use `jhostalek-skills:pr` to create or update the PR.
5. When `audit_requested`, use `jhostalek-skills:audit` for a full audit, pragmatically fix every valid finding within scope, then use `jhostalek-skills:pr` again to push the fixes and update the PR. Otherwise skip this step.
6. Merge the PR with the repository host's CLI and delete the source branch.
7. Find the worktree that has the repository's default branch checked out and fast-forward it with `git -C <default-worktree> pull --ff-only origin <default-branch>` so the local default branch contains the merge. Do not try to check out the default branch in the feature worktree.

Stop if a required skill, PR, check, or approval blocks the next step. Never bypass branch protection or failing required checks.
