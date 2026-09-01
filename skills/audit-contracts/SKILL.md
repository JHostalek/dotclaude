---
name: audit-contracts
description: Use when auditing and fixing end-to-end contracts and compatibility in a scope — HTTP/RPC APIs, events/messages, schemas, files, CLIs, libraries, configuration, database consumers, and external integrations. Triggers on "audit contracts", "API compatibility review", "schema compatibility audit", "check producer/consumer drift", "compatibility review", and "contract review". Performs an architecture-led review of semantic, backward, forward, and mixed-version compatibility; named interface classes are a minimum, never an exhaustive boundary.
argument-hint: [path]
---

!`cat "${CLAUDE_SKILL_DIR%/*}/shared/audit-workflow.md"`

Run as the `contracts` dimension. Find where producers and consumers can disagree about the meaning, shape, sequencing, lifecycle, or failure behavior of an interface. Cover accidental as well as declared contracts; do not reduce compatibility to schema diffs or API version labels.

## Work top-down

Start from intended behavior and deployed relationships, not grep patterns:

1. Reconstruct the contract system: user and domain promises, producers, consumers, owners, trust and deployment boundaries, authoritative schemas or specifications, transport and storage paths, generated artifacts, supported versions, external dependencies, rollout processes, and deprecation commitments. Include undocumented contracts inferred from real consumers and persisted data.
2. Derive invariants for identity, meaning, shape, optionality, defaults, ordering, units, precision, pagination, idempotency, errors, timing, state transitions, and compatibility. State which party owns each invariant and the consequence when parties disagree.
3. Build the actual producer-to-consumer graph across synchronous, asynchronous, persisted, generated, administrative, legacy, retry, recovery, import/export, offline, and third-party paths. Include intermediaries that transform, cache, proxy, replay, batch, or translate the contract.
4. Model supported version combinations and lifecycle states: first deployment, partial rollout, mixed versions, migration, backfill, rollback, replay, restore, delayed consumer, deprecation, and removal. Inspect architecture-wide and emergent breakage first, then trace exact paths.
5. Find wide across every applicable baseline area before applying noise filters. Classify candidates as confirmed defects, worthwhile improvements, intentional compatibility choices, active migrations, external constraints, or unresolved questions.

Do not infer compatibility from semantic versioning, an “additive” change, schema validation, static types, generated clients, framework defaults, naming, documentation, passing tests, tolerant readers, or a compatibility checker. Verify the exact producer, intermediary, consumer, generated artifact, runtime version, deployed-version combination, stored historical data, and failure behavior. A syntactically accepted payload can still be semantically incompatible.

Treat current behavior as evidence, not automatically as the intended commitment. Before changing it, distinguish a relied-upon public contract from an accidental implementation detail. Preserve legitimate behavior and explicit compatibility promises unless the user signs off on changing them.

## Mandatory contracts review baseline

This baseline is minimum current-practice coverage, not an exhaustive checklist. Apply every relevant lens, derive domain-specific lenses, and inspect interactions among areas.

### 1. Contract inventory, ownership, and architecture

- Declared and accidental interfaces across processes, packages, services, tenants, regions, devices, teams, databases, files, operators, and third parties.
- Producer, consumer, intermediary, schema, documentation, and rollout ownership; duplicated authorities, orphaned contracts, undocumented consumers, and unclear compatibility policy.
- Source of truth and generation direction among specifications, code, schemas, clients, fixtures, examples, migrations, and deployed artifacts.
- Data and control flow through gateways, proxies, adapters, caches, queues, stores, analytics, exports, and manual procedures that alter or preserve meaning.

### 2. Semantic contract and data meaning

- Field and operation meaning, identity, scope, ownership, state, units, currency, timezone, precision, scale, rounding, signs, coordinate systems, locale, and encoding.
- Absent versus null versus empty versus zero versus unknown; requiredness, defaults, sentinel values, enum evolution, unknown values, and canonicalization.
- Ordering, uniqueness, cardinality, stability, monotonicity, consistency, freshness, mutability, and authoritative versus derived values.
- Preconditions, postconditions, side effects, atomicity, idempotency scope and lifetime, replay behavior, duplicate handling, and state-machine transitions.

### 3. HTTP, RPC, query, and streaming APIs

- Methods/operations, paths, parameters, headers, metadata, content negotiation, request and response bodies, status/result mapping, redirects, caching, and conditional requests.
- Required and optional fields, validation differences, unknown-field behavior, polymorphism, unions, enums, numeric ranges, nullability, and defaults across clients and servers.
- Pagination cursors, ordering stability, filtering, sorting, batching, partial results, rate-limit semantics, long polling, subscriptions, cancellation, deadlines, and backpressure.
- REST, GraphQL, gRPC, WebSocket, SSE, and custom protocols across old/new clients, gateways, generated clients, proxies, and alternate entry points.

