---
name: audit-reliability
description: Use when auditing and fixing reliability or resilience in a scope — timeouts, retries, idempotency, partial failure, dependency outages, overload, failover, recovery, reconciliation, and startup/shutdown behavior. Triggers on "audit reliability", "review resilience", "failure recovery review", "resilience audit", "check graceful degradation", and related failure-tolerance intent. Named failure classes are a minimum, never an exhaustive boundary.
argument-hint: [path]
---

!`cat "${CLAUDE_SKILL_DIR}/../audit-workflow.md"`

Run as the `reliability` dimension. Determine whether the system continues to meet its essential correctness, availability, durability, recovery, and operability contracts through faults, overload, change, and lifecycle transitions. Reliability is end-to-end behavior; do not reduce it to retries, health checks, redundancy, or a resilience library.

<coverage_invariant>
Every area, failure class, probe, and example below is minimum and non-exhaustive. Add, combine, split, reweight, or skip probes according to the system's architecture, dependencies, state model, workload, deployment, lifecycle, domain, and failure consequences. "Not listed" never means "out of scope." Skip a baseline area only when the scoped system cannot exercise it, and record the evidence.
</coverage_invariant>

## Work top-down

1. Reconstruct intended service behavior from product flows, contracts, schemas, configuration, infrastructure, telemetry, tests, runbooks, and deployment artifacts. Identify essential and degradable capabilities, state and durability guarantees, dependency and ownership boundaries, lifecycle states, workload envelope, recovery objectives, and consequences of delay, duplication, loss, stale results, or unavailability.
2. Build the failure model. Map synchronous and asynchronous paths across clients, processes, services, queues, storage, caches, third parties, regions, devices, and operators. Include crash, hang, slowdown, partition, corruption, overload, quota, clock, configuration, deployment, and human-operation failures; correlated faults; and dependencies shared by apparent redundancy.
3. Derive invariants for normal, degraded, recovering, and transitional states. Trace high-consequence scenarios end to end, including faults during mitigation or recovery. Inspect architecture-wide compositions first: individually reasonable timeouts, retries, queues, caches, replicas, autoscaling, and failover can create cascades, duplication, oscillation, or permanent divergence.
4. Apply the baseline across every applicable component and boundary. Derive extra scenarios from the exact domain, topology, operating model, and history. Verify controls in representative conditions and in the exact call paths they protect.

Do not infer reliability from a framework default, managed service, retry/circuit-breaker helper, queue, transaction, replica, health check, autoscaler, naming convention, common pattern, test presence, or successful happy path. Verify exact versions, configuration, time budgets, state effects, ownership, deployment boundaries, correlated dependencies, and recovery behavior.

## Mandatory reliability review baseline

This is minimum coverage, not an exhaustive checklist. Apply each relevant lens, extend it for the actual system, and inspect interactions among lenses.

### 1. Reliability model and architecture

- Essential user and operator journeys; availability, correctness, durability, freshness, latency, recovery-time, recovery-point, and capacity expectations. Derive the narrowest defensible invariant when explicit SLOs are absent.
- State, control, and data flow across components, regions, tenants, replicas, caches, queues, clients, third parties, and administrative paths; synchronous chains, fan-out, single points of failure, and hidden shared dependencies.
- Failure domains and blast-radius boundaries for process, host, zone, region, account, provider, network, identity, configuration, data store, and operator failures.
- Normal, degraded, isolated, maintenance, failover, recovery, mixed-version, migration, and shutdown states; allowed transitions and conditions for returning to service.
- Error budgets, criticality tiers, recovery objectives, ownership, escalation, and deliberate tradeoffs. Documents or dashboards are evidence only when implementation and operations match them.

### 2. Time budgets, cancellation, and bounded work

