---
name: yeet
description: Implement work in a dedicated worktree, open a PR, run and fix a full audit, update and merge the PR, then sync the local default branch. Invoke only with /yeet.
argument-hint: "[spec, ticket, or task]"
disable-model-invocation: true
---

work = $ARGUMENTS

Complete this workflow in order:

1. Before touching task files, fetch the remote and ensure the current checkout is a dedicated linked worktree on a non-default branch. Verify it with `git worktree list --porcelain` and the current branch. If not, create a dedicated worktree on a new feature branch from the latest `origin/<default-branch>` and continue there. Never move uncommitted changes or repurpose a dirty/shared checkout.
2. Use `/mattpocock-skills:implement` for the requested work.
3. Use `/jhostalek-skills:pr` to create or update the PR.
4. Use `/jhostalek-skills:audit` for a full audit. Pragmatically fix every valid finding within scope.
5. Use `/jhostalek-skills:pr` again to push the audit fixes and update the PR.
6. Merge the PR with the repository host's CLI and delete the source branch.
7. Find the worktree that has the repository's default branch checked out and fast-forward it with `git -C <default-worktree> pull --ff-only origin <default-branch>` so the local default branch contains the merge. Do not try to check out the default branch in the feature worktree.

Stop if a required skill, PR, check, or approval blocks the next step. Never bypass branch protection or failing required checks.
