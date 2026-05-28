---
name: transformer
description: Use when rewriting an existing skill so Opus 4.8 (or any frontier reasoning model) executes it with better judgment, less scaffolding, and tighter calibration. Do NOT trigger for new skills from scratch (use skill-creator) or for prompt artifacts (use prompt).
argument-hint: <path to SKILL.md or skill name>
---

input = $ARGUMENTS

Rewrite the target skill so Opus 4.8 executes it with better judgment. Resolve `$input` to a path; if no file there, try `~/.claude/skills/$input/SKILL.md` then `./.claude/skills/$input/SKILL.md` — if none resolve, ask. Read it completely. Write the rewrite in place — the diff is the review surface.

## The one test

For every line: **what wrong behavior happens if this is gone?** Wrong output, skipped coordination, lost trigger, silent regression → keep. The model arrives here unaided → strip. Length is a side effect of this test, not a target — "nothing to cut, much to add" is a valid verdict, and a rewrite that removes more than it adds is not automatically better.

The 4.8 strip/keep lists, the base tendencies worth countering, and the effort-vs-scaffolding rule are in the inlined reference below — apply them.

## Both-directions guardrail

Under-specification is the twin failure of over-scaffolding. If the target is principle-only with no anchoring, ADD: one example showing the core judgment call; 2–3 domain facts the model can't infer, phrased positively; explicit invariants, XML-tagged when load-bearing.

Preserve verbatim: frontmatter `description` trigger phrases + `Do NOT trigger` disambiguation, `allowed-tools`, output contracts/templates, approval gates, and `!`​`cat path`` inline-injection directives. Breaking any of these breaks the skill silently.

## Worked transformation

**Before** — over-scaffolded:

    ## Investigation
    1. Open the file
    2. Read all of it carefully
    3. Make a list of all the functions
    4. Identify what they do
    5. Think about which ones might have bugs
    6. For each suspected bug: write a hypothesis, test it, confirm or reject
    7. Document findings; suggest fixes

**After** — calibrated:

    Read the target file completely before hypothesizing — partial-read
    hypotheses miss cross-function invariants. For each suspected bug:
    state the hypothesis, name the exact test that would confirm or
    reject it, run that test before proceeding.

Steps 1–5 are reasoning 4.8 does unaided. Step 6's structure is the only load-bearing content; it earns a calibration line explaining *why* read-fully-first. Step 7 is user-owned workflow, not skill content. Resist voice-only rewrites and checklist-shuffling — prefer structural change; if the target's frame is wrong, rewrite from scratch.

## Drafting craft (authoritative in the prompt skill, inlined here)

!`cat ~/.claude/skills/prompt/SKILL.md`

## Opus 4.8 reference

!`cat ~/.claude/skills/transformer/opus-4.8-reference.md`
