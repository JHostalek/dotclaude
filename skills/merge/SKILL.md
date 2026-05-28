---
name: merge
description: Use when the user asks to merge another branch into the current branch, pull upstream changes without rebasing, or resolve merge conflicts.
argument-hint: "[target-branch] (defaults to master/main)"
---
input = $ARGUMENTS

Merge a target branch into the current feature branch.

Use `git merge origin/{target}` (remote-tracking ref, not local branch).

## Conflict Resolution

- **Lockfiles, migrations, config, version bumps** — accept the target version (latest agreed state), then regenerate lockfiles.
- **Refactored-away code** — target's removal wins; rewire to the new location/API.
- **Additive conflicts** (both sides add independent code) — keep both, then run the project's formatter/parser. Conflict boundaries leave orphan closing tags, duplicate brackets, and stray blocks that grep misses but a parser catches.

**Partial survival:** when a resolution keeps *usage* of a symbol, verify the *declaration* and *import* also survived. Grep the resolved file for every feature-side symbol before continuing.

!`cat ~/.claude/skills/migration-reconciliation.md`

## Merge Commit Message

Pre-commit hooks often reject the default `Merge branch 'X' into Y`. Use conventional commit format and pass it explicitly:

```
git merge origin/{target} -m "chore: merge {target} into {current-branch}"
```

Same format for follow-up `git commit` after staging conflict resolutions. Notable decisions go in the commit body.

## Execution

Announce the merge plan before starting — divergence (commits ahead/behind), target branch. `/merge` is intent to push; no confirmation after the plan. Gate before pushing.

**Report:** commits integrated, conflicts resolved, migration reconciliation, gate results.
