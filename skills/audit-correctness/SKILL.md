---
name: audit-correctness
description: Use when auditing and fixing logic bugs in a scope — off-by-one, wrong operator, inverted condition, unhandled boundary cases, unit/dimension mismatch, code that doesn't do what its name or docstring claims. Triggers on "audit correctness", "fix logic bugs", "check for off-by-one", "correctness review".
argument-hint: [path]
---

!`cat "${CLAUDE_SKILL_DIR}/../audit-workflow.md"`

Run as the `correctness` dimension. Find behavior that can produce an observably wrong result or state, whether the defect is local, architectural, emergent between components, or visible only under particular lifecycle or operating conditions.

<coverage_invariant>
Every category, defect class, and example below is minimum and non-exhaustive. Add, combine, split, reweight, or skip probes according to the actual system while preserving every applicable baseline area. Derive further invariants from the product, domain, architecture, data, deployment, and operating model. “Not listed” never means “out of scope”; record evidence for any area judged inapplicable.
</coverage_invariant>

## Work top-down

Start from intended system behavior, not grep patterns:

1. Reconstruct the behavioral model from user-visible promises, domain rules, schemas, types, APIs, state machines, callers, tests, migrations, configuration, deployment topology, and operational workflows. Identify authoritative state, derived state, invariants, preconditions, postconditions, ownership, ordering, consistency guarantees, and allowed failure behavior.
2. Map each material behavior across its complete path: input or event, normalization, validation, computation, state transition, persistence, replication or messaging, caching, output, and later reconciliation or cleanup. Include alternate, legacy, administrative, asynchronous, retry, recovery, and mixed-version paths.
3. Derive consequences of divergence before inspecting implementation detail: wrong result, lost or duplicated work, invalid state, stale view, irreversible action, broken accounting, cross-component disagreement, or violation that appears only under load, restart, failover, clock change, or concurrent use.
4. Inspect architecture-wide invariants and dangerous compositions first, then trace exact call paths and apply the baseline to every applicable component and boundary. Search for variants after confirming a flaw.

Treat names, signatures, docstrings, comments, caller expectations, tests, specifications, and existing behavior as evidence of intent, not independent truth. Resolve conflicts among them using product behavior and system invariants. If intent remains ambiguous, retain an unresolved question rather than selecting a convenient interpretation.

Never infer correctness from a framework, type system, schema, ORM, transaction helper, generated client, shared utility, naming convention, familiar pattern, or passing test. Verify what the exact version, configuration, call path, data shape, isolation level, deployment topology, and failure timing guarantee. Individually reasonable components can compose into incorrect behavior.

## Mandatory correctness baseline

This baseline is minimum current-practice coverage, not an exhaustive checklist. Apply every relevant lens, add system-specific ones, and inspect interactions among them.

### 1. Behavioral contracts and invariant ownership

- User and API promises, domain rules, preconditions, postconditions, conservation laws, uniqueness, ordering, monotonicity, idempotency, reversibility, and terminal-state guarantees.
- Source of truth and ownership for each invariant; duplicated enforcement, missing enforcement, contradictory authorities, derived-state drift, and assumptions that no component actually guarantees.
- Agreement between public behavior, schemas, types, implementation, callers, tests, documentation, examples, migrations, and deployed compatibility requirements.
- Alternate entry points and privileged, batch, repair, import/export, webhook, scheduled, retry, rollback, and recovery paths that must preserve the same invariant.

### 2. Control flow and decision semantics

- Conditions, branching, precedence, short-circuiting, De Morgan transformations, default branches, fallthrough, early returns, exhaustiveness, loop termination, recursion, and unreachable or unexpectedly reachable paths.
- Boundary decisions: inclusive versus exclusive bounds, zero- versus one-based positions, slicing, pagination, empty and singleton inputs, negative and extreme values, and transitions at exact thresholds.
- State-dependent decisions using the wrong snapshot, field, actor, tenant, version, mode, or feature state.
- Divergent implementations of the same rule whose differences cause inconsistent outcomes.

### 3. Data meaning, identity, and transformation

- Semantic preservation through parsing, normalization, validation, mapping, filtering, sorting, grouping, joining, deduplication, aggregation, serialization, deserialization, and round trips.
- Field swaps, lossy conversions, truncation, default insertion, absent versus null versus empty versus zero, boolean tri-state, enum fallbacks, sentinel collisions, and unknown-value handling.
- Stable identity, equality, hashing, canonicalization, aliasing, case and Unicode behavior, composite keys, identifier reuse, object copying, and mutable shared references.
- Collection cardinality and order; duplicate, missing, stale, orphaned, or misattributed records across joins, batches, pagination, caches, indexes, and replicas.

