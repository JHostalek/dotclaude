---
name: audit-perf
description: Use when auditing and fixing performance hot paths in a scope — N+1 queries, overfetching, wasted recomputation, blocking hot paths, unbounded growth. Triggers on "audit performance", "fix slow paths", "check for N+1", "performance review".
argument-hint: [path]
---

!`cat "${CLAUDE_SKILL_DIR}/../audit-workflow.md"`

Run as the `perf` dimension. Find where the system violates its latency, throughput, capacity, responsiveness, resource, scalability, or cost invariants under realistic workloads. Performance is end-to-end behavior: do not reduce the review to local micro-optimizations or repeated work.

<coverage_invariant>
Every area, defect class, and example below is minimum and non-exhaustive. Add, combine, split, reweight, or skip probes according to the system's architecture, workload, lifecycle, deployment, and performance consequences. "Not listed" never means "out of scope." Skip a baseline area only when the scoped system cannot exercise it, and record the evidence.
</coverage_invariant>

## Work top-down

Reconstruct the performance model before searching for smells:

1. Establish intended behavior and budgets from product flows, SLOs, benchmarks, telemetry, configuration, code, tests, schemas, and deployment artifacts. Identify critical interactions, batch and background work, startup and shutdown, steady state and bursts, workload shape and growth, concurrency, data cardinality, dependencies, resource ceilings, and cost constraints. When budgets are absent, derive the narrowest defensible invariant instead of inventing a target.
2. Map each material path across clients, services, queues, storage, caches, third parties, and infrastructure. Account for fan-out, serialization, scheduling, retries, contention, allocation, data movement, and cleanup. Include tail behavior, cold and degraded states, mixed versions, skewed tenants or keys, and interactions between individually reasonable components.
3. Form hypotheses about the dominant cost or scaling failure, then verify the exact path and operating conditions with existing telemetry, plans/profiles, focused measurement, complexity/resource analysis, or a minimal representative benchmark. Inspect architecture-wide constraints before local tuning.
4. Apply the baseline to every applicable component and boundary. Derive additional probes for the domain, runtime, platform, and workload rather than treating the baseline as the review boundary.

Do not infer acceptable performance from a framework, ORM, async API, cache/helper abstraction, algorithm name, test or benchmark presence, small fixture, average latency, local result, or superficially efficient construct. Verify its exact version, configuration, call path, data distribution, concurrency, deployment, and lifecycle. A benchmark proves only the workload and environment it measures.

## Mandatory performance review baseline

This is minimum coverage, not an exhaustive checklist. Apply each relevant lens, expand it for the actual system, and inspect interactions between lenses.

### 1. Performance model and architecture

- User- and operator-visible critical paths; latency and responsiveness budgets; throughput, concurrency, capacity, memory, storage, bandwidth, energy, and monetary-cost constraints.
- Workload dimensions: request mix, payload and result size, data cardinality and skew, tenant imbalance, read/write ratio, burstiness, locality, concurrency, retention, growth, and adversarial but valid inputs.
- End-to-end service and resource dependencies, serial stages, fan-out/fan-in, amplification, shared bottlenecks, cross-region or cross-process boundaries, and synchronous work that could dominate the budget.
- Startup, warm-up, steady state, peak, idle, reload, failover, recovery, migration, shutdown, and long-lived operation. Include cold caches, cold functions, JIT or lazy initialization, and mixed-version behavior when present.
- Performance invariants and consequences derived from the product: deadline misses, frozen UI, queue delay, dropped work, resource exhaustion, cascading failure, capacity loss, or unbounded spend.

### 2. Algorithms, data structures, and repeated work

- Time and space complexity at realistic and worst relevant cardinalities, including nested iteration, hidden scans, repeated sorting/filtering/parsing, quadratic joins, recursive depth, pathological hashing or regex, and avoidable copying.
- Recalculation across calls, renders, events, workers, retries, or pipeline stages; duplicate validation, transformation, serialization, hydration, compression, compilation, and fetching.
- Data structures and representations whose lookup, mutation, iteration, locality, allocation, or conversion costs do not fit the access pattern.
- Eager work whose result is unused; coarse invalidation; rebuilding whole aggregates for incremental changes; redundant work across replicas or consumers.
- Batching, vectorization, streaming, incremental computation, precomputation, and memoization opportunities only where their lifecycle, invalidation, memory, and added latency preserve behavior.

