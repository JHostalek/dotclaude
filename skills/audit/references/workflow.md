# Audit Workflow

For multiple dimensions, read [integration.md](integration.md). Use the Git workflow only for explicitly authorized publication or integration; an audit does not imply either.

**Scope:** explicit scope wins; otherwise use files changed against the default branch. Audit the full repository only when requested. Run a tiny scope or single dimension inline.

## Select coverage

Use only the requested dimensions. `full`, or invocation without a dimension, selects all fourteen baseline lenses below. Scope arguments select files or paths, not extra dimensions. UX is additional coverage only when requested. Treat absent tests as an evidence-backed applicability decision, not an unreported omission.

| Area | Baseline lenses, in integration order |
| --- | --- |
| Layout | [necessity](necessity.md), [structure](structure.md) |
| Behavior | [patterns](patterns.md), [contracts](contracts.md), [correctness](correctness.md), [data-integrity](data-integrity.md), [error-handling](error-handling.md) |
| Operations | [logs](logs.md), [perf](perf.md), [reliability](reliability.md), [security](security.md) |
| Surface | [tests](tests.md), [complexity](complexity.md), [comments](comments.md) |
| Optional UI review | [ux](ux.md) |

Read each selected lens and apply its numbered probes. A narrow request does not authorize a full sweep.

## Review

Reconstruct intended behavior, ownership, lifecycle, operating modes, and boundaries from repository and runtime evidence. Map material end-to-end paths, including applicable alternate entry points, recovery, mixed versions, migrations, and operations. Establish the dimension's invariants and consequences before judging local code.

Each numbered baseline is required coverage. Add probes for material risks exposed by the architecture, domain, lifecycle, deployment, or component interactions. Mark a baseline inapplicable only with evidence that the scope cannot exercise it.

Collect candidates before applying the dimension's noise bar. Verify the actual path, configuration, version, lifecycle state, and consumers; a framework, type, test, or familiar pattern alone is insufficient evidence.

For every retained finding record: violated invariant; path and triggering state; consequence; existing control and why it fails; smallest safe correction; and a check that distinguishes correct from incorrect behavior.

Distinguish:
- **confirmed defect:** demonstrated violation and consequence;
- **worthwhile improvement:** valid behavior with a concrete avoidable risk or maintenance cost;
- **unresolved question:** missing material evidence or intended behavior.

Preserve those distinctions when using domain-specific labels. Hypotheticals, style preferences, or missing tests alone are not defects.

## Corrections

Honor review-only requests. Otherwise apply validated in-scope corrections and verify affected behavior. The UX lens defaults to review-only unless fixes were explicitly requested. Escalate decisions the evidence cannot safely choose: destructive or irreversible data actions; public capability or compatibility breaks; auth/authorization/crypto policy or format migrations; material infrastructure, availability, consistency, or cost trade-offs; external actions beyond scope; and ambiguous product contracts. Report evidence, options, recommendation, and the exact decision needed. A secret finding does not authorize history rewriting or credential rotation.

When commits are authorized, separate file moves from content edits to preserve rename detection. An audit does not itself authorize commits, pushes, or PR creation.

## Completion

Account for every numbered baseline and derived lens:
- `reviewed`: components, boundaries, paths, invariants, evidence, findings, and variant searches;
- `not applicable`: evidence that the scope cannot exercise it;
- `deferred`: blocker, missing evidence, and residual risk.

Reconcile findings across boundaries, search for defect variants, and verify both failing and allowed paths. Report dimensions run, fixes, escalated decisions, unresolved questions, verification, coverage gaps, and gate results. If a PR is requested, include outstanding decisions with evidence and recommendations. Coverage accounting does not prove universal correctness or safety.
