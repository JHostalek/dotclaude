---
name: audit-comments
description: Use when auditing comments, docstrings, or embedded documentation prose in a scope — to strip bloat and rewrite cluttered-but-justified entries. Triggers on "audit comments", "clean up docstrings", "strip stale comments", "comment cleanup".
argument-hint: [path]
---

!`cat ~/.claude/skills/audit-workflow.md`

Run as the `comments` dimension. Comments run last because structure, patterns, and correctness edits change what the code does — a comment accurate before those passes may be stale after them. Lens:

Strip comments that don't earn their place; rewrite those that do but bury the signal. Type annotations are primary documentation — every comment competes against the signature, body, and adjacent declarations. Survive only by carrying a WHY sourced from outside the codebase: cited bug, spec, third-party quirk, business rule, historical decision. Behavioral narration ("idempotent", "no-op when empty", "callers rely on X") → strip regardless of accuracy; the code is the source. Named symbols must resolve — a comment referencing a function or constant that no longer exists is wrong, not outdated. Missing comment beats a wrong one — when torn, strip. Skip user-facing strings, log templates, generated code.

Judgment anchor — the keep/strip line:
- `# retry uses exponential backoff per RFC 6585 §4` → keep (external spec, behavior not visible from code)
- `# returns True if condition holds` → strip (behavioral narration; return type + body say it)
- `# see PaymentService.charge()` → keep only if that symbol exists and the cross-reference is non-obvious; strip if it's just the obvious call site

Strip/rewrite = auto-fix (prose only, code unchanged). Nothing here is sign-off.
