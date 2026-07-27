---
name: audit-error-handling
description: Use when auditing and fixing error handling in a scope — swallowed exceptions, defaults returned on error, optional chaining masking missing data, floating promises / missing awaits, entry points with no error boundary, resource leaks on error paths. Triggers on "audit error handling", "hunt silent failures", "fix swallowed errors", "check error boundaries", "missing await".
argument-hint: [path]
---

!`cat "${CLAUDE_SKILL_DIR}/../audit-workflow.md"`

Run as the `error-handling` dimension. Determine whether failures preserve the system's contracts: callers and users receive truthful outcomes, state remains valid, resources are released, recovery is bounded, and operators can diagnose what happened. Observability alone is insufficient when execution continues with corrupt, partial, duplicated, or falsely successful state.

<coverage_invariant>
Every area, defect class, and example below is minimum and non-exhaustive. Add, combine, split, reweight, or skip probes according to the actual architecture, failure model, technologies, deployment, lifecycle, and domain consequences. “Not listed” never means “out of scope.” Skip a baseline area only when the scoped system cannot exercise it, and record evidence.
</coverage_invariant>

## Work top-down

1. Reconstruct intended behavior and the failure model from code, contracts, schemas, configuration, infrastructure, tests, and docs. Map entry points, asynchronous boundaries, state transitions, external dependencies, transactions, owned resources, background work, shutdown/recovery paths, and who must learn of each failure.
2. Derive error-handling invariants for each important operation: what is atomic or may be partial; which failures are expected, retryable, terminal, cancellation, overload, programmer defects, or integrity threats; what must be rolled back, compensated, quarantined, retried, surfaced, or stop the process.
3. Trace representative and high-consequence failures end to end—from origin through wrapping, translation, transport, retries, cleanup, and boundaries to the caller, user, telemetry, and persisted state. Inspect compositions first: individually reasonable handlers can create false success, retry storms, duplicate effects, lost context, or inconsistent state.
4. Apply the baseline across every applicable component and boundary. Expand it for the system's domain and operational environment.

Do not infer correct handling from a framework boundary, `try`/`catch`, error type, Result/Optional, helper, middleware, retry library, test, naming convention, or common pattern. Verify the exact call path, configuration, state effects, caller interpretation, and failure mode. A log is not handling; a fallback is correct only when the contract permits degraded data or behavior.

## Mandatory error-handling baseline

This baseline is minimum, not exhaustive. Apply every relevant lens, derive additional probes from the system, and inspect interactions between lenses.

### 1. Failure model and contracts

- Intended outcomes, state invariants, atomicity boundaries, partial-success semantics, durability requirements, user/caller guarantees, and consequences of false success or ambiguous completion.
- Failure taxonomy grounded in the domain: validation, conflict, absence, authorization, dependency, timeout, cancellation, overload, corruption, invariant violation, programmer defect, and unrecoverable process failure.
- Ownership of detection, handling, recovery, cleanup, reporting, and escalation at each layer; explicit handling versus accidental fallthrough.
- Error contracts across public APIs, module boundaries, processes, services, queues, storage, plugins, third parties, and versioned clients.

### 2. Failure origins and input boundaries

- Parsing, validation, decoding, deserialization, schema evolution, malformed or extreme inputs, incompatible versions, corrupt persisted data, missing configuration, and unsupported states.
- Filesystem, database, network, clock, randomness, OS, hardware, browser, mobile, and external-service failures, including permission, capacity, quota, throttling, and intermittent conditions.
- Dependency calls whose APIs encode failure as exceptions, status values, nulls, sentinels, callbacks, rejected promises, streams, or partially populated responses.
- Native/FFI, subprocess, plugin, hook, generated-code, and user-extension boundaries where failure semantics differ or uncontrolled code can terminate, block, or corrupt the host.

### 3. Propagation, classification, and translation

- Empty or broad catches, ignored return/status values, lost rejected promises, optional chaining, unchecked nullable values, defaults on required data, silent coercion, and “best effort” paths that violate the contract.
- Preservation of cause, code, category, retryability, cancellation identity, relevant context, and stack/trace linkage through wrapping and serialization.
- Translation at layer boundaries without collapsing distinct cases, leaking internals, converting failure to success, or exposing unstable implementation details as public contracts.
- Fatal versus recoverable failures, assertion/invariant failures, panic/exception containment, and policies that continue after state may be untrustworthy.
- Consistency between declared types/signatures and runtime behavior, including APIs that both return error values and throw.

### 4. Entry points and terminal boundaries

