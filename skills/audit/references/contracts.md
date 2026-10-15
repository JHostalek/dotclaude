# Contracts

- Flag producer and consumer disagreement about identity, scope, units, precision, encoding, ordering, uniqueness, or the meaning of absent, null, empty, zero, and unknown values.
- Flag APIs whose status, result, side effects, atomicity, or completion signals differ from the commitments relied on by supported consumers.
- Flag serialization or transformation that loses fields, changes meaning, creates ambiguous values, or cannot round-trip supported data.
- Flag pagination, filtering, or partial-result behavior that can skip, duplicate, or misrepresent results under supported mutations and ordering.
- Flag events or jobs whose delivery, ordering, deduplication, retention, replay, or snapshot-versus-delta semantics disagree with consumer assumptions.
- Flag persistence changes that break direct readers, historical data, ORM mappings, indexes, analytics, restore, or rollback commitments.
- Flag library or plugin changes that break supported symbols, signatures, callbacks, ownership, threading, initialization, packaging, or binary compatibility.
- Flag CLI or configuration changes that break supported options, defaults, precedence, output formats, exit codes, reload behavior, or automation.
- Flag failure translation that changes established error categories, retryability, cancellation, or partial-success semantics for consumers.
- Flag a supported old/new producer-consumer combination that breaks during rollout, delayed delivery, offline use, replay, or rollback.
- Flag generated artifacts or compatibility checks that accept a change while actual supported consumers receive different behavior or meaning.
- Flag contract removal or tightening that relies on unverified assumptions about external consumers or migration completion. Do not invent hypothetical consumers.
