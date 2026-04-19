---
name: resume
description: Use when resuming work from a prior session via a handoff artifact. Loads the most recent handoff for a slug, re-hydrates critical context, checks for codebase drift, and converts next steps into tasks.
argument-hint: [slug or explicit handoff path]
---

target = $ARGUMENTS

Pick up work from a prior session without losing fidelity. The prior agent left a structured handoff. Your job is to read it, verify it still matches reality, and continue.

## Locate the handoff

If `target` is a path to a handoff file, use it directly.

Otherwise treat `target` as a slug. List `docs/handoffs/<slug>/` and pick the most recent file by timestamp (lexicographic sort works because names are `YYYY-MM-DD_HH-MM-SS_*`). If multiple slugs match, ask which one.

If the directory doesn't exist, stop and ask the user — don't guess.

## Read in main context, not via subagent

Read the handoff **fully** in main context. Then read every file listed under **Critical References** and **Artifacts** — also fully, also in main context.

Do not delegate these reads. A subagent summary loses the `file:line` precision the handoff depends on. Cost is paid once; the token spend is why handoffs exist.

## Verify against reality

The handoff is a snapshot of state at write time. Between then and now:
- Other commits may have landed.
- Files referenced may have moved or been refactored.
- Tests may now pass or fail differently.
- Dependencies may have changed.

Spawn **parallel read-only** drift-check teammates (see `/research` explorer shapes):

1. **Git drift** — `git log <handoff-commit>..HEAD --oneline` + `git diff <handoff-commit>..HEAD --stat`. Report files touched since handoff that overlap with the handoff's Critical References or Recent Changes.
2. **Symbol drift** — for each `file:line` in Recent Changes, verify the symbol at that location is still what the handoff says. Report any mismatch.
3. **Test drift** — run the Automated Verification from the relevant plan phase (if any). Report pass/fail.

Wait for all. Do not edit anything in this phase.

## Classify state

| Scenario | Signal | Action |
|----------|--------|--------|
| **Clean resume** | No drift. Tests still pass as expected. | Proceed with Next Steps. |
| **Diverged codebase** | Files touched by other work. Conflicts plausible. | Report diff summary to user. Ask whether to rebase / merge / adapt plan before continuing. |
| **Stale handoff** | Recent Changes no longer exist where noted. Symbols moved. | Report specifics. Ask user whether to re-research before proceeding. |
| **Blocker still blocking** | Handoff status was `blocked`, blocker unchanged. | Report. Ask user to resolve or redirect. |

## Resume report

Print to the user before doing work:

```
Resumed: <handoff path>
Slug: <slug>  |  Branch: <branch>  |  Since handoff: <N commits, M files>

Status at handoff: <phase / state>
Drift check: <Clean | Diverged | Stale>
<details if not Clean>

Next steps from handoff:
1. <step>
2. <step>

Ready to proceed? (or describe how the plan should adapt)
```

## Convert next steps to tasks

On user approval, create TaskCreate entries for each Next Step. Assign ownership. Then begin work — typically by routing to `/code`, `/plan` (if the handoff was pre-plan), or `/research` (if the handoff's Open Questions need answering first).

## What resume is NOT

- Not a chat-history replay. Session tone, jokes, micro-decisions are intentionally lost. The handoff kept what matters.
- Not a blind continuation. Drift check is mandatory. A handoff trusted without verification is how you ship code on top of a file that no longer exists.
