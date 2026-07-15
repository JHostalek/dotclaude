---
name: merge
description: Use when the user asks to merge another branch into the current branch, pull upstream changes without rebasing, or resolve merge conflicts.
argument-hint: "[target-branch] (defaults to master/main)"
---
input = $ARGUMENTS

Merge target branch into current branch via `git merge origin/{target}` (remote-tracking ref, not local). Goal: integrate upstream changes with no orphaned symbols, no broken migration chain, and a conventional commit message that passes hooks.

## Conflict Resolution

The cases below are high-risk anchors, not an exhaustive conflict taxonomy. Apply the same intent-first reasoning to other conflict shapes, and combine or refine the heuristics when a conflict spans categories.

- **Lockfiles, migrations, config, version bumps** → accept target version; regenerate lockfiles.
- **Refactored-away code** → target's removal wins; rewire to new location/API.
- **Additive conflicts** (both sides add independent code) → keep both, then run formatter/parser. Conflict boundaries leave orphan closing tags, duplicate brackets, stray blocks — parser catches what grep misses.

**Partial survival:** resolution keeps *usage* of a symbol → verify *declaration* and *import* also survived. Grep resolved file for every feature-side symbol before continuing.

!`cat ~/.claude/skills/migration-reconciliation.md`

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
