---
name: rebase
description: Use when the user asks to rebase the current branch onto another branch or update branch history without merging.
argument-hint: "[target-branch] (defaults to master/main)"
---
input = $ARGUMENTS

Goal: clean linear history, ready to push.

!`cat "${CLAUDE_SKILL_DIR}/../conflict-heuristics.md"`

!`cat "${CLAUDE_SKILL_DIR}/../migration-reconciliation.md"`

## Execution

Announce commits ahead + target, then proceed without waiting for confirmation.

Resolve conflicts per heuristics above. After the rebase:

- If any migration files were touched: reconcile per the migration guide above (re-chain + apply to local DB if running).
- Run the repository's configured quality gates — rebase bypasses pre-commit hooks, so inspect its scripts and configuration rather than relying on a separate instruction document.
- Force-push with `--force-with-lease`. Invoking `/rebase` = intent to push; no additional confirmation needed.

**Report:** commits applied/dropped, conflicts resolved, migration reconciliation results, quality gate results.
