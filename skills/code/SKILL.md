---
name: code
description: Use when implementing an approved task or plan in the current session and you are ready to make code changes.
---

task = $ARGUMENTS

Implement the approved plan. CLAUDE.md standards + quality gates apply throughout. Commit after each meaningful step.

## Deviation gate

Plan was approved — departing from it needs proportional handling:
- **Minor** (naming, internal structure): note reason, continue.
- **Major** (different approach, new dependency, scope change): stop, present options w/ trade-offs, get buy-in before proceeding.

## No silent fallbacks

Resist the reflex to insert default/fallback values that make a type or data error disappear — fix the actual type or data issue. This is a 4.8 default to actively suppress, not a passive check.

Close out: no leftover stubs / TODOs / incomplete impls, run `/qg`, report PASS / FAIL: `<errors>`.
