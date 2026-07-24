---
name: plan
description: Use when a task needs an implementation-ready design document before code changes begin.
---

task = $ARGUMENTS

Create the minimum implementation-ready design document, called the plan: one canonical, self-contained HTML artifact describing the reviewed target state. It is both the human approval surface and the binding contract for a fresh coding agent with access to the plan and repository.

The plan specifies what must exist and why, one abstraction level above pseudocode. It does not prescribe implementation order or mechanics.

Match depth to the requested change. Stop researching when the relevant behavior, change surface, decisive tradeoffs, and acceptance boundary are clear. Do not design infrastructure, governance, extensibility, or future integrations that the current scope does not require.

## Develop the design

1. Research the repository until its relevant behavior, change surface, constraints, and reusable patterns are understood. Research prior art and external solutions only when they could change the current decision.
2. Resolve uncertainties that materially affect the frozen scope, behavior, architecture, interfaces, security, data, or acceptance. Turn hypothetical future concerns into explicit non-goals instead of designing them. Ask the user when evidence cannot settle an in-scope choice.
3. Save or update `docs/plans/<type>-<short-name>.html` as HTML, not renamed Markdown. Do not create companion requirements, research, design, task, or handoff artifacts.
4. Present the plan for explicit human approval and stop. Only the user authorizes implementation.

Independent review is the user's call, not a built-in stage: they run `/judge` on the plan if they want a panel. Don't spawn reviewers to check your own design, and don't broaden the plan to pre-empt objections nobody raised — a wider plan is a worse plan when the extra scope wasn't asked for.

## Structure the artifact

Use the established design-document structure below. Omit inapplicable detail instead of filling sections ceremonially.

- **Executive summary** — the decision-relevant problem and current state, followed by the outcome and selected design in the smallest reviewable form.
- **Goals and boundaries** — goals, explicit non-goals, scope, observable behavior, and acceptance criteria.
- **Target design** — system context; components and responsibilities; every architecturally intentional file and affected symbol; interface contracts in prose; dependencies; data and runtime flow; relevant user-visible states. Explain why each referenced location changes.
- **Decision record** — why the design wins; decisive repository evidence; decision-relevant prior art when found; and a compact table comparing every seriously considered alternative, including doing nothing, by advantages, drawbacks, and rejection reason.
- **Operational consequences** — every material in-scope consequence, with mitigations: compatibility, migration and rollback, failure recovery, security, privacy, observability, performance, scalability, deployment, consequential edge cases. Omit one when the design cannot incur it.
- **Verification** — map each acceptance criterion and material invariant to required test coverage or observable evidence without restating it; never prescribe commands.
- **References** — cite repository evidence as `file:line`. Include the decision-relevant fact from external evidence and cite its URL or library as provenance; links must not be required context.

Use diagrams, state models, flows, or UI demonstrations only when they communicate relationships or behavior better than structured text. Prefer the minimum useful view; do not mechanically reproduce every C4 or arc42 level.

## Preserve the abstraction boundary

Exclude code, pseudocode, code-shaped examples, statement-level logic, ordered implementation steps, task decomposition, execution sequencing, verification commands, decision-irrelevant background, placeholders, open questions, and deferred design decisions.

Be as short as completeness against the goals and acceptance criteria allows; conceivable future production concerns do not count as missing completeness. Within the same HTML file, lead with the concise human review surface and progressively disclose the detailed executor contract without duplicating it. Use semantic HTML, in-file CSS, and concise tables or visuals; do not teach HTML in the plan. Declare an explicit page background and text color on `body` (never rely on the viewer's defaults) so the plan renders identically in browsers and embedded webviews such as VS Code preview.

Approval freezes the entire artifact. A material execution conflict stops implementation; revise only the affected design and obtain approval again.
