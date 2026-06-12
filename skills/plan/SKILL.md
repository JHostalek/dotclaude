---
name: plan
description: Use when a task is multi-step, ambiguous, or high-impact and you need an executable implementation plan before editing code.
argument-hint: [task description]
---

task = $ARGUMENTS

Produce the minimum artifact that prevents the executor from going wrong. Executor starts with an empty context window: plan + codebase, nothing else. Every ambiguity → a wrong confident guess.

Match depth to complexity. 3-file bug fix → paragraph, not document. Describable in one sentence → skip the plan.

## Exploration

Explore until you can articulate *why* one approach beats alternatives — then stop and write. Can't articulate tradeoffs → haven't explored enough. Still reading files after picture is clear → explored too much. External-axis stop: borrowable pattern identified, or confirmed nobody solved it cleanly — inventing is the fallback, not the default.

Two axes, pursued concurrently:

- **Codebase** — existing implementations, patterns, conventions. For every new pattern, cite precedent `file:line` the executor should mirror. No citation → executor reinvents, even when precedent exists.
- **External** — web search for how others solved this. Libraries, vendor docs, open-source implementations. Prefer borrowing a named approach; name the source (URL or library) in the plan.

## Decomposition

Choose based on task shape, not habit. Default to vertical slice; switch when task clearly fits another:

| Strategy | When | Risk it mitigates |
|----------|------|---------------------|
| **Vertical slice** | Multiple independent behaviors | Integration surprises — each slice proves end-to-end |
| **Walking skeleton** | Uncertain integration path | Late-stage "it doesn't connect" — proves wiring first |
| **Layer-by-layer** | Clear layers, different complexity zones | Allows parallel work; natural when data model drives everything |

## Specificity

Identify the *surface of change* — which files, which functions, which call sites. Once the surface is named, edits are obvious. Name concrete files and functions; describe *what* changes and *why*; reference precedent for the pattern. Leave *how* to the executor — they need goals and constraints, not pseudocode.

Step would contain a guess → ask the user before saving. Plan is a closed contract — executor cannot resolve ambiguity, only act on it.

- **Under-specified:** `Add a rate limiter to the API.`
- **Over-specified:** Pseudocode of the rate-limit check, variable names, HTTP status codes.
- **Calibrated:** `Add per-user rate limiting to authenticated endpoints. New middleware in src/api/middleware/ratelimit.py following the pattern of src/api/middleware/auth.py (middleware class + decorator registration in src/api/app.py:42). Use the existing Redis client from src/infra/redis.py.`

Litmus tests:
- "Could the executor start in the wrong file?" → be more specific.
- "Could the executor implement this without reading my plan?" → step is too detailed.

## Plan Format

Required:

- **Goal** — One sentence. What exists after that didn't before.
- **Files** — Exact paths with `[NEW]`/`[MOD]`/`[DEL]` prefix. Map the change surface before decomposing into steps.
- **Steps** — Ordered, checkboxed (`- [ ]`), each naming the file(s) it touches.
- **Verification** — Per-step: command + expected result. Final: acceptance criteria the executor checks before declaring done.

Add when the task warrants:

- **Background** — The *why*, when not obvious from the goal.
- **Key Concepts** — Domain terms, sentinel values, non-obvious patterns. Table format.
- **Approach & Rejected Alternatives** — What you chose and rejected, with rationale. Prevents re-litigating decisions.
- **Edge Cases** — The 3–5 most likely failure modes and how the plan handles each. Can't name them → haven't understood the problem deeply enough.
- **Risks** — Only non-obvious ones with mitigations.
- **Work Decomposition** — For parallel execution (Workflow tool or subagents): which steps run in parallel vs. sequential, and why.

No placeholders survive to save: no `TBD`, no "add error handling" without specifics, no open questions. Every ambiguity resolved with the user first — saved plan is a closed contract.

## Save & Handoff

Save to `docs/plans/<type>-<short-name>.md` (adapt to project conventions if established). Types: `feat-`, `fix-`, `refactor-`, `chore-`.

Update existing plan → re-read, diff against new requirements, revise in place.

Hand off to the Workflow tool (or parallel subagents) for parallel work, or implement directly for single-agent execution.