### 3. Storage, queries, and data access

- N+1 or multiplicative queries, per-item writes, repeated round trips, chatty transactions, and fan-out across partitions, shards, tenants, or replicas.
- Query plans and cardinality estimates; scans, joins, sorts, aggregations, correlated subqueries, missing or unusable indexes, index order/selectivity, implicit casts, pagination strategy, lock duration, and materialization/spill.
- Overfetching columns, objects, relations, blobs, or result rows; unbounded queries; deep offsets; duplicate hydration; client-side work better performed near the data.
- Connection setup and pool sizing, transaction scope, isolation and contention, prepared statements, batching, bulk APIs, replica lag, partition pruning, compaction, vacuuming, and storage-engine behavior where relevant.
- Data growth, retention, tombstones, archival, migrations, schema evolution, background maintenance, and performance cliffs at partition, page, index, quota, or service limits.

### 4. Network, protocols, and distributed composition

- Number, size, serialization, compression, copying, and sequencing of calls across HTTP/RPC, queues, events, sockets, IPC, files, and third parties.
- Waterfalls, avoidable handshakes or connection churn, head-of-line blocking, protocol multiplexing limits, DNS/TLS/proxy costs, cross-zone or cross-region traffic, and payload fragmentation.
- Fan-out width and tail amplification; scatter-gather; duplicated downstream calls; request coalescing; pagination/chunking; streaming and backpressure across boundaries.
- Deadlines, cancellation propagation, retries, hedging, polling, timeouts, circuit breakers, and fallback behavior. Verify that resilience controls do not amplify load or hold resources after usefulness expires.
- Eventual consistency, duplicate delivery, reordering, mixed versions, and partial failures that trigger recomputation, replay storms, or growing reconciliation work.

### 5. Caching and reuse

- Cache placement, key correctness and cardinality, value size, hit rate under the real access distribution, lookup cost, TTL, eviction, invalidation, consistency needs, and ownership.
- Stampedes, thundering herds, penetration, synchronized expiry, cold-start refill, negative caching, hot keys, uneven shards, multi-layer duplication, and cache failure behavior.
- Memoization and UI/runtime caches whose dependencies, identity, lifetime, or invalidation make them ineffective, stale, or memory-expensive.
- Cache serialization, compression, network round trips, write amplification, coherence traffic, and cases where caching adds more work than it removes.
- Do not prescribe a cache merely because work repeats. Require a hot path, reuse opportunity, acceptable staleness, bounded footprint, and a safe invalidation or versioning model.

### 6. Concurrency, scheduling, queues, and backpressure

- Lock contention, lock scope/order, convoying, false sharing, atomic contention, thread or event-loop blocking, scheduler churn, oversubscription, context switching, and parallelism overhead.
- Pool and worker sizing for threads, processes, connections, executors, consumers, and external quotas; starvation, priority inversion, unfairness, and noisy-neighbor effects.
- Queue arrival and service rates, depth and age, boundedness, batching, prefetch, partitioning, acknowledgements, retries, poison work, dead letters, and overload behavior.
- Backpressure and admission control across every producer/consumer boundary; load shedding, concurrency limits, quotas, cancellation, and graceful degradation.
- Races or coordination strategies that duplicate expensive work, serialize unrelated work, retain resources, or collapse throughput only under concurrency.

### 7. Memory, allocation, and resource lifecycle

