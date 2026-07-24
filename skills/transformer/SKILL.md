---
name: transformer
description: Use when rewriting an existing skill so Opus 5 (or any frontier reasoning model) executes it with better judgment, less scaffolding, and tighter calibration. Do NOT trigger for new skills from scratch (use skill-creator) or for prompt artifacts (use prompt).
argument-hint: <path to SKILL.md or skill name>
---

input = $ARGUMENTS

Resolve `$input` to a path; if missing, try `${CLAUDE_SKILL_DIR}/../$input/SKILL.md` then `./.claude/skills/$input/SKILL.md` — if none resolve, ask. Read completely. Rewrite in place — diff is the review surface.

## The one test

For every line: **what wrong behavior happens if this is gone?** Wrong output, skipped coordination, lost trigger, silent regression → keep. Model arrives here unaided → strip.

Opus 5 is not a de-prescribe-everything migration — it runs prior-generation prompts well out of the box. The wins are targeted, and they cut both ways:

- **Compounding instructions** — lines that duplicate a now-native behavior (verify, re-check, delegate, default-to-tool) don't just waste tokens, they push the model past the right amount of it. Strip.
- **Amplified defaults** — length, narration, subagent appetite, scope creep, correction chatter all run hotter than on prior Opus models. Calibration against these is load-bearing; add it where the skill is silent.

Length is a side effect, not a target — "nothing to cut, much to add" is a valid verdict; removing more than adding ≠ automatically better. Apply strip/keep lists, base tendencies, effort guidance from the inlined reference below.

## Both-directions guardrail

Under-specification = twin failure of over-scaffolding. Target is principle-only w/ no anchoring → ADD: one example showing the core judgment call; 2–3 domain facts the model can't infer, phrased positively; explicit invariants, XML-tagged when load-bearing.

Two Opus 5-specific additions are almost always missing and almost always earn their keep: **length calibration** (effort no longer shortens visible output — calibrate conversation and written files separately; in a long skill, echo it in one short line near the end) and a **scope fence** for narrow-deliverable skills.

Watch for literalism inversions. Conservative qualifiers get obeyed literally — a review or audit skill saying "only flag high-severity" or "be conservative" will report *less*. Rewrite to report everything, filter in a named second pass. Same principle for tool defaults: "default to X" / "if in doubt use X" → "use X when it would sharpen your understanding of the problem."

Strip closure-freedom prose. A list of lenses, scenarios, or dimensions is already open to the model; a sentence granting permission to "add, combine, split, reweight, or skip entries" changes nothing and signals that every entry is optional. What does earn its place is the opposite: a named floor where coverage is genuinely required — "required baseline; skip a probe only when the scoped system cannot expose it." State the floor, not the freedom.

Preserve verbatim: frontmatter `description` trigger phrases + `Do NOT trigger` disambiguation, `allowed-tools`, output contracts/templates, approval gates, and `!`​`cat path`` inline-injection directives. Breaking any breaks the skill silently.

## Worked transformation

**Before** — over-scaffolded and mistuned:

    ## Investigation
    1. Open the file
    2. Read all of it carefully
    3. Make a list of all the functions
    4. Identify what they do
    5. Think about which ones might have bugs
    6. For each suspected bug: write a hypothesis, test it, confirm or reject
    7. Spawn a verifier subagent to double-check your findings
    8. Report only the high-confidence bugs

**After** — calibrated:

    Read the target file completely before hypothesizing — partial-read
    hypotheses miss cross-function invariants. For each suspected bug:
    state the hypothesis, name the exact test that would confirm or
    reject it, run that test before proceeding.

    Report every bug you found, each with the evidence that confirmed it;
    severity triage is the user's next step, not a filter on this pass.

Steps 1–5: unaided reasoning, cut. Step 6's structure is load-bearing; earns a calibration line explaining *why* read-fully-first. Step 7: compounds with native self-verification — cut, don't relocate. Step 8: literalism trap — inverted into report-all-plus-evidence.

Resist voice-only rewrites and checklist-shuffling — prefer structural change; wrong frame → rewrite from scratch.

## Drafting craft (authoritative in the prompt skill, inlined here)

!`cat "${CLAUDE_SKILL_DIR}/../prompt/SKILL.md"`

## Opus 5 reference

!`cat "${CLAUDE_SKILL_DIR}/opus-5-reference.md"`
