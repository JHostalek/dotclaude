---
name: audit-correctness
description: Use when auditing and fixing logic bugs in a scope — off-by-one, wrong operator, inverted condition, unhandled boundary cases, unit/dimension mismatch, code that doesn't do what its name or docstring claims. Triggers on "audit correctness", "fix logic bugs", "check for off-by-one", "correctness review".
argument-hint: [path]
---

target = $ARGUMENTS

If target provided, audit that path. Otherwise, files changed since the default branch. Full-codebase audit requires explicit user request.

Find and fix code whose behavior diverges from what it claims to do.

Intent lives in names, signatures, docstrings, comments, and caller expectations — when behavior contradicts any of them, one is wrong and usually it's the code. Read for what the code does, not what it claims; names, comments, and the diff message prime confirmation bias. The patterns the model under-weights without prompting: off-by-one in loop bounds, slicing, range checks (`<` vs `<=` against length); inverted conditions and wrong logical operator (`||` vs `&&`, missing De Morgan flip); unhandled boundary cases (empty collection, single element, zero, negative, max) where surrounding logic implicitly assumes more; unit or dimension mismatch (ms vs seconds, bytes vs KB, 0- vs 1-indexed); time bugs (naive vs timezone-aware datetimes, DST); concurrency hazards (stale reads, TOCTOU, missing atomicity). Distinguish from audit-error-handling, which is about errors that vanish (swallowed, unobserved) — correctness is about producing the wrong answer with no error at all.

Touch a line only when you can point to where intent and behavior disagree — false positives erode trust faster than misses. Fix where intent is unambiguous: a name, signature, docstring, or caller pattern pins the correct reading. When the code could plausibly be either the bug or the spec, surface the divergence and ask which is canonical before editing — guessing wrong propagates the bug under the appearance of a fix. Run tests after the batch; report `git diff --stat`, the bugs fixed, and any ambiguous cases left for sign-off.
