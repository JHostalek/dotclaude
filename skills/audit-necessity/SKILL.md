---
name: audit-necessity
description: Use when cutting code in a folder that doesn't earn its keep — whether a solution is over-engineered, where maintenance cost can be reduced, or where a feature should be removed entirely.
argument-hint: <path>
---

!`cat "${CLAUDE_SKILL_DIR}/../audit-workflow.md"`

Necessity dimension: **should this code exist at all, and if so, at this size?** Three lenses:

- **YAGNI** — code solving a problem nobody has: features w/o users, speculative architecture (single-impl interfaces, one-plugin plugin systems), premature generalization, future-proofing tax.
- **Cost** — maintenance burden vs value delivered. Ratio is the finding, never numerator alone: high-cost/low-value = target; high-cost/high-value on hot path = justified.
- **Alternatives** — specific library, platform feature, simpler architecture, or "just don't". Name the library; "there's probably a library" is not a finding. 80%-coverage library = rewrite-with-a-dependency, not a drop-in.

Grade each candidate KEEP or CUT. A CUT must cite evidence (file / line-count / usage), be proportionate (500-line abstraction wrapping 10-line op qualifies; 30-line utility does not), and price migration cost when replacement is proposed — every replace-with-library recommendation costs API surface, test rewrites, behavior differences. Code necessary but slightly shorter is refactoring, not this dimension. Most well-maintained codebases grade more KEEP than CUT; an all-CUT list means the grading pass didn't run.

**auto-fix** = cost clearly exceeds value w/ no user-facing capability lost (dead code, unused abstraction, internal helper), or justified feature whose implementation is 3-10x larger than needed w/ behavior preserved. Fix imports after cutting.

**sign-off** = removes endpoint, tool, CLI command, public API, or callable feature (external usage unverifiable from inside), or unclear whether code earns its keep — state the specific question. Include the estimated LOC cut.

Domain-specific abstractions (workflow engines, rule systems, protocol handlers) read as speculative architecture to a generalist; code serving a domain you don't fully understand → sign-off as a question, don't cut.
