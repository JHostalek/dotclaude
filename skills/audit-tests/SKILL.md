---
name: audit-tests
description: Use when the user wants a thorough audit of the existing test suite — aggressively cutting tests that exist just to exist, rewriting weak ones to actually catch the bugs they should, identifying production code that is uncovered or thinly covered, and adding tests where coverage would catch real defects. Trigger on "audit tests", "find test bloat", "tests don't catch anything", or similar requests.
argument-hint: [path-glob or module name; empty for full sweep]
---

!`cat "${CLAUDE_SKILL_DIR}/../shared/audit-workflow.md"`

Run as the `tests` dimension. Determine whether the suite gives proportionate, trustworthy evidence that the system preserves intended behavior through change. The goal is not more tests or higher coverage; it is strong defect detection with the smallest maintainable suite.

<coverage_invariant>
Every area, defect class, and example below is minimum and non-exhaustive. Add, combine, split, reweight, or skip probes according to the system's architecture, domain, risk, change history, deployment, and observable failure modes. “Not listed” never means “out of scope.” Skip a baseline area only when the scoped system cannot exercise it, and record evidence.
</coverage_invariant>

## Work top-down

Start from the system's obligations, not test filenames or coverage reports:

1. Reconstruct intended behavior and architecture from production code, schemas, configuration, interfaces, migrations, docs, incidents, and tests. Identify critical user journeys, domain invariants, state machines, component and trust boundaries, external contracts, lifecycle transitions, operational modes, and the consequences of failure.
2. Map each material risk to the cheapest test level that can falsify the relevant claim with realistic collaborators. Trace evidence across unit, component, contract, integration, end-to-end, and production-validation layers rather than assuming one layer is inherently superior.
3. Evaluate the suite as a system: whether its oracles can detect meaningful defects, its environments exercise the real path, failures are attributable, state is isolated, and important cross-component or temporal behavior survives composition.
4. Apply the baseline across every applicable boundary and lifecycle. Expand it for domain-specific risks such as financial ledgers, authorization, safety-critical control, distributed workflows, data pipelines, UI accessibility, mobile/offline behavior, infrastructure, or AI systems.

Do not infer protection from a test's name, existence, passing status, coverage line, framework, fixture, mock, snapshot, helper abstraction, or familiar pattern. Verify that the exact production path runs, the oracle would fail for a plausible defect, and the test environment preserves the conditions on which the behavior depends. Collect candidates widely before applying any noise filter.

## Mandatory test review baseline

This baseline is minimum, non-exhaustive coverage. Add system-specific lenses and inspect interactions between areas; an individually sound test can still leave an architecture-wide failure undetected.

### 1. Behavioral model and risk allocation

- Product promises, business rules, safety/security properties, data invariants, state transitions, compatibility guarantees, and failure/recovery semantics.
- Critical paths weighted by impact, exposure, reversibility, rate of change, incident history, complexity, and dependency uncertainty—not by file size or ease of testing.
- Test responsibility across layers and owners: which claim each layer proves, where deliberate overlap protects a boundary, and where everyone assumes another layer covers it.
- Unspecified, contradictory, or obsolete expectations in tests versus code, types, schemas, docs, contracts, and observed production behavior.

### 2. Oracle strength and fault sensitivity

- Assertions on externally meaningful state, outputs, side effects, events, persistence, and invariants rather than merely execution, mocks called, or incidental representation.
- Tests that pass when the guarded implementation is removed, inverted, hard-coded, short-circuited, partially applied, or routed around.
- Missing negative assertions, overly broad tolerances, permissive matchers, assertion-free paths, swallowed asynchronous failures, and snapshots approved without semantic review.
- Mutation testing or small deliberate faults where practical to prove that high-risk tests detect the defect class they claim to guard.
- False confidence from implementation-mirroring assertions, “returns what I told it to return,” getter/setter checks, framework smoke checks, and tests of a mock rather than production behavior.

### 3. Coverage of behavior and state space

- Happy paths, invalid inputs, boundaries, equivalence classes, extreme values, empty/large states, encoding and locale differences, time zones, calendars, precision, units, and numeric overflow/rounding.
- State-machine sequences, reordered/repeated/skipped actions, retries, cancellation, rollback, partial completion, idempotency, recovery, and irreversible transitions.
- Concurrency, races, interleavings, duplicate or out-of-order delivery, stale reads, contention, transactions, eventual consistency, and clock-dependent behavior.
- Property-based, model-based, combinatorial, fuzz, differential, or metamorphic testing when examples cannot cover a meaningful input or sequence space.
- Domain-specific adversarial and abuse cases when valid inputs or valid users can still violate a business invariant.

### 4. Architecture and integration boundaries

