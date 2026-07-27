---
name: audit-data-integrity
description: Use when auditing and fixing end-to-end data integrity in a scope — invariant violations, partial or conflicting writes, unsafe migrations/backfills, duplicate or reordered effects, precision or time corruption, stale derived stores, broken retention/deletion, and unrecoverable drift. Triggers on "audit data integrity", "review data consistency", "check migrations and invariants", "find data corruption", and related requests. Named risks are minimum, never exhaustive.
argument-hint: [path]
---

!`cat "${CLAUDE_SKILL_DIR}/../audit-workflow.md"`

Run as the `data-integrity` dimension. Determine whether data retains its intended identity, meaning, relationships, completeness, ordering, precision, provenance, and lifecycle guarantees across every authoritative and derived representation. Include violations that appear only through component interaction, concurrency, failure, deployment, recovery, or historical data.

<coverage_invariant>
Every area, invariant, defect class, and example below is minimum and non-exhaustive. Add, combine, split, reweight, or skip probes according to the actual domain, architecture, data model, consistency promises, deployment, lifecycle, and consequences. “Not listed” never means “out of scope.” Skip a baseline area only when the scoped system cannot exercise it, and record evidence.
</coverage_invariant>

## Work top-down

1. Reconstruct the data model from product behavior, domain rules, schemas, migrations, storage configuration, APIs/events, code, tests, operational procedures, and deployed topology. Identify entities, identities, relationships, authoritative and derived stores, owners, trust boundaries, writers/readers, state machines, conservation laws, validity windows, and legal deletion or retention states.
2. State the integrity invariants and their consequences before inspecting implementation details. Cover what must be atomic, unique, referentially valid, ordered, monotonic, balanced, durable, reproducible, traceable, recoverable, or consistently deleted; also state permitted staleness, partiality, and conflict.
3. Map each material datum through its lifecycle: creation or ingestion, validation, normalization, transformation, persistence, transaction commit, publication, replication, indexing/caching, reads, updates, correction, migration, archival, restore, deletion, and reconciliation. Include alternate, batch, administrative, retry, failover, rollback, mixed-version, and manual-repair paths.
4. Inspect architecture-wide invariants and dangerous compositions first. Then trace exact write/read paths and failure windows across components. Apply every applicable baseline area and derive domain-specific probes.

Never infer integrity from an ORM, database engine, transaction helper, framework default, schema, constraint, type, generated client, helper abstraction, naming convention, common pattern, or test presence. Verify the exact schema and constraint state, isolation and durability settings, call path, ordering, failure timing, deployment topology, historical shapes, and recovery behavior. A valid local write can still create globally invalid data.

## Mandatory data-integrity baseline

This baseline is minimum current-practice coverage, not an exhaustive checklist. Apply every relevant lens, derive additional ones from the system, and inspect interactions among lenses.

### 1. Integrity model and ownership

- Domain entities, stable identity, relationships, state transitions, conservation rules, uniqueness, cardinality, ordering, temporal validity, provenance, and completeness.
- Authoritative source for each field and invariant; ownership of writes, validation, conflict resolution, repair, deletion, and schema evolution.
- Duplicated or contradictory authorities, undocumented derived truth, circular synchronization, and assumptions no component guarantees.
- Data flows across services, processes, tenants, regions, devices, databases, files, queues, APIs, third parties, analytics, models, backups, and operator tooling.

### 2. Ingestion, validation, and semantic preservation

- Validation at every trust and ownership boundary: syntax, type, range, units, state, identity, relationship, provenance, authorization context, and domain semantics.
- Canonicalization of identifiers, case, Unicode, locale, null/absent/empty/zero, defaults, enums, sentinels, and unknown or forward-version values.
- Imports, files, APIs, events, webhooks, CDC, third-party feeds, user edits, and administrative or repair input; malformed, incomplete, duplicated, stale, and adversarial records.
- Lossless parsing, serialization, mapping, joining, grouping, filtering, aggregation, and round trips; explicit handling of rejected or quarantined records.

### 3. Schema and constraint enforcement

- Primary, foreign, unique, check, exclusion, nullability, domain, and cardinality constraints match actual invariants and apply to every writer.
- Constraint timing and scope, deferred checks, partial indexes, collations, generated/default values, triggers, cascades, soft deletion, tenant keys, and partition boundaries.
- Application-only checks that race or can be bypassed by bulk, legacy, maintenance, import, restore, direct-SQL, or asynchronous paths.
- Logical schema agreement among database, ORM, validation, event/API schemas, generated code, files, indexes, consumers, and historical records.

### 4. Transactions, atomicity, and partial effects

