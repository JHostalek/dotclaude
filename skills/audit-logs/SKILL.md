---
name: audit-logs
description: Use when auditing and fixing logging in a scope — missing observability, INFO bloat that doesn't scale, stale or wrong-level messages, payload dumps on routine paths. Triggers on "audit logs", "fix logging", "logging review", "clean up log noise".
argument-hint: [path]
---

!`cat ~/.claude/skills/audit-workflow.md`

Run as the `logs` dimension.

Three dimensions: missing, bloat, wrong. A reader reconstructing a production run from logs alone should see state changes, stage outcomes, and errors w/ enough context to debug — nothing else. INFO is what production pays for and scales w/ traffic; DEBUG is local-dev.

Missing: long-running stages w/o completion line; fan-outs w/o per-iteration progress at DEBUG; exceptions logged w/o stack; invisible state transitions.

Bloat: entry+exit duplicates; per-iteration INFO; timing scaffolding when trace store already records it; heartbeats on every poll regardless of outcome; payload dumps on routine paths.

Wrong: f-strings breaking aggregation; wrong level; field-name drift across same concept; stale templates no longer matching code.

Prefer demotion over deletion for INFO bloat — restoration harder than demotion (auto-fix). Exception: PII, session tokens, credentials in log fields → redact or hash, not demote — DEBUG still leaks in dev (sign-off). Architectural changes (wiring logging library, adopting trace store, restructuring routing) → sign-off.
