---
name: comment-audit
description: Use when auditing comments, docstrings, or embedded documentation prose in a scope — to strip bloat and rewrite cluttered-but-justified entries. Triggers on "audit comments", "clean up docstrings", "strip stale comments", "comment cleanup".
argument-hint: [path]
---

target = $ARGUMENTS

If target provided, audit that path. Otherwise, files changed since the default branch. Full-codebase audit requires explicit user request.

In LLM-maintained code, type annotations are the primary documentation; every comment competes against the signature and must earn its place. A missing comment is better than a wrong comment — stale, misleading, or restating-the-obvious comments rot, mislead, and train future readers to ignore comments as noise. Resist the instinct to preserve "just in case." When unsure between strip and rewrite, strip — a rewritten lie is worse than no comment.

Read the full scope before editing — a "redundant" docstring may be load-bearing for downstream doc generation; a "stale" comment may reference a still-active workaround in another file.

## Strip

- Restates what code or signature already says. `# increment counter` above `counter += 1`; a docstring paraphrasing the function name.
- Stale references — removed code, prior task IDs, old function names, abandoned flags.
- Historical narration belonging in commits: "added for", "removed by", "previously did X".
- Section banners and decorative dividers (`### HELPERS ###`, `# ==== UTILS ====`).
- Author / date attribution VCS already tracks.
- Phantom TODOs without owners, dates, or actionable next steps.

## Rewrite — earned its place but buries the signal

- Multi-paragraph docstrings → one line naming the non-obvious constraint or invariant.
- "Handles edge cases like..." → name the specific edge case.
- Apology comments ("this is hacky but...") → state the constraint forcing the shape.
- Restatement mixed with real insight → strip the restatement, keep the insight.

## Keep

- Non-obvious WHY: workarounds for specific bugs (cite the bug), hidden invariants, external constraints.
- Public API docstrings consumed by downstream tooling (Sphinx, TypeDoc, OpenAPI generators).
- References to external authorities — RFC numbers, paper citations, vendor advisories.
- Regex breakdowns, performance assumptions, business rules not derivable from code.

## Don't touch

- User-facing strings (UI copy, end-user error messages, i18n keys) — separate audit.
- Log message templates structured for observability — phrasing affects grep/alerting.
- Vendored or generated code.

## When invoked by qual

Read-only. Surface findings against qual's actionability gate. Stale or misleading comments that contradict current code are CRITICAL: they encode false invariants future agents will trust.