- Transaction boundaries cover the full invariant, including reads used for decisions and every required write; isolation prevents lost updates, write skew, dirty/nonrepeatable reads, phantoms, and check-then-act races as relevant.
- Commit, acknowledgement, lock, lease, and visibility ordering; nested or implicit transactions, autocommit, connection changes, callbacks, and side effects inside transactions.
- Multi-store and external effects: database plus queue, object store, cache, search, payment, email, filesystem, or third-party API; outbox/inbox, saga, compensation, reconciliation, or explicit incomplete state.
- Partial writes from timeout, cancellation, crash, capacity failure, serialization conflict, failover, or cleanup failure; truthful caller outcome after ambiguous commit.

### 5. Concurrency, idempotency, deduplication, and ordering

- Concurrent writers, optimistic versions, compare-and-set, locks, leases, fencing tokens, ownership transfer, and race-safe allocation, balances, quotas, inventory, counters, and state transitions.
- Idempotency identity, scope, payload binding, lifetime, storage atomicity, replay behavior, and response reuse; retries before, during, and after commit.
- At-least-once, at-most-once, or claimed exactly-once delivery; duplicate suppression, poison events, redrive, backfill, replay, and deduplication expiry.
- Required total, partition, causal, or per-entity order; sequencing, late/out-of-order events, concurrent completion, gaps, duplicates, and conflict resolution.

### 6. Distributed consistency and replicated state

- Explicit consistency model for each workflow: strong, eventual, causal, read-your-writes, monotonic reads, session, bounded staleness, or domain-specific guarantees.
- Replication lag, quorum settings, leader change, split brain, network partition, regional failover, offline edits, clock skew, conflict detection, and merge semantics.
- Stale reads used for irreversible decisions; writes acknowledged below required durability; replica promotion with missing or divergent state.
- Cross-service invariants and workflows whose locally valid updates can disagree globally; reconciliation latency and behavior during the inconsistency window.

### 7. Migrations, backfills, and schema evolution

- Expand/contract sequencing, compatibility among old/new binaries and schemas, dual read/write behavior, feature flags, cutover, rollback, and downgrade.
- Migration and backfill atomicity, rerun safety, resumability, deterministic selection, pagination stability, checkpoints, throttling, concurrent writes, and late-arriving data.
- Defaults and constraints applied consistently to old and new rows; field reinterpretation, enum changes, identifier preservation, precision changes, and historical-data assumptions.
- Validation before cutover, row and aggregate reconciliation, rejected-record handling, audit trail, backup/restore interaction, and rollback after partial deployment.

### 8. Precision, units, quantities, and time

- Integer and decimal scale, floating point, overflow/underflow, rounding mode and stage, sign, currency, unit, dimension, coordinate/reference system, and conversion version.
- Conservation and reconciliation of balances, money, inventory, quotas, counters, measurements, allocation, tax, and other domain quantities.
- Instants versus civil time, timezone, DST, locale, calendar arithmetic, timestamp precision, truncation, clock source, event time versus processing time, and validity intervals.
- Sentinel dates, expiry boundaries, ordering ties, future/late data, leap behavior where relevant, and timestamp changes during serialization or storage.

### 9. Derived stores, caches, indexes, and analytical copies

- Cache/search/index/materialized-view/warehouse/lake/feature-store lineage to authoritative data; complete keys, tenant/version/config separation, update and invalidation rules.
- Dual writes, CDC, event projection, refresh, reindex, aggregation, late data, tombstones, deletes, corrections, and schema drift.
- Drift detection, freshness and completeness objectives, lag visibility, deterministic rebuild, replay safety, and reconciliation or repair.
- Consumers know whether data is authoritative, stale, approximate, partial, sampled, or eventually consistent; derived data is not promoted to truth accidentally.

### 10. Referential integrity and lifecycle

- Creation, merge, split, reassignment, archival, soft/hard deletion, anonymization, restore, identifier reuse, tenant transfer, and decommissioning preserve relationships.
- Orphans, dangling references, duplicate identities, alias chains, cascade scope, tombstone propagation, stale foreign copies, and resurrection after delayed replay or restore.
- Retention, legal hold, deletion, erasure, expiration, compaction, and archival apply across replicas, backups, caches, indexes, analytics, exports, logs, and third parties according to the actual contract.
- Reads and queued work handle entities changing state or ownership during execution.

### 11. Recovery, reconciliation, and repair

- Crash/restart, journal or WAL replay, checkpoints, backup/snapshot consistency, point-in-time restore, regional recovery, and restoration ordering across dependent stores.
- Recovery point/time objectives match real durability; backups are restorable and include schemas, keys, metadata, and external dependencies needed for coherent state.
- Reconciliation compares the right authorities and invariant totals; detects missing, duplicate, stale, corrupt, misattributed, or impossible records without overwriting valid newer state.
- Repair is reviewable, resumable, idempotent, reversible where possible, bounded, provenance-preserving, and followed by verification; failed repair cannot deepen corruption.

### 12. Lineage, auditability, and destructive operations

