---
name: audit-comments
description: Use when auditing comments, docstrings, or embedded documentation prose in a scope — to strip bloat and rewrite cluttered-but-justified entries. Triggers on "audit comments", "clean up docstrings", "strip stale comments", "comment cleanup".
argument-hint: [path]
---

!`cat "${CLAUDE_SKILL_DIR}/../audit-workflow.md"`

Run as the `comments` dimension. Comments run last because preceding structure, behavior, and naming edits can invalidate them.

Judge whether comments, docstrings, API documentation embedded beside code, annotations carrying prose, and documentation-only directives preserve the system's intended behavior or obscure it. The desired state is not maximal deletion: code states what it can express clearly; retained prose records consequential information that code and types cannot make reliable enough on their own.

<coverage_invariant>
Every lens, defect class, and example below is minimum and non-exhaustive. Add, combine, split, reweight, or skip probes according to the system's architecture, languages, tooling, domain, audiences, and failure consequences. “Not listed” never means “out of scope.” Skip a baseline area only when it is demonstrably inapplicable and record why.
</coverage_invariant>

## Work top-down

Reconstruct the system before judging individual prose:

1. Identify components, public and internal boundaries, data/control flows, lifecycle transitions, operational environments, generated surfaces, and the audiences who rely on embedded documentation: maintainers, API consumers, operators, integrators, auditors, or tooling.
2. Derive the documentation invariants whose loss or distortion could cause wrong behavior: protocol and schema semantics, units and ranges, ordering and concurrency constraints, ownership and cleanup, state transitions, compatibility commitments, safety/security rationale, platform or third-party quirks, irreversible operations, and tool-enforced directives. Add system-specific invariants.
3. Trace those invariants through declarations, implementations, callers, tests, configuration, schemas, generated output, and primary specifications. Review architecture-wide contradictions and lifecycle drift before local wording.
4. Find candidates widely across every applicable baseline area, then apply the shared workflow's noise filter. A terse or familiar-looking construct is not proof that its prose is redundant; a detailed comment is not proof that it is valuable.

Do not infer accuracy from naming, types, a framework, helper abstraction, nearby tests, repeated wording, an authoritative tone, or a comment surviving for years. Verify each material claim in its exact call path, version, configuration, lifecycle phase, and audience context. Conversely, do not remove a comment merely because the implementation currently agrees with it: the prose may carry a constraint the implementation alone cannot preserve through future change.

## Mandatory comments and embedded-documentation baseline

This is minimum coverage, not an exhaustive checklist. Apply every relevant area, derive additional probes from the system, and inspect interactions between areas.

### 1. System and architecture contracts

- Component responsibilities, dependency direction, cross-service assumptions, trust and tenant boundaries, data ownership, authoritative sources, consistency models, and intentional duplication.
- Invariants spanning multiple files or repositories that no single signature or implementation makes apparent.
- Design rationale and rejected alternatives only when they constrain future changes; remove history that no longer affects a decision.
- Transitional architecture, migrations, compatibility bridges, feature flags, mixed-version operation, rollback, and eventual removal conditions.

### 2. Public APIs, protocols, schemas, and integrations

- Preconditions, postconditions, errors, side effects, idempotency, retry semantics, ordering, pagination, partial success, cancellation, timeouts, and stability guarantees.
- Field meaning, units, ranges, defaults, nullability, sentinel values, encoding, canonicalization, precision, time zones, identifiers, and version behavior.
- Examples and cross-references that must match the callable interface and supported behavior, including less common and failure paths.
- External specifications, standards, vendor quirks, and version-sensitive workarounds. References must resolve and support the claim; pin the applicable version or condition where drift matters.

### 3. State, lifecycle, resources, and concurrency

- Ownership, borrowing, mutation, initialization, teardown, cleanup, disposal, transaction boundaries, cache invalidation, and recovery after partial failure.
- Thread, process, event-loop, interrupt, signal, and reentrancy assumptions; lock ordering, atomicity, visibility, races, and callback timing.
- State-machine transitions, one-time operations, replay, retries, duplication, out-of-order delivery, crash recovery, and restart behavior.
- Comments near one phase that became false in another phase, alternate implementation, asynchronous path, or platform-specific path.

### 4. Correctness-critical domain meaning

- Business rules, formulas, algorithms, legal or policy constraints, rounding, currency, units, coordinate systems, locale, calendar/time behavior, and boundary conditions.
- Non-obvious algorithmic invariants, complexity tradeoffs, numerical stability, probabilistic behavior, approximation bounds, and data-shape assumptions.
- Safety-, privacy-, and security-relevant intent: why a validation, authorization, redaction, constant-time operation, limit, or fail-closed behavior must remain.
- Domain terminology used consistently with schemas, user-facing concepts, and authoritative specifications.

### 5. Operations, configuration, and environment

- Configuration precedence, safe defaults, environment differences, deployment assumptions, capacity limits, resource costs, and operational failure modes.
- Diagnostics, runbook links, alerts, metrics, logs, health checks, fallback behavior, backup/restore, disaster recovery, and incident-sensitive instructions.
- Platform, compiler, runtime, database, filesystem, network, or cloud behavior that changes the claim.
- Temporary mitigations and TODO/FIXME/HACK/XXX notes: current owner or tracking reference where local convention requires it, concrete trigger or exit condition, and no false promise that work is scheduled.

### 6. Tooling and machine-consumed prose

