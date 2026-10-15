# Necessity

- Flag capabilities whose build, support, or operating cost is disproportionate to the outcomes or risk reduction they deliver. Question whether they should exist: name the observed cost and the value needed to justify it. Raise unestablished value as a question; missing telemetry is not proof of no value.
- Flag duplicate product flows or options that reach the same outcome while adding meaningful choice, support, or maintenance burden.
- Flag abandoned experiments, temporary feature flags, and compatibility paths kept past their documented purpose or support window.
- Flag custom engines, DSLs, platforms, or services whose ongoing ownership cost materially exceeds a simpler mechanism meeting the actual requirements. Weigh migration and removal cost and the alternative's semantic gaps.
- Flag parallel providers, clients, or implementations with no remaining meaningful difference in behavior, isolation, ownership, or supported users.
- Flag dependencies whose ongoing build, licensing, security, or operational obligations are disproportionate to the capability they provide. Weigh replacement work and semantic gaps.
- Flag schemas, jobs, configuration, tests, documentation, or operational assets kept solely for a retired capability, after accounting for remaining consumers and lifecycle obligations.
- Flag machinery reachable only through obsolete registrations, configurations, or deployment variants. Rule out indirect, external, seasonal, and recovery consumers before calling it unused.
- Flag proposed removals that would silently drop recovery, accessibility, audit, retention, or compatibility obligations. Rare use can still carry substantial value.
- Flag custom test, build, or release scaffolding with substantial ongoing maintenance cost and no required behavioral or operational role.
