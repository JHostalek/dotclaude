---
name: validate
description: Use after /code and before /pr to independently check that the implementation matches the plan. Fresh-context plan-conformance check, not a code quality review.
argument-hint: [plan path, or omit to auto-detect]
---

plan_arg = $ARGUMENTS

Independent check: **did we actually do what the plan said?** This is different from `/qg` (tests pass) and `/qual` / `/judge` (is the code good). Plan conformance is its own question.

## Independence is the asset

If you are the session that wrote the code, your view of "what we did" is biased by intent. Delegate this skill to a fresh-context teammate via `TeamCreate` + `Task` whenever possible. The teammate reads only the plan, the git diff, and the codebase — not the implementation session's chat.

When running in-session, acknowledge the bias and lean harder on external evidence: git diff, test output, the plan file. Do not rely on memory of what was changed.

## Locate the plan

If `plan_arg` is provided, use it. Otherwise:
- Check `docs/plans/` for a plan file whose slug matches the current branch name.
- Check the most recently modified plan file.
- Ask the user if ambiguous.

Read the plan fully. Re-read referenced research (`## References` section) if the plan implementation is non-obvious.

## Gather evidence

Run in parallel:

1. **Diff survey.** `git log <base>..HEAD --oneline` and `git diff <base>..HEAD --stat` to list all files and commit messages. `<base>` = the commit before the first implementation commit, or the default branch merge-base.
2. **Automated Verification.** For each plan phase, re-run the Automated Verification commands. Record PASS/FAIL.
3. **Claim check.** For each `- [x]` Automated checkbox in the plan, verify the corresponding code change is actually present in the diff.

Do not edit anything in this phase.

## Validate against plan

For each plan phase, produce a status row:

| Phase | Files match plan | Automated PASS | Deviations |
|-------|------------------|----------------|------------|

**Files match plan:** Did the diff touch the files listed in the phase? Any unexpected files touched? Any listed files missing edits?

**Deviations:** Any `- [x]` that isn't backed by real code? Any `- [ ]` that was silently implemented anyway? Any scope leak (changes outside the plan's `Files` section)?

**Scope fence check:** The plan's **What We're NOT Doing** section — did the implementation respect it? Violations here are the most common pattern.

## Report shape

```
# Validation Report

**Plan:** <path>
**Branch:** <branch>
**Base → HEAD:** <base>..<sha> (<N commits, M files>)

## Verdict

<one of: MATCHES | MINOR DEVIATIONS | MAJOR DEVIATIONS | SCOPE VIOLATION>

<one sentence justification>

## Automated Verification

<per-phase PASS/FAIL table>

## Plan Conformance

### Matches Plan
- <phase / step>

### Deviations from Plan
- <what the plan said vs. what the code does, with file:line>

### Scope Violations
- <files changed that weren't in the plan's Files section, with rationale if any>

### Missed / Incomplete
- <phase steps marked done but not backed by code>
- <phase steps not yet implemented>

## Manual Verification Outstanding

<list the Manual Verification checkboxes that still need human confirmation>

## Recommendation

<one of:>
- Ready for /pr.
- Fix deviations listed above, then re-run /validate.
- Plan drift detected — update plan via /plan or stop and ask user.
```

## Verdict thresholds

| Verdict | Criteria |
|---------|----------|
| **MATCHES** | All phases PASS. All files match. No scope leak. Automated ✓ everywhere. |
| **MINOR DEVIATIONS** | Small internal differences (naming, file layout inside a phase) documented in diff; plan outcome achieved. |
| **MAJOR DEVIATIONS** | Different approach taken; plan should be updated before merging or the PR description must explain. |
| **SCOPE VIOLATION** | Files changed outside plan scope, or "NOT Doing" fence crossed. Blocks /pr until resolved. |

## Next step

- `MATCHES` → proceed to `/pr`.
- `MINOR DEVIATIONS` → proceed, note in PR description.
- `MAJOR DEVIATIONS` → stop, report to user, update plan or revert changes.
- `SCOPE VIOLATION` → stop. Do not auto-revert (that would lose work); present the scope leak to the user and ask whether to keep it (update plan) or remove it.

**Stop after the report.** Do not fix issues unless asked.
