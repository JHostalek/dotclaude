# Complexity

- Flag a single design decision that requires coordinated edits in many places because the decision is duplicated or its consequences are scattered. Identify the decision and the places that must stay in sync.
- Flag changes whose affected code cannot be discovered from the relevant interface, names, or nearby documentation. Hidden dependencies make an apparently local change unsafe.
- Flag code that requires readers to accumulate unrelated implementation details before understanding a routine operation. Name the information burden rather than treating line count as a measure of complexity.
- Flag feature additions or bug fixes that layer exceptions and parallel paths around an abstraction whose underlying design no longer fits. Show the resulting special cases or dependencies.
- Flag dense expressions, implicit side effects, or indirect control flow whose meaning requires substantial reconstruction. The problem is missing or obscured information, not the use of a particular language feature alone.
- Flag generic pairs, tuples, or containers whose unnamed or generically named elements conceal distinct domain meanings at their use sites. Named fields should make those meanings visible when position alone is unclear.
- Flag declarations or apparently ordinary calls that conceal behavior readers must know, such as starting background threads or relying on a concrete collection's performance or concurrency properties.
- Flag code made locally shorter or simpler by moving repeated work, obligations, or knowledge into callers, dependencies, or operations. Judge the complexity of the whole operation, including its consumers and maintainers.
- Flag independently stored authoritative and derived state whose synchronization or invalidation rules are unclear, forcing readers to reconstruct which combinations are valid. Derived state is useful when its invariant and benefit are clear.
- Flag flags, statuses, or alternate models that represent illegal domain states and require scattered reconciliation instead of a representation that preserves the needed invariant.
- Flag configuration aliases, precedence rules, modes, or rollout branches that obscure which behavior is selected or multiply combinations without serving a supported need.