- API/RPC handlers, CLI commands, UI trees, event loops, queue consumers, schedulers, workers, webhooks, callbacks, threads/tasks, process supervisors, and library/public API boundaries.
- Meaningful status, exit code, protocol response, acknowledgement/nack, user message, and machine-readable error; no success signal before required work succeeds.
- Boundary isolation so one request, tenant, job, plugin, or component failure does not silently kill unrelated work or corrupt shared state.
- Safe external messages and useful internal diagnostics without stack traces, paths, secrets, personal data, topology, or policy details leaking to the wrong audience.

### 5. Asynchrony, concurrency, cancellation, and time

- Missing `await`, floating promises/futures, detached tasks, unobserved callbacks, event-listener errors, stream/pipeline failures, and work whose owner exits before completion.
- Fan-out/fan-in, task groups, parallel batches, first-failure behavior, aggregation of multiple errors, sibling cancellation, and preservation of partial-result semantics.
- Cancellation and deadlines propagated through every relevant layer; distinction from ordinary failure; cleanup that remains safe under cancellation at any suspension point.
- Timeout ownership and budget composition across nested calls; late completion, zombie work, orphaned tasks, and results arriving after callers abandon or state changes.
- Races between success, failure, cancellation, retry, shutdown, and callbacks; exactly one terminal outcome where the contract requires it.

### 6. Retries, distributed work, and partial failure

- Retry eligibility, bounded attempts, exponential backoff/jitter, deadlines, retry budgets, circuit breaking, overload interaction, and terminal escalation.
- Idempotency and deduplication for side effects; acknowledgement timing; at-least-once/at-most-once delivery; poison messages; dead-letter handling; replay and redrive.
- Partial success across services, shards, replicas, regions, batch items, and multi-step workflows; compensation, reconciliation, repair, or explicit incomplete state.
- Transaction boundaries, commit ambiguity, lost responses after successful writes, dual writes, sagas, outbox/inbox paths, and recovery after process or network interruption.
- Cascading failures, retry amplification, fallback chains, dependency brownouts, failover, stale replicas, and degraded modes that combine into incorrect behavior.

### 7. State integrity, resources, and cleanup

- Files, sockets, connections, locks, leases, transactions, temporary artifacts, subprocesses, timers, threads/tasks, memory, UI subscriptions, and device handles released on every exit.
- Language/runtime cleanup idioms (`finally`, context manager, `defer`, structured concurrency, RAII) used with correct ownership and without cleanup errors masking the primary failure.
- Rollback or quarantine of in-memory and persistent state; no partially initialized object, poisoned cache, stale lock, corrupt checkpoint, or half-written artifact reused as valid.
- Cleanup that is idempotent, bounded, ordered correctly, and robust when acquisition or cleanup itself fails.
- Irreversible side effects ordered after validation and before/after persistence according to the system's actual consistency contract.

### 8. User, caller, and operator experience

- Errors surfaced to the party able to act, at the right abstraction and with stable identifiers or remediation; accessibility, localization, offline, and background-operation behavior where relevant.
- No infinite spinner, inert control, vanished action, false confirmation, duplicate prompt, crash loop, or loss of user input after failure.
- Callers cannot accidentally ignore required failure information; fallback values are distinguishable from legitimate empty/zero data when that distinction matters.
- Support and operational paths can correlate a report to the failing operation without exposing sensitive internals to users.

### 9. Observability and diagnosis

- Expected failures measured at useful levels; unexpected or terminal failures logged/reported once at the owning boundary with operation, correlation, tenant/request/job identity, dependency, attempt, and outcome context where safe.
- No duplicate logging at every propagation layer, log-and-rethrow noise, swallowed telemetry failures, uncontrolled cardinality, or secrets/payloads in diagnostics.
- Metrics, traces, health signals, alerts, crash reporting, and audit trails reflect semantic failure and degraded/partial outcomes—not only thrown exceptions or process crashes.
- Diagnostic context survives async, queue, subprocess, and service boundaries; sampling and rate limiting do not erase rare high-consequence failures.

### 10. Startup, shutdown, deployment, and recovery

- Configuration/bootstrap, dependency initialization, migrations, warmup, readiness, leader election, and partial startup either complete coherently or prevent traffic/work.
- Graceful shutdown drains or transfers work, stops intake in order, persists checkpoints, releases leases/resources, and reports forced termination or lost work.
- Crash/restart behavior, supervisor policy, backoff, crash-loop detection, checkpoint recovery, journal/WAL replay, repair, backup restore, and disaster/failover paths.
- Mixed versions, rolling deployments, feature flags, schema transitions, rollback, hot reload, and environment differences preserve compatible error semantics.
- Scheduled, administrative, maintenance, import/export, cleanup, and repair paths receive the same rigor as interactive paths.

