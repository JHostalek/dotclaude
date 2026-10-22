# Reliability

- Flag a promised essential capability that depends on a single or correlated failure domain without recovery matching that promise.
- Flag calls, retries, queues, or cleanup that can hang or exceed the operation's effective deadline or capacity budget, including orphaned dependency work that continues after its caller stops waiting.
- Flag retries, hedges, or redrives that repeat non-retryable or unsafe work, amplify overload, sustain overload after the trigger clears (metastable failure), synchronize clients, or multiply attempts across layers without an effective budget.
- Flag a failure whose blast radius kills unrelated requests or tenants, or lets corrupted shared state reach otherwise healthy work.
- Flag fallback or isolation mechanisms that share the failed dependency, have unbounded cost, or consume capacity needed for recovery.
- Flag overload behavior that admits unbounded work, starves essential or other tenants' work, or reports rejected work as accepted.
- Flag accumulating state (tables, logs, temp files, queues) with no purge, retention, or cap where growth reaches a limit within the operating lifetime. Purging must respect retention and audit obligations.
- Flag control loops (autoscalers, circuit breakers, reconcilers, rate limiters) acting on a stale, lagging, or missing feedback signal. A wrong process model turns correct actuation into the fault.
- Flag degraded or stale operation lacking a truthful user or caller contract or a safe path back to normal service.
- Flag failover and coordination that permit stale leaders, split brain, lost quorum, insufficient replacement capacity, or repeated oscillation (flapping).
- Flag recovery that cannot restore usable service with its required state, keys, metadata, dependencies, and in-flight work.
- Flag readiness, health checks, rolling upgrades, reload, or shutdown ordering that removes healthy capacity, restarts the whole fleet, or loses accepted work.
- Flag diagnostics and operational recovery paths that depend on resources unavailable during the fault they must resolve.
