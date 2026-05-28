---
name: audit-comments
description: Use when auditing comments, docstrings, or embedded documentation prose in a scope — to strip bloat and rewrite cluttered-but-justified entries. Triggers on "audit comments", "clean up docstrings", "strip stale comments", "comment cleanup".
argument-hint: [path]
---

!`cat ~/.claude/skills/audit-workflow.md`

Run as the `comments` dimension. Lens:

Strip comments that don't earn their place; rewrite those that do but bury the signal. Type annotations are primary documentation; every comment competes against the signature, body, and adjacent declarations. A comment survives only by carrying a WHY sourced from outside the codebase — a cited bug, a spec, a third-party quirk, a business rule, a historical decision. Behavioral narration ("idempotent", "no-op when empty", "callers rely on X") fails the test no matter how accurate — the code is the source; strip it. Named symbols must resolve. A missing comment beats a wrong one — when torn, strip. Skip user-facing strings, log templates, and generated code.

Stripping or rewriting a comment is auto-fix — the prose is internal and the code is unchanged. Nothing here is sign-off.
