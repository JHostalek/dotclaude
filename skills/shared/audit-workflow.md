# Audit Workflow Engine

Shared discipline for every audit dimension, whether it runs alone or inside a sweep. Handle branch setup and commits inline — don't invoke the `merge`/`rebase`/`pr` skills mid-audit, they gate and push on their own terms.

Running more than one dimension? Orchestration — phase groups, parallel worktrees, integration order, reconcile, PR — is in `skills/shared/audit-integration.md`.

**Scope first.** Path arg → that subtree; none → files changed vs the default branch; full repo only on explicit request. Tiny scope or a single dimension → skip the worktrees and run inline.

<coverage_invariant>
Each dimension's numbered baseline is required coverage. Mark an area inapplicable only when the scoped system cannot exercise it and record the evidence. Derive additional probes from the system's architecture, domain, lifecycle, deployment, and failure consequences when the baseline does not cover a material risk.
</coverage_invariant>

## Shared review shape

Every dimension uses the same outer method; its skill supplies the domain-specific invariants and probes:

1. Reconstruct intended behavior, ownership, boundaries, lifecycle, operating modes, and failure consequences from repository and runtime evidence.
2. Map the material end-to-end paths before judging local code. Include alternate entry points, failure/recovery paths, mixed versions, migrations, and operational paths when applicable.
3. State the dimension-specific invariants and the consequence of violating them.
4. Apply every applicable baseline area, then search for emergent failures created by interactions between otherwise reasonable components.

Do not infer safety from a framework, helper, type, schema, test, name, convention, or familiar pattern. Verify the exact path, configuration, version, lifecycle state, and affected consumers.

**Find wide, then filter.** Collect every candidate the lens surfaces before judging any of them, then make one pass over the collected list applying the dimension's noise bar. A filter applied while searching lowers what the audit finds.

For every retained finding establish: the violated invariant; exact path and triggering state; concrete consequence; existing control and why it fails; smallest safe correction; and verification that discriminates correct from incorrect behavior.

Classify retained items as:

- **confirmed defect** — the invariant, violating path, and consequence are demonstrated;
- **worthwhile improvement** — the current behavior is valid, but a concrete risk or maintenance cost justifies change;
- **unresolved question** — material evidence or intended behavior is unavailable.

A dimension may use a more precise label, but it must preserve these distinctions. Do not promote a hypothetical, stylistic preference, missing test alone, or possible future problem into a defect.

**Auto-fix is the default.** Apply every validated correction within scope, including non-trivial fixes, and verify the affected behavior. Escalate only a critical decision the evidence cannot safely choose: irreversible or destructive data action; public capability or compatibility break; auth/authorization/cryptographic policy or format migration; material infrastructure, availability, consistency, or cost tradeoff; external-system action beyond the requested scope; or genuine ambiguity where either interpretation could be the product contract. Report the evidence, options, recommendation, and exact decision needed. A hard-coded secret is evidence to surface, not authorization to rewrite history or rotate credentials.

Keep "move a file" and "edit its contents" in separate commits so rename detection survives.

## Shared completion ledger

Before completion, account for every numbered baseline area and every derived lens as:

- `reviewed` — components, boundaries, paths, invariants, evidence, findings, and variant searches;
- `not applicable` — concrete evidence that the scoped system cannot exercise it;
- `deferred` — exact blocker, missing evidence, and residual risk.

Reconcile findings across boundaries, search for variants of every confirmed defect, verify fixes on the failing and allowed paths, and state residual uncertainty. Completion means coverage is accounted for, not that a finding quota was reached or the system was proven universally safe, correct, fast, reliable, or simple.

**Reporting.** Dimensions run, auto-fixes applied, critical decisions escalated, unresolved questions, verification, ledger gaps, and gate result. The PR body carries escalations with evidence and recommendation; it is not a prose retelling of the diff.
