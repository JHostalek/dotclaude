---
name: audit-logs
description: Use when auditing and fixing logging in a scope — missing observability, INFO bloat that doesn't scale, stale or wrong-level messages, payload dumps on routine paths. Triggers on "audit logs", "fix logging", "logging review", "clean up log noise".
argument-hint: [path]
---

!`cat "${CLAUDE_SKILL_DIR}/../audit-workflow.md"`

Run as the `logs` dimension. Review whether production telemetry lets operators detect, localize, explain, and recover from consequential system behavior without leaking sensitive data or imposing disproportionate cost. Logs are one signal in an observability system; judge them with traces, metrics, events, alerts, audit records, crash reports, and platform telemetry rather than demanding that logs duplicate those signals.

<coverage_invariant>
Every area, defect class, and example below is minimum and non-exhaustive. Add, combine, split, reweight, or skip probes according to the system's architecture, operational model, failure modes, regulatory duties, and telemetry stack. "Not listed" never means "out of scope." Skip a baseline area only when the scoped system cannot exercise it, and record the evidence.
</coverage_invariant>

## Work top-down

1. Reconstruct intended behavior and operations from code, configuration, deployment manifests, schemas, runbooks, alerts, dashboards, tests, incident evidence, and telemetry plumbing. Identify user journeys, state machines, services and workers, trust and tenant boundaries, synchronous and asynchronous paths, dependencies, owners, reliability objectives, and recovery mechanisms.
2. Derive the events operators must distinguish: starts and terminal outcomes of consequential work, state transitions, degraded modes, retries and suppression, dependency failures, security-sensitive actions, and lifecycle/configuration changes. Define the invariant each event protects and the consequence if it is absent, misleading, duplicated, delayed, or exposed.
3. Trace representative success, partial-success, failure, timeout, cancellation, retry, replay, failover, and recovery paths end to end. Inspect architecture-wide routing, enrichment, sampling, buffering, export, storage, access, retention, and alert consumption before judging individual log calls.
4. Apply the baseline to every applicable component and boundary. Derive additional coverage for the domain and exact telemetry stack.

Do not infer observability from a logging framework, middleware, helper name, standard field, trace library, dashboard, alert, test, or apparently structured call. Verify the exact call path, runtime configuration, emitted record, collector/export route, storage behavior, and operator-facing query. Individually reasonable emitters can compose into missing, contradictory, duplicated, unaffordable, or uncorrelatable telemetry.

## Mandatory logging and observability baseline

This baseline is minimum coverage, not an exhaustive checklist. Apply every relevant lens, extend it for the system, and inspect interactions between lenses.

### 1. Operational model and signal ownership

- Map critical journeys, components, state transitions, failure consequences, service objectives, on-call ownership, and the telemetry needed to distinguish healthy, degraded, failed, and recovering behavior.
- Establish which signal owns each fact. Logs should complement rather than mechanically duplicate traces, metrics, durable domain events, audit records, or platform telemetry.
- Inspect observability gaps created between services, teams, accounts, regions, runtimes, managed services, client and server, or old and new paths.
- Check whether dashboards, alerts, runbooks, support tools, and incident queries rely on fields or events that producers no longer emit with compatible semantics.

### 2. Event selection and semantic completeness

- Consequential operations expose meaningful starts only when useful, terminal outcomes, duration where no better signal owns it, affected entity or scope, and enough context to distinguish success, partial success, rejection, cancellation, timeout, exhaustion, and failure.
- State machines make material transitions and invalid transitions visible without narrating every internal step.
- Long-running work, fan-out/fan-in, queues, schedulers, migrations, imports/exports, reconciliation, replication, cache rebuilds, and cleanup expose progress or liveness at a cadence and level proportionate to operator need and scale.
- Alternate paths—cache hits, fallbacks, feature flags, degraded modes, retries, dead-lettering, manual overrides, rollback, failover, and recovery—remain distinguishable.
- Expected rejection and absence are not mislabeled as system failure; silent handling does not hide an outcome operators must know.

### 3. Failure fidelity and diagnostic context

- Errors preserve the original exception, type, stack or causal chain, relevant operation and dependency, retryability, attempt, elapsed time, and safe identifiers needed to localize the failure.
- Wrapping, translation, aggregation, and asynchronous boundaries preserve causes; the same failure is not logged redundantly at every layer unless each record has distinct operational value.
- Partial failure, batch failure, multiple concurrent causes, compensation failure, and failure during error handling remain visible without collapsing into a misleading single success/failure.
- Logs distinguish local failure from upstream/downstream failure and record existing controls—retry, timeout, circuit breaker, fallback, deduplication—and their outcome.
- Logging itself does not mask, replace, swallow, mutate, or materially delay the application error.

