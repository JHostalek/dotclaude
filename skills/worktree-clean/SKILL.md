---
name: worktree-clean
description: Use when removing a git worktree and cleaning up its associated local branch from the main repository.
argument-hint: [worktree-path]
allowed-tools: Bash
---
worktree_path = $ARGUMENTS

Remove a local worktree and delete its associated local branch. No argument → list worktrees and ask which to remove.

## Local Only

Remote branches carry invisible state — open MRs, CI pipelines, review comments, deployment triggers — deleting one can auto-close an MR silently. User owns remote-branch deletions.

## When Removal Resists

`git worktree remove` fails on unclean state; `git branch -d` fails on unmerged branches. Trivial leftovers (build artifacts, debug logs, already-pushed-or-merged work) → force autonomously. Substantive uncommitted or unmerged work → describe findings, let user decide.

Run `git worktree prune` after removal to clear stale internal references.
