# Data integrity

- Flag competing authorities or uncontrolled writers that can create contradictory representations of the same entity, relationship, or quantity.
- Flag ingestion or conversion that accepts invalid identity, provenance, cardinality, or meaning, or silently loses information needed by downstream records.
- Flag an integrity rule enforced only by a racing application check when another writer or concurrent operation can bypass it.
- Flag writes and decision reads outside the transaction or isolation boundary needed to preserve the data invariant.
- Flag multi-store or external effects that can leave inconsistent partial state without a reliable publication, compensation, or reconciliation mechanism.
- Flag idempotency or deduplication whose identity, payload binding, retention, atomicity, or replayed result permits duplicate or mismatched effects.
- Flag backfills and migrations that race live writes, cannot safely resume, change historical meaning, or leave unsupported old/new representations.
- Flag quantity or timestamp handling that corrupts conserved totals, precision, currency, units, temporal validity, or canonical ordering.
- Flag caches, indexes, projections, or analytics that lose corrections or deletions, cannot rebuild from authority, or present incomplete data as authoritative.
- Flag merge, split, reassignment, deletion, restore, or identifier reuse that creates orphans, cross-tenant relationships, or resurrection of deleted data.
- Flag backup, restore, or repair code that cannot recover coherent records with their required schemas, keys, metadata, and dependent stores.
- Flag bulk or destructive operations whose targeting, bounds, or partial-execution handling can corrupt unintended records or environments.
- Flag missing lineage or mutable audit records when provenance, attribution, or immutability is an actual data requirement.
