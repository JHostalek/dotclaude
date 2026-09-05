---
name: judge
description: Obtain an independent review of the approach and trade-offs in completed work.
argument-hint: "[subject, or omit for recent work]"
disable-model-invocation: true
---

Review `$ARGUMENTS`, or the latest substantive work when omitted. Infer scope from the conversation and relevant files; ask only if ambiguity would materially change the review.

Delegate to one independent, read-only reviewer with a clean context: the requested outcome, constraints, subject, relevant files, stack, and project conventions. Do not provide your verdict or preferred critique. Add reviewers only for materially distinct expertise. If delegation is unavailable, disclose that limitation; do not call self-review independent.

Ask the reviewer to assess domain fitness, architectural choices, proportionality, and fundamentally different ways to achieve the outcome. Distinguish justified deviations from missed constraints; compare simplicity against real requirements and account for the adoption costs of alternatives. Feature necessity is a separate lens available through `/audit necessity`, not an automatic additional pass.

Retain findings supported by specific evidence, an actionable alternative, and its costs. Distinguish defects, valid trade-offs, and preferences. Remove claims that misread constraints or lack evidence; preserve meaningful disagreements if multiple reviewers were used.

Report a clear recommendation and its rationale, validated strengths, findings by importance, and the single most valuable change, if any. Identify missing evidence and reviewer limitations. Stop after the report; implement only when asked.
