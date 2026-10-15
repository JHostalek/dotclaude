# Tests

- Flag an important supported behavior whose plausible failure can escape the suite because no test exercises its actual boundary or observable result.
- Flag assertions that pass when the behavior is removed, inverted, hard-coded, or short-circuited, including overly broad matchers and unreviewed snapshots.
- Flag tests coupled to internal calls or structure that fail on harmless refactoring while failing to establish the required behavior.
- Flag mocks or fixtures that bypass production wiring, repeat the implementation's mistake, or omit the state and failure semantics needed by the test.
- Flag consequential input boundaries, state sequences, concurrency, duplicate delivery, cancellation, or time behavior absent from tests of the relevant invariant.
- Flag integration coverage that omits actual authorization, routing, serialization, persistence, external adaptation, or supported version interactions.
- Flag migrations and restore tested only on a fresh schema or clean state while supported historical records and partial progress remain unexercised.
- Flag failure tests that assert an error but ignore committed effects, leaked resources, duplicate work, diagnostics, or recovery.
- Flag flaky or order-dependent tests caused by shared state, uncontrolled time or randomness, sleeps, unawaited work, or failed cleanup.
- Flag skipped, focused, quarantined, or CI-excluded tests that silently remove meaningful protection for current behavior.
- Flag redundant or obsolete tests and elaborate fixtures whose maintenance burden adds no distinct contract, domain, boundary, or diagnostic value.
- Flag suite expectations that contradict established requirements or preserve retired behavior. A missing test alone is not evidence that production code is defective.