### 4. Events, messages, jobs, and asynchronous workflows

- Topic/queue identity, routing keys, envelopes, headers, payload schemas, correlation and causation, partition keys, timestamps, sequence/version fields, and provenance.
- Delivery guarantees, ordering scope, retries, redelivery, deduplication, idempotency, replay, retention, dead-letter handling, poison messages, and delayed consumers.
- Event meaning over time: facts versus commands, state snapshots versus deltas, mutable semantics, tombstones, compaction, schema registry rules, and historical replay.
- Producer/consumer skew, fan-out consumers with different assumptions, dual publish/consume, bridge or translator behavior, partial rollout, rollback, and recovery.

### 5. Schemas, persistence, and database consumers

- Database tables, views, functions, stored procedures, change streams, search indexes, caches, analytical models, files, and shared stores used as contracts.
- Column/type/constraint/default/nullability changes; identifiers, keys, collation, timezone, numeric precision, enum representation, and historical data shapes.
- Expand/contract migrations, dual reads/writes, backfills, mixed-schema operation, read/write ordering, rollback, replicas, restore, archives, and long-lived or external consumers.
- ORM and driver mappings, query assumptions, projections, undocumented direct access, generated models, and semantic drift between operational and analytical representations.

### 6. Files, serialization, and interchange formats

- Import/export formats, manifests, documents, media metadata, archives, templates, snapshots, backups, logs, and machine-readable reports.
- Format/version markers, encoding, byte order, delimiters, quoting, escaping, newlines, compression, filenames, paths, MIME/content type, and platform differences.
- Parser/serializer round trips, unknown fields, extension points, canonical form, ordering, precision, lossiness, duplicate keys, partial files, and malformed or future-version input.
- Existing stored files, offline producers/consumers, manual editing, incremental processing, resumability, and retention beyond application release cycles.

### 7. Libraries, SDKs, plugins, and extension surfaces

- Exported symbols, signatures, overloads, generics, types, constants, inheritance, callbacks, hooks, plugin protocols, discovery, and reflection.
- Source, binary, ABI, behavioral, and serialization compatibility; runtime/linker/platform differences; dependency and peer-version constraints.
- Exceptions/errors, sync versus async behavior, cancellation, threading, resource ownership, side effects, performance promises, and initialization/shutdown.
- Generated SDK parity, language-specific mappings, packaging and module entry points, tree-shaking or side-effect imports, and examples that become de facto contracts.

### 8. CLIs, configuration, and operational interfaces

- Commands, options, positional arguments, environment variables, configuration files, precedence, coercion, defaults, aliases, exit codes, stdout/stderr, and machine-readable output.
- Config schema evolution, unknown keys, deprecated names, partial config, hot reload, feature flags, secrets references, and environment-specific overlays.
- Scripts, CI/CD, operators, automation, dashboards, health checks, metrics, alerts, runbooks, and parsers that consume stable text, labels, paths, or process behavior.
- Interactive versus non-interactive behavior, prompts, locale, terminal capabilities, working directory, filesystem layout, signals, cancellation, and platform differences.

### 9. Errors, partial results, and failure semantics

- Error taxonomy, codes, status mapping, retryability, permanence, validation locations, field-level errors, cause chains, and user-visible meaning.
- Timeout and cancellation ambiguity, partial success, accepted-but-not-completed work, fallback, degraded responses, stale data, and truthful completion signals.
- Compatibility of newly introduced errors, changed status codes, narrowed validation, exception types, error payload fields, and consumer default branches.
- Failure propagation across gateways, adapters, queues, jobs, SDKs, CLIs, and external integrations; controls that erase, remap, or misclassify contractual meaning.

### 10. Versioning, evolution, and deprecation

- Compatibility policy and support matrix for backward, forward, full, source, binary, behavioral, wire, and data compatibility as applicable.
- Version negotiation, media or protocol versions, feature/capability negotiation, schema evolution rules, minimum versions, downgrade behavior, and unknown-version handling.
- Add, remove, rename, retype, reorder, tighten, relax, split, merge, reinterpret, or change defaults—including superficially additive changes that alter exhaustive matching, payload size, precedence, timing, or behavior.
- Deprecation notice, discoverability, telemetry, migration path, ownership, deadlines, support windows, consumer readiness, compatibility shims, and safe removal criteria.

### 11. Generated artifacts and contract enforcement