- Linter, formatter, type-checker, test, coverage, code-generation, documentation-generation, packaging, build, CI, IDE, migration, and static-analysis directives.
- Suppressions and exemptions scoped to the smallest valid region, with a rationale that still matches the exact diagnostic and risk.
- Structured doc comments, doctests, examples, tags, links, and annotations whose syntax or content affects generated artifacts or tooling behavior.
- Generated code: do not hand-edit output. Audit the generator, template, schema, or source comment when it is in scope; otherwise record the generated surface as such.

### 7. Accuracy, locality, and referential integrity

- Every named symbol, file, field, flag, issue, URL, standard, version, error, and behavior resolves to the intended target and remains reachable to its audience.
- Prose sits at the narrowest durable source of truth. Detect copied explanations that diverge across implementations, languages, clients, or deployment modes.
- Scope words such as “always,” “never,” “safe,” “atomic,” “thread-safe,” “constant,” “temporary,” and “guaranteed” hold across the complete applicable path.
- Commented-out code, obsolete instructions, dead references, stale counts, stale examples, and claims about removed or renamed behavior.

### 8. Signal, clarity, and maintenance cost

- Narration that merely restates syntax, names, types, or an obvious call sequence; headings that add no navigation; boilerplate docstrings; change-log prose better held in version control.
- Valuable information buried under chronology, apology, speculation, excessive detail, duplicated context, or unexplained jargon.
- Comments whose abstraction level mismatches their location, or whose wording invites a locally reasonable but systemically wrong change.
- Dense blocks, diagrams, tables, examples, and repeated prose: retain only the smallest form that preserves the necessary invariant for the actual audience.

### 9. Missing documentation with concrete consequence

- Identify absent embedded documentation only when a maintainer, caller, operator, integrator, or tool cannot reliably recover a consequential invariant from code, types, schemas, tests, and authoritative nearby artifacts.
- Prioritize missing constraints at boundaries, irreversible or dangerous actions, subtle lifecycle/concurrency behavior, non-obvious domain rules, supported extension points, and externally consumed APIs.
- Prefer making code, types, schemas, validation, tests, or configuration self-explanatory when that can enforce the invariant. Add prose when enforcement cannot fully communicate the reason, scope, or consequence.

### 10. Specialized and emergent surfaces

Derive coverage for the actual domain and medium: bindings across languages, plugin or SDK contracts, embedded/real-time systems, regulated records, scientific or financial computation, infrastructure as code, notebooks, database routines, UI accessibility annotations, localization notes, and AI prompts or tool descriptions are examples only. Inspect failures created by individually accurate comments whose combination implies the wrong system behavior.

Exclude user-facing strings and log-message templates from prose cleanup unless the user placed them in scope. Do not edit vendored or generated output; follow it to an owned source when possible. These exclusions do not permit ignoring an owned comment that incorrectly describes those surfaces.

## Evidence and judgment

For every retained finding, establish:

- the documentation or system invariant violated;
- exact prose and the concrete implementation, caller, tool, generated artifact, lifecycle path, or specification that proves the mismatch or need;
- consequence for the affected audience;
- existing control or nearby source of truth and why it does not prevent the failure;
- smallest safe correction: delete, rewrite, relocate, consolidate, add, or replace prose with an enforceable construct;
- verification method, including generated-doc/tool output or relevant allowed behavior where applicable.

Collect candidates before filtering. Reject a candidate only after showing that the prose is accurate and earns its maintenance cost, or that the alleged missing information is reliably expressed elsewhere for every affected audience and path. “The code is the source” is not sufficient when the code cannot express rationale or a cross-boundary constraint. Missing prose is preferable to misleading prose, but deletion is not a substitute for preserving a necessary invariant elsewhere.

Classify results as:

- **confirmed defect** — false, contradictory, dangerously ambiguous, machine-breaking, or missing where a concrete misuse or contract failure follows;
- **worthwhile improvement** — accurate but redundant, misplaced, bloated, weakly navigable, or maintainability-reducing without a demonstrated behavioral failure;
- **unresolved question** — evidence is insufficient or authoritative sources conflict; do not present it as a finding.

## Fix and completion gate

Strip or rewrite prose as auto-fix only when code and machine-consumed behavior remain unchanged. Preserve legitimate behavior and intended guarantees. Validate affected documentation tooling, doctests, links, and rendered output where relevant.

Nothing in this dimension is sign-off. If the needed correction adds or relocates documentation, changes a public or compatibility contract, changes a directive or suppression, resolves an ambiguous specification, alters a compliance/legal/safety/security guarantee, or requires code, schema, configuration, operational, or user-facing changes, do not apply it here. Record the evidence as a worthwhile improvement or unresolved question for the owning dimension. “Comments are prose” does not make machine-consumed or contractual changes behavior-preserving.

Before sign-off, account for every numbered baseline area and every newly derived lens in a coverage ledger:

- `reviewed`: components, audiences, paths, sources checked, findings, and searched variants;
- `not applicable`: evidence showing the scoped system cannot exercise the area;
- `deferred`: exact blocker and the resulting uncertainty or risk.

Reconcile claims across component boundaries and search for variants of each confirmed defect. Report scope, exclusions, auto-fixes, escalations, unresolved questions, and ledger gaps. Completion requires every applicable baseline area and material documentation boundary to be accounted for, not a predetermined number of edits.
