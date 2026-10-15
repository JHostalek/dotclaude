# Reliability

- Flag a promised essential capability dependent on a single or correlated failure domain without recovery appropriate to that promise.
- Flag calls, retries, queues, or cleanup that can hang or consume resources beyond the operation's effective deadline or capacity budget, including abandoned dependency work that continues after its caller stops waiting.
- Flag retries, hedges, or redrives that repeat ineligible or unsafe work, amplify overload, synchronize clients, or multiply attempts across layers without an effective budget.
- Flag a failure whose containment boundary kills unrelated requests or tenants, or permits corrupted shared state to affect otherwise healthy work.
- Flag fallback or isolation mechanisms that share the failed dependency, have unbounded cost, or consume the capacity required for recovery.
- Flag overload behavior that admits unlimited work, starves essential or other-tenant work, or reports rejected work as accepted.
- Flag degraded or stale operation without a truthful user or caller contract, or without a safe route back to normal service.
- Flag failover and coordination that permit stale leaders, split brain, lost quorum, insufficient replacement capacity, or repeated oscillation.
- Flag recovery that cannot restore usable service with its required state, keys, metadata, dependencies, and in-flight work.
- Flag readiness, health checks, rolling upgrades, reload, or shutdown ordering that removes healthy capacity, restarts the fleet, or loses accepted work.
- Flag diagnostics and operational recovery paths that depend on resources unavailable during the fault they are meant to resolve.
