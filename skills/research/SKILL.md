---
name: research
description: Use when a task is complex, brownfield, or requires understanding a subsystem before planning. Produces a reviewable research artifact — description only, no recommendations — that /plan consumes.
argument-hint: [question or task description]
---

question = $ARGUMENTS

You are producing a research artifact that a human reviews before a plan exists. Research catches misunderstandings cheaply; a bad line of research becomes a hundred bad lines of code.

## Hard constraint

**Document the codebase as it exists. No recommendations. No critique. No "should."** Description belongs here; evaluation belongs in `/plan`, `/judge`, or `/qual`. A researcher that drifts into advice biases every downstream step.

If you find something that looks wrong, record it as a neutral observation with `file:line` evidence. Do not prescribe a fix.

## Scope before dispatch

Read any file the user referenced **fully** in main context before spawning teammates. Critical context lives in the controller; noise lives in workers. A subagent that needs to re-read those files wastes its window.

If scope is ambiguous (which subsystem, which flow, what "fix" means), ask before dispatching. Ambiguity at research stage compounds through plan and implementation.

## Parallel explorer teammates

All teammates are **read-only**. Spawn in parallel; wait for all before synthesizing. Use `TeamCreate` + `Task` per §12 of CLAUDE.md.

| Teammate | Agent file | Job |
|----------|-----------|-----|
| Locator | `codebase-locator.md` | *Where* relevant code lives. Grep/Glob/LS only. Groups files by role (impl/test/config/types). Does not read deeply. |
| Analyzer | `codebase-analyzer.md` | *How* specific code works. Traces data flow with `file:line` refs. Returns call graphs, not opinions. |
| Pattern Finder | `codebase-pattern-finder.md` | Working code snippets of existing patterns to model after. Returns concrete examples, not abstractions. |
| External | `external-researcher.md` | Library docs, RFCs, prior art via WebSearch/WebFetch. Source-attributed. |

**Each teammate's contract includes the description-only fence.** Do not let a subagent return "I recommend…" — reject and respawn if it does.

Pick only the teammates the question needs. Routine: Locator + Analyzer. Add Pattern Finder when planning changes to an existing pattern. Add External when the question involves a library or spec.

## Synthesis

Main agent reads teammate reports, reads the referenced files directly (do not delegate the final read of critical files — their subagents saw snippets, you need the whole picture), and writes the artifact.

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
<what we're trying to understand, in one paragraph>

## Summary
<3–6 bullets — the findings a reviewer needs to see first>

## Findings

### <area 1>
<prose with file:line refs — src/auth/session.py:42>

### <area N>

## Data & Control Flow
<trace the request/call/data path end-to-end when relevant, file:line at each hop>

## Existing Patterns
<when pattern finder ran — concrete snippets with paths and line numbers>

## External References
<when external researcher ran — URL + one-line summary + relevance>

## Historical Context
<prior decisions from git log, ADRs, docs/ — file:line or commit sha>

## Open Questions
<things the research cannot answer from code alone — these block planning>
```

### Forbidden sections

- "Recommendations"
- "Proposed approach"
- "Next steps" beyond "see /plan"
- Anything evaluative

## Save & handoff

Save to `docs/research/<YYYY-MM-DD>-<slug>.md`. Adapt to project conventions if an established path exists (e.g., `thoughts/research/`).

Follow-up research on the same question appends `## Follow-up [timestamp]` to the same file — never a new file.

Hand off to `/plan` with the research path as argument. The plan skill is required to read it fully before writing.
