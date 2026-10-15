# Modularity

- Flag the same implementation decision encoded in separate modules, such as readers and writers independently knowing a file format. A change to that decision should not require rediscovering every copy.
- Flag modules split by execution phase when those phases share substantial knowledge. Separating reading, parsing, or writing is harmful when it duplicates format knowledge or forces callers to coordinate the phases.
- Flag methods or modules that can only be understood by reading each other's implementations. Physical separation adds navigation and hides dependencies without providing independent abstractions.
- Flag extracted helpers whose callers must understand the helper's internal steps, or whose implementation depends on detailed knowledge of the caller. The extraction has not created an independently understandable subtask.
- Flag a complete operation split into public steps that nearly every caller must invoke in order while passing intermediate state between them. The split imposes coordination that the module could own.
- Flag unrelated mechanisms combined in one module when each has its own independent purpose and knowledge. A common container or broad category does not justify coupling their implementations.
- Flag a general-purpose mechanism containing policy specific to one of its uses, such as a text store knowing editor keybindings. Changes to the use case should not require changing the underlying mechanism.
- Flag repeated nontrivial code that embodies the same knowledge or policy and must change together. Tiny snippets or similar-looking code with independent meanings do not justify a shared abstraction by themselves.
- Flag inheritance that shares implementation state or undocumented parent assumptions across subclasses, requiring knowledge of the hierarchy to change one class. Identify the leaked information rather than rejecting inheritance itself.
- Flag mutable globals or context objects that create nonobvious dependencies between otherwise separate modules or prevent independent application instances. A context should not become an unexplained collection of shared state.
- Flag competing ownership of decisions or data, including shared tables, caches, configuration, or events whose meaning and updates have no clear authority.
- Flag internal access through imports, re-exports, reflection, generated code, scripts, or shared storage that bypasses a meaningful module boundary. Identify the knowledge or control leaked; an import's spelling alone is not a violation.
- Flag dependency cycles that prevent independent initialization, testing, change, or release. Show the resulting coupling rather than treating every graph cycle as automatically harmful.
- Flag domain policy coupled to replaceable infrastructure details when infrastructure changes propagate into otherwise independent business rules.
- Flag a service boundary that splits a coherent invariant or requires chatty coordination and simultaneous releases without earning a necessary isolation, scaling, security, or ownership benefit.
- Flag resource or background-task lifecycle obligations scattered across entry points, callbacks, and hidden state without an accountable owner for initialization, cancellation, and teardown.
