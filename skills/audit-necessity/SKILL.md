---
name: audit-necessity
description: Use when cutting code in a folder that doesn't earn its keep — whether a solution is over-engineered, where maintenance cost can be reduced, or where a feature should be removed entirely.
argument-hint: <path>
---

!`cat "${CLAUDE_SKILL_DIR}/../audit-workflow.md"`

Run as the `necessity` dimension. Ask: **which capabilities and mechanisms must exist to preserve the system's intended outcomes, and which impose more total cost and risk than the value they provide?** Necessity is not a small-code preference. Essential complex code stays; simple code that supports no legitimate outcome may go.

<coverage_invariant>
Every lens, example, candidate class, and baseline area in this skill is minimum and non-exhaustive. Add, combine, split, reweight, or skip probes according to the actual product, architecture, lifecycle, deployment, domain, and evidence. “Not listed” never means “out of scope.” Skip a baseline area only when it is demonstrably inapplicable and record why.
</coverage_invariant>

## Work top-down

Reconstruct the system before judging individual artifacts:

1. Identify intended user and operator outcomes, externally observable behavior, supported compatibility, service qualities, regulatory or contractual obligations, and current lifecycle stage. Map the capabilities that deliver them and the actors or integrations that depend on them.
2. Map each capability to its implementation and supporting burden across services, libraries, schemas, configuration, infrastructure, build/release paths, tests, documentation, telemetry, migrations, data, and operational procedures. Include indirect and asynchronous paths.
3. Derive necessity invariants: behavior and obligations that must survive; ownership and authority that must remain explicit; failure containment, recovery, security, performance, and operability properties the design must preserve; and costs the system should not carry without corresponding value.
4. Inspect architecture-wide duplication, obsolete paths, speculative seams, and expensive compositions before local helpers. Then trace candidates end to end, including consumers, runtime selection, fallback paths, deployment variants, stored data, rollback, and removal consequences.
5. Apply the mandatory baseline to every applicable component and boundary. Derive additional probes for the system's domain and maturity.

Do not infer necessity or dispensability from names, conventions, framework patterns, abstraction shape, call-count alone, test presence or absence, age, comments, feature flags, code coverage, or apparent simplicity. Verify the exact call paths and deployment context. Static unreachability is strong evidence only after accounting for reflection, registration, generated code, serialization, configuration, dependency injection, plugins, callbacks, jobs, external consumers, and operational or recovery use.

## Mandatory necessity review baseline

This is minimum coverage, not an exhaustive checklist. Apply every relevant area, expand it for the system, and inspect interactions between areas. Collect candidates widely before applying the judgment bar.

### 1. Outcomes, obligations, and capability map

- User, customer, operator, administrator, developer, partner, and machine-consumer outcomes actually supported.
- Public and internal contracts: APIs, events, files, schemas, CLIs, SDKs, extensions, workflows, data formats, service levels, privacy/security guarantees, accessibility, compliance, licensing, and support commitments.
- Critical service qualities and control functions whose value is indirect: safety, authorization, isolation, resilience, observability, auditability, recovery, migration, and incident response.
- Product maturity and lifecycle: experiment, active growth, stable platform, maintenance, deprecation, migration, or shutdown. The same flexibility can be speculative in one stage and essential in another.
- Capability-to-mechanism mapping across synchronous, asynchronous, scheduled, administrative, failure, rollback, and disaster-recovery paths.

### 2. Actual demand and reachability

- Production call paths, entry points, registrations, configuration selectors, tenants, editions, platforms, regions, environments, roles, and feature entitlements.
- Runtime and operational evidence: telemetry, traces, logs, support incidents, usage analytics, billing, resource use, deployments, runbooks, and operator testimony where available.
- External or unverifiable consumers, exported symbols, public endpoints, stored formats, webhooks, plugins, scripts, undocumented automation, and downstream repositories.
- Dormant but intentional paths such as rollback, restore, migration, break-glass, seasonal, regulatory, compatibility, and failure-only behavior.
- Dead, shadowed, unreachable, permanently disabled, unshipped, abandoned, or superseded behavior, including code left behind after migrations and experiments.

Absence of observed use is not proof of no value when observation is incomplete. Record the observation window and blind spots; classify unverifiable external usage for sign-off.

### 3. Capability portfolio and product surface

- Features that duplicate, overlap, contradict, or fragment another supported path; old and new flows that coexist without a justified transition need.
- Capabilities whose discovery, support, documentation, security, compatibility, or user-choice cost exceeds demonstrated benefit.
- Optionality that creates incoherent combinations, matrix testing, tenant divergence, or permanently incomplete experiences.
- Experiments, flags, variants, and beta paths with no decision owner, exit criterion, measurement, or removal date.
- Features retained only because implementation already exists. Sunk cost is not present value; removal cost and continuing obligations still count.

