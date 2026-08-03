---
name: yeet
description: Implement work in a dedicated worktree, open and merge a PR, optionally run and fix a full audit when invoked with "with audit", then sync the local default branch. Invoke only with /yeet.
---

input = $ARGUMENTS

Set `audit_requested` only when `input` contains the standalone phrase `with audit`, case-insensitively. Remove that phrase from `input`; the remainder is `work`. If no work remains, stop and ask for it.

Complete this workflow in order:

1. Before any remote, Git, or file mutation, run [resolve-skill.mjs](scripts/resolve-skill.mjs) once from the task's working directory. Resolve `mattpocock-skills:implement mattpocock-skills:tdd mattpocock-skills:code-review mattpocock-skills:setup-matt-pocock-skills jhostalek-skills:pr`; append `jhostalek-skills:audit` only when `audit_requested`. Command: `node <resolved-script-path> --cwd <task-cwd> <skills...>`. Read every returned `path` completely and follow those instructions when invoked below. Treat unqualified skill references in a loaded plugin skill as belonging to that plugin's namespace. Stop before making changes if any requested dependency is missing, disabled, ambiguous, or unreadable.
2. Fetch the remote, resolve its default branch, and inspect the current checkout with `git worktree list --porcelain`, `git status --porcelain`, its branch, and its absolute path. Reuse a clean linked worktree already under Codex's worktree root or the repository's `.claude/worktrees`; when it is detached, create and switch to the new feature branch from latest `origin/<default-branch>` in that same worktree. Never create one worktree from another. Only when the current checkout is the default/shared checkout, create a dedicated worktree under Codex's worktree root (or the repository's `.claude/worktrees` under Claude), record its path for cleanup, and continue there. Never create a sibling checkout beside the repository or directly under `Documents`; never move uncommitted changes or repurpose a dirty/shared checkout.
3. Use `mattpocock-skills:implement` for the requested work.
4. Use `jhostalek-skills:pr` to create or update the PR.
5. When `audit_requested`, use `jhostalek-skills:audit` for a full audit, pragmatically fix every valid finding within scope, then use `jhostalek-skills:pr` again to push the fixes and update the PR. Otherwise skip this step.
6. Merge the PR with the repository host's CLI and delete the source branch.
7. After merging, find the worktree that has the repository's default branch checked out and run `git -C <default-worktree> pull --ff-only origin <default-branch>`. Do not skip this merely because the worktree is dirty: let Git determine whether the update is safe. Stop without stashing, resetting, or discarding anything only if Git proves the update would overwrite work or cannot fast-forward. Do not try to check out the default branch in the feature worktree.
8. Remove the workflow-created worktree when it is clean, including after a controlled early stop; never force-remove a dirty worktree. Do not remove a Codex- or Claude-managed worktree that the task started in. Report any retained path and why it remains.

Stop if a required skill, PR, check, or approval blocks the next step. Never bypass branch protection or failing required checks.

Report remote and local default-branch state separately in plain language: `Remote <branch>: merged at <sha>` and either `Local <branch>: synced at <sha>` or `Local <branch>: not synced because <specific reason and affected paths>`. Also report worktree cleanup status.
