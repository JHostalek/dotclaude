# Error Handling

Run as the `error-handling` dimension. Trace failures from origin through classification, propagation, retries, cleanup, and terminal boundaries to callers, telemetry, and state.

Map who owns detection, recovery, cleanup, and reporting. Establish expected, retryable, terminal, cancellation, overload, programmer-error, and integrity-threat outcomes. A log does not repair failure; a fallback needs an established degraded-behavior contract.

## Probes

1. **Contracts:** atomicity, durability, partial/ambiguous completion, error taxonomy, and truthful outcomes across APIs, modules, queues, storage, plugins, and clients.
2. **Origins:** malformed/extreme/versioned input, corrupt storage/config, filesystem/network/database/platform capacity and permission failures, status/null/sentinel/callback/stream errors, and FFI/subprocess/plugin boundaries with different failure semantics.
3. **Propagation:** broad/empty catches, ignored status, optional chaining/defaults hiding required data, lost rejection, cause/category/retryability/cancellation identity, stack linkage, inconsistent return-versus-throw APIs, unsafe continuation, and lossy public error translation.
4. **Terminal boundaries:** API/RPC/CLI/UI/event/worker/task supervision, status/exit/ack correctness, no premature success, isolation between requests/tenants/jobs, and safe external messages with useful internal diagnosis.
5. **Async/time:** missing awaits, detached task ownership, callbacks/streams, fan-out aggregation, sibling cancellation, partial results, deadline propagation/composition, cleanup at suspension points, late/zombie work, and races between terminal outcomes.
6. **Distributed failure:** bounded eligible retries with budgets/backoff/jitter, deduplication, ack timing, poison/dead-letter/redrive behavior, partial batches/services, commit ambiguity, dual writes, compensation, fallback chains, and retry amplification.
7. **State/resources:** files, sockets, locks, leases, transactions, temp artifacts, processes, timers, tasks, and subscriptions released on every exit. Handle partial acquisition and cleanup failure without masking the primary cause or reusing poisoned state.
8. **User/caller experience:** actionable stable errors, preserved user input, accessible/offline/background handling, no endless spinner/false confirmation, distinguish fallback from legitimate empty data, and safe correlation to support evidence.
9. **Diagnosis:** one useful report at the owning boundary, causal context through queues/services, semantic partial/degraded metrics, sampling that retains consequential failures, and no duplicate stack/payload/secret noise or telemetry failures hiding the application error.
10. **Lifecycle:** coherent bootstrap/readiness, startup failure, shutdown drain/intake/checkpoint order, crash loops, replay/restore, mixed versions, rollback/reload, and administrative/repair paths.
11. **Degradation:** fail-open/closed consequences, bounded fallback cost/freshness, independent failure modes, overload isolation/admission, no starvation/unbounded queues, and safe recovery using probes, hysteresis, refresh, and reconciliation.
12. **Composition:** derive domain failures such as retry after an external effect, cancellation before local commit, fallback promoted to authority, replay against newer schemas, and agent tool failure reported as success.
13. **Verification:** inject relevant dependency/timeout/cancellation/cleanup/partial-write/restart/overload failures. Assert outcome, state, resource aftermath, effect count, diagnostics, and recovery; substitutes must preserve the failure semantics under test.

## Judgment

Use the established error hierarchy when it fits the contract; avoid new types merely for uniformity. Invariant failures usually require stopping unsafe continuation; expected environmental failures need recovery or truthful propagation. Verify the exact path before accepting a catch, framework boundary, or fallback as effective control.

Cross-reference wrong-result races, stale reads, TOCTOU, and missing atomicity to `correctness`; still review how their failures propagate and recover here.

## Changes and completion

Apply validated fixes preserving legitimate fallbacks, compatibility, and user-visible behavior. Error contracts, retry/idempotency, transaction/ack boundaries, fail-open/closed policy, persistence/recovery formats, user workflows, and operational policy are critical only when evidence cannot establish intended behavior and safe rollout.

Use the shared evidence and completion rules; account for every applicable numbered probe and material boundary, including domain-derived probes.