- Real serialization, validation, routing, middleware, authorization, persistence, queues, caches, files, network protocols, and dependency adapters at their composition boundaries.
- Consumer/provider contracts, schema evolution, version skew, backward/forward compatibility, optional fields, unknown values, and differing parser or normalization behavior.
- External systems tested with an appropriate mix of local fakes, contract tests, sandboxes, and limited live verification; confirm each substitute preserves the behavior under test.
- Cross-service workflows, asynchronous completion, sagas, fan-out, callbacks, webhooks, event consumers, and emergent failures between individually tested components.
- Alternate entry points and execution modes such as API, CLI, jobs, workers, admin tools, imports, migrations, retries, and recovery scripts.

### 5. Test doubles, seams, and realism

- Mocks, stubs, fakes, spies, fixtures, factories, and harnesses that match the real interface, state, failure modes, ordering, latency, and ownership semantics relevant to the claim.
- Over-mocking that bypasses production wiring, transformations, policies, transactions, or the unit under test; under-controlled dependencies that make results non-deterministic.
- Mock interaction assertions used only where the interaction is itself the contract; prefer observable behavior otherwise.
- Shared helpers whose defaults silently avoid important states, couple unrelated tests, or reproduce the same bug as production.
- Recorded responses, golden files, snapshots, datasets, and fixtures that are representative, reviewable, versioned, minimal enough to understand, and refreshed without erasing regressions.

### 6. Failure, resilience, and operational behavior

- Dependency timeout, refusal, malformed response, throttling, disconnect, resource exhaustion, partial failure, retry exhaustion, fallback, circuit breaking, and degraded-mode behavior.
- Crash/restart, process interruption, lease loss, leader change, failover, rollback, restore, replay, and cleanup across durable state.
- Observability contracts needed to operate failures: actionable errors, logs, metrics, traces, audit events, correlation, alerts, and absence of sensitive leakage.
- Load, soak, capacity, latency, throughput, memory, descriptor, queue-depth, and cost behavior where thresholds or degradation characteristics are material.
- Production-only conditions such as distributed topology, filesystem semantics, proxies, TLS, permissions, scheduling, network partitions, resource limits, and platform-specific behavior.

### 7. Data, persistence, and lifecycle

- Schema constraints, transactions, indexes with behavioral consequences, migrations, backfills, seed/import/export, archival, retention, deletion, restore, and downgrade/rollback paths.
- Empty, historical, malformed, duplicate, inconsistent, partially migrated, and realistically large datasets.
- Data integrity across caches, replicas, search indexes, analytics, backups, and derived views; reconciliation after partial updates or delayed delivery.
- Install, first run, upgrade, mixed version, configuration change, feature-flag transition, tenant/account creation, offboarding, reset, and decommissioning.
- Migration tests that verify both transformed data and application behavior, including failure recovery; schema creation from scratch does not prove upgrade safety.

### 8. Security, privacy, and access-control evidence

- Authentication, authorization at object/action/field levels, tenant isolation, privilege transitions, session/token lifecycle, and alternate-path enforcement.
- Injection and unsafe parsing boundaries, secrets and sensitive-data exposure, secure defaults, auditability, rate limits, and abuse resistance where relevant.
- Tests that prove denial and non-observation, not only permitted access, including cross-user or cross-tenant attempts and stale authorization.
- Security controls exercised through the actual entry point and deployment configuration; helper-unit tests alone do not prove enforcement.

### 9. User interfaces and client behavior

- User-visible workflows across navigation, validation, loading, empty, error, retry, offline, interrupted, and restored states.
- Accessibility semantics, keyboard and assistive-technology interaction, focus management, contrast or visual regression where automation is reliable, and localization/layout variation.
- Browser, device, OS, viewport, input-method, storage, permissions, deep-link, background/foreground, and network-condition differences according to supported platforms.
- Client/server disagreement, optimistic updates, stale state, duplicate submission, hydration, caching, and recovery after refresh or reconnect.

### 10. Configuration, build, deployment, and infrastructure

- Configuration parsing, precedence, required values, unsafe defaults, environment differences, feature combinations, and invalid or partial configuration.
- Build artifacts, generated code, packaging, dependency resolution, startup, health/readiness, deployment manifests, infrastructure policy, and release/rollback behavior.
- CI behavior representative of supported toolchain versions and platforms; conditional jobs, sharding, affected-test selection, and caches do not silently omit required evidence.
- Smoke, canary, synthetic, post-deploy, and rollback checks where pre-release environments cannot reproduce production conditions.

### 11. Suite trustworthiness and determinism

