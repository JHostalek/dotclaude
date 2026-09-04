# Correctness

Run as the `correctness` dimension. Trace intended behavior from input/event through transformations, state transitions, persistence/messages, output, and later reconciliation.

Resolve intent using product rules, schemas, callers, tests, specifications, and actual behavior. Conflicting sources remain an unresolved question when no authoritative invariant settles them. Include alternate, administrative, asynchronous, recovery, and mixed-version paths.

## Probes

1. **Contracts:** pre/postconditions, conservation, uniqueness, ordering, monotonicity, idempotency, reversibility, terminal states, and invariant ownership. Check contradictory authorities and privileged or repair paths that bypass enforcement.
2. **Decisions:** operators, precedence, short-circuiting, fallthrough, exhaustiveness, early returns, loop/recursion termination, inclusive bounds, indexing, pagination, empty/singleton/extreme inputs, and decisions using the wrong actor, tenant, snapshot, version, or flag.
3. **Transformations:** parsing through serialization, field swaps, loss/truncation, default insertion, absent/null/empty/zero, enum/sentinel collisions, equality/hashing, Unicode/case, aliasing, composite identity, and cardinality/order across joins, batches, caches, and replicas.
4. **State machines:** guards, ordering, skipped/repeated transitions, cancellation, compensation, resume, expiry, tombstones, partial completion, late/duplicate events, and locally valid client/server or service transitions that jointly violate a workflow.
5. **Numbers/algorithms:** units, scale, sign, coordinates, precision, overflow, integer division, rounding stage, NaN/infinity, currency, numerical stability, ranking/statistics, and algorithm assumptions. Reconcile conserved quantities through splits, retries, and corrections.
6. **Time/lifecycle:** instants versus civil time, DST gaps/folds, calendars, clock skew/source, interval boundaries, overlapping or missed schedules, backfills, startup/shutdown, restore, upgrade/rollback, and objects whose validity changes while queued or retried.
7. **Concurrency:** stale reads, lost updates, write skew, TOCTOU, lock scope/order, visibility, idempotency lifetime, delivery/order claims, partial cross-store effects, compensation, replica lag, failover, offline conflicts, and race-safe allocation/quotas.
8. **Persistence:** query predicates/joins/null semantics/collation/order, stable pagination, triggers/defaults/cascades, application checks that race, cache key completeness/invalidation, historical shapes, rerunnable backfills, dual writes, cutover, restore, deletion, and repair.
9. **Interfaces/UI:** semantic validation, version negotiation, unknown values, status mapping, parser/producer disagreement, path/URL/platform behavior, external retry/pagination guarantees, optimistic state, selection identity, displayed rounding/timezone, and submitted values.
10. **Configuration/deployment:** precedence/coercion, overlays, partial config, reload, capability detection, flags, tenant/degraded/offline modes, dependency versions, stale workers, control/data-plane skew, rollout, failover, and autoscaling.
11. **Partial failure:** truthful timeout/cancellation outcomes, duplicate effects, checkpoints/resume, compensation, and fallbacks serving incomplete/stale data as authoritative. Correctness owns wrong state/results; `error-handling` owns lost or misrouted failure signals.
12. **Domain/composition:** derive invariants for the actual system, including ledger settlement, entitlement periods, geospatial references, synchronization, compiler/protocol behavior, feature/label alignment, and agent action-result correlation. Combine time/retry, migration/cache, and optimistic/out-of-order paths.

## Judgment

Demonstrate an intended invariant, reachable violating state/path, and wrong observable outcome. A missing test or alternative preferred specification is insufficient. A timing-dependent violation may be proven from semantics without a convenient reproducer. Choose boundary, property/model, differential, concurrency, fault, or historical-data checks that distinguish correct from incorrect behavior; verify affected component variants.

## Changes and completion

Apply validated fixes under the shared default. Ambiguous product semantics, data repair/migration, irreversible state, distributed consistency, financial/safety-critical rules, or uncertain compatibility are critical only when authoritative evidence cannot safely choose the correction. The fixing boundary never excludes reporting a divergence.

Use the shared evidence and completion rules; account for every applicable numbered probe and material boundary, including domain-derived probes.