- End-to-end deadlines allocated across nested calls, queueing, retries, serialization, and cleanup; no layer timeout longer than its caller's useful lifetime without deliberate detached ownership.
- Connect, request, read, write, idle, lock, lease, transaction, job, and shutdown timeouts set for actual semantics rather than one global default.
- Cancellation propagation and cleanup across RPCs, tasks, database work, subprocesses, streams, and fan-out; late results cannot mutate superseded state.
- Clock source, monotonic versus wall time, skew, jumps, timezone, expiry, lease, and deadline semantics; behavior under suspend/resume or disconnected clients.
- Polling, heartbeats, watchdogs, and liveness detection are bounded and distinguish slow from dead without synchronized traffic or false failover.

### 3. Retries, hedging, and amplification

- Retry eligibility by failure class and operation semantics; terminal, validation, overload, conflict, cancellation, and corruption cases are not retried blindly.
- Attempt limits, elapsed-time and retry budgets, exponential backoff, jitter, caps, server hints, circuit interaction, and propagation across nested layers.
- Multiplicative retries through clients, gateways, services, SDKs, queues, jobs, and operators; retry storms, hedging duplication, replay storms, and demand returning faster than recovery.
- Retry scheduling survives restarts when required, does not retain abandoned work forever, and gives terminal outcomes truthful visibility.
- Recovery and redrive avoid synchronized floods; fairness, priority, tenant isolation, and capacity reserved for probes or essential work.

### 4. Idempotency, duplication, ordering, and delivery

- Stable operation identity, deduplication scope and retention, payload binding, result replay, concurrency behavior, and lifecycle across process or region failover.
- Side effects under lost responses, ambiguous commits, client retries, queue redelivery, webhook replay, scheduled overlap, manual reruns, and recovery replay.
- At-most-once, at-least-once, effectively-once, ordering, causality, and acknowledgement contracts verified at each boundary rather than inferred from transport labels.
- Sequence gaps, reordering, duplicate callbacks, stale versions, tombstones, identifier reuse, and out-of-order undo/compensation.
- Deduplication stores, inbox/outbox patterns, and idempotency keys fail safely under expiry, partition, eviction, concurrent first use, and changed request bodies.

### 5. Partial failure and state integrity

- Atomicity boundaries across transactions, dual writes, services, shards, regions, files, caches, indexes, search, analytics, and external side effects.
- Explicit partial-success contracts for batches, fan-out, imports, exports, workflows, and long-running jobs; truthful caller and operator outcomes.
- Commit ambiguity, crash points, orphaned state, half-created resources, stale materializations, poisoned caches, abandoned reservations, and leaked leases.
- Compensation, saga, rollback, quarantine, repair, and irreversible-action ordering preserve domain invariants even when they themselves fail.
- Concurrent and repeated recovery does not double-apply effects, erase newer state, or treat incomplete data as authoritative.

### 6. Dependency failure and isolation

- Dependency inventory includes DNS, identity, certificates, secrets, configuration, clocks, control planes, telemetry, package/model services, and operator tooling—not only obvious runtime APIs.
- Hard outage, brownout, latency, malformed or stale results, rate limit, quota, contract drift, partial regional failure, and intermittent behavior.
- Bulkheads, pool separation, concurrency limits, queue isolation, tenant fairness, and resource ownership prevent one dependency or workload from consuming shared capacity.
- Circuit breakers use meaningful failure signals, scopes, thresholds, half-open probes, and hysteresis; they do not hide integrity failures or synchronize across a fleet.
- Fallbacks have independent failure modes where claimed, bounded cost, explicit freshness and safety semantics, and no recursive or longer dependency chain.

### 7. Overload, backpressure, and resource exhaustion

- Arrival rate versus service rate across every producer/consumer boundary; queues and buffers are bounded by count, bytes, age, tenant, and downstream capacity where relevant.
- Backpressure propagates to the true producer. Admission control, load shedding, quotas, concurrency caps, and priorities reject the least harmful work with truthful outcomes.
- CPU, memory, disk, descriptors, threads, connections, ports, locks, leases, storage, bandwidth, provider quotas, and spend remain bounded under realistic and skewed load.
- Slow consumers, hot keys, noisy tenants, fan-out, large valid inputs, poison work, and maintenance traffic do not starve essential or recovery operations.
- Autoscaling signals, lag, cooldowns, warm-up, quotas, and scale-down preserve capacity; scaling does not amplify database, queue, control-plane, or cost pressure.

