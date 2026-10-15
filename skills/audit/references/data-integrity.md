# Data integrity

- Flag competing authorities or uncontrolled writers that can create contradictory representations of one entity, relationship, or quantity.
- Flag ingestion or conversion that accepts invalid identity, provenance, cardinality, or meaning, or silently drops information downstream records need.
- Flag an integrity rule enforced only by an application-level check-then-act that another writer or concurrent operation can bypass.
- Flag writes and decision reads outside the transaction or isolation boundary the data invariant needs.
- Flag multi-store or external effects that can leave inconsistent partial state without reliable publication, compensation, or reconciliation.
- Flag idempotency or deduplication whose identity, payload binding, retention, atomicity, or replayed result permits duplicate or mismatched effects.
- Flag backfills and migrations that race live writes, cannot safely resume, change historical meaning, or leave unsupported old/new representations.
- Flag quantity or timestamp handling that corrupts conserved totals, precision, currency, units, temporal validity, or canonical ordering.
- Flag derived data (caches, indexes, projections, analytics) that loses corrections or deletions, cannot rebuild from the authority, or presents incomplete data as authoritative.
- Flag merge, split, reassignment, deletion, restore, or identifier reuse that creates orphans, cross-tenant relationships, or resurrects deleted data.
- Flag backup, restore, or repair code that cannot recover coherent records with their required schemas, keys, metadata, and dependent stores.
- Flag bulk or destructive operations whose targeting, bounds, or partial-execution handling can corrupt unintended records or environments.
- Flag missing lineage or mutable audit records when provenance, attribution, or immutability is an actual data requirement.
