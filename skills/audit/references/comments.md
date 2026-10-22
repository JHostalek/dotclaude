# Comments

- Flag missing class or module docs that leave the abstraction, an instance's purpose, or key usage limits unclear to a new reader.
- Flag method docs a caller cannot use without reading the implementation: missing preconditions, results, side effects, or failures.
- Flag undocumented units, inclusive/exclusive bounds, null/absent meanings, resource ownership, or invariants the declaration leaves unclear.
- Flag comments that repeat the code: translate nearby syntax or restate the name, adding no meaning, precision, intent, or rationale.
- Flag interface docs leaking implementation details callers do not need: internal algorithms, storage choices, private configuration. Keep those with the implementation unless they affect use.
- Flag comments that describe how a value is manipulated but not what it represents, so readers must reconstruct meaning from assignments.
- Flag substantial or tricky code whose docs narrate steps but omit the overall goal or why the steps are needed.
- Flag nonobvious constraints, workarounds, or design decisions whose rationale lives only in a commit message or the author's memory. At the affected code, state active obligations and when to revisit temporary workarounds.
- Flag cross-module dependencies with no discoverable explanation of which pieces must stay coordinated. Document shared decisions centrally; relevant code points there.
- Flag one decision documented in several modules where copies can drift. Prefer references to a single source of truth.
- Flag stale or contradictory comments, examples, or operational instructions, including claims about guarantees, formulas, units, configuration, fallback, or restore that disagree with the implementation or authoritative spec.
- Flag detailed explanations so far from their code that changes will likely miss them.
- Flag event handlers or unusual lifecycle behavior whose invocation conditions, execution context, or continuation are not apparent from names and docs.
- Flag links, named symbols, flags, or version references that point to missing or incompatible information needed to understand the code.
- Flag generated docs fixed only in output while their owned source still reproduces the error.
- Flag commented-out code or obsolete change history that misleads maintainers about active behavior or available entry points.
