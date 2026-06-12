---
name: improve-skill
description: Use when the user asks to improve, compare, audit, or identify gaps in an existing skill.
allowed-tools: Read, Glob, Grep, Bash, Edit, Write, Task, WebFetch, WebSearch
argument-hint: <skill-name>
---

skill_name = $ARGUMENTS

If no argument, ask.

## Find the skill

Search in order: `~/.claude/skills/{skill_name}/SKILL.md` → `~/.claude/skills/{skill_name}/*.md` → `.rulesync/skills/{skill_name}/SKILL.md`. Read completely, including referenced files.

## Self-assessment first

Form verdict *before* research — prior assessment prevents parroting. Default bias: shorter. Cutting bloat = as much value as adding technique.

Assess as **prompt for an executing agent**, not a human doc. Flag capability gaps and self-contradiction (what the skill should do but doesn't; where it contradicts its own stated philosophy), not just prompt-craft. Note for each finding which competitive source would confirm or refute it.

Rubric (feeds report section-2 table):

| Check | What to look for |
|-------|-----------------|
| Unmotivated constraints | MUST/NEVER/ALWAYS w/o a reason get dropped under pressure. Explanatory ("because X, do Y") survives & lets the agent reason about edges. Count the bare ones; >~5 per 100 lines = attention dilution. |
| Adaptive scaling | Does workflow scale to task size? A 2-file task shouldn't fire the same pipeline as a 50-file one. |
| Progressive disclosure | Core workflow >~300 lines dilutes attention. Are details in reference files loaded on demand? |
| Failure-mode framing | "You'll be tempted to skip this because…" outperforms "MUST do this step." Does it anticipate where the agent fails? |
| Escape hatches | Can the agent skip phases that don't apply? |
| File references | Inline-injection (`!path/to/file.md`) beats a plain path the agent must separately read. |
| Phantom constraints | Instructions the model follows anyway. If no competitor bothers stating it, cut it. |

## Competitive research

Delegate to three research subagents; pass each their prompt file from `${CLAUDE_SKILL_DIR}/agents/<name>.md` with the skill summary + hypotheses prepended as context. Run concurrently.

| Teammate | File | Purpose |
|----------|------|---------|
| System Prompts Analyzer | `agents/system-prompts.md` | Compare against other AI coding tools' system prompts |
| Ecosystem Scanner | `agents/ecosystem.md` | Search open skills registry for similar skills |
| Vendor Docs Researcher | `agents/vendor-docs.md` | Search vendor docs and best practices |

## Synthesis & report

Surface: which hypotheses research confirmed, insights from *combining* sources, what to cut — phantom-constraint test: no competitor instructs it AND model does it anyway → flag for removal.

Single consolidated report:

**1. Executive summary** (2-3 sentences) — ahead, behind, or on par? Over-, under-, or right-sized?

**2. Agent-execution quality:**

| Check | Current State | Recommendation | Priority |
|-------|--------------|----------------|----------|

**3. Gap analysis:**

| Category | Have | Missing | Could Cut | Priority | Sources |
|----------|------|---------|-----------|----------|---------|

**4. Recommended removals** — concrete sections to delete, with rationale.

**5. Recommended additions** — highest-impact first, concrete text. Severity CRITICAL (most competitors have it, big quality impact) → HIGH → MEDIUM → LOW.

**6. Net effect** — longer, shorter, or same? Aim shorter-or-same.

**7. Unique strengths** to preserve.

**8. Anti-patterns** — competitor techniques to explicitly NOT adopt, with reasoning.

**STOP.** Wait for user approval before modifying anything.

## Implementation (after approval)

Apply removals before additions — models default additive, subtract first to prevent growth. Convert plain file paths to `!path/to/file.md` inline injection where appropriate. Report net line-count change. Apply `/prompt` skill's design principles when rewriting.
