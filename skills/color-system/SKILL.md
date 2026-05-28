---
name: color-system
description: Use when the user needs help choosing, evaluating, fixing, extending, or operationalizing colors for any interface. Trigger on requests about palettes, color grading, themes, semantic roles, contrast, tokens, visual tone, muddy or washed-out UI, dark mode, light mode, state colors, or making colors feel right. Use this skill to teach flexible color judgment and, when useful, support that judgment with small deterministic helper scripts.
argument-hint: [color problem, interface context, or palette goal]
---

color_goal = $ARGUMENTS

Design color as a living system. Judgment sets intent, relationships, and direction; deterministic helpers handle the parts where math beats intuition.

For methods, review loops, and helper-script patterns:
!references/color-method.md

## Calibration

- **Color is relational.** Judge any color by what it sits on, sits next to, carries as text, and represents as state — never in isolation. A palette that reads well as a list of values but fails on buttons, badges, forms, charts, tables, or dark mode is unfinished.
- **Fit beats theory.** Infer the desired feeling, trust, energy, and emphasis from the actual task. A theoretically elegant palette that feels wrong in context is wrong. Don't force the work into canned categories or "what palette type is this?".
- **Reason in lightness, chroma, hue.** Lightness → hierarchy & legibility. Chroma → intensity & restraint. Hue → temperature, meaning, emotional direction. State changes usually move by lightness and chroma first, dramatic hue jumps last.
- **Passing contrast is necessary, not sufficient.** A system can pass WCAG and still feel generic, noisy, flat, or emotionally wrong.
- **Differentiate on purpose.** Fitting category expectations vs claiming visual territory others avoid is a conscious choice — state which you're making.
- **Match depth to stage.** Early exploration wants direction and interpretation, not token architecture. Reserve ramps, tokens, and validation for refinement.

## Scripts: instrument, not author

The real failure modes here are equal and opposite — over-scripting taste, or never scripting where math is more reliable. Stay in plain-language reasoning for direction work and small critiques. Reach for a helper script only after anchors and behavior are clear, or when scale/consistency/validation matters. Good uses:
- generating tonal ramps from chosen anchors
- testing contrast and pairing likely foregrounds
- deriving hover/active/disabled/selected variants
- checking collisions between primary, info, success, selected
- comparing alternate variants side by side
- auditing a codebase for hardcoded or drifting colors
- attaching usage metadata to formalized tokens (intended use, avoid cases, contrast reqs, component bindings)

Never let a script choose the design direction.

## Diagnose root, not symptom

When something feels wrong, name the failure class before changing colors. Most palette failures are structure failures before they are hue failures. Common roots:
- weak lightness structure
- too much chroma everywhere
- semantic collisions (primary/info/success/selected too close)
- accent overuse — emphasis is strong only when rare
- dark-theme over-saturation
- components bypassing the intended system and improvising locally

Fix shared color logic before adding one-off exceptions.

## Heuristics

- Neutrals usually do more product work than accents.
- Brand color is rarely the right choice for backgrounds, borders, or semantic states.
- A simpler system applied faithfully beats a clever, fragile one.
- Gradients, glows, and tinted shadows are part of the color system when they materially affect perception.
- Token names follow meaning, not appearance.
- Semantic state colors serve interfaces that truly need them — not mandatory for every system.
- Output drifting toward a generic agent palette → stop, restate the intended feeling in plain language.

## Output

Smallest useful artifact for the moment — a root-cause critique, a first-impression read plus diagnosis, 2-4 distinct directions with tradeoffs (vary emotional logic and hierarchy, not just accent hue), a palette brief of anchors and relationships, semantic role/token recommendations, a helper-script plan, or a migration plan.

When proposing multiple directions, for each give: what it feels like, what it makes easy, what it makes risky, whether it fits or differentiates, where it fails if pushed too far.

If context is thin, inspect what exists (brand cues, current tokens, screenshots, code, component library, complaints) first, then ask at most one targeted question — only when the answer would materially change the direction.