### 4. Architecture and indirection

- Layers, adapters, facades, wrappers, mediators, factories, registries, interfaces, plugin systems, event buses, workflow/rule engines, DSLs, and metaprogramming relative to real variability and control needs.
- Single-implementation seams, hypothetical providers, generalized frameworks built for one case, and extension points with no credible consumer.
- Distributed boundaries, services, queues, caches, replicas, synchronization, and ownership splits whose coordination cost is not justified by scaling, isolation, autonomy, or failure-containment needs.
- Indirection that hides authority, lifecycle, data flow, failure behavior, or performance cost without providing a stable boundary.
- Necessary architectural seams that protect domain invariants, testing boundaries, platform variation, security, replaceability, or team ownership even when they currently have one implementation.

Do not treat a single implementation, small call count, or framework-like appearance as sufficient evidence to cut. Verify why the seam exists and what would couple or become unsafe without it.

### 5. Duplication, parallel implementations, and consolidation

- Repeated mechanisms for the same concern across components, languages, versions, protocols, clients, deployment modes, or teams.
- Forks, vendored copies, compatibility shims, polyfills, alternate parsers, fallback implementations, and local reimplementations of platform behavior.
- Superficially duplicate code that encodes different invariants, trust boundaries, release cadence, failure isolation, performance constraints, or ownership.
- Consolidation that would create a high-fan-in dependency, common-mode failure, privilege expansion, deployment coupling, or an unstable shared abstraction.
- Opportunity to delete an entire mechanism or variant instead of merely deduplicating its internals.

### 6. Dependencies, platforms, and build surface

- Direct and transitive dependencies, plugins, services, managed products, models, datasets, toolchains, build steps, generators, and runtime components used for marginal capability.
- Native language, framework, operating-system, cloud, database, browser, or protocol facilities that can replace custom machinery without losing required semantics.
- Dependency cost beyond call-site LOC: supply-chain and licensing risk, updates, vulnerabilities, bundle/image size, startup, resource use, configuration, vendor lock-in, availability, observability, and operator knowledge.
- Custom replacement cost: ownership, correctness burden, edge cases, standards evolution, security response, tests, docs, and on-call load.
- Exact replacement fit. Name and verify a specific alternative, version, license, maintenance state, platform support, behavioral differences, migration path, and fallback. Partial coverage is a rewrite tradeoff, not a drop-in.

### 7. Data, state, compatibility, and lifecycle burden

- Schemas, stored records, migrations, indexes, caches, queues, event history, file formats, protocols, and identifiers maintained only for removed or low-value behavior.
- Read/write compatibility, old clients, rolling deploys, replay, restore, import/export, downgrade, rollback, retention, legal hold, and deletion obligations.
- Deprecated paths that still receive writes or traffic, compatibility layers with no exit plan, and migrations that never complete.
- State whose removal needs archival, transformation, reconciliation, notification, or staged deprecation rather than code deletion.
- Lifecycle hooks for creation, update, disablement, ownership transfer, offboarding, deletion, and recovery; a feature is not removable if its state becomes orphaned or irreversible.

### 8. Configuration, variants, and deployment matrix

- Flags, environment variables, modes, profiles, tenant overrides, regional variants, white-label branches, hardware/platform targets, and build-time switches.
- Invalid or untested combinations, precedence rules, stale defaults, hidden coupling, configuration that selects dead paths, and variants no deployed environment uses.
- Configuration retained for hypothetical flexibility versus real operational control, staged rollout, incident mitigation, compliance, or customer commitments.
- Old/new mixed-version behavior and deploy/rollback requirements that temporarily justify parallel paths.
- Simplifications that reduce the state space itself rather than only reorganizing configuration code.

### 9. Operational and organizational cost

- On-call alerts, dashboards, runbooks, support paths, manual reconciliation, deployment choreography, capacity, backups, restore testing, incident surface, and specialist knowledge required by a capability.
- Reliability and security controls whose routine usage is low because they prevent or contain rare high-consequence failures.
- Components that amplify failures, cardinality, latency, resource consumption, or incident blast radius through their interactions.
- Ownership gaps, bus factor, cross-team coordination, release coupling, and decision latency caused by a boundary or feature.
- Operational workarounds signaling that a nominal capability has negative value or that its implementation, rather than the capability, should be replaced.

### 10. Verification and support assets

- Tests, fixtures, mocks, harnesses, examples, docs, generated artifacts, dashboards, alerts, and tooling tied exclusively to a removable path.
- Tests that preserve obsolete implementation details or speculative extension points rather than required behavior.
- Apparently unused test or diagnostic assets that support certification, incident reproduction, compatibility, migration, load, security, or disaster recovery.
- Generated output versus its source of truth; remove or change the owning generator rather than editing artifacts in isolation.
- Documentation and examples that constitute public contracts or active onboarding paths even when the referenced code seems internally unused.

