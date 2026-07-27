---
name: audit-patterns
description: Use when auditing and unifying pattern consistency in a scope — divergent implementations of the same concern, reimplementations of existing utilities, naming violations, import disorder, unused dependencies. Triggers on "audit patterns", "fix inconsistencies", "unify conventions", "fix reimplementations", "pattern review".
argument-hint: [path]
---

!`cat "${CLAUDE_SKILL_DIR}/../audit-workflow.md"`

Run as the `patterns` dimension. Find inconsistent solutions that make behavior, change, or operation unpredictable; do not optimize for textual sameness.

<coverage_invariant>
Every lens, example, defect class, and probe in this skill is a minimum, non-exhaustive set. Add, combine, split, reweight, or skip probes according to the system's architecture, domains, technologies, lifecycle, and risks while covering every applicable baseline area. “Not listed” never means “out of scope.” Record why an area is inapplicable.
</coverage_invariant>

## Work top-down

Reconstruct the system before comparing syntax:

1. Identify intended behavior, architecture, module and ownership boundaries, domain concepts, public contracts, data and control flows, runtime/deployment variants, extension points, and lifecycle paths. Derive the invariants that equivalent operations must preserve.
2. Map each recurring concern to its implementations and consumers. Compare their semantics, failure behavior, side effects, observability, concurrency, performance, and compatibility—not only their names or shapes.
3. Establish candidate conventions from repository evidence: authoritative docs and configuration, public contracts, architecture decisions, supported framework idioms for the exact version, maintained shared abstractions, tests that assert intended behavior, and prevalence. No source is conclusive alone.
4. Find wide across every applicable baseline area before applying noise filters. Then classify each divergence as defect, worthwhile convergence, intentional variant, migration state, generated/vendor constraint, or unresolved question.
5. Trace consequential candidates through exact call paths and across components. Look for emergent inconsistency where individually reasonable implementations compose into incompatible states, retries, identities, formats, or operational behavior.

Do not infer that a pattern is correct because it is the majority, old, new, named conventionally, wrapped in a helper, supplied by a framework, or covered by tests. Prevalence estimates migration cost and expected familiarity; it does not establish intent or safety. A local pattern may be the better authority when it implements a newer contract or fixes a flaw in the majority. Verify the exact context before choosing a target.

Consistency is subordinate to correct domain boundaries. Do not collapse distinct concepts merely because their code looks similar, or force one abstraction across different ownership, latency, transaction, security, platform, or compatibility constraints.

## Mandatory patterns review baseline

This baseline is minimum and non-exhaustive. Expand it for the actual domain and inspect interactions between areas.

### 1. Architectural and ownership conventions

- Dependency direction, layer responsibilities, feature/module boundaries, public versus internal surfaces, composition roots, adapters, extension points, and cross-package access.
- Where validation, authorization, orchestration, persistence, transformation, and side effects belong; detect the same responsibility drifting between layers.
- Ownership of schemas, domain types, state transitions, generated artifacts, configuration, migrations, and shared infrastructure.
- Alternate entry points—API, worker, event, scheduled task, CLI, admin, import/export, retry, recovery—implementing the same operation with incompatible rules.

### 2. Domain model and semantic consistency

- Canonical terminology and identifiers; distinctions between absent, null, empty, zero, unknown, invalid, pending, deleted, and default.
- Units, currencies, time zones, calendars, precision, rounding, normalization, ordering, comparison, equality, and canonical serialization.
- Entity identity, tenant or account scope, ownership, lifecycle states, transition rules, idempotency keys, version fields, and soft-delete semantics.
- Equivalent business rules implemented in multiple places, including clients, services, jobs, analytics, migrations, and documentation.

### 3. Interfaces and contracts

- Predictable API, event, RPC, CLI, library, plugin, and configuration shapes: naming, arguments, defaults, pagination, filtering, versioning, status/result models, and compatibility policy.
- Request/response and message schemas, optionality, enum evolution, unknown fields, encoding, content types, metadata, headers, and correlation identifiers.
- Sync/async boundaries, callback and cancellation semantics, streaming/backpressure, retries, timeouts, idempotency, ordering, and duplicate delivery.
- Consumer assumptions across languages, generated clients, old/new versions, feature flags, rollout states, and third-party integrations.

### 4. Data access, state, and transactions

- Repository/query conventions, tenant scoping, eager/lazy loading, pagination, filtering, sorting, cache use, and read consistency.
- Transaction ownership and boundaries, locking, optimistic concurrency, outbox/inbox patterns, atomicity between storage and messages, and partial-failure recovery.
- Schema defaults and constraints versus application defaults and validation; migrations, backfills, dual reads/writes, rollback, and mixed-version operation.
- Cache keys, invalidation, TTLs, negative caching, replica behavior, serialization, and canonical source of truth.

### 5. Failures, control flow, and lifecycle

- Error taxonomies, wrapping/chaining, retryability, status mapping, fallback, cleanup, cancellation, propagation, and user-visible failure representation.
- Resource acquisition/release, initialization/shutdown, connection and subscription ownership, background task supervision, and process-signal handling.
- Async and concurrency conventions: awaiting, task ownership, race protection, context propagation, deadlines, bounded work, and deterministic completion.
- Create/update/delete, startup/reload/shutdown, reconnect, retry, restore, rollback, and disaster or degraded-mode paths. Normal-path consistency alone is insufficient.

### 6. Cross-cutting policy and operations

