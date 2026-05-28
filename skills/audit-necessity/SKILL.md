---
name: audit-necessity
description: Use when cutting code in a folder that doesn't earn its keep — whether a solution is over-engineered, where maintenance cost can be reduced, or where a feature should be removed entirely.
argument-hint: <path>
---

!`cat ~/.claude/skills/audit-workflow.md`

Run as the `necessity` dimension. Lens:

The question is not correctness or style — it is **should this code exist at all, and if so, at this size?** Audit through three sub-lenses:

- **YAGNI** — what solves a problem nobody actually has: features without users, speculative architecture (single-impl interfaces, one-plugin plugin systems), premature generalization, future-proofing tax.
- **Cost** — maintenance burden vs value delivered. The ratio is the finding, never the numerator alone: high-cost/low-value is the target; high-cost/high-value on a hot path is justified.
- **Alternatives** — what library, platform feature, simpler architecture, or "just don't" replaces this. Name the specific library; "there's probably a library" is not a finding, and an 80%-coverage library is a rewrite-with-a-dependency, not a drop-in.

A finding earns its keep only if it is evidence-based (cites file / line-count / usage), proportionate (a 500-line abstraction wrapping a 10-line op qualifies; a 30-line utility does not), alternative-bearing where it proposes replacement, and honest about migration cost. Code that is necessary but slightly shorter is refactoring, not this skill.

**auto-fix** = cost clearly exceeds value with no user-facing capability lost (dead code, unused abstraction, internal helper), or a justified feature whose implementation is 3-10x larger than needed with behavior preserved. Fix imports after cutting.

**sign-off** = removes an endpoint, tool, CLI command, public API, or callable feature (external usage can't be verified from inside), or it is unclear whether the code earns its keep — state the specific question. Never edit these; collect with evidence, proposed alternative, and estimated LOC cut.

Calibration: your bias is to inflate severity to look thorough — resist. Most well-maintained codebases yield more KEEP than CUT; a zero-KEEP result signals the review failed, not that the code is bad. Every replace-with-library recommendation costs API surface, test rewrites, and behavior differences — price it. Domain-specific abstractions (workflow engines, rule systems, protocol handlers) read as speculative architecture to a generalist; when code serves a domain you don't fully understand, surface it as a question, do not cut.
