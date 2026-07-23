---
name: audit-error-handling
description: Use when auditing and fixing error handling in a scope — swallowed exceptions, defaults returned on error, optional chaining masking missing data, floating promises / missing awaits, entry points with no error boundary, resource leaks on error paths. Triggers on "audit error handling", "hunt silent failures", "fix swallowed errors", "check error boundaries", "missing await".
argument-hint: [path]
---

!`cat "${CLAUDE_SKILL_DIR}/../audit-workflow.md"`

Run as the `error-handling` dimension. Lens:

Every error must be **observable** — by a user, a caller, or a log. Error occurs while nothing changes behavior or records it → that's the bug. Spans synchronous swallows, async vanishes, unguarded entry points, resource leaks on error exit.

The mechanisms below are required probes when applicable, not the boundary of the audit. Add, combine, or refine probes for framework- and domain-specific failure paths; omit one only when the scoped code cannot exercise it.

Surface mechanism is contextual: contract violations and programmer errors → fail fast; expected environmental failures → handle and observe. "Log and continue" is observability bolted onto a path running with corrupted state — rarely the fix.

**Swallowed errors (core).** Empty catch blocks, defaults on required data, optional chaining masking missing data. Per catch/fallback: optional data → default allowed; required data → propagate. Fix in the direction the surrounding code already prefers: callers branch on errors → propagate; function returns Optional/Result and callers pattern-match → return failure case; swallow masked missing data caller silently treated as empty → restore fail-fast.

**Async errors that vanish.** Missing `await` / floating promise returns before work completes — errors disappear. Identify the project's dominant async pattern first, then check call sites against it; mixed async/await + `.then()` + callbacks breeds missed handling because each propagates errors differently. No AbortController/context/CancellationToken on long ops → flag it.

**Error boundaries.** Every entry point (API handler, CLI command, UI component, queue consumer) needs a top-level boundary: catch, log w/ context, surface meaningful message. Errors escaping a boundary → invisible to users; errors exposing internals (stack traces, internal paths) → security/UX problem. Use the project's error hierarchy — no new error types.

**Resource leaks on error paths.** Connections, file handles, timers freed on happy path but skipped on error exits. Use the language's cleanup idiom (context manager, `defer`, `try-finally`).

Out of scope — cross-reference, don't fix here: race conditions, TOCTOU, stale reads, missing atomicity → `audit-correctness` (wrong answers, not vanished errors).

Per-fix record: error hidden, what now surfaces it, caller behavior. Swallow that appears intentional (known recoverable case w/ fallback surrounding code depends on) → sign-off, not auto-fix; removing it changes user-visible behavior.
