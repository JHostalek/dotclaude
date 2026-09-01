---
name: transformer
description: Use when rewriting an existing skill so Opus 5 (or any frontier reasoning model) executes it with better judgment, less scaffolding, and tighter calibration. Do NOT trigger for new skills from scratch (use skill-creator) or for prompt artifacts (use prompt).
argument-hint: <path to SKILL.md or skill name>
---

input = $ARGUMENTS

Resolve `$input` to a path; if missing, try `${CLAUDE_SKILL_DIR%/*}/$input/SKILL.md` then `./.claude/skills/$input/SKILL.md` — if none resolve, ask. Read completely. Rewrite in place — diff is the review surface.

**Rewrite, don't nibble.** The default failure of this skill is timidity: touching the lines that are safe to touch and leaving the frame that was wrong. You have the whole file and a clear standard, so use them. Blank the file and rewrite from the skill's purpose when the structure is wrong, the frame is wrong, or the accumulated edits no longer add up to one coherent document — that is the expected outcome, not the escalation. Split one file into a tree, collapse a tree into one file, replace a procedure with a principle, invent a section the original lacked, delete half of it. A diff that is only nits means you read for typos instead of for design. The one place restraint is right: the load-bearing surfaces listed below, which survive verbatim through any rewrite.

## The one test

For every line: **what wrong behavior happens if this is gone?** Wrong output, skipped coordination, lost trigger, silent regression → keep. Model arrives here unaided → strip.

Second test, for what survives: **is this particular to this user, team, or product?** A skill earns its keep by encoding opinion, taste, or a gotcha — generic good practice is the thing being cut.

Opus 5 is not a de-prescribe-everything migration — it runs prior-generation prompts well out of the box. The wins are targeted, and they cut both ways:

- **Compounding instructions** — lines that duplicate a now-native behavior (verify, re-check, delegate, default-to-tool) don't just waste tokens, they push the model past the right amount of it. Strip.
- **Amplified defaults** — length, narration, subagent appetite, scope creep, correction chatter all run hotter than on prior Opus models. Calibration against these is load-bearing; add it where the skill is silent.

Length is a side effect, not a target — "nothing to cut, much to add" is a valid verdict; removing more than adding ≠ automatically better. Apply strip/keep lists, base tendencies, effort guidance from the inlined reference below.

## Both-directions guardrail

Under-specification = twin failure of over-scaffolding. Target is principle-only w/ no anchoring → ADD: 2–3 domain facts the model can't infer, phrased positively; explicit invariants, XML-tagged when load-bearing; anchoring for the core judgment call.

Anchor through the interface first. An example pins the model to the exploration space it describes, so reach for the self-describing form before the demonstration: expressive names, an enum whose values imply the state machine, named fields in the output contract, a one-line constraint on shape. Spend an example only where the output space is genuinely closed, or where the judgment call fails in a way prose can't show — the worked transformation below is that case.

Two Opus 5-specific additions are almost always missing and almost always earn their keep: **length calibration** (effort no longer shortens visible output — calibrate conversation and written files separately; in a long skill, echo it in one short line near the end) and a **scope fence** for narrow-deliverable skills.

Watch for literalism inversions. Conservative qualifiers get obeyed literally — a review or audit skill saying "only flag high-severity" or "be conservative" will report *less*. Rewrite to report everything, filter in a named second pass. Same principle for tool defaults: "default to X" / "if in doubt use X" → "use X when it would sharpen your understanding of the problem."

Strip closure-freedom prose. A list of lenses, scenarios, or dimensions is already open to the model; a sentence granting permission to "add, combine, split, reweight, or skip entries" changes nothing and signals that every entry is optional. What does earn its place is the opposite: a named floor where coverage is genuinely required — "required baseline; skip a probe only when the scoped system cannot expose it." State the floor, not the freedom.

## Read the skill in its context, not alone

A skill never arrives by itself — CLAUDE.md, the harness system prompt, sibling skills, and tool descriptions land in the same window. Check the target against them:

- **Contradiction** — one layer says never, another says as appropriate. The model resolves it and pays for the resolution every run. Fix at the source: decide which layer owns the call and delete the other side, don't add a tiebreak line.
- **Restatement** — the target repeats what a parent layer already carries, or what a tool's own description carries. Cut it here; end-of-context recency bias is gone, so the repeat buys nothing and pushes the behavior past calibration.
- **Ownership** — guidance about a tool belongs in that tool's description, about a workflow in its skill. Reference the home; don't copy it.
- **Damper vs mechanism** — a parent layer damping a behavior (don't delegate unless asked, don't write files) collides with any skill whose mechanism *is* that behavior. The skill owns the resolution and states it once — "invoking this skill is the authorization to fan out" — then carries its own cap. Without that line the model re-derives permission on every run.
- **Inert knobs** — effort, model, and token settings are not reachable from inside a Claude Code skill; guidance about them only lands in a prompt that ships to an API surface. Elsewhere it reads as instruction and does nothing. Cut it.

## Split what's long

A skill is a guide to finding what's needed, not a repository of everything that might come up. Long target → split into a tree of files loaded at the point of use, with the entry file carrying trigger, scope, and pointers.

Mind which loading mechanism you use: `!`​`cat path`` inlines eagerly and costs its tokens on every invocation — correct only for material every run needs. A plain path reference costs nothing until read — correct for material some runs need. Converting an eager inline of rarely-needed material into a reference is a real win; the reverse is a regression.

Prefer high-fidelity references over prose about them: a test suite, a function to port, a mockup, a rubric a scoring agent applies. Code says it more exactly than a description of the code.

## Load-bearing surfaces

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

Note what this is not: a voice pass or a reshuffled checklist. The steps were deleted and the two that mattered came back as different sentences in a different order.

## Drafting craft

Prefer positive directives, motivate every constraint you keep, and keep rule density low — on a reasoning model, fewer rules land harder. The rest of the craft you need is already above: anchor through the interface, XML-tag load-bearing invariants, state floors instead of freedoms.

Composing a prompt artifact rather than a skill — a tool description, a judge rubric, an API system prompt — is a different surface: read `${CLAUDE_SKILL_DIR%/*}/prompt/SKILL.md`, which owns target-model calibration and assembly order.

## Opus 5 reference

!`cat "${CLAUDE_SKILL_DIR}/opus-5-reference.md"`
