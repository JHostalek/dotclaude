# Contracts

Run as the `contracts` dimension. Trace declared and relied-upon interfaces from producer through intermediaries to consumers, including persisted data and generated artifacts.

Build a supported-version and lifecycle map: deployment order, partial rollout, delayed/offline consumers, migration, replay, restore, rollback, and removal. Establish who owns meaning and compatibility; current behavior may be either a commitment or an accidental detail.

## Probes

1. **Inventory and ownership:** APIs, packages, services, stores, operators, and third parties; undocumented consumers, duplicated authorities, orphaned contracts, and generation direction. Include transformations by proxies, adapters, caches, and manual processes.
2. **Meaning:** identity, scope, units, currency, timezone, precision, rounding, encoding, absent/null/empty/zero/unknown, defaults, enums, canonicalization, order, uniqueness, freshness, side effects, atomicity, and idempotency scope/lifetime.
3. **HTTP/RPC/streams:** methods, paths, metadata, content negotiation, status mapping, validation, unknown fields, unions, pagination stability, filtering, partial results, rate limits, cancellation, deadlines, subscriptions, and backpressure across gateways and clients.
4. **Events/jobs:** routing/envelopes, partition and correlation keys, timestamps, delivery/order guarantees, deduplication, retention, dead letters, replay, tombstones, snapshots versus deltas, dual publication, and delayed consumers.
5. **Persistence:** tables, views, stored functions, CDC, indexes, caches, and analytics as interfaces. Check constraints/defaults, collation and precision, ORM mappings, direct consumers, historical data, expand/contract, dual writes, backfills, and rollback.
6. **Files:** version markers, encoding, byte order, delimiters, escaping, newlines, compression, paths/MIME, duplicate keys, unknown fields, partial files, round-trip loss, offline/manual consumers, and retention beyond release cycles.
7. **Libraries/plugins:** symbols, signatures, types, ABI, callbacks, discovery, reflection, dependency/peer versions, sync/async behavior, threading, ownership, initialization, packaging, generated SDK parity, and examples used as contracts.
8. **CLI/config/operations:** options, environment variables, precedence/coercion, aliases, exit codes, stdout/stderr, machine output, reload, scripts, health/metric consumers, signals, working directory, and interactive/platform differences.
9. **Failures:** stable error codes/categories, retryability, cause translation, new failure cases, validation tightening, partial success, accepted versus completed work, cancellation/commit ambiguity, fallback, and truthful completion signals.
10. **Evolution:** backward/forward, source/binary, behavioral/wire/data support; negotiation, unknown versions, additive changes that break exhaustive matching or alter timing/defaults, deprecation telemetry, migration paths, and removal criteria.
11. **Generated enforcement:** correct specification/version/configuration across clients, validators, serializers, docs, mocks, and release artifacts. Check stale/manual patches, suppressions, compatibility-tool blind spots, real round trips, and mixed-version tests.
12. **Rollout/lifecycle:** producer-first and consumer-first release, regional skew, stale workers, feature flags, cache invalidation, bridge versions, in-flight work, failover, restore, expiration, tenant transfer, and decommissioning. Trace deprecated usage and fallback by version pair.
13. **External and composed contracts:** verify version-sensitive integrations against primary sources. Inspect identity mapping, retry/idempotency, pagination/mutation, schema/cache, event/migration, and fallback/rollout combinations; include domain and operational handoff semantics.

## Judgment

A finding needs a supported producer-consumer combination and a concrete semantic or compatibility break. Schema acceptance, generated clients, semantic version labels, and passing checkers do not establish preserved meaning. Separate demonstrated breakage from ownership/enforcement improvements and unknown consumer commitments. Do not invent hypothetical consumers. Verify with real serialization, historical replay, consumer fixtures, cross-version tests, or rollout simulation.

In a sweep, analyze contracts after structural ownership and before correctness/error-handling conclusions that depend on them. Reconcile overlapping findings by invariant and path under the shared integration rules.

## Changes and completion

Apply validated contract corrections under the shared auto-fix default. Migrations, compatibility policy, version removal/deprecation, external integrations, coordinated rollout, or relied-upon contracts are critical decisions only when evidence cannot safely establish the intended contract and rollout.

Restore established commitments rather than silently changing consumer expectations. If the commitment itself is wrong, propose an explicit migration.

Use the shared evidence and completion rules; account for every applicable numbered probe and material boundary, including domain-derived probes.
