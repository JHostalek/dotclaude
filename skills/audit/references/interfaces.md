# Interfaces

- Flag a common operation that forces callers to learn or configure rarely used features. Keep the common case simple while allowing exceptional uses to request additional behavior separately.
- Flag missing defaults that make callers repeatedly supply predictable values or explicitly enable behavior almost every caller needs. The module should provide that behavior when it has enough information.
- Flag configuration knobs that transfer decisions to users who cannot choose better values than the module can determine. Preserve settings for which callers actually possess necessary domain knowledge.
- Flag interfaces that expose internal storage or mutable representation and make callers depend on it. Returning a collection is a problem when it leaks a replaceable implementation or grants unintended control over internal state.
- Flag getters and setters that expose implementation variables instead of providing the operations callers need. Making a field private does not hide its representation when the public API reproduces it.
- Flag interfaces shaped around internal representation that force callers to perform the module's own work, such as splitting and joining stored lines to edit a range of text.
- Flag overly primitive operations that make multiple callers rebuild the same higher-level operation with loops, conversions, or coordination. A simple interface should still completely serve current needs.
- Flag values passed through several intermediate methods that never use them, making those interfaces depend on a concern owned elsewhere. Identify the resulting propagation of interface changes.
- Flag an abstraction that hides information callers need for correctness or required performance, such as durability, ownership, ordering, or tuning behavior. Necessary details must remain visible even when they complicate the interface.
- Flag complexity pushed into a lower module when it introduces knowledge unrelated to that module's purpose or fails to simplify its callers. Moving code downward only helps when it improves the overall abstraction.