### 8. Graceful degradation and fail-safe behavior

- Essential capabilities are explicit; optional work can be disabled or reduced without corrupting state, violating safety/privacy, or reporting false success.
- Fail-open versus fail-closed decisions match domain consequences at authorization, validation, payments, control, safety, and data-integrity boundaries.
- Cached, default, stale, approximate, local, offline, or alternate-provider results are visibly and semantically acceptable for the exact operation.
- Feature flags, maintenance modes, read-only modes, load shedding, and fallback UIs remain usable, reversible, observable, and consistent across components.
- Degraded modes receive production-equivalent testing and cannot persist silently after the initiating fault clears.

### 9. Redundancy, failover, and distributed coordination

- Replicas, zones, regions, providers, networks, and control planes provide independent capacity rather than sharing hidden dependencies, credentials, configuration, quotas, or failure domains.
- Failure detection, leader election, fencing, quorum, leases, locks, split-brain prevention, membership change, and stale-leader rejection fit the consistency model.
- Failover routing, promotion, DNS/client caching, connection draining, session/state locality, warm capacity, and dependency reachability work under actual topology.
- Recovery from partition, asymmetric reachability, replica lag, lost quorum, clock skew, and simultaneous or repeated failover preserves safety and makes availability tradeoffs explicit.
- Failback and rebalancing avoid data loss, load spikes, oscillation, and use of a recovered component before its state and capacity are ready.

### 10. Recovery, reconciliation, and durability

- Restart and crash recovery validate persisted state, replay journals/checkpoints safely, resume or terminate in-flight work, and handle crashes during recovery.
- Backups, snapshots, logs, replicas, and archives cover required state and metadata; retention, immutability, encryption, consistency, and dependency order fit recovery objectives.
- Restore is tested through usable service, not only file recovery; schema, identity, keys, permissions, configuration, indexes, and external integrations are reconciled.
- Reconciliation detects missing, duplicate, divergent, stuck, and orphaned state; is bounded, resumable, idempotent, observable, and safe against newer writes.
- Disaster recovery covers control-plane loss, account/provider loss, unavailable operators, runbook dependencies, and the capacity and time needed to restore.

### 11. Startup, shutdown, deployment, and change

- Startup ordering, initialization, migrations, warm-up, dependency checks, leader election, and partial initialization prevent work before the instance is ready.
- Liveness, readiness, startup, and dependency health signals reflect the instance's ability to serve its assigned work without causing restart loops or fleet-wide removal.
- Shutdown stops intake, drains or transfers owned work, checkpoints progress, releases/fences leases, closes resources, and makes forced termination or lost work visible.
- Rolling deployment, rollback, mixed versions, schema and protocol evolution, feature flags, configuration reload, certificate/key rotation, and regional rollout preserve compatibility and recoverability.
- Migrations and maintenance are resumable, reversible where promised, capacity-aware, and safe under interruption, overlap, rollback, and concurrent old/new code.

### 12. Observability, detection, and operational response

- Metrics, traces, logs, events, and health signals expose semantic success, partial failure, availability, saturation, queue age, retry rate, circuit state, failover, reconciliation, and recovery progress.
- Signals are segmented by operation, dependency, tenant, region, version, lifecycle state, and workload where aggregation would hide localized failure.
- Alerts detect user-impacting symptoms and exhausted safety margins early enough to act; dependencies, dashboards, paging, and telemetry pipelines remain useful during incidents.
- Correlation identifies an operation across retries, queues, processes, and recovery without counting duplicates as independent success or failure.
- Runbooks, ownership, automation, rollback, break-glass access, status communication, and post-incident learning match current implementation and are executable under the failure they address.

### 13. Verification, fault injection, and regression controls

