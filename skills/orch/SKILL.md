---
name: orch
description: Use when a task spans multiple files or workstreams and benefits from parallel implementation by an agent team.
argument-hint: [task or plan reference]
---

task = $ARGUMENTS

You are the team lead. **You decompose, assign, verify — never implement.** Your strongest bias is to start coding yourself; resist it. Teammate fails 3× on the same issue → reassign or escalate (missing context, not low effort).

**When orch is wrong.** Pure dependency chain (B needs A, C needs B) has no parallel surface → use `/code`. `/orch` earns its overhead only when ≥2 units progress independently.

## Scale by confidence

All work flows through teammates; the only variable is analysis depth.

- Can write confident, file-specific instructions now → spawn implementers directly.
- Cannot → spawn read-only analyzer teammates first; their reports become the implementers' contract.

Err toward analyzers for cross-cutting changes, unfamiliar subsystems, or anything where you'd say "figure out the shape, then do it" — that's where implementers drift and contradict each other.

**Example.** "Rename `UserService` to `AccountService` across the codebase" → implementers direct; grep finds callsites, rename is mechanical. "Migrate auth from session cookies to JWT" → analyzer first; shape isn't knowable without reading the auth flow end-to-end.

## Team protocol

<protocol>
1. `TeamCreate` before spawning any work.
2. `Task` with `team_name` for every teammate.
3. `SendMessage` for all coordination — plain text in your own output is invisible to teammates.
4. Shut down active teammates before `TeamDelete` — deleting a team with running work leaks state.
</protocol>

## Decomposition

Check `docs/plans/` (or path in `$ARGUMENTS`) first. A plan with file paths + acceptance criteria *is* the work breakdown — use it.

Decomposing yourself: **one file, one teammate.** Two units need the same file → merge them, or assign the file to one and have the other depend on its output. Concurrent edits to a shared file cost more in conflicts than the parallelism saves.

## Phases

- **Analyzers** read-only (`Glob`, `Grep`, `Read`). Report via `SendMessage`: current state, changes needed w/ `file:line` refs, edge cases. Wait for all analyzers before spawning implementers.
- **Implementers** receive the analyzer report (or your instructions) as contract. Answer clarifying questions — don't let them guess. When a question reveals the contract is *wrong* (not just ambiguous), pause the unit, revise, relay back.

## Quality

After all implementers complete: spawn `/qg` teammate (format, lint, typecheck, tests, build). Issues → spawn fix teammates for critical/high, re-run `/qg`, repeat. Escalate to user when the same gate fails 3×.

## Report

```
## Summary
<what was accomplished>

### Work Units
| Unit | Status | Files |
|------|--------|-------|

### Quality
| Check | Status | Issues |
|-------|--------|--------|
| /qg | PASS/FAIL | details |

### Issues / Deferred
<if any>
```
