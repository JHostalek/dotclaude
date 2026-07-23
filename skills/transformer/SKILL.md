---
name: transformer
description: Use when rewriting an existing skill so Fable 5 (or any frontier reasoning model) executes it with better judgment, less scaffolding, and tighter calibration. Do NOT trigger for new skills from scratch (use skill-creator) or for prompt artifacts (use prompt).
argument-hint: <path to SKILL.md or skill name>
---

input = $ARGUMENTS

Resolve `$input` to a path; if missing, try `${CLAUDE_SKILL_DIR}/../$input/SKILL.md` then `./.claude/skills/$input/SKILL.md` — if none resolve, ask. Read completely. Rewrite in place — diff is the review surface.

## The one test

For every line: **what wrong behavior happens if this is gone?** Wrong output, skipped coordination, lost trigger, silent regression → keep. Model arrives here unaided → strip. On Fable 5 the bar is higher: over-prescription doesn't just waste tokens, it degrades output — prefer goal + constraints over enumerated steps. Length is a side effect, not a target — "nothing to cut, much to add" is a valid verdict; removing more than adding ≠ automatically better.

Apply strip/keep lists, base tendencies, effort-vs-scaffolding rule from inlined reference below.

## Both-directions guardrail

Under-specification = twin failure of over-scaffolding. Target is principle-only w/ no anchoring → ADD: one example showing core judgment call; 2–3 domain facts model can't infer, phrased positively; explicit invariants, XML-tagged when load-bearing.

Audit every enumeration for closure. A true contract, finite output space, invariant set, or required baseline may stay closed. A list of lenses, scenarios, failure modes, examples, or review dimensions must explicitly permit the model to add, combine, split, reweight, or skip entries as the task warrants while preserving any named minimum coverage. Do not rely on "such as" or an unlabeled list to imply that freedom.

Preserve verbatim: frontmatter `description` trigger phrases + `Do NOT trigger` disambiguation, `allowed-tools`, output contracts/templates, approval gates, and `!`​`cat path`` inline-injection directives. Breaking any breaks the skill silently.

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

Steps 1–5: unaided reasoning. Step 6's structure is load-bearing; earns a calibration line explaining *why* read-fully-first. Step 7: user-owned workflow, not skill content. Resist voice-only rewrites and checklist-shuffling — prefer structural change; wrong frame → rewrite from scratch.

## Drafting craft (authoritative in the prompt skill, inlined here)

!`cat "${CLAUDE_SKILL_DIR}/../prompt/SKILL.md"`

## Fable 5 reference

!`cat "${CLAUDE_SKILL_DIR}/fable-5-reference.md"`
