# Tests

- Flag an important supported behavior whose plausible failure can escape the suite because no test exercises its actual boundary or observable result.
- Flag assertions that survive mutation (behavior removed, inverted, hard-coded, or short-circuited), including overly broad matchers and unreviewed snapshots.
- Flag tests coupled to internal calls or structure, e.g., interaction assertions on in-process collaborators, that break on harmless refactoring yet do not establish the required behavior.
- Flag test doubles or fixtures that bypass production wiring, replicate the implementation's mistake, or omit state and failure semantics the test needs.
- Flag consequential input boundaries, state sequences, concurrency, duplicate delivery, cancellation, or time behavior missing from tests of the relevant invariant. Where the input space is large, name the property (round-trip, idempotence, invariant preservation) a property-based test should state.
- Flag integration coverage that omits real authorization, routing, serialization, persistence, external adaptation, or supported version interactions.
- Flag migrations and restores tested only on a fresh schema or clean state, leaving supported historical records and partial progress unexercised.
- Flag failure tests that assert an error but ignore committed effects, leaked resources, duplicate work, diagnostics, or recovery.
- Flag flaky or order-dependent tests caused by shared state, uncontrolled time or randomness, sleeps, unawaited work, or failed cleanup.
- Flag skipped, focused, quarantined, or CI-excluded tests that silently remove meaningful protection for current behavior.
- Flag redundant or obsolete tests and elaborate fixtures whose maintenance burden adds no distinct contract, domain, boundary, or diagnostic value.
- Flag suite expectations that contradict established requirements or preserve retired behavior. A missing test alone is not evidence of a production defect.
