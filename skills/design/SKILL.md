---
name: design
description: Use when the user needs design exploration, multiple distinct solution directions, or tradeoff-driven options before implementation.
argument-hint: [design problem or goal]
---

problem = $ARGUMENTS

Senior Design Orchestrator. Purpose: produce genuinely orthogonal approaches — different core mechanisms, not surface variants of one idea — so the user can make a real tradeoff decision rather than choose between disguised versions of the same thing.

Use `effort: high` for standard problems; `effort: xhigh` for high-stakes or highly ambiguous ones.

## Governing principles

- **Ideation ≠ filtering.** Diverge first, constrain later — mixing the two kills divergence before it starts.
- **Diversity comes from structure, not instruction.** Independent clean contexts + distinct reasoning methods + unique provocations make convergence structurally hard. Instruction alone ("be creative") is insufficient.
- **Don't refine approaches in your own context.** The explorers' independent contexts created the diversity; merging revisions into your context destroys it. Send feedback back; let explorers revise in place.

## Scale to problem complexity

- **Quick** (simple/bounded): skip defamiliarize, 3 explorers, one synthesis.
- **Standard** (default): defamiliarize, 4-5 explorers, one synthesis + optional gap-fill.
- **Deep** (high-stakes/ambiguous): defamiliarize, 6+ explorers, multiple synthesis rounds.

Scale up if user signals high stakes or defamiliarize reveals hidden complexity.

## Defamiliarize

Name the 2-3 obvious solutions first — you can't escape defaults you haven't named. Then reframe through these lenses (each yields a reframing, not a solution):

- **Step-Back:** abstract class of problem this belongs to, domain details stripped.
- **Inversion:** worst possible approach; which assumptions might be wrong.
- **Distant Analogy:** unrelated domain (biology, logistics, game theory) with the same structural shape.
- **Constraint Removal:** ideal w/ no constraints; ideal w/ the primary constraint 10x tighter.

Reframings seed the explorers — not the solutions. Add lenses if the problem warrants; the list is not closed.

## Diverge

| Explorer | Agent file | Reasoning style |
|----------|-----------|-----------------|
| Forward Build-Up | `forward-build-up.md` | Build up from smallest viable unit |
| Backward from Ideal | `backward-from-ideal.md` | Start from perfect outcome, work backward |
| Constraint-First | `constraint-first.md` | Solve hardest constraints first |
| Analogical Transfer | `analogical-transfer.md` | Map from a well-solved problem in another domain |
| Elimination | `elimination.md` | Remove everything unnecessary |
| Adversarial | `adversarial.md` | Attack the obvious solution, build what survives |
| Composition | `composition.md` | Compose existing proven primitives |
| Temporal | `temporal.md` | Design a trajectory across time, not a single state |
| Stakeholder | `stakeholder.md` | Design for conflicting stakeholder needs simultaneously |

Minimum set: Forward Build-Up, Backward from Ideal, Constraint-First, + one other relevant.

Spawn explorers in parallel, each with a clean context containing only:
- the problem statement,
- their assigned method from `${CLAUDE_SKILL_DIR}/agents/<name>.md`,
- relevant reframings,
- a **unique provocation no other explorer gets** (random constraint, forced analogy, "what if") — this breaks the homogenization that converges LLM outputs even across independent contexts,
- the anti-priming guard verbatim: "The orchestrator's reframings are starting points, not constraints. If the reframing feels wrong for your reasoning method, ignore it and start from the raw problem."

No teammate sees another's work. For codebase-aware problems: same codebase context to each, different reasoning methods. Keep explorers running asynchronously — continue orchestrating while they work rather than blocking until all return.

## Synthesize & verify distance

For each pair, name the core mechanism — the fundamental "how," not the framing. Shared core mechanism = variants, not alternatives. Audit assumptions ALL approaches share — those are the blind spots.

On convergence, diagnose then fix:
- **Axis Collapse** — cosmetically different, same underlying structure.
- **Function Lock** — all solve the same sub-problem first, anchoring everything.
- **Domain Imprisonment** — all stay inside the domain's conventions.
- **Novelty Chase** — different but purposelessly weird.

Spawn targeted fix subagents with the shared assumption declared off-limits.

<output_contract>
Save to `docs/designs/<short-name>.md`:
1. Problem statement + reframings (including the named defaults)
2. Solution landscape (where each approach sits)
3. Each approach: core mechanism, what it enables, what it sacrifices, when to choose it
4. Shared assumptions across all approaches
5. Unexplored territory and why

For architecture/spatial designs, include concrete artifacts (Mermaid, ASCII wireframes, data-flow sketches) — visuals compare better than prose.
</output_contract>
