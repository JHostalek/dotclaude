# Performance

- Flag avoidable expensive operations repeated on a common path when an equally clear design could reduce established costs. Examples include N+1 queries, per-item writes, ineffective indexes, overfetch, serial network waterfalls, connection churn, allocation, and copying; assess realistic workloads.
- Flag a data structure that imposes an unnecessary cost for the operations actually required, such as maintaining ordering when callers only need keyed lookup. Account for the real workload and semantics.
- Flag optimization machinery that adds substantial complexity without evidence of a relevant bottleneck or required performance benefit. A missing benchmark alone does not prove an optimization is useless.
- Flag measured optimizations retained despite failing to improve relevant performance when they also make the design harder to understand or change.
- Flag tuning directed at incidental code while the measured dominant cost remains in the underlying algorithm, communication, or storage approach.
- Flag a demonstrated hot path that repeatedly crosses shallow layers or rechecks the same condition, adding overhead without distinct useful work.
- Flag common-path code cluttered by separate tests and work for rare cases when those cases could be handled outside the hot path without weakening correctness.
- Flag performance changes that complicate public interfaces or leak implementation details when the necessary optimization could remain encapsulated. Necessary, measured complexity can be justified by the system's requirements.
- Flag algorithms, repeated transformations, or eager materialization whose avoidable work grows beyond what the supported data size or concurrency can tolerate.
- Flag caches whose footprint, refill cost, or lack of reuse creates more work than they save. Establish actual access patterns rather than assuming caching is always helpful.
- Flag locks, pools, blocking work, or scheduling that cause material contention, starvation, or latency collapse under supported concurrency.
- Flag resources retained unnecessarily across long sessions or reconnects, causing sustained growth in memory, listeners, tasks, history, files, or connections.
- Flag synchronous computation, repeated rendering or layout, hydration, or payload loading that blocks required client responsiveness on supported devices.
- Flag background maintenance, migrations, warm-up, or backlog draining whose resource use crowds out required foreground work.
- Flag performance claims based on unrepresentative cardinality, cache state, concurrency, or measurement scope that conceals a bottleneck or regression.
