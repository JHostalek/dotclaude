# Reliability

Run as the `reliability` dimension. Model essential and degradable capabilities, durability, workload envelope, recovery objectives, and failure domains.

Trace crash, hang, slowdown, partition, corruption, overload, quota, clock, deployment, and operator faults through normal, degraded, recovery, and transitional states. Include correlated dependencies and faults during mitigation or return to service.

## Probes

1. **Architecture:** service guarantees or defensible substitutes for missing SLOs, critical/control/data paths, single points of failure, process/zone/region/account/provider/identity boundaries, owners, and recovery tradeoffs.
2. **Time/bounds:** end-to-end queue/retry/cleanup budgets, operation-specific timeouts, cancellation through tasks/database/subprocess/streams, late results, detached ownership, wall/monotonic time, clock jumps, suspend/resume, leases, and false failover from liveness probes.
3. **Retries/hedging:** semantic eligibility, attempts/elapsed budgets, backoff/jitter/server hints, nested amplification, durable scheduling, terminal visibility, synchronized redrive, fairness, and capacity reserved for essential work and recovery probes.
4. **Delivery/idempotency:** stable identity, scope/retention/payload binding/result replay, concurrent first use, ambiguous commit/lost responses, queue/webhook/manual replay, ack/order/causality, gaps/tombstones, dedup store expiry/partition/eviction, and region failover.
5. **Partial state:** transaction/dual-write/external-effect boundaries, explicit batch/job partial success, orphaned reservations/resources, poisoned caches, compensation/quarantine/repair, crashes during recovery, and preserving newer writes.
6. **Dependencies/isolation:** DNS/identity/certificates/secrets/config/clocks/control planes/telemetry/tooling, brownouts/stale/malformed responses, quotas, bulkheads/pools/tenant fairness, breaker scope/probes/hysteresis, and bounded nonrecursive fallbacks with real independence.
7. **Overload:** arrival versus service rates, bounds by bytes/count/age/tenant, producer backpressure, truthful shedding/priorities, finite CPU/memory/disk/connections/quotas/spend, hot keys/poison work, and autoscaling lag or downstream amplification.
8. **Degradation:** explicit essential behavior, fail-open/closed consequences, acceptable cached/stale/approximate/offline results, reversible visible flags/read-only/fallback modes, and safe exit once the fault clears.
9. **Failover/coordination:** hidden shared failure domains, independent warm capacity, fencing/quorum/leases/stale leaders, promotion/routing/DNS/drain/locality, asymmetric reachability, lost quorum, repeated failover, and failback without loss or oscillation.
10. **Recovery/durability:** persisted-state validation, replay/checkpoints/in-flight work, coherent backups with keys/metadata/dependencies, restoration through usable service, bounded idempotent reconciliation, and provider/control-plane/operator loss.
11. **Change/lifecycle:** startup/migration/warm-up readiness, health checks causing fleet removal or restart loops, intake/drain/checkpoint/lease order, forced termination visibility, rolling/mixed-version rollback, reload/key rotation, and interrupted concurrent maintenance.
12. **Operations:** semantic success/partial failure, saturation/queue age/retries/breakers/reconciliation, segmentation by affected scope, usable telemetry/paging during incidents, cross-retry correlation, and executable runbooks/break-glass/rollback.
13. **Verification:** failure/overload/partition/restart/failover/shutdown tests at owning boundaries; assert state, effect count, resources, diagnostics, late/duplicate work, and recovery. Representative doubles/topology/load matter. Disruptive shared/production fault injection requires explicit authorization, bounded impact, abort controls, and observation.
14. **Composition:** derive domain scenarios such as retry/non-idempotent payment, backlog/autoscaling/database saturation, stale failover/reconciliation, cancellation/external success, restore/rotated keys, and fallback sharing failed identity infrastructure.

## Judgment

Establish a fault, prerequisites, violating path, failed control, consequence, and recovery behavior. Separate demonstrated violations, supported resilience improvements, and missing topology/telemetry/contracts. Rank by realistic exposure, blast radius, recoverability, detectability, and time to exhaust safety margins. Verify failed, degraded, recovered, and allowed paths; successful failover once does not prove the failure model.

## Changes and completion

Apply validated reliability fixes preserving legitimate behavior. Availability/durability, retry/idempotency, ack/transaction, queue/admission, fail-open/closed, freshness/limits, failover topology, recovery formats, operations/SLOs/spend, and user-visible degradation are critical only when evidence cannot safely choose the correction.

Document the invariant, tradeoff, rollout/rollback, and verification for material corrections.

Use the shared evidence and completion rules; account for every applicable numbered probe and material boundary, including domain-derived probes.
