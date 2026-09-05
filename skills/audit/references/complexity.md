# Complexity

Run as the `complexity` dimension. Reduce the effort to understand, change, operate, and remove the system while preserving behavior. LOC is a signal, not a target.

Map sources of truth, state, dependencies, variation, and lifecycle paths. Look first for scattered policy, duplicated state, and changes that require coordinated edits across boundaries.

## Probes

1. **Domain model:** conflated concepts, redundant flags/statuses, illegal combinations, and hidden alternate models in exceptional or legacy workflows. Could explicit operations or states remove ambiguity?
2. **Architecture:** pass-through layers, wrappers, registries, callbacks, cycles, broad fan-in/out, fragmented responsibilities, and duplicate orchestration. Judge cohesion and change locality rather than file size.
3. **Control and data flow:** nesting, boolean flags, implicit fallthrough, exception-driven normal flow, hook/middleware indirection, excessive transformations, sentinels, ambient mutation, and temporal coupling. Include retry/reorder/partial-failure combinations.
4. **Abstractions:** identify the invariant, policy, boundary, compression, or independent variation each interface/factory/plugin owns. Single implementation is not proof of waste. Consolidate repeated knowledge; allow duplication when cases change independently.
5. **State and lifecycle:** authoritative versus derived state, invalidation, initialization/teardown, task ownership, cancellation, locks, reentrancy, and state split across memory, storage, messages, and flags. Include recovery, migration, and mixed versions.
6. **Configuration:** mode combinations, contradictory or fixed knobs, aliases, precedence, distant effects, stale flags, rollback branches, and compatibility past its support window. Preserve real product and deployment variation.
7. **Interfaces and types:** wide APIs, optionality, overloads, weak types, string dispatch, sentinel returns, and repeated validation/conversion. Check dynamic and external consumers before contracting a surface.
8. **Failure paths:** wrapping, retry stacks, fallbacks, defensive copies, null handling, cleanup, and overlapping validation. Preserve domain context, cancellation, resource safety, observability, and intentionally different failure policy.
9. **Resource costs:** repeated passes/conversions, materialization, custom caches/indexes, batching, and algorithms. A local simplification must not introduce N+1 work, unbounded growth, contention, or downstream cost. Measure before removing a useful optimization.
10. **Dead and indirect code:** trace static consumers plus reflection, serialization names, generators, registries, DI, lazy/native bindings, configuration, external clients, jobs, and operational invocation. Delete proven dead code; zero static references alone proves nothing.
11. **Supporting machinery:** fixtures, mock internals, setup DSLs, build/CI matrices, scripts, release automation, and repair procedures. `tests` owns cutting test cases; complexity owns scaffolding. Check operational consumers before removing telemetry or safety machinery.
12. **Local expression:** clever type/metaprogramming, dense expressions, needless mutation/intermediates, ceremony, suppressions, and formatter fights. Preserve useful types, descriptions, errors, and comments; avoid exchanging lines for hidden coupling.
13. **Domain constraints:** account for mandated redundancy, auditability, determinism, certification, latency, availability, and compatibility in specialized systems. Inspect complexity created by interacting mechanisms.

## Judgment

For each simplification, identify the existing mechanism's legitimate role, the concrete comprehension/change/state/resource cost, and the behavior that must survive. Separate proven unnecessary complexity from improvements needing design tradeoffs and unresolved consumer evidence. Verify affected references and boundary behavior; inspect whether complexity disappeared or moved elsewhere. Report net change without a reduction quota.

## Changes and completion

Apply validated merges, abstraction collapses, internal API changes, dead-code removal, and scaffolding rewrites when consumers/contracts are accounted for. Capability removal or external contract changes are critical decisions only when evidence cannot establish the intended outcome.

Use the shared evidence and completion rules; account for every applicable numbered probe and material boundary, including domain-derived probes.