### 11. Resilience controls and safe degradation

- Fallbacks, caches, defaults, feature disablement, load shedding, admission control, bulkheads, circuit breakers, and redundancy preserve stated safety and freshness guarantees.
- Fail-open versus fail-closed choices match domain consequences; fallback dependencies do not share the same failure mode or create recursion.
- Overload and resource exhaustion produce bounded, prioritized failure without starvation, cascading collapse, unbounded queues, data loss, or misleading success.
- Recovery detects when normal service is safe to resume; half-open probes, hysteresis, cache refresh, reconciliation, and latent failed work are handled.

### 12. Domain-specific and emergent failure behavior

Derive additional coverage for domains such as financial ledgers and payments, identity and access, healthcare, safety-critical control, data pipelines, real-time collaboration, mobile/offline sync, embedded devices, AI agents/tools, build/deployment systems, and destructive administrative operations. Examples are non-exhaustive.

Inspect architecture-wide failures that emerge only through composition: a timeout followed by retry and duplicate charge; fallback data accepted as authoritative; cancellation after an external side effect but before local commit; recovery replay against a newer schema; model/tool failure converted into autonomous success; or observability loss during an incident. Invent the equivalent cases implied by the actual system.

### 13. Verification and fault coverage

- Tests and checks exercise failure paths at the correct boundary: injected dependency faults, timeouts, cancellation points, malformed data, cleanup failure, partial writes, restarts, retries, duplicate delivery, overload, and recovery.
- Assertions verify caller/user outcome, persisted and in-memory state, resource ownership, side-effect count, diagnostics, and subsequent recovery—not merely that an exception occurred.
- Mocks/fakes preserve relevant failure semantics; integration, end-to-end, chaos, property, model, or recovery testing is used when local unit tests cannot prove the invariant.
- Production safeguards, canaries, fault injection, reconciliation, and runbooks cover failures that cannot be safely or deterministically reproduced in tests.

## Evidence and judgment

Follow the shared workflow's “find wide, then filter” order. Collect all candidates before applying noise filters. For every retained finding, establish:

- violated error-handling or state invariant;
- concrete failure origin and full path through handlers, boundaries, side effects, and terminal outcome;
- consequence for callers, users, state, resources, recovery, or operations;
- existing control and why it fails on that exact path;
- smallest safe correction that preserves legitimate behavior;
- verification method, including allowed behavior and recovery where relevant.

Reject a candidate only after proving the contract permits the behavior or an effective control handles that exact failure. Do not treat framework behavior, test presence, a catch block, a log line, or inability to reproduce an environmental fault as proof.

Classify retained items as confirmed defects, worthwhile resilience/diagnostic improvements, or unresolved questions. Do not promote speculation. Rank confirmed defects by consequence, likelihood under realistic operating conditions, scope, recoverability, detectability, and recurrence risk.

Use the project's established propagation and error hierarchy when it fits the proven contract; do not create types or abstractions merely for uniformity. Contract violations and untrustworthy state usually fail fast. Expected environmental failures need deliberate recovery or truthful propagation. “Log and continue” rarely repairs either.

Cross-reference rather than fix unrelated root causes owned by another dimension—for example race conditions, TOCTOU, stale reads, and missing atomicity belong to `audit-correctness` when they produce wrong answers rather than mishandled failures. Still review how those failures propagate, recover, and surface here.

## Fix and completion gate

Apply only fixes within the shared auto-fix boundary. Preserve legitimate fallback, compatibility, and user-visible behavior. A swallow or fallback that appears intentional and supports a known recoverable contract is sign-off, not auto-fix, when removing it changes observable behavior. Escalate changes to public error contracts, retry/idempotency semantics, transaction or acknowledgement boundaries, fail-open/closed policy, persistence/recovery formats, user workflows, or operational policy.

Test the failed path, important allowed behavior, state/resource aftermath, and recovery. Search for variants of each confirmed defect across alternate entry points, sync/async paths, workers, retries, and legacy implementations.

Before sign-off, produce a coverage ledger for every numbered baseline area and every newly derived lens. Mark each `reviewed`, `not applicable` with evidence, or `deferred` with the exact blocker and residual risk. For reviewed areas, record components and boundaries inspected, failure paths or invariants verified, retained findings, and searched variants.

Completion requires accounting for every material failure boundary and baseline area, reconciling interactions across components and lifecycle states, and separating confirmed defects, improvements, and unresolved questions. Report scope and limitations; never infer “error handling is correct” from a predetermined finding count.
