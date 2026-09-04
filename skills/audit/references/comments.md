# Comments

Run as the `comments` dimension, after behavior, structure, and naming edits.

Trace consequential claims to implementations, callers, specifications, generated output, and their audiences. Retain rationale and cross-boundary constraints that code and types cannot express; agreement with today's implementation does not make them redundant.

## Probes

1. **Architecture:** ownership, dependency direction, trust boundaries, consistency, intentional duplication, and constraints spanning files or repositories. Keep rejected alternatives only when they constrain future decisions; identify migration and compatibility exit conditions.
2. **Interfaces:** preconditions, errors, effects, idempotency, ordering, pagination, partial success, cancellation, timeouts, stability, and examples. Verify units, ranges, defaults, nullability, precision, encoding, identifiers, and version-specific references.
3. **Lifecycle and concurrency:** initialization, ownership, mutation, cleanup, transactions, cache invalidation, lock order, visibility, reentrancy, callbacks, retry/replay, and crash recovery. Check claims across alternate phases and asynchronous/platform paths.
4. **Domain meaning:** formulas, business rules, rounding, currency, coordinates, calendars, algorithm assumptions, numerical bounds, and safety/security rationale. Match terminology to authoritative schemas and specifications.
5. **Operations:** configuration precedence, environment assumptions, capacity, diagnostics, runbooks, fallback, restore, and platform quirks. TODO/FIXME notes need a concrete trigger or exit condition; follow local tracking conventions without promising scheduled work.
6. **Machine-consumed prose:** suppressions, doctests, structured tags, generation/build/test directives, annotations, and examples. Check exact syntax and diagnostic scope. Edit owned generators or templates rather than generated/vendor output.
7. **Accuracy and locality:** resolve named symbols, files, flags, issues, versions, links, and behavior. Consolidate copied explanations at a durable source of truth. Check absolute claims across their full scope; remove dead references and commented-out code.
8. **Signal:** delete syntax narration, boilerplate, redundant headings, and change history. Rewrite useful information buried in chronology, speculation, jargon, or excessive examples. Match abstraction level to location and audience.
9. **Missing constraints:** add prose only for consequential information audiences cannot reliably recover elsewhere. Prefer enforceable types, schemas, validation, or tests when they can carry the invariant; prose may still explain its rationale.
10. **Specialized surfaces:** inspect domain and tooling requirements, including bindings, notebooks, infrastructure, accessibility/localization notes, scientific records, and agent prompts. Check whether individually accurate comments jointly imply a false guarantee.

User-facing strings and log templates are outside prose cleanup unless requested. Owned comments describing those surfaces remain in scope.

## Judgment

Show the exact prose, contradicting or supporting source, affected audience, and consequence. Classify false or machine-breaking claims and consequential omissions as defects; accurate but bloated, duplicated, or misplaced prose as improvements; conflicting authority as unresolved. Deletion must preserve necessary constraints elsewhere. Verify affected doctests, links, documentation tooling, and rendered output.

## Changes and completion

Apply validated prose corrections under the shared auto-fix default. Changes to machine-consumed behavior, contracts, or legal/safety/security guarantees belong in the owning dimension. Escalate only when intended behavior cannot be established under the shared critical-decision rule.

Use the shared evidence and completion rules; account for every applicable numbered probe and material boundary, including domain-derived probes.