### 4. State machines and workflow integrity

- Legal states and transitions, required ordering, transition guards, repeated or skipped steps, cancellation, compensation, retry, resume, timeout, expiration, and irreversible actions.
- Initial, intermediate, terminal, tombstoned, archived, restored, migrated, and partially completed states.
- Events or commands arriving early, late, duplicated, reordered, concurrently, or after the relevant state changed.
- Cross-service or client/server state machines whose local transitions are valid but whose combined sequence violates the end-to-end workflow.

### 5. Numerical, dimensional, and algorithmic correctness

- Units, dimensions, scale, sign, coordinate systems, indices, bases, ranges, precision, overflow/underflow, integer division, rounding mode and stage, floating-point comparison, NaN/infinity, and decimal or currency representation.
- Aggregation, apportionment, thresholds, interpolation, statistics, probability, ranking, scoring, search, graph, geometry, and optimization semantics where present.
- Algorithm assumptions and invariants, including sortedness, uniqueness, connectivity, convergence, stability, determinism, complexity-dependent shortcuts, and adversarial or degenerate inputs.
- Conservation and reconciliation of money, inventory, quota, counters, balances, capacity, or other domain quantities across splits, merges, conversions, retries, and corrections.

### 6. Time, scheduling, and lifecycle

- Instants versus civil time, timezone conversion, DST gaps and folds, leap behavior where relevant, calendar arithmetic, locale, precision, clock source, clock skew, and monotonic versus wall time.
- Inclusive/exclusive intervals, expiration boundaries, grace periods, recurrence, missed schedules, overlapping jobs, delayed execution, backfills, and historical recomputation.
- Initialization, startup ordering, warmup, steady state, shutdown, restart, crash recovery, failover, restore, upgrade, downgrade, rollback, deletion, and decommissioning.
- Resources or records whose validity changes while work is queued, cached, retried, resumed, or processed by a long-lived worker.

### 7. Concurrency and distributed consistency

- Atomicity, isolation, visibility, stale reads, lost updates, write skew, check-then-act, TOCTOU, lock scope/order, optimistic concurrency, and memory-model assumptions.
- Duplicate delivery, retries, idempotency-key scope and lifetime, ordering, causal dependencies, out-of-order completion, at-least/at-most/exactly-once claims, and poison or replayed events.
- Transaction boundaries across databases, queues, files, caches, search indexes, external APIs, and side effects; partial commit, compensation, reconciliation, and orphan cleanup.
- Replication lag, split brain, failover, leader changes, partitions, offline clients, eventual consistency, read-your-writes, and conflict resolution.
- Race-safe quotas, uniqueness, allocation, scheduling, counters, inventory, and state transitions under realistic contention.

### 8. Persistence, queries, and migrations

- Query predicates, joins, grouping, ordering, pagination stability, null semantics, collation, timezone behavior, row cardinality, projection, and transaction/isolation assumptions.
- Schema constraints matching domain invariants; application checks that race; database triggers, defaults, cascades, generated values, and ORM behavior that alter semantics.
- Cache key completeness, invalidation, eviction, negative caching, tenant/version/config separation, stampede behavior, and consistency with authoritative state.
- Migration and backfill correctness, rerun safety, resumability, mixed-schema and mixed-binary operation, dual reads/writes, cutover, rollback, historical data shapes, and preservation of identifiers and meaning.
- Restore, replica, archive, retention, deletion, and repair behavior, including reconciliation after partial or repeated execution.

### 9. Interfaces, protocols, and integration boundaries

- Request/response and event contracts, required and optional fields, defaults, version negotiation, compatibility, unknown fields, status/code mapping, and semantic—not merely syntactic—validation.
- Encoding, locale, newline, byte order, character set, content type, compression, path and URL semantics, platform-dependent filesystem behavior, and parser/producer disagreement.
- External service guarantees for pagination, retries, rate-limit responses, webhooks, callbacks, eventual consistency, idempotency, ordering, and timeout ambiguity.
- Client/server, producer/consumer, sync/async, old/new, online/offline, and regional implementations that interpret the same contract differently.
- UI and presentation transformations that change meaning: stale optimistic state, selection identity, sorting/filtering, forms, accessibility state, rounding, timezone display, localization, and submitted values.

### 10. Configuration, deployment, and operating modes

