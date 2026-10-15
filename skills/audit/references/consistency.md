# Consistency

- Flag equivalent concepts or operations under different terminology, interfaces, or conventions without meaningful reason. Readers should reuse what they learned elsewhere in the system.
- Flag look-alike interfaces or equivalent API, worker, CLI, admin, or recovery paths that silently differ in identity, tenancy, normalization, transaction, cache, cancellation, or failure guarantees. Establish the required behavior before copying the majority implementation.
- Flag local reinvention of an established convention: another way to do the same task without substantial benefit or changed requirement.
- Flag partial migration to a replacement convention that leaves developers guessing which meaning or approach applies. An intentional transition needs a discoverable old/new boundary.
- Flag false consistency: distinct concepts forced into one name, abstraction, or design pattern for uniformity. Similar appearance must imply similar meaning.
- Flag shared invariants or local conventions that code relies on but does not make discoverable, so each developer infers the rule alone.
- Flag supported build, test, or deployment variants whose divergent conventions omit required behavior or checks in one environment.
