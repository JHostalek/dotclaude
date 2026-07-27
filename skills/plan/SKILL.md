---
name: plan
description: Use when a task needs an implementation-ready design document before code changes begin.
---

task = $ARGUMENTS

Create the minimum implementation-ready plan: one canonical, self-contained HTML artifact that is both the human approval surface and the complete contract for a fresh coding agent with access to the plan and repository.

Research until the relevant behavior, change surface, constraints, reusable patterns, decisive tradeoffs, and acceptance boundary are clear. Cite repository precedent as `file:line` wherever the design adopts or departs from an existing pattern. Search current vendor documentation, libraries, and open-source prior art when an unfamiliar API, new pattern, or consequential design choice could change the decision; record the decisive fact and provenance, not the research process. Resolve every material in-scope uncertainty with evidence or user input. Treat hypothetical future needs as non-goals.

<artifact_contract>
Save or update `docs/plans/<type>-<short-name>.html`. Do not create companion requirements, research, task, or handoff files.

Describe the reviewed target state: what must exist and why, one abstraction level above pseudocode. Exclude code, pseudocode, statement-level mechanics, implementation order, task decomposition, verification commands, placeholders, open questions, and deferred decisions.

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

Progressively disclose only what implementation requires:

- goals, boundaries, observable behavior, and acceptance criteria;
- the intentional change map: relevant files, symbols, responsibilities, and why each changes;
- behavioral, interface, data, runtime, and user-state contracts;
- the selected design, seriously considered alternatives, and decisive evidence;
- material consequences and mitigations;
- acceptance criteria mapped to test coverage or observable evidence;
- repository and external references.

Adapt, combine, or omit sections according to the task. Do not create ceremonial coverage. Keep the concise approval surface and detailed executor contract in the same file without duplicating them.

Before saving, read the artifact as a fresh coding agent. If it could choose the wrong behavior, interface, boundary, or code location, add the missing contract or evidence. If a detail dictates statements or execution sequence, remove it.

Present the completed artifact for explicit human approval and stop. Do not implement or run an independent review unless the user requests it. Approval freezes the artifact; a material execution conflict requires revising the affected design and obtaining approval again.
