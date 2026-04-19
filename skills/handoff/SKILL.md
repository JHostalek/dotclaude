---
name: handoff
description: Use mid-session to compact current state into a structured artifact so a fresh-context agent can resume the work. Trigger when context is filling, when pausing overnight, or when the user asks to checkpoint the session.
argument-hint: [short slug or ticket id, e.g. feat-auth or ENG-421]
---

slug = $ARGUMENTS

Structured artifact another agent uses to resume with clean context. Pointers + learnings, not a chat transcript.

## When to write one

- Context ≥ 50% and work isn't done.
- Pausing the session (end of day, task switch).
- Work continues in a new session (worktree, other machine).
- User asks to checkpoint.

Otherwise skip — handoffs have a maintenance cost.

## Core discipline

- **Pointers over payloads.** `file:line` references, not pasted code. The next agent re-reads the files; your job is to name which and why.
- **More information, not less** within that constraint. The next agent has zero context; omitting a gotcha is worse than verbosity.
- **Write for an amnesiac version of you.** If it only makes sense to someone who was in this session, it's broken.

## Required sections

```markdown
---
slug: <slug>
date: <YYYY-MM-DD HH:MM:SS>
branch: <git branch>
commit: <short sha>
worktree: <path if applicable>
---

# Handoff: <one-line task description>

## Status

- **Task:** <what we're building / fixing>
- **Phase:** <plan phase, or "exploration" / "debugging">
- **State:** completed | wip | blocked
- **Blocker (if any):** <one line>

## Critical References

2–3 files the next agent MUST read first. Ranked.

1. <path> — <why, one line>

## Recent Changes

`file:line` deltas from this session, grouped by file.

- `src/auth/session.py:42-58` — added TTL check

## Learnings

Non-obvious things from this session — patterns, gotchas, root causes, dead-ends tried, API quirks, library version issues, test infrastructure details. Load-bearing section; without it, the handoff is just a file list.

## Artifacts

Everything to read to resume. Exhaustive.

- Plan: `docs/plans/<path>`
- Research: `docs/research/<path>`
- Tickets / PRs: <link>
- Relevant code: <paths>

## Next Steps

Ordered. Each step references an artifact or file path.

1. <concrete action>

## Open Questions

Unresolved or human-gated. List the question and where the next agent could start.

## Notes

Free-form: environment state, running processes, uncommitted changes.
```

## Save location

`docs/handoffs/<slug>/<YYYY-MM-DD_HH-MM-SS>_<short-desc>.md`

Second-resolution timestamp. Multiple handoffs per slug expected; most recent wins. Never overwrite.

Commit the handoff — handoffs are history.

## Hand-off protocol

After writing, print:

```
Handoff saved: <path>
Resume with: /resume <slug>
```