- Live-set size, allocation rate, temporary objects, copies, buffers, object graphs, fragmentation, allocator behavior, garbage-collection frequency and pauses, and native/off-heap memory.
- Unbounded or incorrectly retained collections, caches, registries, subscriptions, listeners, tasks, sessions, histories, buffers, DOM nodes, handles, and per-tenant or per-key state.
- Leaks and late cleanup across success, error, cancellation, timeout, retry, reconnect, reload, and shutdown paths.
- File descriptors, sockets, database connections, threads, processes, GPU memory, disk, temporary files, and other finite resources; acquisition order, lifetime, and pool pressure.
- Streaming versus buffering; chunk sizes; high-water marks; memory multiplied by concurrency; spill to disk; large-object thresholds; copy-on-write loss; serialization peaks.

### 8. Runtime, language, and platform behavior

- Blocking I/O or CPU work on request, render, event-loop, UI, actor, or scheduler-critical threads; sync-over-async and async work that still blocks underneath.
- Runtime compilation/JIT, reflection, dynamic dispatch, interpreter crossings, FFI/native boundaries, exception-heavy paths, deoptimization, module loading, and initialization costs when relevant.
- Compiler/build flags, release versus debug mode, runtime and GC configuration, container CPU/memory limits, throttling, NUMA/locality, autoscaling signals, serverless limits, and managed-service quotas.
- Serialization libraries, regex engines, collection semantics, ORM behavior, UI reconciliation, image/media processing, cryptography, compression, and other stack-specific cost centers.
- Version- and configuration-sensitive optimizations or regressions verified against the exact deployed stack, not assumed from generic platform guidance.

### 9. Client, UI, mobile, and device responsiveness

- Input-to-feedback and frame/render paths; main-thread work, long tasks, layout/style/reflow, paint, compositing, hydration, reconciliation, and unstable identities or subscriptions.
- Render frequency and scope, state propagation, selector invalidation, expensive effects, list virtualization, image/font/media handling, animation, and offscreen/background work.
- Bundle and asset size, code loading/execution, request waterfalls, preloading/prefetching, caching, service workers, and startup or navigation transitions.
- Memory, battery, thermal, radio, disk, and constrained-device effects; backgrounding, offline/online transitions, wakeups, and long-session degradation.
- Perceived responsiveness and progressive results. Apply these lenses only when a client surface exists, and extend them for its framework and device constraints.

### 10. Background, batch, build, and lifecycle work

- Scheduled jobs, imports/exports, migrations, indexing, synchronization, compaction, backups, analytics, and reconciliation: chunking, checkpointing, resumability, concurrency, deadlines, and impact on foreground traffic.
- Work proportional to total history instead of the delta; rescans and full rebuilds; duplicate consumers; retry/replay amplification; backlog recovery time.
- Build, test, packaging, deployment, startup, health checks, readiness, warm-up, shutdown, and rolling replacement where their cost affects delivery or capacity.
- Resource overlap between maintenance and serving workloads; scheduling, isolation, throttling, and operational controls during peak or degraded conditions.
- Long-running behavior: state growth, fragmentation, drift, cache aging, timer/task accumulation, periodic synchronized work, and cleanup that only occurs on clean shutdown.

### 11. Resilience, overload, and emergent behavior

- Behavior at capacity and beyond: queue growth, latency collapse, retry storms, cascading saturation, autoscaling lag, dependency slowdown, feedback loops, and recovery after load subsides.
- Tail latency and variance, not only averages; coordinated omission; slow outliers; skewed shards, tenants, keys, or requests; percentile aggregation across hops.
- Failover, fallback, circuit opening, degraded modes, and recovery paths that are slower, less bounded, or more expensive than normal operation.
- Rate limits and quotas keyed to the correct resource and work cost; expensive valid operations; amplification between user action and backend, third-party, or monetary cost.
- Interactions among caches, retries, queues, autoscaling, locks, replicas, and maintenance work that create failures absent from any component in isolation.

### 12. Measurement, regression controls, and operational visibility

