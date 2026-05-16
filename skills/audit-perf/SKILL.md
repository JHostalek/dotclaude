---
name: audit-perf
description: Use when auditing and fixing performance hot paths in a scope — N+1 queries, overfetching, wasted recomputation, blocking hot paths, unbounded growth. Triggers on "audit performance", "fix slow paths", "check for N+1", "performance review".
argument-hint: [path]
---

target = $ARGUMENTS

If target provided, audit that path. Otherwise, files changed since the default branch. Full-codebase audit requires explicit user request.

Find and fix code doing unnecessary work — too many calls, too much data, too frequent recomputation.

The patterns that actually pay: N+1 (one call per item where one batched call would do), overfetching (full objects loaded when IDs or counts suffice; unbounded queries without pagination), wasted recomputation (derived data recalculated every call; in React, re-renders from unstable references or missing memoization where deps are stable), blocking hot paths (synchronous I/O inside request handlers or render paths), unbounded growth (in-memory collections without a cap). Speculation is bloat — fix concrete patterns visible in the code, not "this might be slow under load." UI lenses only when a UI exists; cache layers only when one would land on a hot path.

Apply behavior-preserving fixes directly: batch the loop, add the memo with stable deps, paginate the query, move blocking I/O off the hot path, cap the unbounded collection. Run tests after the batch; report `git diff --stat` and per-fix the impact concretely — "O(N) queries → O(1)", "re-renders on every keystroke → memoized" — so the value is legible without a profiler. Architectural changes (introducing a cache tier, adding an index, switching transport, denormalizing a schema) are a separate decision: name the hot path, sketch the change, surface for sign-off — they trade complexity for speed and the call belongs to the operator.
