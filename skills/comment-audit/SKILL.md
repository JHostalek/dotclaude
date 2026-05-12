---
name: comment-audit
description: Use when auditing comments, docstrings, or embedded documentation prose in a scope — to strip bloat and rewrite cluttered-but-justified entries. Triggers on "audit comments", "clean up docstrings", "strip stale comments", "comment cleanup".
argument-hint: [path]
---

target = $ARGUMENTS

If target provided, audit that path. Otherwise, files changed since the default branch. Full-codebase audit requires explicit user request.

Strip comments that don't earn their place; rewrite those that do but bury the signal.

Type annotations are primary documentation; every comment competes against the signature. Keep non-obvious WHY — workarounds (cite the bug), invariants, external constraints, public-API docstrings consumed by tooling. A missing comment beats a wrong one — when torn, strip. Skip user-facing strings, log templates, and generated code.
