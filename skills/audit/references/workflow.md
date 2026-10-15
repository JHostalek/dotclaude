# Audit workflow

Select dimensions from [the catalog](catalog.md). Each topic is one review assignment, regardless of how many sources contribute its criteria.

Apply the book's qualifications: judge whole-system complexity, useful abstractions, and actual requirements. Do not turn process advice such as designing twice or writing comments first into violations inferred from code.

Use the requested PR, diff, files, or paths. Otherwise review changes against the repository's default branch. Give every reviewer the same complete scope and base revision. Read surrounding code and consumers as needed to understand a finding.

`full`, or no selector, selects every code dimension in the catalog. Dimension names select those topics; explicitly include `ux` when requested. Accept legacy `perf`, `structure`, and `patterns` as aliases for `performance`, `modularity`, and `consistency`. Treat legacy `review only` as redundant.

Spawn one independent, read-only agent per selected dimension. Give it the raw request, scope and base, project constraints, dimension name, this review instruction, and its dimension file. Deduplicate selected topics, including aliases. Do not combine dimensions in one agent, divide the PR between agents, or give a reviewer other reviewers' conclusions. When capacity is limited, run dimensions in successive batches. If delegation is unavailable, disclose the limit and review dimensions sequentially without claiming independence.

Each reviewer:

- Reads its entire dimension and scans the whole requested scope through those criteria.
- Reports concrete code smells and violations, including maintenance costs that do not cause a runtime bug. Explains the observed burden, violated promise, or plausible failure. Missing tests, logs, retries, or configuration alone do not establish a problem. Applies each bullet's qualifications and the book's design principles in context of actual requirements.
- Gives each finding a code location, the criterion it violates, and enough evidence to explain the problem. Suggests a direction for improvement when useful. Keeps missing evidence separate from findings and applies no finding quota.
- Leaves code unchanged. Reports a short list of findings, or no findings, plus any material scope limitation. Keeps questions about unestablished capability value separate from confirmed findings. Does not create a compliance report for every bullet.

The consolidating agent checks findings against the code and merges duplicates describing the same problem and underlying cause. Preserve useful evidence and the relevant criteria. Keep separate problems separate even when they occur at the same location. Use the book's principles to resolve competing design preferences; respect established behavioral and domain requirements. Retain unresolved disagreements when the evidence cannot settle them.

Report consolidated findings by importance, dimensions reviewed, and material limitations. An audit is complete after review and consolidation. A calling workflow may separately implement findings when fixes are already authorized.
