# Complexity

- Flag change amplification: one design decision, duplicated or with scattered consequences, needs coordinated edits in many places. Name the decision and the places that must stay in sync.
- Flag unknown unknowns: code a change affects that the interface, names, and nearby docs do not reveal. Hidden dependencies make apparently local changes unsafe.
- Flag cognitive load: a routine operation first requires accumulating unrelated implementation details. Name the information burden; line count is not the measure.
- Flag tactical patches: features or fixes layering exceptions and parallel paths around an abstraction whose design no longer fits. Show the resulting special cases or dependencies.
- Flag obscurity: dense expressions, implicit side effects, or indirect control flow that need substantial reconstruction. The defect is missing or obscured information, not a language feature alone.
- Flag generic pairs, tuples, or containers whose unnamed or generically named elements hide distinct domain meanings at use sites. Use named fields where position alone is unclear.
- Flag declarations or ordinary-looking calls that hide behavior readers must know, e.g., starting background threads or relying on a concrete collection's performance or concurrency properties.
- Flag complexity pushed outward: code made locally shorter or simpler by moving repeated work, obligations, or knowledge into callers, dependencies, or operations. Judge the whole operation, including consumers and maintainers.
- Flag source-of-truth and derived state stored separately with unclear sync or invalidation rules, so readers must reconstruct valid combinations. Derived state is fine when its invariant and benefit are clear.
- Flag interfaces that lack referential transparency: the same inputs give different results, so every caller inherits hidden state. Confine required state behind a pure boundary, or return values instead of live references.
- Flag shared mutable state where an immutable value would serve: aliasing conflates identity, value, and time, so readers must track every writer. Shared mutation the domain requires needs a single explicit owner.
- Flag flags, statuses, or alternate models that make illegal domain states representable and need scattered reconciliation, where a representation could make them unrepresentable.
- Flag configuration aliases, precedence rules, modes, or rollout branches that obscure which behavior is selected or multiply combinations without a supported need.
