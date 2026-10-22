# Performance

- Flag avoidable expensive operations repeated on a common path when an equally clear design would cut established costs: N+1 queries, per-item writes, ineffective indexes, overfetch, serial network waterfalls, connection churn, allocation, copying. Assess realistic workloads.
- Flag a data structure that pays for operations callers do not need, e.g., maintaining order when callers need only keyed lookup. Weigh the real workload and semantics.
- Flag premature optimization: machinery adding substantial complexity without evidence of a relevant bottleneck or required gain. A missing benchmark alone does not prove an optimization useless.
- Flag measured optimizations kept despite no relevant improvement when they also make the design harder to understand or change.
- Flag tuning of incidental code while the measured dominant cost stays in the underlying algorithm, communication, or storage approach.
- Flag a demonstrated hot path that repeatedly crosses shallow layers or rechecks the same condition, adding overhead without distinct useful work.
- Flag common-path code cluttered with special-case checks and work that could move off the hot path without weakening correctness.
- Flag performance changes that complicate public interfaces or leak implementation details when the optimization could stay encapsulated. Necessary, measured complexity can be justified by system requirements.
- Flag algorithms, repeated transformations, or eager materialization whose avoidable work grows beyond what supported data size or concurrency tolerates.
- Flag caches whose footprint, refill cost, or low hit rate costs more than they save. Establish actual access patterns; do not assume caching helps.
- Flag locks, pools, blocking work, or scheduling that cause material contention, starvation, or latency collapse under supported concurrency.
- Flag fan-out whose latency is the slowest of N calls (tail at scale) with no deadline, hedging, or partial-result policy, where a latency objective applies and N is large.
- Flag resource policies sound locally but oversubscribing shared capacity in composition, e.g., every component sizing its pool to the core count or setting its own memory or retry budget. Name the owner with the global view to decide.
- Flag resources retained needlessly across long sessions or reconnects, causing sustained growth in memory, listeners, tasks, history, files, or connections.
- Flag synchronous computation, repeated rendering or layout, hydration, or payload loading that blocks required client responsiveness on supported devices.
- Flag background maintenance, migrations, warm-up, or backlog draining that starves required foreground work of resources.
- Flag performance claims based on unrepresentative cardinality, cache state, concurrency, or measurement scope, on averages that hide tail latency, or on load generators with coordinated omission, when the method hides a bottleneck or regression.
