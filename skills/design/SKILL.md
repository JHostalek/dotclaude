---
name: design
description: Explore competing approaches through independent agents before selecting an implementation.
argument-hint: "[design problem or goal]"
disable-model-invocation: true
---

Explore `$ARGUMENTS` and produce approaches with distinct core mechanisms. Use the smallest useful set of independent explorers; add one only to cover a material alternative or unresolved gap. If delegation is unavailable, disclose that limit and explore sequentially without claiming independence.

Establish the raw problem, actual constraints, and obvious solutions. Reframe where it exposes a different mechanism; do not force reframing for a bounded problem. Give explorers the same relevant repository context, their chosen method, and a distinct question or provocation. They must not see each other's proposals. Reframings are optional starting points, not constraints. Send revisions back to their authors.

Choose methods that expose different mechanisms; this is a menu, not required coverage:

| Method | Approach and check |
| --- | --- |
| Build upward | Start with the smallest useful unit; check emergent needs and necessary upfront investment. |
| Work backward | Derive prerequisites from the ideal outcome; check the path is buildable. |
| Constraint first | Solve or dissolve the hardest constraints; preserve the user outcome. |
| Transfer an analogy | Borrow a mechanism from another domain; identify where the analogy breaks. |
| Eliminate | Remove parts while preserving value; account for interactions and useful polish. |
| Adversarial | Design around consequential failures; state the cost of robustness. |
| Compose | Combine proven primitives; account for glue and dependency assumptions. |
| Evolve over time | Show the initial design, observable change triggers, and migration path; avoid speculative infrastructure. |
| Stakeholder trade-offs | Expose conflicting needs and selectable compromises; prioritize rather than satisfy everyone equally. |

Each explorer returns its mechanism, benefits, sacrifices, and conditions for choosing it. Compare mechanisms, merge cosmetic variants, and identify shared assumptions. Reopen exploration only when convergence or an uncovered assumption hides a useful option.

Save `docs/designs/<short-name>.md` with the problem and useful reframings, a landscape of approaches, their trade-offs and selection conditions, shared assumptions, and consequential unexplored territory. Include diagrams when they explain architectural or spatial choices. Stop after presenting the alternatives; implementation requires the user's selection or authorization.
