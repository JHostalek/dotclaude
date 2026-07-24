---
name: merge
description: Use when the user asks to merge another branch into the current branch, pull upstream changes without rebasing, or resolve merge conflicts.
argument-hint: "[target-branch] (defaults to master/main)"
---
input = $ARGUMENTS

Merge target branch into current branch via `git merge origin/{target}` (remote-tracking ref, not local). Goal: integrate upstream changes with no orphaned symbols, no broken migration chain, and a conventional commit message that passes hooks.

!`cat "${CLAUDE_SKILL_DIR}/../conflict-heuristics.md"`

!`cat "${CLAUDE_SKILL_DIR}/../migration-reconciliation.md"`

## Merge Commit Message

Pre-commit hooks often reject default `Merge branch 'X' into Y`. Pass conventional commit explicitly:

```
git merge origin/{target} -m "chore: merge {target} into {current-branch}"
```

Same format for follow-up `git commit` after staging resolutions. Notable decisions → commit body.

## Execution

State divergence (commits ahead/behind) and target branch before merging — do not skip to the merge without the check. `/merge` = authorization to push; no additional confirmation needed after the plan. Gate before pushing.

<output_contract>
Report: commits integrated, conflicts resolved (per-conflict decision), migration reconciliation outcome, gate results.
</output_contract>
