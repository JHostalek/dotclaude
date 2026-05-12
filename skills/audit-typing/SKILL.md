---
name: audit-typing
description: Use when auditing type safety in a scope — untyped signatures, escape hatches (any/Any/unknown/unchecked casts), types that lie about nullability or required-ness, and deep optional chaining hiding modeling problems. Triggers on "audit types", "tighten typing", "find any escapes", "fix type holes".
argument-hint: [path]
---

target = $ARGUMENTS

If target provided, audit that path. Otherwise, files changed since the default branch. Full-codebase audit requires explicit user request.

Make implicit contracts explicit; cut the types that already lie.

Untyped function signatures are the highest-value target — they poison callers into guessing, and one fix propagates inference everywhere downstream. Escape hatches (`Any`, `any`, `unknown`, unchecked casts, `# type: ignore`, `@ts-expect-error`) survive only when the payload is genuinely dynamic and the case is provable; otherwise strip. Types that lie are worse than types missing: `T | null` after a guard already proved presence, a return type including `undefined` when every path returns, an optional parameter that's actually required — each creates false uncertainty or, worse, false confidence the compiler endorses. Deep optional chaining (>2 levels) is a symptom of the type graph not reflecting actual guarantees; fix the modeling, don't suppress the chain. The project's strictest mode is the baseline. When torn between annotating and refactoring, prefer the refactor that makes the wrong state unrepresentable.
