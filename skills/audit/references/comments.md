# Comments

- Flag missing class or module documentation that leaves the abstraction, purpose of an instance, or important usage limitations unclear to a new reader.
- Flag method documentation that does not supply the behavior callers need to use it without reading its implementation, including relevant preconditions, results, side effects, and possible failures.
- Flag undocumented units, inclusive or exclusive boundaries, null or absent meanings, ownership of resources, or invariants when the declaration does not make them clear.
- Flag comments that merely translate nearby syntax or repeat an entity's name without adding meaning, precision, intent, or rationale.
- Flag interface documentation contaminated by implementation details callers do not need. Internal algorithms, storage choices, and private configuration belong with the implementation unless they affect use of the interface.
- Flag comments that describe how a value is manipulated but fail to state what it represents. Readers should not need to reconstruct meaning from a sequence of assignments.
- Flag substantial or tricky code whose documentation narrates individual steps while omitting the overall goal or reason those steps are necessary.
- Flag nonobvious constraints, workarounds, or design decisions whose rationale exists only in a commit message or the author's memory. Explain active obligations and the conditions for revisiting temporary workarounds where maintainers will encounter the affected code.
- Flag cross-module dependencies that lack a discoverable explanation of which pieces must remain coordinated. Document necessary shared decisions centrally and make relevant code point to that explanation.
- Flag duplicated documentation of the same decision that can drift across modules. References to one authoritative explanation are preferable to independently maintained copies.
- Flag stale or contradictory comments, examples, or operational instructions, including claims about guarantees, formulas, units, configuration, fallback, or restore that disagree with their implementation or authoritative specification.
- Flag detailed explanations placed so far from their code that changes are likely to miss them.
- Flag event handlers or unusual lifecycle behavior whose invocation conditions, execution context, or continuation are not apparent from names and documentation.
- Flag links, named symbols, flags, or version references that point to missing or incompatible information needed to understand the affected code.
- Flag generated documentation corrected only in output while its owned source continues to reproduce the error.
- Flag commented-out implementations or obsolete change history that mislead maintainers about active behavior or available entry points.
