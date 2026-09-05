# Tests

Run as the `tests` dimension. Map critical behavior and failure risks to the cheapest test level capable of detecting their violation with realistic collaborators.

Evaluate the suite's fault sensitivity, production-path realism, isolation, and diagnosis. Preserve unique contracts and domain knowledge; reduce weak or redundant maintenance burden rather than targeting coverage or a test-layer ratio.

## Probes

1. **Risk allocation:** domain/security/data/state/compatibility/recovery promises, consequence/exposure/change/incident weighting, explicit layer ownership and justified overlap, and contradictory or obsolete expectations.
2. **Oracles:** observable outcomes/state/effects, tests surviving removed/inverted/hard-coded/short-circuited code, weak tolerances/matchers, missing negative assertions, unawaited failures, and unreviewed snapshots. Use deliberate faults/mutation to establish consequential tests' sensitivity.
3. **State space:** boundaries/extremes/encoding/time/precision, state-machine sequences, retry/cancel/rollback, concurrency/duplicates/reordering/stale reads, and property/model/fuzz/differential/metamorphic checks where examples leave material gaps.
4. **Integration:** actual routing/validation/auth/serialization/storage/queues/adapters, supported version skew/unknown fields, realistic external substitutes, asynchronous cross-service composition, and alternate CLI/admin/migration/recovery entry points.
5. **Doubles/fixtures:** relevant state/order/latency/failure/ownership fidelity, mocking that bypasses production wiring or repeats its bug, interaction assertions only for contractual interactions, hidden helper defaults, and representative reviewable golden/recorded data.
6. **Failure/operations:** timeout/throttle/disconnect/exhaustion/partial results, crash/restart/lease/failover/replay, diagnostics without secrets, load/soak/resource thresholds, and topology/filesystem/proxy/permission/scheduler conditions missing locally.
7. **Data/lifecycle:** constraints and transaction aftermath, historical/malformed/duplicate/partial/large datasets, migrations/backfills/import/retention/delete/restore, derived-store reconciliation, mixed versions/flags/offboarding. Fresh schema creation does not prove upgrade safety.
8. **Security/privacy:** real entry-point object/action/field/tenant denial and non-observation, stale privilege/session paths, injection/parsing, secrets/defaults/limits, and deployment-level enforcement beyond helper tests.
9. **UI/client:** navigation/loading/empty/error/retry/offline/restored states, focus/keyboard/accessibility/localization, supported devices/permissions/deep links, optimistic/stale/duplicate submissions, hydration, and reconnect.
10. **Config/build/release:** parsing/precedence/invalid combinations, generated artifacts/packaging/startup/readiness/manifests, supported toolchains/platforms, CI selection/sharding/cache omissions, and post-deploy/rollback checks for production-only conditions.
11. **Determinism:** database/filesystem/process/network/clock/random/locale/environment/global isolation, order/parallel safety, retry-masked flakes, sleeps/races/unawaited work, failed cleanup, actionable diagnostics, and reproducible seeds. Quarantine needs owner, expiry, and compensating evidence.
12. **Economics:** unique contract/domain/boundary/diagnostic value versus redundant coverage, brittle internals, oversized mock setup, slow global initialization, shared helper cost, and fast lanes omitting critical risks. Framework/trivial/generated code can still have project-specific integration obligations.
13. **Maintenance:** changed risks beyond changed lines, skipped/focused/disabled/quarantined tests, retired behavior, stale snapshots/data/contracts, coverage/mutation/flake trends, and incident regressions generalized to their invariant.
14. **Specialized needs:** numerical/scientific accuracy, financial reconciliation, ML leakage, nondeterministic AI/tool authorization, media/protocol/compiler behavior, hardware, and disaster recovery as applicable. Verify exact-version testing assumptions against primary documentation.

## Judgment

Identify the plausible defect that escapes and why existing coverage misses its actual production path. Where practical, show the old suite passing a deliberate fault and the correction catching it. Separate demonstrated evidence defects, worthwhile improvements, and unavailable evidence; a named or passing test alone proves no protection.

Delete only without losing unique contract, domain knowledge, boundary coverage, or diagnosis. Strengthen weak oracles, add proportionate real-defect coverage, and repair isolation/fixtures. Run relevant checks before and after; an already-red baseline is diagnostic context, not itself a test-audit finding.

## Changes and completion

Apply validated suite changes under the shared default. Changes to expected correctness, new guarantees, public behavior, or ambiguous specifications are critical only when evidence cannot establish the intended contract.

Use the shared evidence and completion rules; account for every applicable numbered probe and material boundary, including domain-derived probes.