- Specifications, IDLs, schema registries, migrations, clients, servers, validators, serializers, documentation, fixtures, mocks, and examples generated from the correct source and version.
- Stale, manually patched, partially regenerated, or differently configured artifacts across languages, packages, branches, release outputs, and deployed environments.
- Contract, consumer-driven, golden, round-trip, differential, replay, compatibility, and mixed-version tests that exercise real serialization and transport behavior.
- Linters and compatibility tools: modeled surfaces, ignored changes, baselines, suppressions, configuration drift, semantic blind spots, and false assurance from passing gates.

### 12. Deployment, rollout, and lifecycle compatibility

- Producer-before-consumer and consumer-before-producer deployment, independent release cadence, canaries, regional skew, stale workers, mobile/offline clients, third-party lag, and delayed messages.
- Feature flags, capabilities, dark launches, dual paths, data migration, backfill, cache invalidation, bridge versions, rolling restart, rollback, roll-forward, restore, and disaster recovery.
- Existing data and in-flight work during startup, shutdown, failover, replay, retry, expiration, archival, tenant migration, ownership transfer, and decommissioning.
- Observability that identifies version pairs, rejected or defaulted fields, unknown values, fallback use, drift, deprecated usage, and affected consumers without changing the contract itself.

### 13. External, domain-specific, and emergent contracts

- Third-party APIs, webhooks, callbacks, identity providers, payment networks, cloud services, partner files, device protocols, standards, and regulatory reporting; verify exact pinned and deployed behavior against current primary sources when version-sensitive.
- Domains such as finance, healthcare, identity, geospatial, real-time control, safety-critical systems, mobile/desktop, embedded/edge, data/ML pipelines, and AI agents. Derive additional semantics and compatibility probes from their invariants.
- Emergent breakage across individually valid interfaces: identity or tenant mapping, clock and ordering assumptions, retry plus idempotency, pagination plus mutation, schema plus cache, event plus migration, or fallback plus partial rollout.
- Human and organizational contracts where automation depends on approval states, runbook steps, operational timing, naming, or ownership handoffs.

## Evidence and judgment

Follow the shared workflow's find-wide-then-filter discipline. Collect candidates across the whole producer-consumer graph before applying the contracts noise bar. Drop a candidate only after proving that every supported consumer path accepts the change with preserved meaning, or that the alleged contract is not supported or relied upon. Generated ownership, tests, framework behavior, or tool approval alone does not prove compatibility.

For every retained finding establish:

- the violated interface, semantic, compatibility, rollout, or lifecycle invariant;
- the concrete producer, intermediaries, consumers, versions, data/message shape, and end-to-end path;
- the breakage consequence under a realistic call, boundary case, deployment order, replay, rollback, failure, or operational condition;
- the existing schema, version rule, adapter, generator, test, negotiation, or compatibility control and why it fails on that exact path;
- the smallest safe correction, including compatibility, migration, deprecation, and rollout implications;
- a verification method such as cross-version contract tests, real serialization round trips, replay, consumer fixtures, differential tests, deployment simulation, or external sandbox validation.

Classify retained items:

- **confirmed defect** — the invariant, supported producer-consumer combination, and breakage path are demonstrated;
- **worthwhile improvement** — current combinations remain compatible, but a concrete gap in ownership, enforcement, observability, migration safety, or future evolution merits correction;
- **unresolved question** — consumer reach, commitment, deployed version, semantic intent, or other material evidence is unavailable.

Do not inflate a hypothetical consumer, cosmetic inconsistency, missing version label, absent test alone, or possible future evolution into a defect. Conversely, syntactic acceptance does not disprove semantic breakage. Search for variants of every confirmed issue across all implementations, generated artifacts, versions, stored data, and consumers.

<approval_gate>
Apply validated contract corrections under the shared auto-fix default. Treat schema/data migration, compatibility-policy change, version removal, deprecation, external integration change, coordinated rollout, or ambiguity about a relied-upon contract as critical only when evidence cannot safely choose the intended contract or rollout.
</approval_gate>

The approval gate remains subject to the shared auto-fix boundary. Do not silently “fix” consumers by changing the commitment they depend on. Prefer corrections that restore the established contract; if the established contract is unsafe or wrong, report the conflict and propose an explicit migration.

When this dimension participates in a sweep, preserve the integration engine's one-agent-per-group and dependency-order rules. Run contract analysis after structural ownership and before downstream correctness/error-handling conclusions where those conclusions depend on the interface; reconcile overlapping findings by invariant and path rather than duplicating them.

## Completion gate

Use the shared completion ledger. Account for every material producer, intermediary, consumer, supported version, persisted or in-flight representation, deployment order, and lifecycle state; do not claim universal compatibility.
