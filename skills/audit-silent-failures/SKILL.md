---
name: audit-silent-failures
description: Use when hunting silent failures in a scope — bugs that don't crash but produce wrong results, like swallowed exceptions, defaults returned on error, or optional chaining masking missing data. Triggers on "hunt silent failures", "find swallowed errors", "audit error handling", "check error swallowing".
argument-hint: [path]
---

target = $ARGUMENTS

If target provided, scan that path. Otherwise, files changed since the default branch. Full-codebase scan requires explicit user request.

Find places where errors disappear instead of being surfaced.

Surface mechanism is contextual: contract violations and programmer errors fail fast; expected environmental failures handle and observe. "Log and continue" is observability bolted onto a path running with corrupted state — rarely the fix.