- Tests exercise timeout, cancellation, dependency outage/brownout, duplicate delivery, partial write, crash/restart, overload, resource exhaustion, partition, failover, recovery, and shutdown at the boundary that owns the invariant.
- Assertions cover caller/user outcome, state, side-effect count, resource aftermath, telemetry, subsequent retries, and eventual recovery—not merely an expected exception.
- Mocks and simulators preserve relevant timing, concurrency, delivery, and failure semantics; integration, load, soak, chaos, model, recovery, or game-day validation is used when unit tests cannot prove the invariant.
- Fault injection has bounded blast radius, abort controls, observability, and explicit authorization. Never run disruptive tests against shared or production systems without approval.
- Regression controls represent realistic topology, workload, skew, lifecycle, and correlated faults; a passing test proves only its exercised conditions.

### 14. Domain-specific and emergent reliability

Derive additional coverage for domains such as financial ledgers and payments, identity, healthcare, safety-critical control, real-time media, collaborative systems, offline/mobile sync, embedded/IoT, data pipelines, ML/AI agents, build/deployment systems, and destructive administration. These examples are explicitly non-exhaustive.

Invent architecture-specific compositions: a timeout plus retry plus non-idempotent charge; queue backlog plus autoscaling plus database saturation; failover to a stale replica followed by reconciliation; cancellation after external success but before local commit; backup restore against rotated keys; dependency fallback sharing the failed identity plane; or recovery automation acting on mixed versions. Review failures during mitigation, recovery, and return to normal—not only the initiating fault.

## Evidence and judgment

Follow the shared workflow's "find wide, then filter" order. Collect candidates across all applicable paths and states before applying the reliability noise bar. For every retained finding, establish:

- violated reliability invariant and affected capability or state;
- triggering fault, workload, lifecycle state, and prerequisites;
- concrete end-to-end path through dependencies, controls, side effects, and recovery;
- user, state, availability, durability, capacity, or operational consequence;
- existing control and why it fails on that exact path or composition;
- smallest safe correction and verification method, including recovery and allowed behavior.

Reject a candidate only after proving the invariant permits the behavior or an effective control handles that exact path and operating condition. Do not treat redundancy, tests, health checks, library use, successful failover once, or inability to reproduce a disruptive fault as proof.

Classify retained items as:

- **confirmed defects**: a violated invariant with a concrete failure path and consequence;
- **worthwhile improvements**: supported resilience gains without a presently proven contract violation;
- **unresolved questions**: material risks blocked by missing contracts, topology, telemetry, access, or safe reproduction.

Do not inflate speculative failure stories. Rank confirmed defects by consequence, exposure to realistic faults, blast radius, recoverability, detectability, recurrence, and time to exhaust safety margins. Search for variants across alternate entry points, sync/async paths, regions, tenants, workers, deployments, degraded modes, and recovery paths.

## Fix and completion gate

Auto-fix only within the shared workflow's boundary and preserve legitimate behavior. Safe examples may include propagating an existing deadline, closing an abandoned resource, bounding an internal queue with already-defined rejection semantics, or fixing a demonstrably incorrect health condition. These examples are non-exhaustive and authorize nothing by pattern alone.

Escalate changes to availability or durability guarantees, retry/idempotency semantics, acknowledgement or transaction boundaries, queue/admission policy, fail-open/closed behavior, fallback freshness, resource limits, failover topology, recovery formats, operational policy, SLOs, capacity spend, or user-visible degraded behavior. Include the invariant, evidence, tradeoff, correction, rollout/rollback, and verification plan.

Test the failed and recovered paths, important allowed behavior, state and resource aftermath, duplicate/late work, degraded operation, and return to normal. Do not claim resilience beyond the conditions exercised.

Before sign-off, produce a completion ledger for every numbered baseline area and each newly derived lens:

- `reviewed`: components, boundaries, states, faults, and invariants inspected; evidence used; retained findings; variants searched;
- `not applicable`: evidence that the scoped system cannot exercise the area;
- `deferred`: exact blocker, unresolved scenario, and residual risk.

Completion requires every baseline area and material end-to-end failure path to be accounted for, including interactions across components, lifecycle states, mitigation, recovery, and failback. Report scope, assumptions, evidence limits, fixes, sign-off items, and residual risk. Never claim "reliable" or "resilient" beyond the verified model.
