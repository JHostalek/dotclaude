---
name: audit-perf
description: Use when auditing and fixing performance hot paths in a scope — N+1 queries, overfetching, wasted recomputation, blocking hot paths, unbounded growth. Triggers on "audit performance", "fix slow paths", "check for N+1", "performance review".
argument-hint: [path]
---

!`cat ~/.claude/skills/audit-workflow.md`

Run as the `perf` dimension. Lens:

Find code doing unnecessary work — too many calls, too much data, too frequent recomputation. The patterns that actually pay: N+1 (one call per item where one batched call would do), overfetching (full objects loaded when IDs or counts suffice; unbounded queries without pagination), wasted recomputation (derived data recalculated every call; in React, re-renders from unstable references or missing memoization where deps are stable), blocking hot paths (synchronous I/O inside request handlers or render paths), unbounded growth (in-memory collections without a cap).

Fix concrete patterns visible in the code, not "this might be slow under load." Apply UI lenses only when a UI exists; weigh cache layers only when one would land on a hot path.

Auto-fix the behavior-preserving moves: batch the loop, add the memo with stable deps, paginate the query, move blocking I/O off the hot path, cap the unbounded collection. State per-fix impact concretely — "O(N) queries → O(1)", "re-renders on every keystroke → memoized" — so value is legible without a profiler. Architectural changes (introducing a cache tier, adding an index, switching transport, denormalizing a schema) are sign-off: they trade complexity for speed, the call belongs to the operator — name the hot path, sketch the change, surface it.
