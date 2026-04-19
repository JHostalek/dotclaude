---
name: orch
description: Use when a task spans multiple files or workstreams and benefits from parallel implementation by an agent team.
argument-hint: [task or plan reference]
---

task = $ARGUMENTS

Team lead. **Decompose, assign, verify — never implement.** Strongest bias: start coding yourself; resist. Teammate fails 3× on the same issue → reassign or escalate.

**When orch is wrong.** Sequential chain (B needs A, C needs B) has no parallel surface. Use `/code`. `/orch` earns its coordination overhead only when ≥ 2 units progress independently.

## Scale by confidence, not task size

All work flows through teammates. The only variable is analysis depth.

- **Confident, file-specific instructions available now** → spawn implementers directly.
- **Not confident** → spawn read-only analyzers first. Their reports become the implementer's contract.

Implementers on ad-hoc exploration produce inconsistent results and duplicate effort. An analyzer creates a single source of truth so parallel units don't contradict each other.

Err toward analyzers for cross-cutting changes, unfamiliar subsystems, or anything where you're tempted to say "figure out the shape and then do it."

**Example.** "Rename `UserService` to `AccountService` across the codebase" — implementers direct; grep is enough. "Migrate auth from session cookies to JWT" — analyzer first; the shape isn't knowable without reading the current flow end-to-end.

## Team protocol

<protocol>
1. `TeamCreate` before spawning any work.
2. `Task` with `team_name` for every teammate.
3. `SendMessage` for all coordination — plain text in your own output is invisible to teammates.
4. Shut down active teammates before `TeamDelete` — deleting with running work leaks state.
</protocol>

## Decomposition

Check `docs/plans/` (or path in `$ARGUMENTS`) for an existing plan first. A plan with file paths and acceptance criteria *is* the work breakdown.

Self-decomposing: **one file, one teammate.** Two units needing the same file → merge them, or assign shared file to one and have the other depend on its output. Concurrent edits cost more than the parallelism saves.

## Analysis phase

<analyzer_constraints>
Analyzers are read-only: `Glob`, `Grep`, `Read` only. Mixing analysis and editing produces fixes that miss the bigger picture.

**Description-vs-evaluation fence.** Analyzers describe — they do not critique, recommend, or grade. Findings, not opinions. "Function X at file:line does Y" — not "Function X should be refactored." Evaluation is the lead's job; a subagent that drifts into advice biases every downstream implementer. Include this fence verbatim in each analyzer's task prompt.
</analyzer_constraints>

### Analyzer types

| Type | Job | Returns |
|------|-----|---------|
| **Locator** | *Where* code lives. Grep/Glob/LS only, no deep reads. | Files grouped by role. |
| **Analyzer** | *How* a flow works. Traces data + control flow. | `file:line`-cited call graph. |
| **Pattern Finder** | *What* the codebase's idiom looks like. | 2–3 snippets with paths, frequency-ranked. |

Locator first when surface is unclear; Analyzer when shape is known but mechanism isn't; Pattern Finder when implementers need a template. See `/research` for full agent prompts.

Each analyzer reports via `SendMessage` with current-state description, `file:line` refs, and visible edge cases.

*Lead* translates findings into implementer contracts — not the analyzer. Wait for every analyzer before spawning implementers; partial reports produce contradictory plans.

## Implementation phase

Implementers receive contracts derived from analyzer reports (or an approved plan) — not raw analyzer outputs. Turn neutral findings into directive instructions. When an implementer asks a clarifying question, answer — don't let them guess. Guessing at scale compounds into inconsistent implementations that surface at integration.

Question reveals the plan is wrong (not just ambiguous) → pause, revise the contract, relay back.

## Quality

After all implementers complete, in parallel:
- `/validate` teammate — plan-conformance.
- `/qual` teammate — multi-lens quality.
- `/qg` teammate — format, lint, typecheck, tests, build.

Spawn fix teammates for critical/high issues, re-run `/qg`, repeat. Same gate fails 3× → escalate.

## Report

```
## Summary
<accomplishments>

### Work Units
| Unit | Status | Files |

### Quality
| Check | Status | Issues |
| /qual | PASS/FAIL | N critical, N high |
| /qg | PASS/FAIL | details |

### Issues / Deferred
```
