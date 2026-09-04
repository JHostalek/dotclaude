# Perf

Run as the `perf` dimension. Map critical paths and their latency, throughput, responsiveness, capacity, resource, and cost budgets. If budgets are absent, establish a defensible invariant rather than inventing a target.

Form hypotheses about dominant costs using actual cardinality, skew, concurrency, cold/degraded states, and growth. Trace costs across clients, services, queues, storage, and third parties before local tuning.

## Probes

1. **Model:** request mix, payload/result size, tenant skew, read/write ratio, bursts, locality, retention, valid adversarial inputs, serial/fan-out dependencies, ceilings, and startup/peak/failover/migration/shutdown behavior.
2. **Algorithms/repetition:** hidden scans, nested joins, sorting/parsing, recursion, pathological hashes/regex, copying, repeated render/retry transformations, unsuitable structures, eager unused work, whole-aggregate invalidation, and incremental/batch/stream alternatives.
3. **Storage:** N+1/per-item writes, plans/cardinality, scans/joins/sorts/spills, unusable indexes/casts, deep offsets, hydration/overfetch, pools/connections, lock/isolation cost, partition pruning, maintenance, data growth, and quota cliffs.
4. **Network/composition:** waterfalls, handshakes/DNS/TLS/proxies, connection churn, serialization/compression/copies, cross-region traffic, head-of-line blocking, tail fan-out, coalescing/chunking, polling/hedging/retries, abandoned work, and replay amplification.
5. **Caching:** real reuse/hit distribution, key/value size, lookup/serialization cost, TTL/eviction/invalidation, hot keys, stampedes/cold refill, layered duplication, memo identity/lifetime, and failure behavior. Require bounded footprint and acceptable staleness before adding a cache.
6. **Scheduling/queues:** lock/atomic contention, false sharing, blocking/oversubscription, pool sizing, fairness/noisy tenants, arrival versus service rates, age/depth, prefetch/acks, bounded buffers, poison work, producer backpressure, admission, and cancellation.
7. **Memory/resources:** live set/allocations/copies/GC/native memory, retained registries/listeners/tasks/history/DOM, cleanup across failure/reconnect, finite handles/GPU/disk/pools, buffering multiplied by concurrency, high-water marks, and serialization peaks.
8. **Runtime/platform:** sync work on critical threads, sync-over-async, JIT/deoptimization/module loading, reflection/FFI, build/runtime/GC flags, container throttling/locality, serverless/autoscaler quotas, and exact-version library cost centers.
9. **Client/device:** input/frame/main-thread/layout/paint/hydration, render frequency and identity, selectors/effects, virtualization, media/fonts, bundle and request waterfalls, navigation/startup, memory/battery/thermal constraints, and long/offline/background sessions.
10. **Batch/lifecycle:** chunk/checkpoint/resume, foreground contention, history rescans versus deltas, backlog drain, build/test/deploy/warm-up capacity, maintenance throttling, timer accumulation, fragmentation, and clean-shutdown-only cleanup.
11. **Overload/emergence:** latency collapse, retry/autoscaling feedback, recovery after load subsides, tail variance/skew, coordinated omission, percentile aggregation, expensive valid work, fallback cost, and interactions among caches/queues/locks/replicas/maintenance.
12. **Evidence/regressions:** end-to-end queue/service/dependency time and saturation/allocation/cost, segmentation that exposes cliffs, representative profiles/plans/load tests, warm-up/cache state/noise, meaningful budgets, and capacity thresholds. Missing telemetry alone is an uncertainty or improvement.
13. **Specialized workloads:** derive deadlines, scaling axes, hardware behavior, and billing for media, search, scientific/GPU/ML work, agents, embedded systems, or other actual domains.

## Judgment

Prefer measurements; reachable unbounded growth or a concrete scaling violation can also be established statically. Record workload/environment limits. Use before/after operation counts, bytes, allocations, round trips, blocking, queue growth, bounds, latency, throughput, or cost. Separate established violations from supported efficiency gains and blocked hypotheses. A benchmark covers only its workload; do not claim speedup from code shape.

## Changes and completion

Apply validated performance fixes with preserved ordering and failure semantics. Cache/invalidation, indexes/schema/layout, denormalization/consistency, transport, concurrency/queue policy, limits, SLO/product behavior, topology/spend, and latency-correctness choices are critical only when evidence cannot safely choose the correction.

State the hot path, invariant, expected effect, tradeoffs, and verification. Include representative cardinalities, concurrency, cold/degraded states, and cleanup.

Use the shared evidence and completion rules; account for every applicable numbered probe and material boundary, including domain-derived probes.
