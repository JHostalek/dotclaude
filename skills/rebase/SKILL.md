---
name: rebase
description: Use when the user asks to rebase the current branch onto another branch or update branch history without merging.
argument-hint: "[target-branch] (defaults to master/main)"
---
input = $ARGUMENTS

Goal: clean linear history, ready to push.

## Conflict resolution heuristics

- **Lockfiles, migrations, config, version bumps** — accept the target branch version (latest agreed-upon state).
- **Refactored-away code** — the target's removal wins; rewire usages to the new location/API.
- **Additive conflicts** (both sides add independent code) — keep both; run the project's formatter/parser immediately after each resolution. Conflict boundaries often leave orphan closing tags, duplicate brackets, or stray blocks that grep won't catch but a parser will.

**Partial survival check:** When a resolution keeps *usage* of a symbol (component, function, import), verify the *declaration* and *import* also survived — grep the resolved file for every feature-side symbol before continuing.

!`cat ~/.claude/skills/migration-reconciliation.md`

## Execution

Announce commits ahead + target, then proceed without waiting for confirmation.

Resolve conflicts per heuristics above. After the rebase:

- If any migration files were touched: reconcile per the migration guide above (re-chain + apply to local DB if running).
- Run the repository's configured quality gates — rebase bypasses pre-commit hooks, so inspect its scripts and configuration rather than relying on a separate instruction document.
- Force-push with `--force-with-lease`. Invoking `/rebase` = intent to push; no additional confirmation needed.

**Report:** commits applied/dropped, conflicts resolved, migration reconciliation results, quality gate results.
