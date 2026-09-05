---
name: plan
description: Produce a self-contained HTML implementation plan for explicit approval before coding.
disable-model-invocation: true
---

Plan `$ARGUMENTS` in one canonical artifact: `docs/plans/<type>-<short-name>.html`. The first layer supports the user's design decision; the second lets a fresh coding agent implement without rediscovering architecture. Do not create companion requirements, research, task, or handoff files.

Establish intended behavior, scope, constraints, repository precedents, and observable acceptance criteria. Resolve material uncertainties through evidence or user input before presenting the plan as implementation-ready. Cite repository precedents as `file:line`; verify consequential, changing external facts with current primary sources. Treat hypothetical future needs as non-goals.

The first screen shows the outcome, before/after, selected design, scope, and acceptance criteria. Include a decision-bearing visual for nontrivial plans, such as a boundary map, sequence, state model, wireframe, or alternatives comparison. Let visuals replace equivalent prose.

The execution layer supplies applicable contracts, the intentional file/symbol change map, alternatives and decisive evidence, material consequences, ordered work packages and dependencies, shared interfaces or files requiring coordination, and completion evidence. Map acceptance criteria to repository-derived verification commands or observable checks. Describe the target state one abstraction above pseudocode; omit code and statement-level mechanics.

Keep all implementation decision context inside the artifact; links supply provenance. Use semantic HTML, in-file CSS, optional inline SVG, explicit page/text colors, and no external assets or runtime. Review it as both a human choosing the design and a fresh agent executing it. Fill gaps that could change behavior, interfaces, ownership, ordering, or verification; remove repetition and irrelevant sections.

Present the artifact for explicit approval and stop. Do not implement or run an independent review unless requested. If execution reveals a material design conflict, revise the affected contract and obtain approval for that change.
