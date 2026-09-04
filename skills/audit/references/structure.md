# Structure

Run as the `structure` dimension. Map ownership and what must change together or remain isolated to files, modules, packages, services, data, builds, and deployables.

Trace dependencies beyond imports: runtime discovery/DI, generated links, events, shared storage/configuration, deployment, and operations. Establish intended boundaries from policy, contracts, enforcement, framework rules, ownership, and maintained practice. Co-change and majority layout are supporting evidence, not authority.

## Probes

1. **Decomposition:** capabilities/contexts/modules/deployables and team/data ownership, cohesion of shared invariants, differing lifecycle/security/scaling needs, orphaned or duplicated responsibility, and cross-cutting code owned by an appropriate dependency.
2. **Surfaces:** public exports/manifests/extensions versus internals, deep imports/re-exports/barrels/reflection/registries/shared stores bypassing boundaries, accidental compatibility promises, and documented versus enforced access.
3. **Direction/cycles:** compile/runtime/schema/event/config/test/deployment graphs, initialization and operational cycles, policy depending on replaceable I/O details, infrastructure owning domain decisions, and cycle fixes that assign the shared concept to its real owner.
4. **Placement:** grouping by feature/domain/layer/type/deployable/platform, stranded files and incoherent common/utils areas, co-changing schemas/tests/migrations/docs far apart, and navigation costs. Size, depth, and file counts need a concrete consequence.
5. **Module depth:** stable interfaces hiding complexity, unrelated policies/state/lifecycles in one module, shallow wrappers spreading responsibility, missing volatile/high-risk seams, and seams splitting an atomic invariant.
6. **Data/state:** canonical schema/query/cache/event ownership, cross-module access, globals/shared tables/config as hidden coupling, alignment with transactions/consistency/idempotency, and analytics/backfill/retention/restore dependencies.
7. **Composition/lifecycle:** roots, DI/discovery/plugins/routes/workers/CLI, init/shutdown/task/resource ownership, cancellation/reload/failover/recovery, alternate dependency graphs, and framework-scanned/generated placement before moving files.
8. **Distribution/evolution:** independent build/release/security/availability boundaries, artifact/infrastructure ownership, staged extraction/consolidation/mixed-version rollback, and chatty distributed splits that require coordinated releases without earning isolation.
9. **Tests/enforcement:** ownership-aligned fixtures/test boundaries, import/cycle/visibility/build/CODEOWNERS rules, gaps for aliases/generation/scripts/migrations/other languages, and tests that model actual forbidden access rather than only a clean import graph.
10. **Domain/composition:** shared identity/schema/cache/queue/control-plane dependencies, mandated privacy/safety/availability co-location or isolation, and exact-stack primary documentation rather than imported architecture ideals.

## Judgment

A defect needs a violated ownership/cohesion/isolation/dependency/lifecycle invariant and concrete consumers. Improvements need recurring change, navigation, release, or drift cost exceeding migration risk. Respect loader/generated/vendor/public/platform constraints and active migrations. Moving a file alone does not fix ownership; an interface only breaks coupling if control reverses.

Update source, build, generated, test, tooling, documentation, discovery, and deployment references together. Extend established boundary enforcement when appropriate; do not enforce disputed architecture. Keep moves and content edits in separate commits under the shared workflow.

## Changes and completion

Apply validated moves/routes/collapses with all references updated together; when commits are authorized, keep the move atomic. Regrouping directories, splitting/merging modules, or changing layers requires a before/after tree; proceed when ownership/migration are established. Ownership/public-surface, package/service, build/deployment, schema/data, migration/rollout, or boundary choices are critical only when evidence cannot establish the target.

Use the shared evidence and completion rules; account for every applicable numbered probe and material boundary, including domain-derived probes.
