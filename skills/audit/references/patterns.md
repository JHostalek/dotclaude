# Patterns

Run as the `patterns` dimension. Map recurring concerns to implementations and compare their semantics, failure behavior, side effects, and compatibility.

Choose target conventions from repository policy, contracts, maintained abstractions, exact-version framework rules, and intent-bearing tests. Prevalence estimates familiarity and migration cost; it does not establish correctness. Keep distinct domain/ownership/latency/security constraints separate.

## Probes

1. **Architecture:** responsibility and dependency direction, public/internal boundaries, placement of validation/auth/orchestration/storage, schema/config ownership, and alternate API/job/CLI/admin/recovery paths enforcing different rules.
2. **Domain semantics:** terminology, identity/tenant scope, null/default/unknown/deleted states, units/currency/time/rounding, normalization/equality/order, lifecycle transitions, idempotency, and rules duplicated in analytics or migrations.
3. **Contracts:** API/event/CLI/plugin shapes, names/defaults/pagination/status, optionality/enums/encoding/correlation, sync/async/cancellation/retry/backpressure/order, generated clients, old/new versions, flags, and third parties.
4. **State/data access:** tenant scoping, loading/query/pagination conventions, consistency, transactions/locking/outbox, schema versus application defaults, backfills/dual writes, and cache keys/invalidation/TTL/authority.
5. **Failure/lifecycle:** error taxonomy/translation/cleanup, fallback and cancellation, resource/task supervision, context/deadlines, startup/reload/shutdown/reconnect, restore/rollback, and degraded operation.
6. **Cross-cutting policy:** auth/trust-boundary validation, secrets/redaction/audit, log/metric/trace conventions, config precedence and fail-open/closed behavior, quotas, limits, batching, and distributed resilience policy.
7. **Shared implementations:** duplicated parsers/validators/state machines, bypassed or forked utilities, leaky abstractions, and policy drift. Compare import, deepen/split, generate, or deliberately separate with contract tests. Inspect adopters too: the shared utility may contain the outlier's defect.
8. **Language/dependencies:** supported exact-version idioms, overlapping/direct/transitive/peer packages, version skew, imports/aliases/barrels/cycles, side-effect initialization, tree shaking, generated/vendor ownership, and unused runtime/build dependencies.
9. **Naming/layout:** domain role, units, effects, scope, paired operation symmetry, public compatibility, placement/test adjacency, exports, and examples teaching obsolete patterns. Cosmetic differences alone do not justify convergence.
10. **Tests/tooling/delivery:** equivalent test boundaries/fixtures/clocks/mocks, runner/compiler/generator/linter configuration, build/release/migration/rollback variants, local/CI/platform gaps, and enforceable rules contradicting policy.
11. **Evolution/composition:** migrations, feature flags, forks, deprecations, target state and exit criteria; identity/schema/cache/message/policy disagreement across components; domain-specific patterns and supported-stack primary documentation.

## Judgment

A defect needs divergent concrete paths, a violated invariant, and a supported target pattern. Improvements need recurring change/discovery/tooling/drift cost that outweighs migration risk. Separate intentional variants, migrations, and unresolved intent. Before normalizing an outlier, verify why the difference exists and whether the majority is itself wrong.

## Changes and completion

Apply validated convergence, including correcting a wrong majority once the target invariant and migration path are established. Architecture/public contracts, data migrations, cross-service rollout, or target choices are critical only when evidence cannot safely settle them.

Renames must account for serialized/reflected/generated names, external consumers, and migration. Removing dependencies requires checking runtime, build, plugin, and side-effect use.

Use the shared evidence and completion rules; account for every applicable numbered probe and material boundary, including domain-derived probes.
