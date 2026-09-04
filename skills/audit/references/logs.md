# Logs

Run as the `logs` dimension. Follow production facts from emitters through enrichment, sampling, export, storage, and operator queries. Assign each fact to the appropriate log, metric, trace, audit record, or domain event.

Start with incident questions and consequential state transitions, including partial success, retry, cancellation, failover, and recovery. Verify emitted output and its consuming backend; source calls alone may not establish observability.

## Probes

1. **Ownership:** critical journeys, on-call needs, signal owners, service/team/account/region gaps, and dashboards/runbooks whose expected fields or events drifted.
2. **Event selection:** meaningful terminal outcomes and scope, useful starts/duration, state transitions, invalid states, long-running liveness, and distinguishable cache/fallback/retry/dead-letter/manual/rollback paths. Avoid narrating every step.
3. **Failure fidelity:** original cause/type/stack, dependency and attempt, partial/concurrent/compensation failures, local versus remote failure, and control outcomes. Logging must not mask, mutate, or delay the application error; repeated layers need distinct value.
4. **Correlation:** request/trace/job/message/tenant/entity identity across async/process/queue boundaries, parent-child and retry causality, identifier reuse/truncation/forgery, clock and buffer ordering, and sampling that orphans rare failures.
5. **Schema/messages:** stable queryable names/types/units/enums, accurate actor/target/count/outcome, mixed-version compatibility, collector normalization, field collisions/truncation/Unicode/multiline/domain serialization, and dynamic templates that destroy aggregation.
6. **Levels:** severity tied to operational consequence; bounded production-relevant INFO; traffic detail usually DEBUG; actionable WARN/ERROR; recovered versus exhausted retries; fatal meaning; runtime overrides and disabled loggers.
7. **Volume/cost:** steady, burst, storm, fan-out, and backlog-drain event rates; ingestion/index/storage/query cost; per-item/poll/payload noise; necessary cardinality; sampling/suppression counts and rare evidence; buffer/backpressure/disk/export outage behavior.
8. **Privacy/security:** secret/personal/model payload exposure at every level, pre-export nested/encoded redaction, hashing linkability and entropy, record/terminal injection, tenant/environment routing/access, and durable audit integrity distinct from diagnostic logs.
9. **Async/lifecycle:** receipt through abandonment/replay outcomes, startup/readiness/drain/failover/config/migration evidence, short-lived/offline flush, multiprocessing context, and cross-region buffering/retry loss/duplication/delay.
10. **Pipeline:** handlers/collectors/exporters/storage wired per environment, init/shutdown/rotation/retention, recursion and duplicates, permissions/TLS/auth/proxies, quotas/failover, and independently visible drop/parse/schema/saturation failures.
11. **Consumption:** bounded queries answer affected scope, first cause, current state, blast radius, and recovery. Check alert identity/windows/context, runbooks and saved queries, evidence retention/access latency, and canonical machine fields.
12. **Verification/evolution:** assert emitted semantics, redaction, correlation, levels, and suppression; exercise real export configuration and canaries; check schema ownership, deprecation, retention/access/cost requirements and accumulated emergency noise.

## Judgment

A confirmed defect needs an emitted record or proven absence and an operational consequence. Separate useful instrumentation improvements from unavailable runtime evidence. Rank by incident impact, burst volume, diagnostic loss, privacy, cost, and recovery. Verify both normal and failing behavior across producers and consumers.

## Changes and completion

Apply validated logging corrections; prefer demotion over deleting noisy INFO with diagnostic value. Remove/redact/transform sensitive data at every level; demotion never fixes exposure. Redaction/hashing semantics, retention/access, audit/alerts, pipeline/routing/storage, and compliance evidence are critical only when domain requirements or operational intent cannot be established.

Preserve needed diagnostic evidence when reducing volume.

Use the shared evidence and completion rules; account for every applicable numbered probe and material boundary, including domain-derived probes.
