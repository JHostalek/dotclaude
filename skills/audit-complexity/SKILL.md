---
name: audit-complexity
description: Use when the goal is to reduce code size, remove unnecessary complexity, or simplify a module without removing user-facing behavior.
---

!`cat "${CLAUDE_SKILL_DIR}/../shared/audit-workflow.md"`

Run as the `complexity` dimension. Reduce the effort and risk required to understand, change, operate, and remove the scoped system while preserving its legitimate behavior. Net LOC reduction is useful evidence, not the objective: a smaller diff can still make state, coupling, or failure behavior harder to reason about.

## Work top-down

Reconstruct what the system must do before deciding what is unnecessary:

1. Identify intended behavior, users and callers, domain invariants, public and internal contracts, trust and ownership boundaries, state transitions, lifecycle paths, operational constraints, and failure consequences from code, configuration, schemas, manifests, tests, docs, and history.
2. Map the architecture and change surface: components, dependencies, data/control flow, sources of truth, extension mechanisms, generated or reflective behavior, concurrency, deployment modes, and where one concept is represented or decided more than once.
3. Find architecture-wide complexity first: unclear ownership, scattered policy, duplicated state, cyclic or long dependency paths, leaky layers, mode interactions, and special cases whose combined behavior cannot be predicted locally. Then trace representative end-to-end paths, including failure, retry, startup, shutdown, migration, rollback, and compatibility paths when relevant.
4. Apply the baseline to every applicable component and boundary. Derive extra probes for the actual domain rather than forcing the system into the named examples.

Do not infer simplicity or necessity from a framework, familiar pattern, abstraction name, helper, test presence, static reference count, file size, or superficially concise construct. Verify the exact call path, runtime registration, configuration, lifecycle, and consequence. Conversely, do not remove an abstraction merely because it has one implementation: it may encode a real boundary, policy, substitution seam, generated contract, or ownership constraint.

## Mandatory complexity baseline

This is minimum coverage, not an exhaustive checklist. Inspect interactions between areas; complexity often emerges from individually reasonable pieces.

### 1. Behavioral and domain model

- Is the system's purpose, vocabulary, invariants, authority, and state machine apparent in its structure, or reconstructed through scattered conditionals and conventions?
- Are independent concepts conflated, or is one concept represented by multiple flags, types, fields, caches, or status values that can disagree?
- Do exceptional workflows, legacy modes, tenant/product variants, partial states, and recovery paths create hidden alternate models?
- Could a smaller set of explicit domain operations or states remove illegal combinations without obscuring required detail?

### 2. Architecture, ownership, and dependency shape

- Module and service responsibilities, sources of truth, boundary placement, layer direction, dependency cycles, fan-in/fan-out, shared mutable infrastructure, and changes that require coordinated edits across distant components.
- Pass-through layers, indirection chains, wrappers that merely rename operations, service locators, global registries, callback webs, and abstractions whose cost exceeds the concrete variance or policy they own.
- God modules and over-fragmentation alike. File size or count is only a signal; judge cohesion, ownership, navigation cost, change locality, and deployment/runtime boundaries.
- Duplicate orchestration or policy across synchronous/asynchronous, API/job, old/new, client/server, region, or provider paths.

### 3. Control flow and data flow

- Deep nesting, boolean blindness, flag arguments, early/late exits, callback or promise chains, exception-driven normal flow, implicit fallthrough, and control split across decorators, middleware, hooks, interceptors, events, or retries.
- Data transformed through excessive shapes, mapping layers, serialization cycles, aliases, sentinels, nullable states, or temporal coupling before use.
- Hidden effects and action at a distance through globals, ambient context, mutation, observers, caches, lazy loading, import-time behavior, or order-dependent registration.
- Distributed flows whose retries, duplicates, reordering, stale reads, partial failure, compensation, and eventual consistency multiply the state space.

### 4. Abstractions and generality