- Authentication and authorization placement, trust-boundary validation, secrets access, privacy controls, audit trails, and redaction applied consistently across all paths.
- Logging, metrics, traces, event names, severity, dimensions, correlation, sampling, and alert-relevant failure signals.
- Configuration sources, precedence, parsing, environment overlays, feature flags, defaults, hot reload, and fail-open/fail-closed behavior.
- Rate limits, quotas, timeouts, resource bounds, batching, caching, and resilience policies consistently keyed and enforced across distributed components.

### 7. Shared abstractions and reimplementations

- Duplicate implementations of the same invariant, protocol, parser, validator, mapper, formatter, query, state machine, or policy.
- Existing utilities bypassed, forked, copied, or wrapped with semantic drift; shared abstractions that have become shallow, leaky, overly broad, or unsafe.
- Whether convergence should import an existing implementation, deepen or split an abstraction, generate from one source, or deliberately keep separate implementations with contract tests.
- Similar code with different domain meaning. Duplication is evidence to investigate, not automatic proof that consolidation is safe.

### 8. Language, framework, and dependency usage

- One supported idiom for equivalent language/framework operations where semantics match; exact-version lifecycle, threading, rendering, request, ORM, and dependency-injection rules.
- Dependency choice and scope, direct versus transitive imports, overlapping packages, version skew, optional/peer dependencies, platform variants, and deprecated APIs.
- Module/import boundaries, aliases, ordering, side-effect imports, barrel files, circular dependencies, tree-shaking or initialization effects, and unused imports or dependencies.
- Generated code, vendored code, framework-managed files, and external contracts: verify their ownership before editing or declaring divergence.

### 9. Naming, layout, and developer-facing conventions

- Names that communicate domain role, units, mutability, sync/async behavior, side effects, scope, and lifecycle—not cosmetic uniformity alone.
- File/module placement, exports, visibility, test adjacency, fixtures, factories, builders, and configuration layout where inconsistency impairs discovery or ownership.
- Public naming compatibility versus internal cleanup; casing, acronyms, pluralization, boolean polarity, and paired operation symmetry.
- Comments, examples, templates, and documentation that teach a different pattern from maintained code.

### 10. Tests, tooling, build, and delivery

- Test level and boundary for equivalent behavior, fixtures and cleanup, clocks/randomness, mocks versus real dependencies, concurrency handling, and assertion conventions that affect reliability.
- Formatter, linter, type checker, compiler, generator, package-manager, and test-runner configuration across packages and environments.
- Build, CI, artifact, release, deployment, migration, and rollback conventions; local/CI/production gaps and platform-specific paths.
- Repeated manual rules that should be mechanically enforced, and enforced rules whose configuration disagrees with repository policy.

### 11. Evolution and specialized surfaces

- Active migrations, deprecations, compatibility shims, feature flags, experiments, forks, and staged rollouts. Determine the intended end state and deadline before “normalizing” either side.
- Architecture-wide compositions: shared identity, schema, cache, message, or policy conventions that diverge across services and fail only under boundary conditions or partial rollout.
- Domain-specific patterns for areas such as finance, healthcare, identity, real-time systems, mobile/desktop, embedded systems, data/ML pipelines, and AI agents. Derive additional probes from their invariants.
- Current practice for the exact stack when behavior is version-sensitive. Prefer primary documentation and repository-pinned versions; do not impose generic style guidance over project contracts.

## Evidence and judgment

Retain a confirmed pattern defect only with:

- the violated behavioral, architectural, domain, or operational invariant;
- the concrete implementations, consumers, and end-to-end path that diverge;
- the consequence under a realistic state, boundary case, lifecycle event, or operational condition;
- the intended target pattern and evidence for it, including existing controls or abstractions and why they do not prevent the divergence;
- the smallest safe correction, compatibility and migration implications, and a verification method.

For a worthwhile improvement, show a recurring material cost—change amplification, unreliable discovery, avoidable cognitive load, tooling friction, or likely future drift—and why convergence pays for its migration risk. Keep ambiguous intent or insufficient runtime/version evidence as an unresolved question with the evidence needed to decide. Never inflate a cosmetic difference or speculative preference into a defect.

Apply the shared workflow's noise filter only after collecting candidates. Drop variance proven necessary by distinct domain semantics, external contracts, supported platform/version differences, generated or vendored ownership, performance constraints, framework boundaries, or an explicit migration plan. Do not treat age as intent: use history and authorship only as supporting context.

Search for variants of every confirmed divergence. When a shared abstraction is implicated, inspect both adopters and non-adopters; it may encode the same defect as the outlier.

<approval_gate>
Auto-fix: import existing utility, rename to dominant convention, reorder imports, drop unused dependencies. Sign-off when the dominant pattern itself is wrong — sweeping the majority pattern is a separate decision from cleaning up outliers.
</approval_gate>

The examples in the approval gate remain subject to the shared auto-fix boundary. Preserve legitimate behavior and public compatibility. A rename is automatic only when references, serialized names, reflection, generated code, external consumers, and migration behavior are proven safe; dependency removal requires proving no runtime, build, plugin, or side-effect use. Escalate architectural convergence, public contract changes, data/schema migrations, cross-service rollout, behavior changes, and any ambiguous target pattern.

## Completion gate

Before sign-off, record every numbered baseline area and each newly derived lens as:

- `reviewed`: components and boundaries inspected, invariants compared, candidates resolved, findings and variant searches;
- `not applicable`: concrete evidence that the scoped system cannot exercise the area;
- `deferred`: exact blocker, evidence still needed, and residual risk.

Also record confirmed defects, worthwhile improvements, intentional variants, migration states, and unresolved questions separately. Completion requires accounting for every material component, entry point, lifecycle path, operational mode, and cross-component boundary in scope—not reaching a finding count or making the repository textually uniform.
