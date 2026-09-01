---
name: audit-structure
description: Use when auditing repo topology in a scope — code grouped by type where the repo groups by feature, god-modules, misplaced files, leaky or missing module boundaries, layer-direction violations, import cycles, over-nesting. Triggers on "audit structure", "repo structure review", "fix module boundaries", "check layering", "files in the wrong place".
argument-hint: [path]
---

!`cat "${CLAUDE_SKILL_DIR%/*}/shared/audit-workflow.md"`

Run as the `structure` dimension. Find topology and dependency design that makes ownership unclear, couples unrelated change, permits forbidden access, or fails under evolution, deployment, or runtime composition. Do not reduce structure to directory aesthetics.

## Work top-down

Reconstruct the system before judging its tree:

1. Identify intended behavior, domain and team ownership, deployable/runtime units, trust and data boundaries, public contracts, state and control flows, entry points, extension points, lifecycle paths, and operational modes. Derive structural invariants: what must change together, remain isolated, depend in one direction, or stay replaceable.
2. Map those concepts to files, modules, packages, services, build targets, schemas, generated artifacts, infrastructure, tests, and documentation. Build the actual dependency graph, including runtime discovery, dependency injection, generated links, events, queues, shared storage, configuration, deployment coupling, and external consumers—not imports alone.
3. Establish intended structure from converging evidence: architecture decisions and policy, enforced boundary configuration, public contracts, ownership, supported framework rules for the exact version, dependency direction, co-change history, release/deployment boundaries, and dominant maintained practice. No source is conclusive alone.
4. Inspect architecture-wide boundary failures and dangerous compositions first. Then trace concrete change, build, startup, request, job, event, migration, failure, recovery, and shutdown paths across structural seams.
5. Find wide across every applicable baseline area before applying noise filters. Classify each candidate as confirmed defect, worthwhile improvement, intentional constraint, migration state, generated/vendor/framework requirement, or unresolved question.

Do not infer sound structure from a policy file, framework, directory name, clean import graph, barrel, interface, dependency-injection container, helper abstraction, test presence, longstanding layout, or majority convention. Verify the exact consumers, runtime wiring, ownership, lifecycle, and failure behavior. A declared boundary that shared state, events, build coupling, or operational procedures bypass is not an effective boundary.

Repository convention constrains a correction but does not prove the convention correct. Where dominant structure conflicts with behavior, ownership, enforceable boundaries, or a newer explicit architecture, surface the conflict instead of normalizing toward the majority. History and co-change are evidence, not ground truth: repeated joint changes may expose missing cohesion, but can also reflect cross-cutting work, generated output, or an active migration.

## Mandatory structure review baseline

This baseline is minimum and non-exhaustive. Expand it for the actual system and inspect interactions between areas.

### 1. System decomposition and ownership

- Alignment among domain capabilities, bounded contexts, modules, packages, services, deployables, data ownership, team ownership, and user-visible behavior.
- Cohesion of responsibilities that share invariants and change together; separation of concerns with distinct owners, rates of change, scaling, security, availability, or lifecycle needs.
- Ambiguous, duplicate, or orphaned ownership; responsibilities split across several homes or accumulated in catch-all modules.
- Cross-cutting capabilities placed where every consumer can depend on them without reversing ownership or granting a single domain control over peers.

### 2. Boundaries and public surfaces

- Explicit public contracts versus internals; exports, visibility, package manifests, entry points, friend APIs, facades, ports/adapters, and supported extension surfaces.
- Internal imports, deep imports, re-export chains, barrels, reflection, registries, plugin loading, generated accessors, shared database access, and other paths that bypass a claimed boundary.
- Public surfaces that expose implementation detail, duplicate authorities, create accidental compatibility promises, or grow without real external consumers.
- Boundary enforcement in source, build tooling, runtime policy, tests, and ownership review; gaps between documented, mechanically enforced, and actual access.

### 3. Dependency direction and cycles

- Intended layer and domain dependency direction across compile-time, runtime, schema, event, configuration, infrastructure, test, and deployment graphs.
- Cycles within and across packages, services, schemas, initialization, callbacks, events, and operational procedures; include hidden cycles through shared state or generated code.
- Higher-level policy depending on replaceable details, domain logic importing I/O or framework concerns, infrastructure owning business decisions, and peers reaching around public contracts.
- Cycle-breaking seams that place the shared concept with its true owner rather than creating a generic dumping ground or dependency-inversion ceremony without isolation.

### 4. Placement, grouping, and discoverability

- Grouping axis—feature, domain, layer, artifact type, deployable, platform, or a justified hybrid—and whether local placement matches how work is understood and owned.
- Misplaced, duplicated, stranded, or misleading files; one-off roles; generic `common`, `shared`, `utils`, `core`, or `misc` areas with no coherent ownership.
- Co-changing implementation, schemas, tests, fixtures, migrations, docs, and infrastructure separated in ways that amplify change or allow them to drift.
- Nesting and indirection that obscure ownership or navigation. Depth, file count, or module size is evidence only when tied to a structural consequence, never a defect by itself.

### 5. Module depth and responsibility allocation

- Whether module interfaces hide substantial complexity and expose stable concepts, or merely relay calls and spread one responsibility across shallow layers.
- Modules combining unrelated policies, state, integrations, or lifecycles so changes have broad blast radius; distinguish structural incohesion from size alone.
- Fragmentation into wrappers, managers, services, factories, and abstractions that do not isolate volatility or enforce an invariant.
- Missing seams around volatile integrations, platform differences, policy, persistence, side effects, or high-risk operations; misplaced seams that split one atomic invariant.

