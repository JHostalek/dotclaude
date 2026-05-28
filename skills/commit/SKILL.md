---
name: commit
description: Use when the user asks to commit, create a git commit, checkpoint changes, save work to git, or write a commit message.
---

Branching + push are covered by standing orders (ship-by-default: branch first on `main`/`master`, push after commit). This skill adds the deltas:

## Wrong-branch check

Changes don't match branch name (auth changes on `feature/geo-optimization`) → likely wrong branch, confirm w/ user before committing.

## Commit Format

!`cat ~/.claude/skills/conventional-commits.md`

Imperative mood ("add OAuth flow" not "added OAuth flow"). Capture *intent*, not implementation — diff shows what changed. Can't write a focused message → commit spans unrelated changes, split it. Wrap body at ~80 chars (commitlint max 100).
