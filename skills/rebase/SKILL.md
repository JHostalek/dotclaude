---
name: rebase
description: Use when the user asks to rebase the current branch onto another branch or update branch history without merging.
argument-hint: "[target-branch] (defaults to master/main)"
---
input = $ARGUMENTS

Rebase the current feature branch onto a target branch. Goal: clean linear history, ready to push.

## Conflict Resolution

**Heuristics:**
- **Lockfiles, migrations, config, version bumps** — accept the target branch version (latest agreed-upon state).
- **Refactored-away code** — the target's removal wins. Rewire to the new location/API.
- **Additive conflicts** (both sides add independent code) — keep both, but verify structural integrity: run the project's formatter/parser immediately after resolution. Conflict boundaries often leave orphan closing tags, duplicate brackets, or stray blocks that grep won't catch but a parser will.

**Partial survival check:** When a resolution keeps *usage* of a symbol (component, function, import), verify the *declaration* and *import* also survived. Grep the resolved file for every feature-side symbol before continuing.

## Migration Reconciliation

Rebase re-chains revision pointers in migration files but does NOT execute the target's new migrations against the local database. The DB version marker still holds the old revision, so the app crashes at runtime on missing schema objects.

**Re-chain:** update the feature migration's parent revision to point to the target's chain tip. Update any declared head tracking (if the project tracks migration head outside alembic — check project CLAUDE.md/TOOLS.md).

**Re-ID if non-monotonic.** Re-pointing `down_revision` alone is not sufficient. If the feature's own revision ID is now ≤ any upstream ID in the new chain, the chain violates monotonic-timestamp rules and silently breaks any DB already stamped at that ID — alembic reports head, skips the inserted middle, app crashes on missing columns. Fix: generate a fresh `date +%Y%m%d%H%M%S`, update `revision: str = …` inside the file, rename the file to match, update project head tracking.

**Verify chain:** run `alembic history` and confirm revision IDs are non-decreasing along the chain.

**Apply to local DB:**
- DB at target's tip → only the feature migration needs applying.
- DB at feature's old pre-rebase revision → stamp to the fork point (stamp moves the pointer without executing destructive down-migrations), then upgrade.
- DB stamped at the feature revision but upstream migrations between fork and feature were inserted later → re-running the feature crashes. Stamp back to the fork point, `upgrade <last-upstream-rev>` (not `head`), then `stamp <feature-rev>`.

## Flow

1. **Present rebase plan.** Commits ahead, target branch. Start after presenting.
2. **Rebase.** Resolve conflicts per heuristics above. Run formatter/parser after each conflict resolution to catch structural damage early.
3. **Reconcile migrations** if any migration files were touched (re-chain + apply to local DB if running).
4. **Run quality gates** — rebase bypasses pre-commit hooks; QG is the only safety net. Use the project's gate commands from TOOLS.md.
5. **Force-push with `--force-with-lease`.** Invoking `/rebase` is intent to push; no additional confirmation needed.

**Report:** commits applied/dropped, conflicts resolved, migration reconciliation results, quality gate results.