- Provenance from source through transformations, versions, actors, approvals, timestamps, and derived outputs; enough lineage to explain and repair state.
- Audit history is complete, immutable to unauthorized paths, ordered, correlated, tenant-correct, and semantically distinguishable from operational logs.
- Bulk update/delete, truncate, reset, purge, import, rollback, replay, merge, restore, and administrative scripts have exact targeting, dry-run or preview where appropriate, limits, authorization, approval, backup, and postcondition checks.
- Tooling resists wrong environment, tenant, region, schema, date range, wildcard, empty filter, stale selection, or partial execution; irreversible effects are explicit.

### 13. Verification, detection, and operational integrity

- Tests assert invariants and aftermath across transactions, concurrency schedules, retries, duplicates, reorderings, crashes, mixed versions, migrations, restore, and reconciliation—not merely successful writes.
- Property/model/state-machine, differential, historical-data, fault-injection, integration, end-to-end, and production shadow checks when local examples cannot prove the guarantee.
- Runtime constraints, invariant monitors, checksums, row/aggregate comparisons, lag/freshness/completeness metrics, anomaly detection, and alerts expose semantic drift with actionable identity and scope.
- Detection blind spots during overload, failover, deploy, maintenance, and recovery; sampling or aggregation must not hide rare high-consequence corruption.

### 14. Domain-specific and emergent integrity

Derive additional coverage for the system. Examples include double-entry ledgers and settlement, inventory reservation, entitlement periods, healthcare measurements, identity linking, scientific provenance, regulated records, offline synchronization, collaborative documents, ML feature/label alignment, geospatial reference systems, blockchain state, and safety-critical control. These examples are explicitly non-exhaustive.

Inspect failures spanning multiple areas: a backfill racing live writes; retry after ambiguous commit creating a duplicate charge; restored authoritative data followed by replay from a newer index; deletion resurrected by an offline client; timezone conversion changing deduplication identity; or individually valid service updates violating a conservation law. Invent equivalent cases implied by the actual system.

## Evidence and judgment

Follow the shared workflow’s find-wide-then-filter rule. Collect every candidate before applying the data-integrity noise bar. Do not use a likely explanation, familiar abstraction, constraint, or test to avoid collection.

For every retained finding, establish:

- violated data invariant and authoritative evidence for it;
- concrete end-to-end read/write path, data shape, concurrency or failure timing, lifecycle state, and operating conditions;
- corrupt, missing, duplicate, stale, misordered, irrecoverable, or misleading result and its consequence;
- existing schema, constraint, transaction, retry, reconciliation, test, or abstraction and why it fails on that exact path;
- smallest safe correction that preserves legitimate data and behavior;
- verification method that can discriminate valid from invalid state, including repair/recovery when relevant.

Reject a candidate only after proving that the exact path preserves the invariant or that authoritative intent permits the observed state. Classify retained items as:

- **confirmed defect** — the invariant and violating path are demonstrated;
- **worthwhile improvement** — current data remains valid, but a concrete integrity fragility, detection gap, or repair weakness merits change;
- **unresolved question** — material ambiguity, inaccessible production state, or missing authoritative evidence prevents a conclusion.

Do not inflate speculative corruption, a missing constraint/test alone, or a preferred consistency model into a defect. Conversely, inability to reproduce a timing-dependent path does not disprove it when reachable states and semantics establish the violation.

Rank confirmed defects by consequence, affected data and tenants, likelihood, propagation, detectability, recoverability, duration, and recurrence. Redact sensitive records. Use read-only queries, snapshots, or synthetic/local reproductions where possible; never alter production data to prove a finding.

## Fix and completion gate

Apply only fixes within the shared auto-fix boundary. Preserve legitimate behavior and stored data. Escalate any migration, backfill, data repair, destructive operation, retention/deletion change, public schema or event change, transaction/consistency semantic change, compatibility tradeoff, or correction whose affected records or intent are uncertain. A safe code guard does not authorize mutating existing data.

Test the violating path, allowed behavior, historical shapes, concurrency/failure window, downstream representations, and recovery or reconciliation. Search for variants across all writers, readers, stores, tenants, regions, old/new versions, administrative paths, and repair tooling.

Before sign-off, produce a coverage ledger for every numbered baseline area and each newly derived lens. Mark each:

- `reviewed` — components and boundaries examined, invariants verified, probes or scenarios exercised, findings, and searched variants;
- `not applicable` — concrete architectural or domain evidence showing why;
- `deferred` — exact blocker, unverified invariant or store, and residual integrity risk.

Completion requires accounting for every material datum lifecycle, authoritative/derived boundary, and applicable baseline area; reconciling interactions across components and operating states; and separating confirmed defects, worthwhile improvements, and unresolved questions. Report scope, auto-fixes, escalations, verification, limitations, and residual risk. Never claim the data is “integrity-safe” or “consistent” beyond the evidence reviewed.
