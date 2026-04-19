---
name: validate
description: Use after /code and before /pr to independently check that the implementation matches the plan. Fresh-context plan-conformance check, not a code quality review.
argument-hint: [plan path, or omit to auto-detect]
---

plan_arg = $ARGUMENTS

Did we actually do what the plan said? Different from `/qg` (tests pass) and `/qual`/`/judge` (is the code good).

## Independence is the asset

The session that wrote the code sees "what we intended." Delegate this skill to a fresh-context teammate via `TeamCreate` + `Task` whenever possible — the teammate reads only the plan, the diff, and the codebase.

In-session: lean on external evidence (diff, test output, plan file). Do not rely on memory.

## Locate the plan

If `plan_arg` is provided, use it. Otherwise check `docs/plans/` for a slug matching the current branch, then the most recently modified plan. Ask if ambiguous.

Read the plan fully. Re-read referenced research when the implementation is non-obvious.

## Gather evidence

In parallel:

1. **Diff survey.** `git log <base>..HEAD --oneline` + `git diff <base>..HEAD --stat`. `<base>` = commit before first implementation commit, or default-branch merge-base.
2. **Automated Verification.** Re-run each phase's Automated commands. Record PASS/FAIL.
3. **Claim check.** For each `- [x]` Automated checkbox, verify the corresponding change is in the diff.
4. **Research alignment.** If plan frontmatter's `research:` field points to a doc, read it. For each entry in the research's **Open Questions**, confirm the resolution is visible in plan or code. Surface unresolved questions the plan silently absorbed.

No edits in this phase.

## Validate against plan

Per-phase status row:

| Phase | Files match plan | Automated PASS | Deviations |
|-------|------------------|----------------|------------|

- **Files match plan:** diff touches the phase's files; no unexpected files; no listed-but-unedited files.
- **Deviations:** `- [x]` without backing code; `- [ ]` silently implemented; changes outside the plan's Files section.
- **Scope fence check:** did the implementation respect **What We're NOT Doing**? Violations here are the most common pattern.

## Report shape

```
# Validation Report

**Plan:** <path>
**Branch:** <branch>
**Base → HEAD:** <base>..<sha> (<N commits, M files>)

## Verdict

<MATCHES | MINOR DEVIATIONS | MAJOR DEVIATIONS | SCOPE VIOLATION>
<one sentence justification>

## Automated Verification
<per-phase PASS/FAIL>

## Plan Conformance

### Matches Plan
- <phase / step>

### Deviations from Plan
- <plan said vs. code does, with file:line>

### Scope Violations
- <files outside plan scope, rationale if any>

### Missed / Incomplete
- <steps marked done but not backed by code>
- <steps not yet implemented>

## Manual Verification Outstanding
<checkboxes still needing human confirmation>

## Recommendation
- Ready for /pr.
- Fix deviations above, re-run /validate.
- Plan drift detected — update plan via /plan or stop.
```

## Verdict thresholds

| Verdict | Criteria | Next |
|---------|----------|------|
| **MATCHES** | All PASS. All files match. No scope leak. | Proceed to `/pr`. |
| **MINOR DEVIATIONS** | Small internal differences; plan outcome achieved. | Proceed; note in PR description. |
| **MAJOR DEVIATIONS** | Different approach; plan should be updated or PR must explain. | Stop; report; update plan or revert. |
| **SCOPE VIOLATION** | Files outside plan scope, or "NOT Doing" crossed. | Stop. Do not auto-revert (work loss); present leak, ask keep (update plan) or remove. |

On MATCHES or MINOR DEVIATIONS, advance plan frontmatter `status:` to `validated` via Edit before handing to `/pr`.

**Stop after the report.** Do not fix issues unless asked.