- Configuration precedence, coercion, defaulting, environment overlays, partial configuration, hot reload, feature flags, experiments, tenant settings, and runtime capability detection.
- Development, test, staging, production, preview, regional, multi-tenant, offline, degraded, maintenance, and disaster-recovery modes.
- Version-sensitive behavior in dependencies, runtimes, databases, platforms, generated artifacts, and managed services; verify current authoritative behavior when it affects the conclusion.
- Deployment ordering, mixed versions, data/control-plane skew, stale workers, rollback, failover, autoscaling, and operational interventions that expose otherwise hidden invalid states.

### 11. Partial failure and recovery semantics

- Whether timeout, cancellation, interruption, restart, dependency failure, resource exhaustion, or partial response leaves correct state and a truthful result.
- Retry classification, duplicate side effects, compensation, checkpointing, resume position, reconciliation, and manual repair.
- Fallbacks and degraded paths that silently change semantics, serve stale or incomplete data as authoritative, or mask disagreement between components.
- Distinguish this from the `error-handling` dimension: correctness owns the wrong result or invalid state; error handling owns loss, suppression, or misrouting of the error signal. A defect may require both lenses.

### 12. Domain-specific and emergent correctness

Derive additional coverage from the system. Examples include ledger balancing and settlement, inventory reservation, entitlement and billing periods, healthcare measurements, identity linking, geospatial reference systems, media timelines, synchronization/conflict rules, compiler or protocol conformance, safety-critical controls, ML feature/label alignment and evaluation leakage, and agent/tool action-result correlation. These examples are explicitly non-exhaustive.

Inspect behavior spanning multiple baseline areas—for example a timezone boundary combined with retry, a migration combined with cache invalidation, or optimistic UI state combined with out-of-order events. Emergent failures are in scope even when no individual function is locally wrong.

## Evidence and judgment

Follow the shared workflow’s find-wide-then-filter rule. Collect all candidates before applying the correctness noise bar; never use a likely explanation, familiar abstraction, or test presence to avoid collecting a candidate.

For every retained finding establish:

- the intended invariant or behavioral contract and the evidence that establishes it;
- the concrete end-to-end path, inputs/state, and operating conditions that violate it;
- the wrong observable result or invalid state and affected users, data, or downstream systems;
- existing controls, types, tests, transactions, retries, or abstractions and why they fail on this path;
- the smallest safe correction that preserves legitimate behavior;
- a deterministic regression test, model/property check, trace, query, simulation, or other verification method appropriate to the invariant.

Use boundary tests, property-based tests, state-machine models, differential tests, metamorphic relations, concurrency schedules, fault injection, historical-data checks, or local reproductions when they provide stronger proof. This set is non-exhaustive; select or derive the proof method that can actually discriminate correct from incorrect behavior.

Reject a candidate only after showing that the exact path preserves the invariant or that authoritative intent permits the behavior. Classify retained items as:

- **confirmed defect** — the invariant and violating path are demonstrated;
- **worthwhile improvement** — behavior is currently valid, but a concrete fragility or verification gap merits change;
- **unresolved question** — material ambiguity or unavailable evidence prevents a correctness conclusion.

Do not inflate a hypothetical, stylistic preference, missing test alone, or possible alternative specification into a defect. Conversely, lack of a convenient reproduction does not disprove a path established from semantics and reachable state.

<fix_gate>
Auto-fix only within the shared workflow boundary and where intent is pinned by converging authoritative evidence. Preserve legitimate behavior. Escalate ambiguous product semantics, public contract changes, data repair or migration, irreversible state changes, distributed-consistency tradeoffs, financial or safety-critical rules, and fixes whose compatibility impact is uncertain. The split decides who fixes a divergence, never whether it gets reported.
</fix_gate>

## Completion gate

Before sign-off, reconcile findings across component boundaries, search for variants of each confirmed defect, and produce a coverage ledger for every numbered baseline area plus every newly derived lens. Record each as:

- `reviewed` — components and boundaries examined, invariants verified, probes or scenarios exercised, and findings/variants;
- `not applicable` — concrete architectural or domain evidence showing why;
- `deferred` — exact blocker, unverified invariant or boundary, and residual correctness risk.

Completion requires every baseline area and every material end-to-end behavior to be accounted for, not a predetermined number of findings. Report scope, confirmed defects, worthwhile improvements, unresolved questions, auto-fixes, escalations, verification performed, and residual gaps. Do not claim the system is “correct”; state what evidence supports and what remains unverified.