- Isolation of database, filesystem, process, network, clock, random seed, locale, environment, ports, caches, and global state.
- Order dependence, parallel-safety, retries masking defects, fixed sleeps, timing races, nondeterministic generators, unawaited work, and cleanup that fails after an assertion.
- Flaky tests classified by cause and repaired at the violated boundary; quarantine has an owner, expiry, and compensating evidence.
- Failures that identify the violated behavior without requiring archaeology; helpers and setup do not hide the relevant cause.
- Repeatability locally and in CI, with retained diagnostics sufficient to reproduce environment-sensitive failures.

### 12. Suite economics and necessity

- Tests earn their keep by catching plausible context loss, preserving domain knowledge, protecting a contract, or localizing a consequential failure.
- Redundant tests distinguished from deliberate defense across different levels or failure modes. Delete only after proving no unique behavior, boundary, diagnostic value, or domain rule would be lost.
- Brittle implementation coupling, oversized setup, mock-the-world ceremony, duplicated fixtures, slow global initialization, and test architecture that makes safe production changes disproportionately expensive.
- Runtime, feedback latency, sharding, selection, and ownership optimized without allowing fast lanes to omit critical evidence.
- Generated, vendored, throwaway, trivial passthrough, and framework-owned behavior excluded only when no project-specific contract or integration risk is present.

### 13. Change detection and maintenance

- Production changes that require corresponding tests, test data, contracts, snapshots, migrations, or operational checks; changed-risk analysis is broader than changed lines.
- Dead, skipped, focused, disabled, quarantined, conditionally excluded, or permanently expected-failing tests and the behavior they no longer protect.
- Tests that preserve retired behavior, encode obsolete bugs, or block intentional architectural change without protecting a current contract.
- Coverage trends, mutation results, flakes, duration, and escaped defects used as signals for investigation, never as substitutes for inspecting exact paths.
- Incident and regression learnings generalized to the underlying invariant and searched for across variants, rather than frozen as a single narrow example.

### 14. Specialized and emergent test needs

Derive additional coverage from the actual system. Examples include financial reconciliation, safety cases, scientific numerical accuracy, ML evaluation and data leakage, nondeterministic AI behavior, prompt/tool authorization, streaming/media quality, geospatial correctness, protocol conformance, compiler transformations, embedded hardware, and disaster recovery. These examples are explicitly non-exhaustive.

Use current primary documentation for version-sensitive framework, runtime, protocol, browser, platform, or service behavior when access permits. Framework recommendations and testing pyramids are heuristics, not evidence that this suite covers its risks.

## Evidence and judgment

For every retained finding, establish:

- the violated behavioral or test-evidence invariant and why it matters;
- the concrete production path, test path, and applicable lifecycle or environment;
- the defect or regression that can escape, with consequence and realistic likelihood;
- existing test/control coverage and precisely why it fails to detect the defect;
- the smallest safe correction;
- a verification method, ideally demonstrating the old test passes or misses the fault and the corrected suite catches it.

Use deliberate faults, focused reproducers, coverage traces, test selection diagnostics, or repeated/varied execution where they provide evidence. Reject a candidate only after verifying effective coverage on the exact path; do not dismiss it because a similarly named test, integration suite, type system, framework, or manual process exists.

Classify retained items as confirmed defects in test evidence, worthwhile improvements with demonstrated value, or unresolved questions with the missing evidence named. Do not report hypothetical gaps as confirmed findings. Rank by escaped-defect consequence, likelihood of change or failure, breadth of affected behavior, and the cost and reliability of the proposed test.

## Fix and completion gate

Auto-fix behavior-preserving changes within the shared workflow boundary:

- delete bloat only when evidence shows it carries no unique contract, domain knowledge, boundary coverage, or diagnostic value;
- rewrite weak tests so plausible faults break them;
- add proportionate coverage for established behavior where it would catch a real defect;
- repair determinism, isolation, fixtures, and harnesses without changing the intended product contract.

Deletion and rewriting are not safe merely because a test looks trivial or implementation-coupled. A rewrite that changes which behavior is correct, establishes a new product guarantee, alters public behavior, or resolves an ambiguous specification requires sign-off. Preserve legitimate behavior and run the relevant baseline before and after edits; a pre-existing red baseline is diagnostic context, not itself a test-audit finding.

Before sign-off, account for every numbered baseline area and every material boundary in a coverage ledger. For each, record:

- `reviewed`: components, behaviors, test levels, evidence, findings, and searched variants;
- `not applicable`: evidence that the scoped system cannot exercise the area;
- `deferred`: exact blocker, missing evidence, and residual escaped-defect risk.

Record derived lenses not present in the baseline. Completion requires a top-down risk map, trustworthy evidence for retained findings, and ledger coverage—not a target issue count, coverage percentage, test-layer ratio, or all-green claim.
