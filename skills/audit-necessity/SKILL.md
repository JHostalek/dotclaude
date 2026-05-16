---
name: audit-necessity
description: Use when cutting code in a folder that doesn't earn its keep — whether a solution is over-engineered, where maintenance cost can be reduced, or where a feature should be removed entirely.
argument-hint: <path>
---

target_path = $ARGUMENTS

If no target path provided, ask for one. This skill requires a concrete scope — "the whole repo" produces shallow findings.

## Purpose

Every line of code is a liability — read, understood, maintained, debugged, migrated. This skill makes maintenance cost visible and cuts code that doesn't earn its keep.

This is not a correctness review or a style review. The question: **should this code exist at all, and if so, at this size?**

## Reconnaissance

Before spawning reviewers, build the brief they all share:

1. Map the scope — file count, total LOC, directory structure, entry points
2. Identify the feature set — what user-facing capabilities does this code provide? List concretely.
3. Detect the stack — languages, frameworks, key dependencies
4. Find existing docs — any stated purpose or architecture rationale

## Teammates

Spawn all three from `${CLAUDE_SKILL_DIR}/agents/` **in parallel**. All are **read-only** — analysis only, no edits. Each gets the full brief plus all file paths in the target.

| Teammate | Agent file | Lens |
|----------|-----------|------|
| YAGNI Enforcer | `yagni.md` | What here solves a problem nobody actually has? |
| Cost Auditor | `cost-auditor.md` | What's the maintenance burden vs. the value delivered? |
| Alternatives Scout | `alternatives.md` | What existing libraries, services, or simpler architectures could replace this? |

## Synthesis

### Credibility Filter

Discard findings that fail any of these:

- **Evidence-based** — references specific files, line counts, complexity metrics, or usage patterns. Speculation is not a finding.
- **Proportionate** — a 30-line utility being "unnecessary" isn't worth reporting; a 500-line abstraction wrapping a 10-line operation is. The model's instinct is to report everything it finds — resist this. Only surface findings where the cost/value mismatch is material.
- **Alternative-bearing** — "delete this" is not actionable. "Replace this 400-line custom parser with `{library}`" is.
- **Honest about migration cost** — removing/replacing code has a cost too. Acknowledge it.

Discard findings where the reviewer misunderstood the feature's purpose. Discard findings about code that's necessary but could be slightly shorter — that's refactoring territory, not this skill's job.

### Severity & action

| Level | Meaning | Action |
|-------|---------|--------|
| **CUT-internal** | Maintenance cost clearly exceeds value, no user-facing capability removed (dead code, unused abstraction, internal helper). | Auto-apply. |
| **CUT-user-facing** | Removes an endpoint, tool, CLI command, public API, or feature users can call. | Surface for sign-off — usage outside the codebase can't be verified from inside it. |
| **SHRINK** | Feature is justified but implementation is 3-10x larger than necessary. Behavior preserved. | Auto-apply. |
| **QUESTION** | Unclear whether this earns its keep. Needs user context — state the specific question. | Surface, do not edit. |
| **KEEP** | Reviewers challenged it and it survived. Note what was challenged and why it stood — this builds trust that the review is fair, not just aggressive. | No action. |

## Acting

Run tests first. If they fail, stop — cutting requires a passing baseline.

Apply SHRINK and CUT-internal in one pass. Fix all import references; run lint + tests after the batch.

Do not act on CUT-user-facing or QUESTION items. List them in the report for the user's call.

### Report Structure

1. **Scope summary** — what was reviewed (files, LOC, features)
2. **Headline** — one sentence: lean, reasonable, or bloated?
3. **Applied** — `git diff --stat`, the SHRINK and CUT-internal changes, reduction percentage
4. **Awaiting sign-off** — CUT-user-facing list with alternatives and estimated LOC reduction
5. **QUESTION list** — what needs user context (state the specific question)
6. **KEEP list** — what survived the challenge
7. **If starting fresh** — knowing what we know now, what's the minimal architecture delivering the same capabilities?

### Failure Modes

- **Drive-by severity inflation.** The model tends to rate everything CUT or SHRINK to look thorough. A report with zero KEEP items signals the review failed, not that the code is bad. Calibrate: most well-maintained codebases have more KEEP than CUT.
- **Ignoring migration cost.** "Replace with library X" sounds clean until you account for the API surface, test rewrite, and behavior differences. Every recommendation must acknowledge what the switch costs.
- **Misreading domain code as over-engineering.** Domain-specific abstractions (workflow engines, rule systems, protocol handlers) look like speculative architecture to a generalist reviewer. When code serves a domain you don't fully understand, classify as QUESTION, not CUT.