### 11. Simpler mechanisms and proportionality

- Whether the capability can be omitted, narrowed, composed from existing primitives, made static, moved to configuration, delegated to a platform, or implemented by a smaller local mechanism.
- Total-system size and complexity, not merely LOC moved behind a dependency, generated layer, service boundary, or configuration.
- Costs introduced by the simpler option: behavior differences, performance, security, reliability, debuggability, accessibility, compatibility, migration, dependency risk, and cognitive load at call sites.
- Proportionality between mechanism and demonstrated variability or consequence. A large mechanism for a tiny stable operation is a candidate; a small helper is rarely material unless multiplied across the architecture.
- Necessary code that could be modestly cleaner or shorter. That belongs to complexity/refactoring, not necessity.

### 12. Domain-specific and emergent necessity

Derive extra coverage where the domain changes the value of apparently idle or elaborate code. Examples include financial reconciliation, healthcare audit trails, safety interlocks, identity recovery, protocol negotiation, offline clients, multi-tenant isolation, regulated retention, internationalization, accessibility, real-time control, model evaluation, and AI-agent approval boundaries. These examples are explicitly non-exhaustive.

Rare use, apparent duplication, or domain-specific machinery may be essential because failure consequences are asymmetric. If domain knowledge or evidence is insufficient, retain it as an unresolved question for sign-off rather than treating unfamiliarity as proof of waste.

## Evidence and judgment

Find wide, then filter as required by the shared workflow. For each candidate, evaluate value against **total continuing and removal cost**, not code size alone. Value includes delivered outcomes, risk reduction, options with credible near-term demand, contractual obligations, and failure protection. Cost includes maintenance, comprehension, testing, operations, security exposure, dependencies, compatibility, data lifecycle, coordination, and migration.

Classify retained results as:

- **Confirmed cut** — evidence shows no required outcome is lost and removal or replacement has positive net value.
- **Worthwhile improvement** — the capability is justified, but a materially smaller mechanism can preserve its invariants. Keep separate from ordinary small refactors.
- **Unresolved question** — value, usage, domain obligation, or external dependency cannot be verified. State the decision owner and evidence needed; do not inflate it into a cut.
- **Keep** — evidence justifies the mechanism relative to realistic alternatives. Record important keeps where they close a serious candidate or explain an architectural cost.

For every confirmed cut or worthwhile improvement, establish:

- the outcome or cost invariant at issue;
- the exact capability-to-code and runtime path, including variants and external boundaries;
- concrete evidence of demand or non-demand and its limitations;
- continuing consequence of keeping it;
- existing rationale or control and why it no longer justifies the cost;
- smallest safe deletion or replacement;
- migration, compatibility, data, operational, dependency, and rollback cost;
- verification proving required behavior and invariants survive.

Reject a candidate only after verifying its value or an effective necessity on the exact path. Do not reject solely because a framework, abstraction, helper, test, comment, or familiar pattern suggests legitimacy. Conversely, do not retain a candidate merely because deletion is difficult, it is tested, or it follows a recognized architecture.

Estimate meaningful impact using total files, code, dependencies, states, configurations, tests, docs, operational surface, and cognitive boundaries removed. LOC may support the estimate but is never the argument by itself. Most healthy codebases will yield more justified keeps than cuts; an indiscriminate all-cut result signals missing context or an unperformed filter.

## Fix and completion gate

Apply **auto-fix** only when cost clearly exceeds value, no user-facing or externally callable capability is lost, and required behavior is preserved: proven dead code, unused internal abstraction, stale support assets, or an implementation materially larger than a verified simpler equivalent. Remove associated imports, configuration, tests, docs, generated sources, dependencies, and operational artifacts only when their ownership is proven and they have no other consumer.

Require **sign-off** for removing or changing an endpoint, tool, CLI command, public API, event, format, externally callable feature, stored state, compatibility promise, operator/recovery path, domain control, or any capability whose usage or value remains unclear. Include the estimated total cut, migration and rollback plan, affected consumers, evidence gaps, and the specific decision required.

Preserve legitimate behavior and the shared auto-fix/sign-off boundary. A safe reduction must test important allowed behavior, failure and recovery paths, deployment variants, and the absence of the removed path. Search for variants and stranded artifacts after every confirmed removal.

Before sign-off, produce a completion ledger for every numbered baseline area and every newly derived lens:

- `reviewed`: components, boundaries, evidence, candidates, findings, keeps, and variants checked;
- `not applicable`: evidence showing why the area cannot occur in scope;
- `deferred`: exact blocker, decision owner or needed evidence, and residual cost or removal risk.

Completion requires every baseline area and material architecture boundary to be accounted for. Report scope and evidence limits; never claim that all remaining code is necessary merely because no safe cuts were confirmed.
