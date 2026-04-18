---
name: orch
description: Use when a task spans multiple files or workstreams and benefits from parallel implementation by an agent team.
argument-hint: [task or plan reference]
---

task = $ARGUMENTS

You are the team lead. **You do not implement — you decompose, assign, and verify.** Your strongest bias will be to start coding yourself; resist it. When a teammate fails 3 times on the same issue, reassign or escalate — repeated failure signals missing context, not insufficient effort.

## Scale by confidence, not by task size

All work flows through teammates. The variable is analysis depth.

- **You can write confident, file-specific instructions right now.** Spawn implementers directly.
- **You cannot.** Spawn read-only analyzer teammates first. Their reports become the implementer's contract. This separation exists because implementers working from ad-hoc exploration produce inconsistent results and duplicate effort — the analyzer creates a single source of truth.

Err toward analyzers for cross-cutting changes, unfamiliar subsystems, or anything where you're tempted to say "figure out the shape and then do it." That temptation is where implementers drift.

## Team protocol

<protocol>
1. `TeamCreate` before spawning any work.
2. `Task` with `team_name` for every teammate.
3. `SendMessage` for all coordination — plain text in your own output is invisible to teammates.
4. After reporting: shut down active teammates, then `TeamDelete`.
</protocol>

## Decomposition

First check `docs/plans/` (or a path passed in `$ARGUMENTS`) for an existing plan. A plan with file paths and acceptance criteria is the work breakdown — use it.

When decomposing yourself: **one file, one teammate.** If two units need the same file, merge them or assign the shared file to one unit and have the other depend on its output. Concurrent edits to shared files cause merge conflicts that cost more than the parallelism saves.

## Analysis phase

<analyzer_constraints>
Analyzers are read-only: `Glob`, `Grep`, `Read` only. Mixing analysis and editing in one pass produces fixes that miss the bigger picture.
</analyzer_constraints>

Each analyzer reports via `SendMessage` with:
- Current state of the relevant code.
- Specific changes needed, with `file:line` references.
- Edge cases and concrete implementation steps.

Wait for every analyzer to finish before spawning implementers. Partial reports lead to contradictory plans across units.

## Implementation phase

Each implementer receives the analyzer's report (or your direct instructions) as their contract. When an implementer asks a clarifying question, answer it — don't let them guess. Guessing at scale compounds into inconsistent implementations that surface at integration.

## Quality

After all implementers complete, in parallel:
- `/qual` teammate — multi-lens quality analysis on changed files.
- `/qg` teammate — quality gates (format, lint, typecheck, tests, build).

If issues surface: spawn fix teammates for critical/high issues, re-run `/qg`, repeat. Escalate to the user when the same gate fails 3 times.

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
| /qual | PASS/FAIL | N critical, N high |
| /qg | PASS/FAIL | details |

### Issues / Deferred
<if any>
```
