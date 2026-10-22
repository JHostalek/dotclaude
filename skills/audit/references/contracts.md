# Contracts

- Flag producer-consumer disagreement on identity, scope, units, precision, encoding, ordering, uniqueness, or the meaning of absent, null, empty, zero, and unknown values.
- Flag APIs whose status, result, side effects, atomicity, or completion signals differ from commitments supported consumers rely on, including undocumented ordering, timing, error text, or defaults that evidence shows consumers depend on (Hyrum's law).
- Flag serialization or transformation that loses fields, changes meaning, creates ambiguous values, or cannot round-trip supported data.
- Flag pagination, filtering, or partial results that can skip, duplicate, or misrepresent results under supported mutations and ordering.
- Flag events or jobs whose delivery, ordering, deduplication, retention, replay, or snapshot-versus-delta semantics disagree with consumer assumptions.
- Flag persistence changes that break direct readers, historical data, ORM mappings, indexes, analytics, restore, or rollback commitments.
- Flag library or plugin changes that break supported symbols, signatures, callbacks, ownership, threading, initialization, packaging, or binary compatibility.
- Flag CLI or configuration changes that break supported options, defaults, precedence, output formats, exit codes, reload behavior, or automation.
- Flag failure translation that changes established error categories, retryability, cancellation, or partial-success semantics for consumers.
- Flag version skew: a supported old/new producer-consumer combination that breaks during rollout, delayed delivery, offline use, replay, or rollback.
- Flag generated artifacts or compatibility checks that accept a change while actual supported consumers get different behavior or meaning.
- Flag contract removal or tightening that relies on unverified assumptions about external consumers or migration completion. Do not invent hypothetical consumers.
