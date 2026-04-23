---
name: resume-session
description: Use when resuming work from a prior session via a handoff artifact. Loads the most recent handoff for a slug, re-hydrates critical context, checks for codebase drift, and converts next steps into tasks.
argument-hint: [slug or explicit handoff path]
---

target = $ARGUMENTS

Pick up prior work without losing fidelity. Read the handoff, verify it still matches reality, continue.

## Locate the handoff

If `target` is a path, use it. Otherwise treat as slug: list `docs/handoffs/<slug>/` and pick the most recent file (lexicographic sort; names are `YYYY-MM-DD_HH-MM-SS_*`). Multiple slugs match → ask. Directory missing → stop and ask.

## Read in main context

Read the handoff **fully** in main context, then every file under **Critical References** and **Artifacts** — also fully, also in main context. Subagent summaries lose the `file:line` precision the handoff depends on.

## Verify against reality

Handoff is a snapshot at write time. Two-stage drift check — cheap checks before user confirms direction, expensive ones after:

**Pre-approval (always run, parallel read-only teammates):**

1. **Git drift** — `git log <handoff-commit>..HEAD --oneline` + `--stat`. Report files touched since that overlap with Critical References or Recent Changes.
2. **Symbol drift** — for each `file:line` in Recent Changes, verify the symbol is still what the handoff says.
3. **Plan state** — if handoff's Artifacts reference a plan, read it in main context. Report frontmatter `status:` and first unchecked `- [ ]` Automated or Manual box. This is the real "where we are"; git inference is a proxy.

**Post-approval (after user confirms continuation):**

4. **Test drift** — run Automated Verification for the current phase. Expensive suites burn tokens on abandoned resumes; defer until the user has acknowledged direction.

No edits in this phase.

## Classify state

| Scenario | Signal | Action |
|----------|--------|--------|
| **Clean resume** | No drift. | Proceed with Next Steps. |
| **Diverged codebase** | Files touched by other work. | Report diff summary. Ask whether to rebase/merge/adapt. |
| **Stale handoff** | Recent Changes no longer where noted. | Report specifics. Ask whether to re-research. |
| **Blocker still blocking** | Status was `blocked`, blocker unchanged. | Report. Ask user to resolve or redirect. |

## Resume report

```
Resumed: <handoff path>
Slug: <slug>  |  Branch: <branch>  |  Since handoff: <N commits, M files>

Status at handoff: <phase / state>
Drift check: <Clean | Diverged | Stale>
<details if not Clean>

Next steps from handoff:
1. <step>

Ready to proceed? (or describe how the plan should adapt)
```

## Convert next steps to tasks

On approval, `TaskCreate` per Next Step. Then route to `/code`, `/plan` (handoff was pre-plan), or `/research` (Open Questions block work).

Drift check is mandatory — a handoff trusted without verification is how you ship code on top of a file that no longer exists.
