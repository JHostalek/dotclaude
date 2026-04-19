---
name: research
description: Use when a task is complex, brownfield, or requires understanding a subsystem before planning. Produces a reviewable research artifact — description only, no recommendations — that /plan consumes.
argument-hint: [question or task description]
---

question = $ARGUMENTS

Produce a research artifact a human reviews before a plan exists.

## Hard constraint

**Document the codebase as it exists. No recommendations. No critique. No "should."** Evaluation belongs in `/plan`, `/judge`, or `/qual`. A researcher that drifts into advice biases every downstream step.

Observations that look like bugs: record with `file:line` evidence, neutrally. Do not prescribe.

## Scope before dispatch

Read user-referenced files **fully** in main context before spawning teammates — a subagent that re-reads those files wastes its window.

If scope is ambiguous (which subsystem, which flow, what "fix" means), ask before dispatching.

## Parallel explorer teammates

All teammates are **read-only**. Spawn in parallel; wait for all before synthesizing. Use `TeamCreate` + `Task` per CLAUDE.md §12.

| Teammate | Agent file | Job |
|----------|-----------|-----|
| Locator | `codebase-locator.md` | *Where* code lives. Grep/Glob/LS only. Groups files by role. |
| Analyzer | `codebase-analyzer.md` | *How* code works. Traces data flow with `file:line` refs. |
| Pattern Finder | `codebase-pattern-finder.md` | Working snippets of existing patterns. |
| External | `external-researcher.md` | Library docs, RFCs, prior art via WebSearch/WebFetch. |

Routine pair: Locator + Analyzer. Add Pattern Finder when planning changes to an existing pattern; add External when a library or spec is involved. Reject + respawn any teammate that returns "I recommend…".

## Synthesis

Read teammate reports, then read the referenced files directly in main context — subagents saw snippets, you need the whole picture. Write the artifact.

### Required sections

```markdown
---
topic: <short slug>
date: <YYYY-MM-DD>
branch: <current branch>
commit: <short sha>
---

# Research: <question>

## Question
<one paragraph>

## Summary
<3–6 bullets — findings a reviewer needs first>

## Findings

### <area 1>
<prose with file:line refs>

## Data & Control Flow
<end-to-end trace when relevant, file:line at each hop>

## Existing Patterns
<when pattern finder ran — snippets with paths>

## External References
<when external researcher ran — URL + one-line summary + relevance>

## Historical Context
<prior decisions from git log, ADRs, docs/>

## Open Questions
<things code alone cannot answer — these block planning>
```

No "Recommendations," "Proposed approach," or evaluative sections.

## Save & handoff

Save to `docs/research/<YYYY-MM-DD>-<slug>.md` (adapt to project conventions, e.g. `thoughts/research/`).

Follow-up research on the same question appends `## Follow-up [timestamp]` to the same file.

Hand off to `/plan` with the research path. The plan skill reads it fully before writing.
