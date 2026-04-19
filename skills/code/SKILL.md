---
name: code
description: Use when implementing an approved task or plan in the current session and you are ready to make code changes.
---

task = $ARGUMENTS

Implement the plan. CLAUDE.md standards and quality gates apply throughout.

## Read the plan fully before starting

If a plan file is in scope, read it fully in main context. Do not delegate the read — the executor needs the whole picture, not a subagent's summary. Also read files referenced by the plan's **Files** section before editing them.

Check existing `- [x]` markers. Plans are resumable; pick up where the last run stopped.

## Phase-based execution with verification gates

Execute one phase at a time. After each phase:

1. **Run Automated Verification.** Every command in the phase's Automated Verification block. Report `PASS` / `FAIL: <error>` per CLAUDE.md §1. On fail, fix the code and re-run. Suppression requires explicit authorization.
2. **Check the Automated boxes** (`- [x]`) in the plan file via Edit.
3. **Stop at the Manual Verification gate.** Print:
   ```
   Phase <N> complete — ready for manual verification.
   Please confirm:
     - <manual check 1 from plan>
     - <manual check 2>
   Reply "confirmed" to continue, or describe what failed.
   ```
4. **Wait for user confirmation.** Do not check the Manual Verification boxes until the user confirms. Do not proceed to the next phase.

**Consecutive-phase mode.** If the user says "run all phases" or "don't stop between phases," skip the manual gate until the last phase — still pause before declaring final done.

**No manual checks in this phase?** Still print "Phase N complete" and wait for a brief user ack. The pause is the circuit breaker against runaway autonomous execution on a wrong plan.

## Incremental Execution

Commit after each completed phase — a failing change on top of 5 uncommitted phases is much harder to debug than one on top of a clean commit.

## Completion Check

Before declaring the task done, verify:
- All phase boxes (Automated and Manual) checked
- No TODOs, FIXMEs, stubs, or incomplete implementations remain
- No silent fallbacks — default/fallback values inserted to make type errors disappear instead of fixing the actual type or data issue. Models reflexively add these; catch yourself.
- Final Acceptance criteria met

Then hand off to `/validate` for an independent plan-conformance check, then `/pr`.

## Error Recovery

When something breaks, try a different approach — not the same fix again. On second failure, revert to last working state and try a fundamentally different strategy. On third failure, **stop and tell the user** — report what you tried, what failed, and what context you're missing.

Repeated failure usually means missing context or a wrong assumption, not insufficient effort. Count attempts visibly per CLAUDE.md §6.

**Hard stops** (don't retry, just ask):
- Same file fails to compile/typecheck/lint 3 times
- Same test fails 3 times after different fixes
- You notice yourself repeating the same action
- Automated Verification fails for a reason the plan did not anticipate

## Deviations from Plan

- **Minor** (naming, internal structure): document the reason and continue.
- **Major** (different approach, new dependencies, scope change): stop and present options with trade-offs — the plan was approved, departing significantly needs explicit buy-in. Prefer updating the plan via the `/plan` skill's "revise in place" path over silently drifting.

## Mismatch with reality

When the codebase does not match what the plan describes (moved files, refactored function, changed signature), stop and report:

```
Mismatch in Phase <N>:
  Expected: <what the plan says>
  Found:    <what's actually there>
  Why it matters: <blocks step X / requires different approach>
How should I proceed?
```

Do not silently adapt and continue. A plan out of sync with the code is a signal that research or the plan itself is stale.

## Quality Gates

After completing implementation, run `/qg`. Report PASS or FAIL with specific errors. Errors fix the code, not the gate.
