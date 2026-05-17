---
name: audit-silent-failures
description: Use when hunting and fixing silent failures in a scope — bugs that don't crash but produce wrong results, like swallowed exceptions, defaults returned on error, or optional chaining masking missing data. Triggers on "hunt silent failures", "fix swallowed errors", "audit error handling", "check error swallowing".
argument-hint: [path]
---

target = $ARGUMENTS

If target provided, scan that path. Otherwise, files changed since the default branch. Full-codebase scan requires explicit user request.

Find and fix places where errors disappear instead of being surfaced.

Surface mechanism is contextual: contract violations and programmer errors fail fast; expected environmental failures handle and observe. "Log and continue" is observability bolted onto a path running with corrupted state — rarely the fix.

Apply the fix in the direction the surrounding code already prefers: where callers branch on errors, propagate; where the function returns Optional/Result and callers pattern-match, return the failure case; where the swallow masked missing data the caller silently treated as empty, restore the fail-fast. Run tests after the batch; report `git diff --stat` and per-fix the swallowed error, what now surfaces it, and the caller behavior. When the swallow appears intentional (a known recoverable case with a fallback the surrounding code depends on), surface for sign-off — removing it changes user-visible behavior, and "looks like a bug" is not the same as "is a bug".