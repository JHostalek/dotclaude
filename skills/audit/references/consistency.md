# Consistency

- Flag equivalent concepts or operations expressed through different terminology, interfaces, or conventions without a meaningful reason. Readers should be able to reuse what they learned elsewhere in the system.
- Flag familiar-looking interfaces or equivalent API, worker, CLI, admin, or recovery paths that silently provide different identity, tenancy, normalization, transaction, cache, cancellation, or failure guarantees. Establish the required behavior before copying the majority implementation.
- Flag local reinventions of an established convention that create another way to perform the same task without a substantial benefit or changed requirement.
- Flag partial adoption of a replacement convention that leaves developers guessing which meaning or approach applies. An intentional transition needs a discoverable boundary between old and new behavior.
- Flag distinct concepts forced into the same name, abstraction, or design pattern for uniformity. Consistency is useful only when similar appearance implies similar meaning.
- Flag shared invariants or localized conventions that code relies on but does not make discoverable, leaving each developer to infer the rule independently.
- Flag supported build, test, or deployment variants whose divergent conventions omit required behavior or checks in one environment.
