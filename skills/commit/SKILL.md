---
name: commit
description: Use when the user asks to commit, create a git commit, checkpoint changes, save work to git, or write a commit message.
---

Branching + push are covered by standing orders (ship-by-default). This skill adds the deltas:

## Verify the staged set first

Reconcile state before composing the message: `git diff --cached` (what you're committing) vs `git diff HEAD` (net worktree). A pre-existing index is NOT implicitly yours or intended — a divergence (`index ≠ worktree`) is often aborted-hook `stage_fixed` residue, rebase leftovers, or another agent's partial stage. Investigate, don't blind-commit. Stage whole files (`git add <path>`), never partial hunks — partial staging + an aborted commit orphans fixer output into the index; so does a path-scoped `git commit -- <paths>` (git `--only`) on success (it restores the pre-hook index, dropping the fixer's re-stage) → follow such commits with `git reset -q -- <paths>`.

## Wrong-branch check

Changes don't match branch name (auth changes on `feature/geo-optimization`) → likely wrong branch, confirm w/ user before committing.

## Commit Format

!`cat ~/.claude/skills/conventional-commits.md`

Imperative mood ("add OAuth flow" not "added OAuth flow"). Capture *intent*, not implementation. Can't write a focused message → commit spans unrelated changes, split it. Wrap body at ~80 chars (commitlint max 100).
