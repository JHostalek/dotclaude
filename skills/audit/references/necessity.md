# Necessity

- Flag capabilities whose implementation, support, or operational burden appears disproportionate to their supported outcomes or risk reduction. Question whether the capability should exist; identify the observed cost and the value needed to justify it. Keep unestablished value as a question, and do not treat missing telemetry as proof of no value.
- Flag duplicate product flows or options that provide the same outcome while adding meaningful choice, support, or maintenance burden.
- Flag abandoned experiments, temporary feature flags, and compatibility paths that remain after their documented purpose or support period has ended.
- Flag custom engines, DSLs, platforms, or services whose continuing ownership cost materially exceeds a simpler mechanism satisfying the actual requirements. Account for migration, removal costs, and the alternative's semantic gaps.
- Flag parallel providers, clients, or implementations with no remaining meaningful difference in behavior, isolation, ownership, or supported users.
- Flag dependencies that add continuing build, licensing, security, or operational obligations disproportionate to the capability they provide. Account for the work and semantic gaps of a replacement.
- Flag schemas, jobs, configuration, tests, documentation, or operational assets retained solely for a retired capability when their remaining consumers and lifecycle obligations are accounted for.
- Flag machinery reachable only through obsolete registrations, configurations, or deployment variants. Check indirect, external, seasonal, and recovery consumers before treating it as unused.
- Flag proposed removals that would silently discard recovery, accessibility, audit, retention, or compatibility obligations. Rare use can still have substantial value.
- Flag custom test, build, or release scaffolding that imposes substantial continuing maintenance cost without a required behavior or operational role.
