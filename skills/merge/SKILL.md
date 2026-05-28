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

## Migration Reconciliation

Merge produces a merge commit but does NOT execute the target's new migrations against the local database. The DB version marker still holds the old revision — the app crashes at runtime on missing schema objects.

**Re-chain:** update the feature migration's parent revision to point to the target's chain tip. Update declared head tracking if the project tracks migration head outside alembic (check project CLAUDE.md/TOOLS.md).

**Re-ID if non-monotonic.** Re-pointing `down_revision` alone is not sufficient. If the feature's own revision ID is now ≤ any upstream ID in the new chain, the chain violates monotonic-timestamp rules and silently breaks any DB already stamped at that ID — alembic reports head, skips the inserted middle, app crashes on missing columns. Fix: generate a fresh `date +%Y%m%d%H%M%S`, update `revision: str = …` inside the file, rename the file to match, update project head tracking.

**Verify chain:** run `alembic history` and confirm revision IDs are non-decreasing along the chain.

**Apply to local DB:**
- DB at target's tip → only the feature migration needs applying.
- DB at feature's old pre-merge revision → stamp to the fork point (stamp moves the pointer without executing destructive down-migrations), then upgrade.
- DB stamped at the feature revision but upstream migrations between fork and feature were inserted later → re-running the feature crashes. Stamp back to the fork point, `upgrade <last-upstream-rev>` (not `head`), then `stamp <feature-rev>`.

## Merge Commit Message

Pre-commit hooks often reject the default `Merge branch 'X' into Y`. Use conventional commit format and pass it explicitly:

```
git merge origin/{target} -m "chore: merge {target} into {current-branch}"
```

Same format for follow-up `git commit` after staging conflict resolutions. Notable decisions go in the commit body.

## Execution

Announce the merge plan before starting — divergence (commits ahead/behind), target branch. `/merge` is intent to push; no confirmation after the plan. Gate before pushing.

**Report:** commits integrated, conflicts resolved, migration reconciliation, gate results.
