# Interfaces

- Flag a common operation that forces callers to learn or configure rarely used features. Keep the common case simple; let exceptional uses request extra behavior separately.
- Flag missing defaults that make callers repeatedly supply predictable values or opt into behavior nearly every caller needs, when the module has enough information to provide it.
- Flag configuration parameters that push decisions to users who cannot choose better values than the module can determine. Keep settings where callers actually hold the necessary domain knowledge.
- Flag representation exposure: internal storage or mutable representation that callers then depend on. A returned collection is a problem when it leaks a replaceable implementation or grants unintended control over internal state.
- Flag getters and setters that expose implementation variables instead of the operations callers need. A private field still leaks its representation when the public API reproduces it.
- Flag interfaces shaped around internal representation that make callers do the module's own work, e.g., splitting and joining stored lines to edit a text range.
- Flag overly primitive operations that make multiple callers rebuild the same higher-level operation with loops, conversions, or coordination. A simple interface must still fully serve current needs.
- Flag pass-through variables: values threaded through intermediate methods that never use them, coupling those interfaces to a concern owned elsewhere. Identify the resulting interface changes that propagate.
- Flag false abstractions: hiding information callers need for correctness or required performance, such as durability, ownership, ordering, or tuning behavior. Necessary details must stay visible even when they complicate the interface.
- Flag over-specified abstractions: contracts that fix the how (evaluation order, synchronous completion, storage layout) when callers need only the what. Each such commitment constrains every implementation and serves no caller.
- Flag complexity pushed into a lower module when it brings knowledge unrelated to that module's purpose or does not simplify its callers. Moving code downward helps only when it improves the overall abstraction.
