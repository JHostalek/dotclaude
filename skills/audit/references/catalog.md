# Audit dimensions

Each topic is one independent reviewer of the whole requested scope. Its file contains only self-contained things to flag.

- [abstractions](abstractions.md) — interface cost versus hidden complexity. Ousterhout chapters 4, 6, 7, 9, 15, 19.
- [comments](comments.md) — discoverable meaning, contracts, rationale, and accurate documentation. Ousterhout chapters 12, 13, 15, 16, 18.
- [complexity](complexity.md) — change amplification, cognitive load, hidden dependencies, and unnecessary state. Ousterhout chapters 2, 3, 16, 18, 19.
- [consistency](consistency.md) — similar meaning and behavior across equivalent paths and conventions. Ousterhout chapters 14, 17, 18, 19.
- [contracts](contracts.md) — producer-consumer agreement and supported compatibility. Personal criteria.
- [correctness](correctness.md) — computations, decisions, and state transitions that produce wrong results. Personal criteria.
- [data-integrity](data-integrity.md) — coherent authoritative records across writes, migrations, and recovery. Personal criteria.
- [error-handling](error-handling.md) — necessary failures, truthful outcomes, propagation, and cleanup. Ousterhout chapters 10, 17.
- [interfaces](interfaces.md) — caller burden, information hiding, and complete usable operations. Ousterhout chapters 4, 5, 6, 7, 8, 9.
- [logs](logs.md) — useful, accurate, affordable, and reconstructable diagnostics. Personal criteria.
- [modularity](modularity.md) — ownership of knowledge, policy, dependencies, and lifecycle. Ousterhout chapters 5, 7, 9, 19.
- [naming](naming.md) — precise names that reveal domain meaning and behavior. Ousterhout chapters 14, 18.
- [necessity](necessity.md) — whether capabilities and their continuing costs deserve to exist. Personal criteria.
- [performance](performance.md) — workload costs and justified, encapsulated optimization. Ousterhout chapter 20.
- [reliability](reliability.md) — continued service, fault containment, capacity, and recovery. Personal criteria.
- [security](security.md) — trust boundaries, authority, abuse, and sensitive data. Personal criteria.
- [tests](tests.md) — fault sensitivity, realistic boundaries, and maintainable protection. Personal criteria.
- [ux](ux.md) — user task completion, feedback, accessibility, and informed choices. Personal criteria; explicitly requested.

Ousterhout refers to *A Philosophy of Software Design*, first edition, 2018, read from the supplied PDF. Its principles are primary for the shared design topics; approved personal checks extend them. Chapter references attribute the book's contribution without attributing personal additions to the author.

Future books contribute criteria to the appropriate topics in this same collection. Record their grounding here; create a new dimension only for a distinct review focus.
