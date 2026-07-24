---
name: audit-perf
description: Use when auditing and fixing performance hot paths in a scope — N+1 queries, overfetching, wasted recomputation, blocking hot paths, unbounded growth. Triggers on "audit performance", "fix slow paths", "check for N+1", "performance review".
argument-hint: [path]
---

!`cat "${CLAUDE_SKILL_DIR}/../audit-workflow.md"`

Run as the `perf` dimension. Goal: surface work the runtime does more than once when once suffices, or at O(N) cost when O(1) is available — then fix or gate it.

Find code doing unnecessary work. Skip a probe only when the scoped runtime cannot exercise it.
- N+1 — one call per item where one batched call suffices
- Overfetching — full objects loaded when IDs or counts suffice; unbounded queries w/o pagination
- Wasted recomputation — derived data recalculated every call; in React, re-renders from unstable refs or missing memoization where deps are stable
- Blocking hot paths — synchronous I/O inside request handlers or render paths
- Unbounded growth — in-memory collections w/o a cap

Collect every hit, then pass over the list keeping those whose cost is visible in the code and dropping those resting on "might be slow under load." Apply UI lenses only when UI exists; weigh cache layers only when one would land on a hot path.

Auto-fix behavior-preserving moves: batch the loop, add memo w/ stable deps, paginate the query, move blocking I/O off hot path, cap unbounded collection. State per-fix impact concretely — "O(N) queries → O(1)", "re-renders on every keystroke → memoized." Architectural changes (cache tier, index, transport swap, schema denormalization) → sign-off: name the hot path, sketch the change, surface it.
