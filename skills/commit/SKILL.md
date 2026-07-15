---
name: commit
description: Use when the user asks to commit, create a git commit, checkpoint changes, save work to git, or write a commit message.
---

The global instruction authorizes committing and pushing verified work. This skill ensures the staged set, branch, and message are intentional before that happens.

## Verify the staged set first

Check `git diff --cached` (staged) against `git diff HEAD` (full worktree) before composing the message. When they diverge, the pre-existing index is likely residue from an aborted hook, rebase leftover, or another agent's partial stage — treat it as suspect, not yours, until confirmed. Stage whole files (`git add <path>`); partial-hunk staging orphans fixer output into the index if the commit is aborted later. One gotcha: a path-scoped `git commit -- <paths>` (git's `--only` mode) restores the pre-hook index on success and drops any fixer re-staging — follow such commits with `git reset -q -- <paths>` to clear it.

## Wrong-branch check

Changes don't match branch name (auth changes on `feature/geo-optimization`) → likely wrong branch, confirm w/ user before committing.

## Commit Format

!`cat ~/.claude/skills/conventional-commits.md`

Imperative mood ("add OAuth flow" not "added OAuth flow"). Capture *intent*, not implementation. Can't write a focused message → commit spans unrelated changes, split it. Wrap body at ~80 chars (commitlint max 100).
