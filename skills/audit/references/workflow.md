# Audit workflow

One dimension = one review assignment.

Judge whole-system complexity, useful abstractions, and actual requirements. Complexity is entanglement: concerns that cannot be understood or changed independently; unfamiliarity, part count, and code organization do not measure it. Process advice (design it twice, write comments first) is not a violation to infer from code.

Scope: the requested PR, diff, files, or paths; else the diff against the default branch. Every reviewer gets the same complete scope and base revision. Read surrounding code and consumers as a finding needs. Version history, where available, is evidence (change frequency, co-change); report its absence as a material limitation.

Selection: `full`, or no selector, = every dimension except `ux`. Dimension names select those dimensions; include `ux` only when explicitly requested. Legacy aliases: `perf` → `performance`, `structure` → `modularity`, `patterns` → `consistency`. Legacy `review only` is redundant; ignore it.

Dispatch: deduplicate selected dimensions (aliases included), then spawn one independent, read-only agent per dimension. Brief each with the raw request, scope and base, project constraints, dimension name, this workflow, and its dimension file. Never combine dimensions in one agent, split the PR across agents, or give a reviewer other reviewers' conclusions. Limited capacity: run successive batches. No delegation: disclose it, review dimensions sequentially, claim no independence.

Each reviewer:

- Reads its entire dimension file; scans the whole scope against those criteria.
- Reports concrete code smells and violations, including maintenance costs with no runtime bug; explains the observed burden, violated promise, or plausible failure. A missing test, log, retry, or configuration is not by itself a problem. Applies each bullet's qualifications against actual requirements.
- Per finding: location, violated criterion, enough evidence to explain the problem; improvement direction when useful. Missing evidence stays separate from findings. No finding quota.
- Changes no code. Returns a short findings list, or none, plus material scope limitations. Questions about unestablished capability value stay separate from confirmed findings. No per-bullet compliance report.

Consolidation: the consolidating agent verifies findings against the code and merges duplicates (same problem, same root cause), keeping useful evidence and relevant criteria. Distinct problems stay separate, even at one location. Resolve competing design preferences toward lower whole-system complexity, within established behavioral and domain requirements. Keep disagreements the evidence cannot settle, marked unresolved. Rank maintenance findings in hotspots (high change frequency and high complexity) first.

Report: consolidated findings by importance, dimensions reviewed, material limitations. The audit ends after review and consolidation. A calling workflow may separately implement findings when fixes are already authorized.
