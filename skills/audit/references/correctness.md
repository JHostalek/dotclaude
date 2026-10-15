# Correctness

- Flag a reachable computation or workflow that violates an established business invariant, such as required ordering, monotonicity, conservation, or allowed terminal states.
- Flag incorrect conditions, operators, fallthrough, early returns, indexing, inclusive bounds, or loop termination that produce a wrong result for supported inputs.
- Flag decisions made with the wrong actor, tenant, identity, snapshot, version, or feature configuration.
- Flag parsing, mapping, joining, defaulting, equality, hashing, or serialization that changes meaning, loses data, or associates fields with the wrong entity.
- Flag state transitions that can be skipped, repeated, reordered, resumed, expired, or cancelled into an invalid workflow state.
- Flag arithmetic with wrong units, scale, sign, precision, rounding stage, overflow behavior, or algorithm assumptions.
- Flag time calculations that confuse instants with civil time, mishandle DST or calendar boundaries, or rely on the wrong clock or timestamp.
- Flag races such as stale decisions, lost updates, write skew, check-then-act operations, or insufficient lock scope that permit an incorrect outcome.
- Flag query predicates, joins, ordering, null semantics, cache keys, or invalidation that return the wrong state or result.
- Flag optimistic UI, asynchronous results, retries, or duplicate events that apply a valid update to the wrong or outdated state.
- Flag language or framework usage that contradicts the supported version's actual behavior and produces a concrete wrong result or broken execution path.
- Flag registration, configuration, annotations, machine-consumed comments, or generated wiring that selects unintended behavior or omits required execution. Include file moves that break discovery, routes, build inputs, or packaging.
