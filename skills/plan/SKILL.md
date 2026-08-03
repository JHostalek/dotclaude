---
name: plan
description: Use when a task needs an implementation-ready design document before code changes begin.
---

task = $ARGUMENTS

Create the minimum implementation-ready plan: one canonical, self-contained HTML artifact with two reading layers. The visual architecture layer is the human approval surface; the execution layer is the complete implementation plan for fresh coding agents with access to the artifact and repository.

Research until the relevant behavior, change surface, constraints, reusable patterns, decisive tradeoffs, and acceptance boundary are clear. Cite repository precedent as `file:line` wherever the design adopts or departs from an existing pattern. Search current vendor documentation, libraries, and open-source prior art when an unfamiliar API, new pattern, or consequential design choice could change the decision; record the decisive fact and provenance, not the research process. Resolve every material in-scope uncertainty with evidence or user input. Treat hypothetical future needs as non-goals.

<artifact_contract>
Save or update `docs/plans/<type>-<short-name>.html`. Do not create companion requirements, research, task, or handoff files.

Describe the reviewed target state: what must exist and why, one abstraction level above pseudocode. Exclude code, pseudocode, statement-level mechanics, placeholders, open questions, and deferred decisions. Include implementation order, task decomposition, dependencies, and witnessed or repository-derived verification commands in the execution layer.

The artifact must carry all decision context required for implementation. External links are provenance, never required context. Use semantic HTML, in-file CSS, inline SVG where useful, explicit page and text colors, and no external assets or runtime.
</artifact_contract>

## Visual-first review surface

The first screen is a visual nutshell: outcome, before → after, selected design, scope and non-goals, and observable acceptance. Every non-trivial plan includes at least one decision-bearing visual.

Select views by the question they answer; combine, omit, or introduce another view as the design warrants:

- before/after for changed behavior;
- component or boundary map for ownership and structure;
- sequence or flow view for interactions;
- state model for lifecycle behavior;
- wireframe for user-visible states;
- matrix for meaningful alternatives.

Visuals replace equivalent prose rather than repeat it. Keep labels, legends, and captions precise enough that each visual communicates an implementation constraint, not decoration.

## Executor contract

After the visual approval layer, include the concrete implementation plan. It must let one agent execute sequentially or several agents divide work without rediscovering architecture or silently choosing incompatible contracts.

Progressively disclose only what implementation requires:

- goals, boundaries, observable behavior, and acceptance criteria;
- the intentional change map: relevant files, symbols, responsibilities, and why each changes;
- behavioral, interface, data, runtime, and user-state contracts;
- the selected design, seriously considered alternatives, and decisive evidence;
- material consequences and mitigations;
- ordered implementation phases and the dependency between them;
- within each phase, coherent work packages with owned files/symbols, required behavior, prerequisites, and completion evidence;
- safe parallelization boundaries and explicit shared files or interfaces requiring coordination;
- exact repository-derived verification commands at the narrow, phase, and final-gate levels;
- acceptance criteria mapped to tests, checks, or observable evidence;
- repository and external references.

Adapt, combine, or omit sections according to the task. Do not create ceremonial coverage. Keep the concise approval surface and detailed executor contract in the same file without duplicating them.

Before saving, read the artifact twice: first as the human deciding whether the architecture is right, then as a fresh coding agent deciding what to change next. If either reader could choose the wrong behavior, interface, boundary, code location, sequence, ownership, or verification, add the missing contract or evidence. Remove statement-level mechanics; retain execution order and coordination constraints.

Present the completed artifact for explicit human approval and stop. Do not implement or run an independent review unless the user requests it. Approval freezes the artifact; a material execution conflict requires revising the affected design and obtaining approval again.
