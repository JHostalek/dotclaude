---
name: worktree-clean
description: Use when removing a git worktree and cleaning up its associated local branch from the main repository.
argument-hint: [worktree-path]
allowed-tools: Bash
---
worktree_path = $ARGUMENTS

Remove a local worktree and delete its associated local branch. If no argument is provided, list worktrees and ask which to remove.

## Local Only

Scope is local git state — worktrees and local branches. Remote branches carry invisible state: open MRs, CI pipelines, review comments, deployment triggers. Deleting a remote branch can auto-close an MR and destroy that context silently. The user owns remote-branch deletions.

## Submodules

Submodules initialized inside a worktree store git state under `.git/worktrees/{name}/modules/{submodule}`. This is cleaned up when the parent worktree is removed — no separate step for submodules.

## When Removal Resists

`git worktree remove` fails on unclean state; `git branch -d` fails on unmerged branches. Investigate first — `git status`, `git diff`, whether the branch was pushed or has a merged MR. Trivial leftovers (build artifacts, debug logs, already-pushed-or-merged work) justify forcing autonomously. Substantive uncommitted or unmerged work — describe what you found and let the user decide.

Run `git worktree prune` after removal to clear stale internal references.
