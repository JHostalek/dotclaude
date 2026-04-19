---
name: plan
description: Use when a task is multi-step, ambiguous, or high-impact and you need an executable implementation plan before editing code.
argument-hint: [task description or path to research artifact]
---

task = $ARGUMENTS

Minimum artifact that prevents the executor from going wrong. The executor starts with an empty context: every ambiguity becomes a wrong guess.

Match depth to complexity. A 3-file bug fix needs a paragraph, not a document.

## Consume research first

If research exists (`docs/research/...` or provided as argument), read it **fully** in main context before planning. Do not delegate the read — planner is the consumer, and summaries lose the file:line specifics that make the plan precise.

Complex or brownfield and no research exists → stop and invoke `/research` first.

## Exploration

Explore until you can articulate *why* one approach beats alternatives — then stop and write. Still reading files after the picture is clear = too much.

With research in hand: validate assumptions, note gaps, proceed.

Without research: two axes concurrently via read-only teammates (see `/research` for explorer shapes):

- **Codebase** — existing implementations, patterns, conventions.
- **External** — how others solved this. Vendor docs, libraries, RFCs.

## Decomposition

Pick by task shape; default to vertical slice.

| Strategy | When | Risk mitigated |
|----------|------|----------------|
| **Vertical slice** | Multiple independent behaviors | Integration surprises — each slice proves end-to-end |
| **Walking skeleton** | Uncertain integration path | Late-stage "it doesn't connect" — proves wiring first |
| **Layer-by-layer** | Clear layers, different complexity | Parallel work; natural when data model drives everything |

## Specificity

The hard part is naming the *surface of change* — files, functions, call sites. Once named, edits are obvious. Describe *what* changes and *why*; reference precedent. Leave *how* to the executor.

- **Under-specified:** `Add a rate limiter to the API.`
- **Over-specified:** Pseudocode, variable names, HTTP status codes.
- **Calibrated:** `Add per-user rate limiting to authenticated endpoints. New middleware in src/api/middleware/ratelimit.py following src/api/middleware/auth.py (middleware class + decorator registration in src/api/app.py:42). Reuse Redis client from src/infra/redis.py.`

Litmus:
- "Could the executor start in the wrong file?" → more specific.
- "Could the executor implement this without reading my plan?" → too detailed.

## Plan Format

### Required

- **Goal** — one sentence. What exists after that didn't before.
- **What We're NOT Doing** — explicit scope fence. Out-of-scope bugs, adjacent refactors, tempting cleanups. Load-bearing.
- **Files** — exact paths with `[NEW]`/`[MOD]`/`[DEL]`.
- **Phases** — ordered. Each:
  - **Steps** — `- [ ]`, each naming files touched.
  - **Automated Verification** — commands the executor runs alone: `pytest path/to/test.py::test_x`, `npm run typecheck`.
  - **Manual Verification** — human-only checks: "Open /settings, click Save, confirm the toast." Write "None" if none; never omit the section.
- **Final Acceptance** — criteria before declaring done.

### Add when warranted

- **Background** — *why*, when not obvious.
- **References** — research docs, tickets, ADRs.
- **Key Concepts** — domain terms, sentinel values. Table.
- **Approach & Rejected Alternatives** — prevents re-litigating.
- **Edge Cases** — 3–5 likely failure modes and how the plan handles each.
- **Risks** — non-obvious, with mitigations.
- **Work Decomposition** — for `/orch`: parallel vs. sequential phases.

## Open questions block planning

Unresolved question surfaces while writing → **stop**. Don't write with "TBD" — the executor will guess. Either narrow scope (note unknown in "What We're NOT Doing"), return to `/research`, or ask the user.

## Review gate

Plans are reviewed **before** `/code` runs. Present the plan; wait for approval or request `/judge` on it. Do not hand off until read.

## Save & Handoff

Save to `docs/plans/<type>-<short-name>.md` (types: `feat-`, `fix-`, `refactor-`, `chore-`). Adapt to project conventions.

To update an existing plan, re-read, diff against new requirements, revise in place.

Hand off to `/code` (single-agent) or `/orch` (parallel).
