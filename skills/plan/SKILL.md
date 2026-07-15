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
4. Freeze a review brief from the plan's goals, non-goals, acceptance criteria, and explicit complexity boundary. Have fresh, clean-context Judge subagents review once, in parallel, through the domain-expert, pragmatist, and alternative-path lenses defined below.
5. Apply evidence-backed blockers that stay inside the review brief. Treat preferences, speculative future hardening, and requests to broaden capability as advisory; do not enlarge the plan to satisfy them.
6. If a revision materially changes the issue behind a blocker, use at most one fresh targeted follow-up reviewer for that issue. Never rerun the full panel. The hard limit is two review rounds total: one panel plus one targeted follow-up.
7. If an in-scope blocker remains after that budget, or resolving it requires broader scope or a user tradeoff, stop and present it to the user. Do not continue review until consensus or a prestige verdict.
8. Present the reviewed plan for explicit human approval and stop. Review informs quality; only the user authorizes implementation.

## Bound independent review

Each reviewer returns `READY` or `BLOCKED`, with no more than three blockers. A blocker must cite evidence that the plan would otherwise:

- fail an explicit goal or acceptance criterion;
- introduce a correctness, security, privacy, or data-loss defect;
- contradict a known repository or platform constraint; or
- be infeasible to implement as designed.

The domain expert checks behavioral and domain correctness. The pragmatist checks implementability, proportionality, and operational fit. The alternative-path reviewer actively seeks a materially simpler design and flags scope creep; this lens is not permission to invent additional production architecture.

Suggestions without that blocker standard are optional observations. Do not revise the plan merely to obtain unanimous taste, eliminate every hypothetical risk, or reach `EXPERT-GRADE`. On targeted follow-up, a new concern unrelated to the revision is advisory unless it exposes an immediate correctness, security, privacy, or data-loss defect.

## Structure the artifact

Use the established design-document structure below. Omit inapplicable detail instead of filling sections ceremonially.

- **Executive summary** — the decision-relevant problem and current state, followed by the outcome and selected design in the smallest reviewable form.
- **Goals and boundaries** — goals, explicit non-goals, scope, observable behavior, and acceptance criteria.
- **Target design** — system context; components and responsibilities; every architecturally intentional file and affected symbol; interface contracts in prose; dependencies; data and runtime flow; relevant user-visible states. Explain why each referenced location changes.
- **Decision record** — why the design wins; decisive repository evidence; decision-relevant prior art when found; and a compact table comparing every seriously considered alternative, including doing nothing, by advantages, drawbacks, and rejection reason.
- **Operational consequences** — only where relevant: compatibility, migration and rollback, failure recovery, security, privacy, observability, performance, scalability, deployment, and consequential edge cases, with mitigations.
- **Verification** — map each acceptance criterion and material invariant to required test coverage or observable evidence without restating it; never prescribe commands.
- **References** — cite repository evidence as `file:line`. Include the decision-relevant fact from external evidence and cite its URL or library as provenance; links must not be required context.

Use diagrams, state models, flows, or UI demonstrations only when they communicate relationships or behavior better than structured text. Prefer the minimum useful view; do not mechanically reproduce every C4 or arc42 level.

## Preserve the abstraction boundary

Exclude code, pseudocode, code-shaped examples, statement-level logic, ordered implementation steps, task decomposition, execution sequencing, verification commands, decision-irrelevant background, placeholders, open questions, and deferred design decisions.

Be as short as completeness against the review brief allows; conceivable future production concerns do not count as missing completeness. Within the same HTML file, lead with the concise human review surface and progressively disclose the detailed executor contract without duplicating it. Use semantic HTML, in-file CSS, and concise tables or visuals; do not teach HTML in the plan. Declare an explicit page background and text color on `body` (never rely on the viewer's defaults) so the plan renders identically in browsers and embedded webviews such as VS Code preview.

Approval freezes the entire artifact. A material execution conflict stops implementation; revise only the affected design, use the same bounded review protocol when target behavior changes, and obtain approval again.
