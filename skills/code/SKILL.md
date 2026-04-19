---
name: code
description: Use when implementing an approved task or plan in the current session and you are ready to make code changes.
---

task = $ARGUMENTS

Implement the plan. CLAUDE.md standards and quality gates apply throughout.

## Read the plan fully

If a plan file is in scope, read it fully in main context; also read files referenced by the plan's **Files** section before editing. Do not delegate these reads.

Check existing `- [x]` markers — plans are resumable. Advance the plan's frontmatter `status:` from `approved` to `in-progress` on start via Edit.

## Phase-based execution

One phase at a time. After each:

1. **Run Automated Verification.** Every command in the phase's Automated block. Report `PASS` / `FAIL: <error>` per CLAUDE.md §1. On fail, fix the code and re-run. Suppression requires explicit authorization.
2. **Check `- [x]`** boxes in the plan file via Edit.
3. **Stop at the Manual Verification gate.** Print:
   ```
   Phase <N> complete — ready for manual verification.
   Please confirm:
     - <manual check 1>
   Reply "confirmed" to continue, or describe what failed.
   ```
4. **Wait for user confirmation** before ticking Manual boxes or proceeding.

**Consecutive-phase mode.** User says "run all phases" → skip the manual gate until the last; still pause before final done.

**No manual checks in this phase?** Automated PASS is sufficient — proceed to the next phase without a user ack. CLAUDE.md §2.2 "default to maximum autonomy" applies: authors who want a forced pause add a manual check ("confirm phase N output looks right").

## Commit per phase

A failing change on top of 5 uncommitted phases is much harder to debug than one on top of a clean commit. Use `/commit` — it carries the conventional-commit format and branch-safety checks already.

## Completion check

Before declaring done:
- All phase boxes (Automated and Manual) checked.
- No TODOs, FIXMEs, stubs, or incomplete implementations.
- No silent fallbacks — default values inserted to make type errors disappear instead of fixing the actual issue. Models reflexively add these.
- Final Acceptance met.

Hand off to `/validate` for plan-conformance, then `/pr`.

## Mismatch with reality

When the codebase does not match the plan (moved files, refactored function, changed signature), stop and report:

```
Mismatch in Phase <N>:
  Expected: <plan>
  Found:    <actual>
  Why it matters: <blocks step X / different approach needed>
How should I proceed?
```

Do not silently adapt. A plan out of sync signals stale research or a stale plan.

## Deviations from plan

- **Minor** (naming, internal structure): document and continue.
- **Major** (different approach, new deps, scope change): stop, present options — the plan was approved, departing significantly needs buy-in. Prefer updating the plan via `/plan` over silent drift.

## Error recovery

Different approach on retry, not the same fix again. Hard stops (ask, don't retry) per CLAUDE.md §6:
- Same file fails compile/typecheck/lint 3×.
- Same test fails 3× after different fixes.
- You notice yourself repeating the same action.
- Automated Verification fails for a reason the plan did not anticipate.

Count attempts visibly.

## Quality gates

After implementation, run `/qg`. PASS or FAIL with specific errors. Errors fix the code, not the gate.
