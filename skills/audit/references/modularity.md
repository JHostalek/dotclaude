# Modularity

Weigh coupling by strength, distance, and volatility together: strong coupling to a volatile component across a distant boundary (service, repository, team) costs most; the same strength inside one module is cohesion.

- Flag information leakage: one implementation decision encoded in separate modules, e.g., reader and writer each knowing a file format. Changing that decision should not require rediscovering every copy. Repeated co-change without a visible dependency is evidence of such a decision; tests, migrations, lockfiles, and generated files co-change legitimately.
- Flag temporal decomposition: modules split by execution phase when the phases share substantial knowledge. Separating reading, parsing, or writing is harmful when it duplicates format knowledge or forces callers to coordinate the phases.
- Flag conjoined methods or modules: understandable only by reading each other's implementations. The separation adds navigation and hides dependencies without providing independent abstractions.
- Flag extracted helpers whose callers must understand the helper's internal steps, or whose implementation needs detailed knowledge of the caller. Such an extraction creates no independently understandable subtask.
- Flag a complete operation split into public steps nearly every caller must invoke in order, passing intermediate state between them. The split imposes coordination the module could own.
- Flag unrelated mechanisms combined in one module when each has its own independent purpose and knowledge. A common container or broad category does not justify coupling their implementations.
- Flag a general-purpose mechanism containing policy specific to one of its uses, e.g., a text store knowing editor keybindings. Use-case changes should not require changing the underlying mechanism.
- Flag duplicated nontrivial code that embodies the same knowledge or policy and must change together. Tiny snippets, or look-alike code with independent meanings, do not alone justify a shared abstraction.
- Flag inheritance that shares implementation state or undocumented parent assumptions across subclasses, so changing one class requires knowing the hierarchy. Identify the leaked information rather than rejecting inheritance itself.
- Flag mutable globals or context objects that create nonobvious dependencies between otherwise separate modules or prevent independent application instances. A context should not become an unexplained grab bag of shared state.
- Flag competing ownership of decisions or data, including shared tables, caches, configuration, or events whose meaning and updates have no single owner.
- Flag internal access through imports, re-exports, reflection, generated code, scripts, or shared storage that bypasses a meaningful module boundary, including binding to another bounded context's internal model without a published contract when that model is volatile or carries a different meaning. Identify the knowledge or control leaked; an import's spelling alone is not a violation.
- Flag temporal and location coupling: a caller that must address the callee directly and invoke it synchronously, though the operation needs neither fixed placement nor immediacy. A queue or event earns its machinery only when decoupled timing or placement is an actual requirement.
- Flag dependency cycles that prevent independent initialization, testing, change, or release. Show the resulting coupling; a graph cycle is not automatically harmful.
- Flag domain policy coupled to replaceable infrastructure details when infrastructure changes propagate into otherwise independent business rules.
- Flag a service boundary that splits a coherent invariant or requires chatty coordination and lockstep releases without earning a necessary isolation, scaling, security, or ownership benefit.
- Flag resource or background-task lifecycle obligations scattered across entry points, callbacks, and hidden state without an accountable owner for initialization, cancellation, and teardown.
