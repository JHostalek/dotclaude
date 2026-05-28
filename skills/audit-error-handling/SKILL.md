---
name: audit-error-handling
description: Use when auditing and fixing error handling in a scope — swallowed exceptions, defaults returned on error, optional chaining masking missing data, floating promises / missing awaits, entry points with no error boundary, resource leaks on error paths. Triggers on "audit error handling", "hunt silent failures", "fix swallowed errors", "check error boundaries", "missing await".
argument-hint: [path]
---

!`cat ~/.claude/skills/audit-workflow.md`

Run as the `error-handling` dimension. Lens:

Core principle: every error must be **observable** — by a user, a caller, or a log. An error that occurs while nothing in the system changes behavior or records it is the bug. This spans synchronous swallows, async errors that vanish, unguarded entry points, and resource leaks on error exit paths.

Surface mechanism is contextual: contract violations and programmer errors fail fast; expected environmental failures handle and observe. "Log and continue" is observability bolted onto a path running with corrupted state — rarely the fix.

**Swallowed errors (core).** Empty catch blocks, defaults on required data, optional chaining masking missing data. The question for every catch/fallback: is this data optional or required? Optional can have defaults; required must propagate. Apply the fix in the direction the surrounding code already prefers: where callers branch on errors, propagate; where the function returns Optional/Result and callers pattern-match, return the failure case; where the swallow masked missing data the caller silently treated as empty, restore the fail-fast.

**Async errors that vanish.** A missing `await` / floating promise returns before the work completes — its errors disappear. Most common async silent failure. Identify the project's dominant async pattern first, then check call sites against it; mixed async/await + `.then()` + callbacks breeds missed handling because each propagates errors differently. Missing cancellation (no AbortController/context/CancellationToken on long ops) makes work unkillable — flag it.

**Error boundaries.** Every entry point (API handler, CLI command, UI component, queue consumer) needs a top-level boundary that catches, logs with context, and surfaces a meaningful message. Errors escaping a boundary become invisible to users; errors exposing internals (stack traces, internal paths) are a security/UX problem. Use the project's error hierarchy — don't invent new error types.

**Resource leaks on error paths.** Connections, file handles, timers freed on the happy path but skipped on every error exit. Use the language's cleanup idiom (context manager, `defer`, `try-finally`).

Out of scope — cross-reference, don't fix here: race conditions, TOCTOU, stale reads, missing atomicity belong to `audit-correctness` (they produce wrong answers, not vanished errors).

Per-fix, record the error that was hidden, what now surfaces it, and the caller behavior. A swallow that appears intentional (a known recoverable case with a fallback the surrounding code depends on) is sign-off, not auto-fix — removing it changes user-visible behavior, and "looks like a bug" is not "is a bug".
