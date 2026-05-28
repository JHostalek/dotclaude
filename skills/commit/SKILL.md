---
name: commit
description: Use when the user asks to commit, create a git commit, checkpoint changes, save work to git, or write a commit message.
---

## Branch Safety

- On `main`/`master`: do not commit there. Auto-create `<type>/<short-slug>` feature branch from the changes (`fix/dialog-overflow`, `feat/oauth-flow`), then commit.
- Changes don't match branch name (auth changes on `feature/geo-optimization`) → likely wrong branch, confirm w/ user before committing.

## Commit Format

!`cat ~/.claude/skills/conventional-commits.md`

Imperative mood ("add OAuth flow" not "added OAuth flow"). Capture *intent*, not implementation — diff shows what changed. Can't write a focused message → commit spans unrelated changes, split it. Wrap body at ~80 chars (commitlint max 100).

## Push

`/commit` authorizes push. After a successful commit, push to the tracked remote — don't ask (overrides "ask before pushing" default).

Ask first only for: `--force` / `--force-with-lease`, pushes to `main`/`master`, or hook-bypass flags.