- Interfaces, protocols, base classes, factories, adapters, service layers, repositories, builders, strategy objects, generic type machinery, plugins, hooks, and configuration-driven dispatch.
- For each abstraction, identify the concrete compression, invariant, policy, boundary, or independently varying implementations it earns. Count call sites and implementations, but do not treat counts as proof.
- Premature variability, speculative extension points, generic code harder than its use cases, one-off utilities, and wrappers that expose nearly the full underlying API.
- Missing abstraction where repeated knowledge or policy—not merely repeated syntax—causes drift. Duplication can be simpler than a forced shared abstraction when cases change for different reasons.

### 5. State, concurrency, and lifecycle

- Number and ownership of mutable states; derived versus authoritative state; cache invalidation; initialization order; teardown; cancellation; resource ownership; and object validity over time.
- Locks, atomics, queues, actors, async tasks, callbacks, thread-local or request-local context, races, reentrancy, and coordination protocols that readers must simulate mentally.
- Startup, warm-up, reconnect, retry, backoff, timeout, shutdown, failover, restore, migration, rollback, and mixed-version behavior.
- State encoded across storage, memory, messages, feature flags, and external systems, including cleanup and repair paths.

### 6. Variability and configuration

- Flags, environment variables, config objects, dependency injection graphs, build tags, compile-time options, tenant settings, provider adapters, and runtime feature negotiation.
- Cartesian products of modes; contradictory, unused, permanently fixed, or aliased knobs; precedence and fallback rules; configuration that changes semantics far from its declaration.
- Feature-flag lifecycle, staged rollout, rollback, stale branches, and compatibility logic that outlived supported versions.
- Whether variability belongs in data, a domain policy, separate deployments, or nowhere. Preserve real deployment and product constraints.

### 7. Interfaces, types, schemas, and boundaries

- Public APIs, internal APIs, events, database schemas, generated clients, CLI contracts, file formats, and extension points whose breadth, optionality, overloads, or versioning burden creates many valid-looking but unsupported combinations.
- Weak types, primitive obsession, stringly typed dispatch, wide parameter objects, ambiguous return values, sentinel values, and error/result types that force callers to rediscover invariants.
- Conversion and validation repeated at multiple boundaries, or hidden inside helpers with context-dependent semantics.
- Compatibility aliases, deprecated surfaces, and migrations. Verify external and dynamic consumers before contraction.

### 8. Failure and defensive paths

- Exception wrapping, translation layers, retry stacks, fallback chains, duplicated validation, defensive copies, null handling, cleanup, and recovery branches.
- Retain controls that enforce a boundary, preserve domain context, make failure observable, or guarantee cleanup. A framework or upstream validator is not proof that a local invariant holds on the exact path.
- Look for overlapping controls with subtly different semantics, swallowed distinctions, fallback behavior that doubles the reachable state space, and error handling more complex than the operation.
- Simplification must not erase useful context, observability, cancellation, resource safety, or deliberately different failure policy.

### 9. Algorithms, data structures, and resource behavior

- Accidental multi-pass pipelines, repeated parsing or conversion, unnecessary materialization, recursive formulations, hand-built caches, complex indexing, batching, pagination, and custom algorithms.
- Complexity displaced into performance or operations: a locally simple implementation may create unbounded work, N+1 interactions, load spikes, memory growth, contention, or downstream cost.
- Optimizations and caches whose proven benefit no longer justifies invalidation, concurrency, and operational burden. Verify with representative evidence before removing them.
- Library or platform facilities that safely replace custom machinery, and dependencies whose API or lifecycle cost exceeds their value.

### 10. Dead, generated, reflective, and compatibility code

- Unreachable branches, unused exports, stale feature paths, obsolete adapters, redundant generated artifacts, abandoned migrations, and dependencies or configuration with no live consumer.
- Search the whole repository and relevant build/deployment metadata for static callers, tests, imports, entry points, templates, reflection, serialization names, code generation, plugin registries, framework discovery, dynamic loading, external consumers, and operational invocation.
- Zero static references is a candidate, never proof. Decorated routes, models, commands, jobs, dependency-injection bindings, lazy imports, native bindings, and convention-discovered symbols can be live.
- Delete confirmed dead code rather than commenting it out or preserving speculative flexibility. Preserve required compatibility until consumer and lifecycle evidence supports removal.

