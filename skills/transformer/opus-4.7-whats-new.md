# Opus 4.7 — what's new (prompting-relevant subset)

Trimmed from Anthropic's "What's new" page. API plumbing, code samples, pricing, and breaking-change plumbing removed. Behavior changes overlap with the migration guide and are kept there, not duplicated here. This file focuses on the *new capabilities* that change how you draft prompts, skills, and CLAUDE.md.

## New effort level: `xhigh`

Start with `xhigh` for coding and agentic use cases; minimum `high` for most intelligence-sensitive work. Effort is the primary lever for depth on 4.7 — reach for it before adding prompt scaffolding.

## Task budgets (beta)

A task budget gives Claude an advisory token estimate for a full agentic loop — thinking, tool calls, tool results, and final output. The model sees a running countdown and uses it to pace itself and finish gracefully as the budget is consumed.

Prompting-side implications:

- **Not a hard cap.** `max_tokens` is the hard ceiling; `task_budget` is a suggestion the model is aware of. Use `task_budget` when you want the model to self-moderate, `max_tokens` as the wall.
- **Too-restrictive budgets degrade output.** The model may complete the task less thoroughly, or decline it, citing the budget. If you see thin output citing the budget, raise it.
- **Skip it for open-ended quality-first work.** Reserve task budgets for workloads where you genuinely need scoping to a token allowance. Minimum 20k.

## Capability improvements — remove prior mitigations

Gains worth knowing about because they justify **stripping existing scaffolding** from prompts and skills:

- **`.docx` redlining and `.pptx` editing** — better at producing and self-checking tracked changes and slide layouts. If prompts contain "double-check the slide layout before returning" or similar self-verification scaffolding, try removing it and re-baselining.
- **Chart / figure analysis** — better programmatic tool-calling with image-processing libraries (e.g. PIL), including pixel-level data transcription.
- **File-system-based memory** — better at writing and using scratchpads, notes files, and structured memory stores across turns. Agents that maintain memory should improve at both jotting down and leveraging notes. The client-side memory tool is the managed option if you don't want to build your own.
- **Vision: high-resolution image support.** Max image resolution now 2576px / 3.75MP (up from 1568px / 1.15MP). Coordinates returned are 1:1 with actual pixels — no scale-factor math needed for pointing, bounding boxes, or coordinate-mapping prompts. Particularly relevant for computer use, screenshot understanding, and document analysis. Full-res images use up to ~3x more image tokens; downsample when fidelity isn't needed.
- **Low-level perception** — pointing, measuring, counting, and similar tasks improved.
- **Image localization** — natural-image bounding-box localization and detection improved.

## Behavior changes

Covered in the migration guide (response length, literalism, tone, native progress updates, fewer subagents, stricter effort calibration, fewer tool calls, cyber safeguards). Not duplicated here.
