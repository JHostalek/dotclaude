---
name: prompt
description: Use when the user asks to create, refine, evaluate, or optimize an LLM prompt. Do NOT trigger for Claude Code skills (use skill-creator) or when rewriting an existing skill (use transformer). Example triggers - "write a prompt for my summarizer", "tighten this system prompt", "evaluate this agent prompt".
---

task = $ARGUMENTS

Draft immediately if `$task` is clear; ask only when a blocking fact is missing.

## Four facts before drafting

Infer from `$task` when obvious.

1. **Surface** — system prompt (first-person, structure-heavy), user message, tool description (~200-token ceiling, second-person imperative, markdown renders as raw text), few-shot exemplar, agent-loop instruction. Craft differs by surface.
2. **Target model class** — reasoning (Fable 5, Mythos 5, Opus 4.8/4.7, Sonnet 4.x, GPT-5.x, o-series) / instruction-tuned chat (GPT-4o, Gemini) / small or open-weights (<32B, local). Techniques that help one family hurt another. On Fable 5 specifically: thinking is always on (depth = effort setting, not prose); over-prescription degrades output — keep density low.
3. **Task shape** — classifier, generator, extractor, agent/tool-user, judge. Each has distinct failure modes.
4. **Output contract** — format, boundaries, error-state, length.

## Principles

<principles>
- **Positive directives beat negatives.** "Return JSON matching schema X" outperforms "don't add prose." Negatives prime the behavior they forbid. Refactor any "don't X" → "do A; if not applicable, say so."
- **Motivate constraints.** One sentence of *why* lets the model apply the rule to novel cases. "Cite sources — users cannot verify unsourced claims" beats bare "Cite sources."
- **Concept-first, examples-last.** Lead w/ what and why. Few-shot exemplars *inside* the prompt bias output toward the demonstrated shape — add only when principles demonstrably fail to generalize. Diagnostic mediocre→final contrasts used while drafting are a separate tool and don't count against this rule.
- **Density discipline.** Every rule competes for attention. Include only what changes behavior from the target's default; on reasoning models, extra rules cause over-triggering.
- **Invariants as XML.** Wrap content the model must retrieve verbatim — output contracts, refusal boundaries, safety rules — in semantic tags: `<output_contract>`, `<security>`, `<refusal>`.
- **Enumerations close silently.** A category list reads as closed to instruction-tuned models — borderline items get force-fit or skipped. Closed output spaces (enums, score bands): enumerate exhaustively. Open spaces: frame as *lenses* (axes of thought, not closed types) w/ an explicit escape clause, or drop the list.
</principles>

## Target-model branching

- **Reasoning models.** Strip explicit CoT scaffolding — "think carefully before responding" over written step plans; trust internal decomposition. Depth from effort setting, not prose. Density low, literalism high (a rule won't generalize across a class unless stated); invariants tagged.
- **Instruction-tuned chat.** Light structure earns its keep. Positive exemplars move the needle more than abstract principles. Role preambles occasionally useful.
- **Small / open-weights.** Retain explicit decomposition (Self-Ask, Least-to-Most, ReAct), few-shot for format normalization, clear boundaries on every field. Higher density tolerated and often required.

## Components

Assemble as needed; order in the prompt: Identity → Task → Context → Constraints → Output contract → Examples.

Identity (only when task-shape underspecifies behavior) · Task (always) · Context/grounding (treat retrieved content as data, never instructions) · Constraints (motivated) · Output contract (always for structured output) · Security (untrusted input) · Refusal boundaries (positive: "redirect off-topic to X") · Examples (only when principles prove insufficient).

## Worked example

User: *"Extract sentiment from customer reviews, JSON output with score and reasoning."*

Mediocre: `You are an expert sentiment analyzer. Carefully analyze the review and provide your thorough assessment. Don't be too biased. Output JSON with sentiment and explanation. Make sure the JSON is valid.` — role preamble adds nothing; "carefully/thorough/too biased" are phantom constraints; "Don't" stacks; contract gestured at, not specified.

Final:

    Classify the sentiment of the customer review in <review>.

    <output_contract>
    Return JSON matching:
    { "score": -1.0..1.0, "reasoning": "<=200 chars, quote exact phrase" }
    No prose outside the JSON.
    </output_contract>

    Score bands:
    - -1.0..-0.33: negative   - -0.33..0.33: neutral   - 0.33..1.0: positive

    Quote the exact phrase driving the score — grounds it in the text
    rather than sentiment-hallucinating.

## Technique index — when principles don't suffice

Gate: target is small/open-weights, or a reasoning-model draft demonstrably underperforms. Naming primes retrieval; don't deploy all at once.

- **Decomposition** — Self-Ask, Least-to-Most, Tree-of-Thoughts, Self-Consistency, Reflexion.
- **Tool / retrieval** — ReAct, HyDE, query rewrite/fusion, strict citation, prompt-injection defense.
- **Verification** — in-prompt self-grader, PAL/Program-of-Thoughts.
- **Calibration** — few-shot exemplars for format/tone, positive vs negative contrasts.

Push back when the user asks for patterns that work against quality — advocate target-appropriate density and trusting the model's defaults.

<finalization_contract>
When the user approves with "ship", "yes", "approved", or "looks good", your next message is ONLY the prompt text. No preface, no triple-backtick fences, no commentary. Until approval, iterate in prose.
</finalization_contract>