### 4. Correlation and causal reconstruction

- Stable request, trace, span, job, workflow, message, attempt, tenant, and entity identifiers propagate across process, thread, queue, webhook, callback, scheduled, retry, and batch boundaries where appropriate.
- Parent/child, batch/item, original/retry, command/event, and cause/effect relationships are queryable without relying on timestamps alone.
- Identifier semantics remain consistent across components; reused, regenerated, truncated, high-cardinality, or attacker-controlled identifiers do not create false joins or injection.
- Clocks, time zones, timestamp precision, ordering, buffering, and eventual delivery do not imply a causal sequence the system cannot guarantee.
- Sampling or head/tail decisions do not orphan the records needed to reconstruct rare failures.

### 5. Structure, schema, and message correctness

- Machine-queryable fields carry stable names, types, units, enums, and meanings. Human messages supplement rather than encode fields through interpolation.
- Event names and templates describe what actually happened, including actor, target, direction, counts, units, and outcome; stale copy, inversions, and copy/paste identifiers do not misdiagnose the path.
- Schema evolution, mixed versions, deployment overlap, optional fields, serialization failures, and collector normalization preserve usable queries and backward compatibility where consumers require it.
- Field collisions, reserved keys, nested objects, flattening, truncation, Unicode, multiline content, and serialization of domain types behave correctly in the real backend.
- Dynamic templates and f-strings do not destroy aggregation or create unbounded event shapes.

### 6. Levels, severity, and operator meaning

- Severity represents required response and operational consequence, not developer surprise. The same class of event is classified consistently across components.
- INFO describes bounded, production-relevant lifecycle or outcome events. Traffic-proportional detail normally belongs at DEBUG or in a more suitable signal; WARN and ERROR remain actionable at their intended aggregation.
- Retries, client errors, fallbacks, expected conflicts, health checks, and transient dependency behavior reflect the final outcome and exhaustion state rather than producing false alarms.
- Fatal/panic/critical levels match actual process or service loss. A recovered error does not remain indistinguishable from an unrecovered one.
- Runtime level changes, per-module overrides, environment defaults, and disabled loggers do not silently suppress essential telemetry or enable unsafe detail.

### 7. Volume, cardinality, and cost

- Estimate event rates on steady-state, burst, failure, retry-storm, backlog-drain, fan-out, and adversarial paths. Include ingestion, indexing, retention, network, CPU, storage, and downstream query costs.
- Per-item, per-poll, entry/exit, heartbeat, repeated stack, and payload logging earns its volume; redundant timing or lifecycle records do not duplicate trace or metric ownership.
- High-cardinality dimensions remain necessary and queryable without destabilizing the telemetry backend. Cardinality controls do not erase tenant, failure, or correlation distinctions operators need.
- Rate limiting, deduplication, coalescing, and sampling preserve counts and rare/high-severity evidence, expose suppression, and avoid turning a storm into silence.
- Logging backpressure, full buffers, exporter outage, disk exhaustion, and slow sinks cannot cascade into application outage without an intentional, tested policy.

### 8. Sensitive data, security, and tenant isolation

- Records exclude credentials, session and bearer tokens, secrets, private keys, payment data, regulated data, unnecessary personal data, and sensitive request/response or model content at every level.
- Redaction occurs before serialization/export and handles nested, encoded, transformed, exceptional, and third-party values. Hashing is used only when its linkability, entropy, keying, and retention fit the threat and privacy model.
- Attacker-controlled text cannot forge records, inject fields or terminal controls, corrupt downstream parsers, or trigger unsafe rendering.
- Tenant, environment, region, and access boundaries hold in collectors, indexes, dashboards, exports, support access, archives, backups, and cross-account routing.
- Audit/security records have appropriate integrity, access, retention, attribution, and time semantics; ordinary diagnostic logs do not masquerade as a durable audit trail.

### 9. Distributed, asynchronous, and lifecycle behavior

- Queues and event consumers expose receipt, validation, deduplication, processing, acknowledgment, retry, dead-letter, replay, poison-message, and abandonment outcomes as required by their delivery semantics.
- Startup, readiness, shutdown, drain, leader election, failover, deployment, rollback, autoscaling, configuration reload, migration, and disaster recovery retain enough evidence to explain mixed-version and transitional behavior.
- Serverless, mobile, desktop, browser, edge, offline, and short-lived runtimes flush or persist essential telemetry under their actual termination and connectivity constraints.
- Forking, multiprocessing, concurrency, async context, and thread-local correlation do not lose, duplicate, interleave, or misattribute records.
- Cross-region replication, batching, buffering, collector retries, and eventual export make delay, duplication, loss, and ordering guarantees explicit where they affect operations.

