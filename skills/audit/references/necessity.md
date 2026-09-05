# Necessity

Run as the `necessity` dimension. Compare delivered outcomes and risk reduction with total continuing and removal cost.

Map capabilities to callers, implementation, data, configuration, dependencies, supporting tests/docs, and operational work. Include failure-only, rollback, seasonal, compatibility, and disaster-recovery paths. Check real runtime selection and indirect/external consumers before calling anything unused.

## Probes

1. **Outcomes/obligations:** user/operator/machine needs, public contracts, service qualities, accessibility, licensing, safety/privacy, recovery, and lifecycle stage. Tie each mechanism to a supported capability.
2. **Demand/reachability:** registrations, selectors, tenants/editions/platforms, telemetry/usage/deployments, public exports, undocumented automation, and dormant recovery paths. Record observation windows and blind spots; absent observed use is not proof of no value.
3. **Product surface:** duplicate or conflicting flows, choice/support/security cost, incoherent option combinations, abandoned experiments/flags, and absent decision owners or exit criteria. Existing implementation is sunk cost; removal obligations still count.
4. **Architecture:** layers, wrappers, registries, interfaces, engines/DSLs, services/queues/caches, and hypothetical providers versus real variation, ownership, testing, isolation, scaling, and failure-containment needs. One implementation or low call count alone does not invalidate a seam.
5. **Duplication:** alternate clients/versions/providers, forks/polyfills/shims, and parallel mechanisms. Preserve differences in invariants, release cadence, trust, latency, or failure isolation; consolidation may add shared failure or deployment coupling.
6. **Dependencies/platforms:** transitive/toolchain/service/model/dataset cost, supply chain, licensing, updates, size, startup, operations, and lock-in versus custom ownership. Verify a named replacement's version, license, support, semantic gaps, migration, and fallback before calling it equivalent.
7. **Data/lifecycle:** schemas, queues, formats, history, identifiers, and compatibility retained for retired features; old clients, replay/restore, downgrade, legal hold, deletion, migration completeness, and orphaned state after removal.
8. **Configuration:** flags, overrides, regional/platform/build variants, unused or invalid combinations, precedence, incident controls, commitments, and temporary mixed-version paths. Prefer reducing the state space over merely rearranging it.
9. **Operations/ownership:** on-call, runbooks, backups, capacity, manual reconciliation, specialist knowledge, coordinated releases, and blast radius. Rare safety/recovery controls may carry high value; workarounds may indict the mechanism rather than the capability.
10. **Support assets:** tests, fixtures, examples, docs, dashboards, generators, and tools belonging only to removable paths. Check certification, incident, migration, and public onboarding use; modify owned generation sources together.
11. **Simpler alternatives:** omit/narrow/static/config/platform/local implementations, counting complexity moved into dependencies or operations. Include behavior, security, latency, compatibility, migration, and call-site costs. Small refactors belong to `complexity`.
12. **Domain/composition:** account for apparently idle reconciliation, audit trails, safety interlocks, recovery, offline/legacy clients, isolation, accessibility, and agent approval controls. Unknown domain value remains unresolved rather than a cut.

## Judgment

Classify evidence-backed positive-value removals as confirmed cuts; justified capabilities with materially cheaper mechanisms as improvements; missing usage/value evidence as questions; and consequential rejected candidates as keeps. Include continuing cost, removal/migration/rollback cost, consumer reach, and verification that required outcomes survive. LOC alone is insufficient; no cut quota.

## Changes and completion

Apply validated cuts and remove associated assets only after proving ownership and no other consumer; preserve required outcomes. Public capabilities, stored state, compatibility, operator/recovery paths, and domain controls are critical only when usage, value, migration, or rollback remains materially unclear. For escalation, state total cut, affected consumers, gaps, recommendation, and exact decision.

Verify retained allowed/failure/recovery behavior and deployment variants; search for stranded artifacts and variants of removed paths.

Use the shared evidence and completion rules; account for every applicable numbered probe and material boundary, including domain-derived probes.
