---
name: audit-logs
description: Use when auditing and fixing logging in a scope — missing observability, INFO bloat that doesn't scale, stale or wrong-level messages, payload dumps on routine paths. Triggers on "audit logs", "fix logging", "logging review", "clean up log noise".
argument-hint: [path]
---

!`cat ~/.claude/skills/audit-workflow.md`

Run as the `logs` dimension. Lens:

Logging across three dimensions: missing, bloat, wrong. A reader reconstructing a production run from logs alone should see state changes, stage outcomes, and errors with enough context to debug — and nothing else. INFO is what production pays for and scales with traffic; DEBUG is local-dev. Missing: long-running stages with no completion line, fan-outs without per-iteration progress at DEBUG, exceptions logged without stack, state transitions invisible. Bloat: entry+exit duplicates, per-iteration INFO, timing scaffolding when a trace store already records it, heartbeats on every poll regardless of outcome, payload dumps on routine paths. Wrong: f-strings breaking aggregation, wrong level, field-name drift across the same concept, stale templates that no longer match the code.

Prefer demotion to deletion for INFO bloat — restoration is harder than demotion (auto-fix). PII, session tokens, credentials in log fields are the exception: redact or hash, not demote — DEBUG still leaks in dev (sign-off). Architectural changes (wiring a logging library, adopting a trace store, restructuring routing) are sign-off.
