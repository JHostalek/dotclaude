---
name: rebase
description: Use when the user asks to rebase the current branch onto another branch or update branch history without merging.
argument-hint: "[target-branch] (defaults to master/main)"
---
input = $ARGUMENTS

Goal: clean linear history, ready to push.

## Conflict Resolution

**Heuristics:**
- **Lockfiles, migrations, config, version bumps** — accept the target branch version (latest agreed-upon state).
- **Refactored-away code** — the target's removal wins. Rewire to the new location/API.
- **Additive conflicts** (both sides add independent code) — keep both; verify structural integrity: run the project's formatter/parser immediately after resolution. Conflict boundaries often leave orphan closing tags, duplicate brackets, or stray blocks that grep won't catch but a parser will.

**Partial survival check:** When resolution keeps *usage* of a symbol (component, function, import), verify the *declaration* and *import* also survived. Grep the resolved file for every feature-side symbol before continuing.

!`cat ~/.claude/skills/migration-reconciliation.md`

## Flow

1. **Present rebase plan.** Commits ahead, target branch. Start after presenting.
2. **Rebase.** Resolve conflicts per heuristics above; run formatter/parser after *each* resolution to catch structural damage early.
3. **Reconcile migrations** if any migration files were touched (re-chain + apply to local DB if running).
4. **Run quality gates** — rebase bypasses pre-commit hooks; QG is the only safety net. Use gate commands from TOOLS.md.
5. **Force-push with `--force-with-lease`.** Invoking `/rebase` = intent to push; no additional confirmation needed.

**Report:** commits applied/dropped, conflicts resolved, migration reconciliation results, quality gate results.