- Metrics and traces that expose end-to-end latency, queue time, service time, throughput, errors, saturation, utilization, allocation, cardinality, dependency time, and cost without causing material overhead.
- Measurements segmented by operation, workload size, tenant/key skew, cold/warm state, environment, result, dependency, and version where aggregation would hide cliffs.
- Profiles, query plans, load tests, benchmarks, and production telemetry representative enough to establish the suspected cost. Check sampling, warm-up, cache state, concurrency, fixture size/distribution, noise, and coordinated omission.
- Performance tests and budgets at the layer that can catch the regression; stable assertions with meaningful thresholds; trend and release comparison; capacity and saturation tests where consequences warrant them.
- Missing visibility that prevents a material performance invariant from being verified is an unresolved question or worthwhile improvement, not automatically a confirmed defect.

### 13. Specialized and emergent surfaces

Derive more coverage when the system includes specialized workloads: real-time media, games, search/ranking, data pipelines, ML training/inference, LLM agents, GPUs, scientific/HPC, embedded/IoT, geo-distributed systems, ledgers, collaborative editors, high-frequency ingestion, or safety-critical control. These examples are explicitly non-exhaustive. Include domain-specific units, deadlines, scaling axes, hardware behavior, provider billing, and failure consequences.

## Evidence and judgment

Collect candidates before filtering, per the shared workflow. Do not discard a candidate during discovery because the system appears small, a framework may optimize it, or current traffic may hide it.

For each retained finding, establish:

- violated performance invariant and affected path or resource;
- workload and operating conditions that trigger it, including scale, distribution, concurrency, and lifecycle state;
- concrete call/data/resource path and dominant cost, with existing controls and why they fail in this context;
- consequence: latency, throughput, responsiveness, capacity, stability, resource, or cost impact;
- smallest safe correction and a measurement, regression test, plan/profile comparison, or other verification method.

Prefer measured evidence. Static proof is sufficient when the scaling or resource violation is concrete—for example, an unbounded collection on a reachable long-lived path—even if production telemetry is unavailable. State uncertainty and avoid fabricated precision. A before→after measure may be operation count, complexity, bytes, allocations, round trips, blocked time, queue growth, resource bound, latency, throughput, or cost, whichever demonstrates the removed work.

Distinguish:

- **confirmed defects**: a violated invariant with a concrete path and consequence;
- **worthwhile improvements**: supported efficiency gains that do not presently violate an established invariant;
- **unresolved questions**: material hypotheses blocked by missing workload, telemetry, environment, access, or reproducibility.

Drop speculative "might be slow under load" claims only after candidate collection. Do not reject a candidate merely because no benchmark exists, tests pass, the code is idiomatic, or the local dataset is small; instead prove the path acceptable or classify the uncertainty correctly. Search for variants of confirmed causes across alternate, async, retry, background, legacy, and degraded paths.

## Fix and completion gate

Auto-fix only within the shared workflow's boundary and preserve legitimate behavior. Safe examples may include batching an equivalent loop, removing duplicate work, narrowing an overfetch, bounding retained state, or moving blocking work off a critical thread when ordering and failure semantics stay unchanged. These examples are non-exhaustive and never authorize a change solely because it looks conventional.

Escalate changes involving cache tiers or invalidation semantics, indexes, query/schema or data-layout changes, denormalization, consistency, transport/protocol swaps, concurrency or queue policy, resource limits, SLO/product behavior, infrastructure topology, capacity spend, or any ambiguous latency-versus-correctness tradeoff. Name the hot path, invariant, evidence, expected effect, risks, and verification plan.

Test the improved path under representative conditions plus important allowed behavior, boundary cardinalities, concurrency, cold/degraded states, and resource cleanup as relevant. Do not claim a speedup from code shape alone.

Before sign-off, produce a completion ledger for every numbered baseline area and each newly derived lens:

- `reviewed`: components and boundaries inspected, invariants verified, measurements or static evidence used, findings, and variants searched;
- `not applicable`: evidence that the scoped system cannot exercise the area;
- `deferred`: exact blocker, the unresolved hypothesis, and residual performance risk.

Completion requires every baseline area and material end-to-end path to be accounted for, not a predetermined issue count. Report scope, workload assumptions, evidence limits, fixes, sign-off items, and residual risk. Do not claim "fast" or "scalable" beyond the workloads and environments actually verified.