### 11. Tests, tooling, build, and operations

- Test scaffolding, fixtures, mocks, harnesses, helpers, generated setup, build scripts, CI matrices, local-dev layers, release automation, and operational runbooks whose maintenance burden exceeds the behavior they protect.
- Test doubles that recreate production internals, setup DSLs harder than direct setup, and helpers whose many options hide what a test establishes. Cutting test cases belongs to `audit-tests`; complexity owns their surrounding machinery.
- Build-time/runtime duplication, generated/checked-in source drift, environment-specific scripts, deployment steps, and manual repair procedures.
- Observability plumbing, diagnostics, and safety controls may look repetitive but encode operational contracts; verify actual consumers and incidents before changing them.

### 12. Local expression and language use

- Dense expressions, clever metaprogramming, macro/type-level machinery, excessive intermediates, needless mutation, verbose ceremony, stale suppressions, redundant comments, and formatting-hostile constructs.
- Prefer the clearest idiom supported by the repository and toolchain. Fewer lines are not simpler when they increase hidden coupling, cognitive load, or debugging difficulty.
- Type annotations, domain error messages, schema descriptions, logs, and comments are neither categorically sacred nor disposable; retain them when they preserve a contract, boundary, context, or operational signal.
- Do not fight the formatter or break encapsulation for a cosmetic diff. Small local reductions must justify their readability and churn cost.

### 13. Specialized and emergent complexity

Derive additional coverage for specialized systems such as compilers, protocol implementations, financial ledgers, authorization engines, distributed storage, real-time collaboration, UI state machines, embedded/safety-critical code, data/ML pipelines, and AI agents. These examples are explicitly non-exhaustive. Account for domain-mandated redundancy, auditability, determinism, certification, latency, availability, and backward compatibility before labeling structure unnecessary.

## Evidence and judgment

Find wide, then filter as required by the shared workflow. For each retained finding, establish:

- the violated simplicity or maintainability invariant;
- the concrete execution, dependency, state, or change path;
- the consequence: comprehension burden, change amplification, illegal states, drift, defect risk, operational burden, or resource cost;
- the existing abstraction or control, what legitimate purpose it serves, and why it fails to justify the current complexity;
- the smallest safe correction and behavior that must remain;
- a verification method covering both the simplified path and important boundary behavior.

Use repository-wide reference searches, history, runtime metadata, focused tests, static analysis, dependency graphs, traces, or measurements as appropriate. Metrics such as LOC, cyclomatic/cognitive complexity, dependency counts, churn, and coverage are candidate signals, never verdicts or quotas. Do not set a target percentage reduction.

Classify retained candidates as:

- **confirmed unnecessary complexity** — evidence supports a behavior-preserving simplification;
- **worthwhile improvement** — complexity is real, but the correction has material design or migration tradeoffs;
- **unresolved question** — missing runtime, consumer, domain, or lifecycle evidence prevents a finding.

Do not inflate stylistic preference or speculative future cost into a finding. Reject a candidate only after checking the exact path and legitimate constraint; test presence, pattern familiarity, or “already working” does not settle the judgment.

## Fix and completion gate

Apply validated simplifications under the shared auto-fix default, including file merges, abstraction collapses, internal API changes, dead-code removal, and test-scaffolding rewrites when consumers and contracts are accounted for. Treat capability removal or externally consumed contract change as a critical decision only when evidence cannot establish the intended outcome. Preserve legitimate logging, types, descriptions, domain-rich errors, business-rule tests, framework registrations, compatibility, and operational safeguards when they earn their role.

After each simplification, search for all affected references and variants, run the narrowest meaningful checks plus the repository gate, and inspect whether complexity moved rather than disappeared. Use `git diff --stat` as a result signal; review the semantic diff and affected paths as the proof.

Use the shared completion ledger. Verify that complexity was removed rather than displaced, and report net change without claiming the system is universally simple.
