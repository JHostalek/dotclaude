---
name: merge
description: Use when the user asks to merge another branch into the current branch, pull upstream changes without rebasing, or resolve merge conflicts.
argument-hint: "[target-branch] (defaults to master/main)"
---
input = $ARGUMENTS

Merge target branch into current branch via `git merge origin/{target}` (remote-tracking ref, not local). Goal: integrate upstream changes with no orphaned symbols, no broken migration chain, and a conventional commit message that passes hooks.

Read at the point of use, not up front:
- Conflicts → `~/.claude/skills/shared/conflict-heuristics.md`
- Migration files touched → `~/.claude/skills/shared/migration-reconciliation.md`

## Merge Commit Message

Pre-commit hooks often reject default `Merge branch 'X' into Y`. Pass conventional commit explicitly:

```
git merge origin/{target} -m "chore: merge {target} into {current-branch}"
```

Same format for follow-up `git commit` after staging resolutions. Notable decisions → commit body.

## Squash-Merged Target

Targets that squash on merge keep no copy of the branch's commits, so merging back duplicates each one beside its squashed twin — count inflates, content does not.

Counts cannot detect this; content can. `git diff origin/{target} HEAD` empty means the trees already match. Verify both index and worktree are clean, then use `git reset --keep origin/{target}` to align the branch pointer; it refuses rather than overwriting local changes. Non-empty means real divergence: merge normally. Originals stay server-side at `refs/merge-requests/<iid>/head` or `refs/pull/<n>/head`, outside the default refspec.

## Execution

State divergence (commits ahead/behind) and target branch before merging — do not skip to the merge without the check.

Before pushing, run the repository's configured quality gates: a conflict resolution staged after the merge started can land without ever passing a pre-commit hook, so read the repo's hook scripts and config for what actually runs rather than assuming. `/merge` = authorization to push; no additional confirmation needed after the plan.

<output_contract>
Report: commits integrated, conflicts resolved (per-conflict decision), migration reconciliation outcome, gate results.
</output_contract>
