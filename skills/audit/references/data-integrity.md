# Data Integrity

Run as the `data-integrity` dimension. Map authoritative and derived data through ingestion, transformation, writes, publication, reads, migration, restore, deletion, and repair.

Establish identity, relationship, conservation, durability, provenance, and lifecycle invariants, including permitted staleness, partiality, and conflict. Trace exact writers, constraints, isolation/durability settings, failure windows, historical shapes, and supported versions.

## Probes

1. **Model/ownership:** entities, keys, cardinality, temporal validity, completeness, write/repair/delete authority, contradictory sources of truth, circular synchronization, and flows across tenants, stores, services, analytics, backups, and operators.
2. **Ingestion:** semantic and provenance validation at ownership/trust boundaries; canonical identity, Unicode/case, null/default/sentinel handling, malformed/stale/duplicate imports or events, lossless mapping/aggregation/round trips, and explicit rejection/quarantine.
3. **Constraints:** primary/foreign/unique/check/exclusion/nullability rules for every writer; deferred/partial constraints, collations, generated values, triggers/cascades, soft deletes, tenant/partition scope, racing application checks, and ORM/API/historical-schema drift.
4. **Atomicity:** all decision reads and writes in the invariant, isolation anomalies, commit/ack/visibility order, autocommit/connections/callbacks, external effects, outbox/inbox/compensation, and truthful outcomes after timeout or ambiguous commit.
5. **Concurrency/delivery:** CAS, locks/leases/fencing, allocation and conservation, idempotency scope/payload binding/lifetime/atomic storage/result replay, deduplication expiry, poison/redriven events, sequence gaps, late delivery, and conflict resolution.
6. **Distributed state:** promised consistency and durability, stale irreversible decisions, quorum/replica promotion, split brain, partitions, offline edits, regional failover, clock skew, and reconciliation during permitted inconsistency windows.
7. **Migration/backfill:** expand/contract, old/new schemas and binaries, dual reads/writes, rerun/resume/checkpoints, stable selection/pagination, live-write races, late data, historical defaults, identifier/meaning preservation, cutover reconciliation, rejected records, and partial rollback.
8. **Quantities/time:** decimal scale, float/overflow, rounding stage, currency/units/reference systems, conserved totals, event versus processing time, DST/calendars, timestamp precision, sentinel dates, expiry/ties, and serialization drift.
9. **Derived stores:** cache/index/warehouse/feature-store lineage, complete tenant/version/config keys, CDC/projection updates, corrections/tombstones, lag/completeness, deterministic rebuild/replay, drift repair, and consumers mistaking approximate data for authority.
10. **Relationships/lifecycle:** merge/split/reassign/delete/restore, aliases, identifier reuse, tenant transfer, orphan/cascade scope, queued work, resurrection from offline replay or backups, and actual retention/legal-hold/erasure contracts across every copy.
11. **Recovery/repair:** coherent snapshots and dependent-store restore order, schemas/keys/metadata needed for recovery, real RPO/RTO, reconciliation against correct authorities, preserving newer writes, bounded resumable/idempotent repair, provenance, and postconditions.
12. **Lineage/destruction:** actor/source/version/approval history, audit immutability/correlation/tenant attribution, exact targeting of bulk operations, wrong environment/tenant/date/empty-filter hazards, preview/limits/authorization/backup controls, and partial execution.
13. **Detection:** invariant assertions after concurrency, retries, crashes, migration and restore; property/model/fault/historical checks; checksums/totals, freshness/completeness and semantic drift monitors; blind spots during overload/recovery and sampling.
14. **Domain/composition:** financial ledgers, scientific/medical provenance, identity, entitlements, collaboration, and ML alignment as applicable. Combine backfills/live writes, ambiguous commit/retry, restore/newer indexes, deletion/offline clients, and local updates/global conservation.

## Judgment

Demonstrate the violated data invariant and reachable corruption or misleading state; a missing constraint/test or preferred consistency model alone is insufficient. Rank by propagation, affected data/tenants, detectability, and recoverability. Redact sensitive records and use read-only evidence or local/synthetic reproducers; never alter production data to prove a finding. Verify downstream representations and recovery, not just successful writes.

## Changes and completion

Apply validated integrity fixes while preserving legitimate stored data. Migrations, backfills, repairs, destruction, retention/deletion, schema/events, transaction/consistency changes, and compatibility are critical only when affected records, intended semantics, or rollback cannot be safely established. A code guard alone does not authorize mutating existing data.

Use the shared evidence and completion rules; account for every applicable numbered probe and material boundary, including domain-derived probes.
