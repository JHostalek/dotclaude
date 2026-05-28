---
name: audit-necessity
description: Use when cutting code in a folder that doesn't earn its keep — whether a solution is over-engineered, where maintenance cost can be reduced, or where a feature should be removed entirely.
argument-hint: <path>
---

target_path = $ARGUMENTS

No target path → ask. Needs concrete scope; "the whole repo" produces shallow findings.

## Scope

Not correctness, not style. The question: **should this code exist at all, and if so, at this size?**

## Teammates

Build a shared brief (scope LOC + entry points, concrete feature list, stack, stated purpose if any), then spawn all three from `${CLAUDE_SKILL_DIR}/agents/` **in parallel, read-only**. Each gets the brief plus all target file paths.

| Teammate | Agent file | Lens |
|----------|-----------|------|
| YAGNI Enforcer | `yagni.md` | What solves a problem nobody actually has? |
| Cost Auditor | `cost-auditor.md` | Maintenance burden vs. value delivered? |
| Alternatives Scout | `alternatives.md` | What library, service, or simpler architecture replaces this? |

## Synthesis

Discard any finding that is: not evidence-based (cites no file/line-count/usage); not proportionate (a 500-line abstraction wrapping a 10-line op qualifies, a 30-line utility does not); not alternative-bearing ("replace this 400-line parser with `{library}`", not "delete this"); silent on migration cost; or rooted in the reviewer misreading the feature's purpose. Code that's necessary but slightly shorter is refactoring, not this skill.

| Level | Meaning | Action |
|-------|---------|--------|
| **CUT-internal** | Cost clearly exceeds value, no user-facing capability lost (dead code, unused abstraction, internal helper). | Auto-apply. |
| **CUT-user-facing** | Removes an endpoint, tool, CLI command, public API, or callable feature. | Surface for sign-off — external usage can't be verified from inside. |
| **SHRINK** | Feature justified but implementation 3-10x larger than necessary. Behavior preserved. | Auto-apply. |
| **QUESTION** | Unclear whether it earns its keep. State the specific question. | Surface, do not edit. |
| **KEEP** | Challenged and survived. Note what was challenged and why it stood. | No action. |

## Acting

Requires a passing test baseline — if tests fail, stop. Apply SHRINK + CUT-internal in one pass, fix import references, run lint + tests after the batch. Do not act on CUT-user-facing or QUESTION; list them for the user's call.

### Report

1. **Scope** — files, LOC, features reviewed
2. **Headline** — one sentence: lean, reasonable, or bloated?
3. **Applied** — `git diff --stat`, the SHRINK + CUT-internal changes, reduction %
4. **Awaiting sign-off** — CUT-user-facing list w/ alternatives + estimated LOC cut
5. **QUESTION list** — specific questions needing user context
6. **KEEP list** — what survived
7. **If starting fresh** — minimal architecture delivering the same capabilities

### Calibration

Your bias is to inflate severity to look thorough — resist. Most well-maintained codebases yield more KEEP than CUT; a zero-KEEP report signals the review failed, not that the code is bad. Every replace-with-library recommendation costs API surface, test rewrites, and behavior differences — price it. Domain-specific abstractions (workflow engines, rule systems, protocol handlers) read as speculative architecture to a generalist; when code serves a domain you don't fully understand, classify QUESTION, not CUT.