### 6. Data, schema, and state ownership

- Canonical ownership of entities, schemas, migrations, queries, caches, files, events, and derived views; unauthorized cross-module reads or writes.
- Shared database, shared tables, shared caches, global state, singleton registries, and configuration as hidden coupling across nominal boundaries.
- Transaction, consistency, idempotency, and lifecycle boundaries aligned with module/service boundaries; distributed splits that make an invariant impossible to maintain.
- Data contracts, replication, analytics, backfills, retention, deletion, and recovery paths that couple components beyond their declared architecture.

### 7. Runtime composition and lifecycle

- Composition roots, dependency injection, service discovery, plugin/extension registration, routing, workers, schedulers, event consumers, CLIs, and administrative paths.
- Initialization and shutdown order, resource ownership, background task supervision, cancellation, reload, reconnect, failover, recovery, and disaster modes across modules.
- Alternate entry points bypassing the main architecture or instantiating different dependency graphs and policy ownership.
- Dynamic loading, convention-scanned paths, code generation, reflection, and framework-managed placement. Confirm exact runtime mechanics before proposing a move.

### 8. Distribution, deployment, and evolution

- Source modules versus independent build, release, deployment, scaling, availability, security, latency, and failure boundaries.
- Build graph, package graph, container/image boundaries, infrastructure modules, environment separation, artifact ownership, and duplicated deployment configuration.
- Compatibility during migrations, staged rollouts, feature flags, mixed versions, rollback, data migration, deprecation, extraction, consolidation, and temporary bridge architecture.
- Distributed boundaries that create synchronous coupling, chatty calls, shared fate, split transactions, or coordinated releases without earning operational independence; monolith boundaries that prevent needed isolation.

### 9. Tests, tooling, and architecture enforcement

- Test placement and test boundaries reflecting real ownership without requiring broad fixtures, cross-module internals, or an all-knowing integration harness for local behavior.
- Boundary and cycle rules in import-linter, ESLint, dependency-cruiser, ArchUnit, build systems, package manifests, visibility modifiers, CODEOWNERS, or equivalent tools.
- Enforcement coverage across generated code, aliases, test code, scripts, jobs, migrations, infrastructure, and alternate languages or build targets.
- Architecture tests that validate actual forbidden dependencies and public surfaces without treating a passing rule set as proof that all structural coupling is modeled.

### 10. Specialized and emergent structure

- Architecture-wide failures that emerge only from component interaction: shared identity, policy, clock, schema, cache, queue, registry, storage, or control plane.
- Domain-specific boundaries for finance, healthcare, identity, real-time systems, safety-critical software, mobile/desktop, embedded/edge, data/ML pipelines, multi-tenant products, and AI agents. Derive additional probes from their invariants.
- Security, privacy, regulatory, availability, performance, and operational requirements that demand isolation or co-location beyond the repository's usual grouping.
- Current practice for the exact language, framework, build system, package manager, deployment model, and architecture style when behavior is version-sensitive. Prefer primary documentation and repository-pinned versions over generic ideals.

## Evidence and judgment

Apply the shared workflow's noise filter only after collecting candidates. Drop candidates proven to be required by an exact framework/runtime loader, generated or vendored ownership, external contract, supported platform difference, deliberate deployment boundary, or documented migration state. Size, nesting, novelty, dependency count, textual distance, or convention variance alone does not establish a structural finding.

Retain a confirmed structural defect only with:

- the violated ownership, cohesion, isolation, dependency-direction, lifecycle, or changeability invariant;
- the concrete files, components, dependency or runtime path, and affected consumers;
- the consequence under a realistic change, boundary case, lifecycle event, partial failure, rollout, or operational condition;
- the existing policy, public surface, abstraction, or enforcement and why it does not control that exact path;
- the smallest safe correction, including compatibility and migration implications, plus a verification method.

For a worthwhile improvement, show recurring material cost such as change amplification, unreliable ownership, accidental public API, coordinated release burden, unsafe navigation, or likely drift, and why correction outweighs migration risk. Keep ambiguous intent, disputed ownership, or insufficient runtime evidence as an unresolved question with the evidence needed to decide. Never inflate aesthetic preference, speculative future scale, or an imported architectural ideal into a defect.

Search for variants of every confirmed issue across all dependency forms, not only imports. Reconcile findings at component boundaries: moving a file does not fix misplaced ownership, and introducing an interface does not break coupling unless dependency and lifecycle control actually reverse.

Apply corrections in the direction supported by the system's intended invariants and repository evidence. Update all source, build, generated, test, tooling, documentation, runtime-discovery, and deployment references affected by a move. Where boundary policy exists, extend it when that safely prevents recurrence; do not encode a disputed architecture as enforcement.

<output_contract>
Auto-fix: behavior-preserving move/route/collapse with all references updated in one commit.
Tree-reshaping — re-grouping a directory, splitting or merging modules, changing the layer scheme — requires a before/after tree as evidence. Apply it under the shared auto-fix default when ownership and migration are established; escalate only a critical unresolved boundary decision.
</output_contract>

Preserve legitimate behavior and public compatibility. Treat ownership changes, public-surface changes, package/service extraction or consolidation, build or deployment boundary changes, schema/data ownership changes, migration or rollout requirements, and ambiguous boundaries as critical only when evidence cannot establish the intended target. Keep file moves and content edits in separate commits as required by the shared workflow.

## Completion gate

Use the shared completion ledger. Account for every material ownership boundary, dependency form, entry point, lifecycle, operational mode, and evolution path; topology uniformity is not completion.
