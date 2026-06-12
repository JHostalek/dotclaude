---
name: judge
description: Use when the user wants an independent expert review of work done in this conversation before accepting or extending it.
argument-hint: "[description of what to review, or omit for recent work]"
---

subject = $ARGUMENTS

No subject → review most recent substantive work in this conversation; identify from context, confirm with user before spawning. Subject references a path → read enough to know full scope before dispatching.

**Why this exists:** the engineer who built something is the worst judge of it — they see what they intended, not what's there. Independent reviewers with clean context catch approach-level errors and missed alternatives that the original author rationalizes away. This skill produces that signal without the cost of a human code review.

## Role

You coordinate; teammates judge. Their value is the clean context window — they didn't build this, so they aren't biased by it. Don't run the review yourself; dispatch + synthesize.

## Scope

Not `/audit-necessity` (should it exist). Given we're building it, **did we build it the way an expert would?** — approach selection, architecture fitness, idiom correctness, trade-off awareness, missed alternatives, domain-standard solutions, proportionality of solution to problem.

## Teammates

Spawn all three in parallel from `${CLAUDE_SKILL_DIR}/agents/`. Read-only, analysis only.

| Teammate | Agent file | Lens |
|----------|-----------|------|
| Domain Expert | `domain-expert.md` | Would a senior specialist in this exact domain do it this way? |
| Pragmatist | `pragmatist.md` | Is this the most direct path to the goal? |
| Alt-Path | `alt-path.md` | What fundamentally different approaches did we not consider? |

Each gets: subject description, all relevant file paths / code / context, and the project's stack + conventions (detect from codebase).

## Synthesis

### Credibility filter

Drop any finding that fails one of:

1. **Substantiated** — cites specific code/decision/pattern, not "generally speaking".
2. **Actionable** — proposes a concrete alternative, not just criticism.
3. **Trade-off honest** — states the alternative's costs too.
4. **Calibrated** — separates "this is wrong" from "valid but here's another" from "fine, style preference". Overclaiming is this skill's #1 failure mode.

Also drop: style preferences dressed as expertise, findings where the teammate misread the constraints.

### Convergence

2+ teammates independently flag the same concern → elevate it. Teammates contradict → present both with reasoning, don't pick a winner.

### Verdict scale

| Verdict | Meaning |
|---------|---------|
| **EXPERT-GRADE** | A domain expert would recognize this as their own work. Style nits at most. |
| **SOLID** | Sound approach. Real improvements found, no fundamental issues. |
| **RETHINK** | Functional, but an expert would take a meaningfully different approach. |
| **RED FLAG** | Fundamental approach issue. Specific alternative(s) strongly recommended. |

### Report

1. **Verdict** — one word + one-sentence justification
2. **What's strong** — what teammates validated (criticism-only reports read as dishonest and lose trust)
3. **Findings** — grouped by importance. Each: concern, evidence, proposed alternative, trade-off of alternative, source teammate(s)
4. **If we could start over** — single highest-leverage change, if any

**Stop after the report. Do not implement changes unless asked.**