### 10. Telemetry pipeline resilience

- Logger configuration, handlers, processors, encoders, collectors, sidecars, agents, exporters, gateways, storage, indexes, and query surfaces are wired in every relevant environment.
- Initialization and shutdown ordering, recursive logging, handler duplication, stdout/stderr capture, rotation, file permissions, compression, retention, and deletion behave under normal and failure conditions.
- Export authentication, encryption, endpoint selection, certificate validation, proxy behavior, quotas, and failover protect availability and confidentiality.
- Pipeline loss, drop counts, queue saturation, parse failures, schema rejection, throttling, and clock skew are themselves observable through an independent-enough signal.
- Development, test, staging, preview, canary, and production differences do not invalidate claimed coverage or leak production data into weaker environments.

### 11. Operational consumption and accessibility

- An operator can answer the system's likely incident questions with bounded queries: affected scope, first failure, causal path, current state, blast radius, recovery progress, and whether the issue persists.
- Alerts use stable semantics, aggregate at the correct identity and window, avoid duplicate paging, and link to sufficient context without embedding sensitive data.
- Runbooks, saved queries, dashboards, support workflows, and ownership metadata match emitted fields and current architecture.
- Retention, indexing, tiering, access latency, and query limits preserve evidence for the investigation, compliance, and recovery windows the system promises.
- Accessibility and localization concerns are handled where humans consume messages; machine fields remain canonical and locale-independent.

### 12. Verification, governance, and evolution

- Tests verify emitted semantics on critical success and failure paths, not merely that a logging method was called. Include correlation, redaction, schema, level, duplication, and suppression behavior where consequential.
- Integration or staging evidence covers real configuration and export paths; synthetic checks or telemetry canaries detect pipeline breakage.
- Schema contracts, ownership, compatibility policy, deprecation, retention, access review, and cost controls fit the system's change rate and risk.
- Incident lessons feed back into instrumentation without accumulating permanent emergency noise or one-off field drift.
- Domain-specific duties—financial auditability, healthcare privacy, safety evidence, legal hold, user deletion, data residency, or another applicable obligation—are verified against actual requirements.

## Evidence and judgment

Collect candidates before applying noise filters. For every retained finding, establish:

- the violated observability, privacy, reliability, or operational invariant;
- the concrete execution and telemetry path, including the emitted record or proven absence;
- the production consequence and affected operators, users, tenants, or systems;
- the existing control and why it fails on this exact path;
- the smallest safe correction and how to verify it in emitted output and the consuming backend.

Use runtime evidence when practical: captured structured records, a harmless failure injection, collector/export diagnostics, or a representative query. Source inspection alone is sufficient only when it proves the invariant violation. Reject a candidate only after verifying an effective control on the exact path; framework defaults, helper abstractions, dashboards, tests, and similarly named events are not proof.

Classify retained candidates as confirmed defects, worthwhile improvements, or unresolved questions. A confirmed defect has a demonstrated invariant violation and consequence. An improvement has credible operational value but no current broken guarantee. A question records missing evidence or a blocked runtime check; do not inflate it into a finding.

Rank by incident and user consequence, frequency and burst behavior, affected scope, diagnostic loss, alert impact, privacy/security exposure, telemetry cost, and ease of recovery. Search for variants of every confirmed defect across equivalent paths and producers.

## Fix and completion gate

Preserve legitimate behavior and the shared auto-fix/sign-off boundary. Prefer demotion over deletion for noisy INFO events when the event retains diagnostic value; restoration is harder than changing level. Behavior-preserving corrections to levels, stable templates, field names, duplicate emission, and non-sensitive context may be auto-fixes when unambiguous.

Sensitive data in any level must be removed, redacted, or appropriately transformed—demotion never fixes exposure. Sensitive-data removal, redaction, or hashing is sign-off because its required semantics may be domain-specific. Also escalate retention/access changes, audit-record changes, alert semantics, logging-library or pipeline adoption, routing/storage changes, and instrumentation that changes public behavior, performance guarantees, or compliance evidence. Do not silently trade diagnostic evidence for lower volume.

Before sign-off, account for every numbered baseline area and every material component and boundary in a coverage ledger as:

- `reviewed`: paths, invariants, evidence, findings, and searched variants;
- `not applicable`: evidence that the scoped system cannot exercise the area;
- `deferred`: exact blocker, missing evidence, and residual operational risk.

Record newly derived lenses as well. Reconcile contradictions across producers and consumers, and verify corrections in both allowed and failing behavior. Completion means all applicable areas and boundaries are accounted for—not that a predetermined number of findings was produced. State scope, evidence, gaps, and residual risk; do not claim complete observability from source review alone.
