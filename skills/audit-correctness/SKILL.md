---
name: audit-correctness
description: Use when auditing and fixing logic bugs in a scope — off-by-one, wrong operator, inverted condition, unhandled boundary cases, unit/dimension mismatch, code that doesn't do what its name or docstring claims. Triggers on "audit correctness", "fix logic bugs", "check for off-by-one", "correctness review".
argument-hint: [path]
---

!`cat ~/.claude/skills/audit-workflow.md`

Run as the `correctness` dimension.

Find code whose behavior diverges from what it claims to do. Intent lives in names, signatures, docstrings, comments, caller expectations — behavior contradicting any of them → one is wrong, usually the code. Read for what code does, not what it claims; names, comments, diff message prime confirmation bias. Patterns to probe explicitly:
- off-by-one in loop bounds, slicing, range checks (`<` vs `<=` against length)
- inverted conditions, wrong logical operator (`||` vs `&&`, missing De Morgan flip)
- unhandled boundary cases (empty collection, single element, zero, negative, max) where surrounding logic implicitly assumes more
- unit/dimension mismatch (ms vs seconds, bytes vs KB, 0- vs 1-indexed)
- time bugs (naive vs timezone-aware datetimes, DST)
- concurrency hazards (stale reads, TOCTOU, missing atomicity)

Scope: producing the wrong answer w/ no error. Distinguish from audit-error-handling (errors that vanish — swallowed, unobserved).

Touch a line only when intent and behavior demonstrably disagree — false positives erode trust faster than misses. Auto-fix where intent is unambiguous: name, signature, docstring, or caller pattern pins correct reading. Ambiguous (code could be either bug or spec) → flag for sign-off; guessing wrong propagates the bug under appearance of a fix.
