---
name: handoff
description: Use mid-session to compact current state into a structured artifact so a fresh-context agent can resume the work. Trigger when context is filling, when pausing overnight, or when the user asks to checkpoint the session.
argument-hint: [short slug or ticket id, e.g. feat-auth or ENG-421]
---

slug = $ARGUMENTS

Write a structured artifact another agent can use to resume with clean context. This is **not** a chat transcript. It is pointers + learnings, optimized for re-hydration.

## When a handoff is worth writing

- Context window ≥ 50% used and work isn't done.
- Pausing the session (end of day, switching tasks).
- Work will continue in a new session (worktree, different machine).
- User asks to checkpoint.

If none of these, don't write one. Handoffs have a maintenance cost.

## Core discipline

**Pointers over payloads.** Use `file:line` references. Reject the instinct to paste code. The next agent will re-read the files — your job is to tell them which files and why.

**More information, not less** (within that constraint). The next agent has zero context. A short handoff that omits a gotcha is worse than a verbose one that includes it.

**Write for an amnesiac version of you.** If the handoff only makes sense to someone who was in this session, it's broken.

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
- **Phase:** <which plan phase, or "exploration" / "debugging">
- **State:** completed | wip | blocked
- **Blocker (if any):** <one line>

## Critical References

The 2–3 files the next agent MUST read before doing anything. Ranked.

1. <path> — <why it matters in one line>
2. <path> — <why>

## Recent Changes

`file:line` deltas from this session. Group by file.

- `src/auth/session.py:42-58` — added TTL check
- `tests/test_session.py:120` — new test for expired session path

## Learnings

Non-obvious things discovered during the session. The next agent must not rediscover these.

- <pattern, gotcha, root cause, dead-end tried>
- <API quirk, library version issue>
- <test infrastructure detail>

This section is load-bearing. A handoff without Learnings is just a file list.

## Artifacts

Everything the next agent should read to resume. Exhaustive.

- Plan: `docs/plans/<path>`
- Research: `docs/research/<path>`
- Tickets / issues: <link>
- Related PRs: <link>
- Relevant code files: <paths>

## Next Steps

Ordered. Each step references an artifact or file path.

1. <concrete next action>
2. ...

## Open Questions

Unresolved, human-gated, or not-yet-investigated. Do not speculate — list the question and where the next agent could start looking.

## Notes

Free-form. Environment state, running processes, uncommitted changes, anything that doesn't fit above.
```

## Save location

`docs/handoffs/<slug>/<YYYY-MM-DD_HH-MM-SS>_<short-desc>.md`

Timestamp to second resolution. Multiple handoffs per slug are expected; most recent wins. Never overwrite — always a new timestamped file.

Commit the handoff file. Handoffs are history; they live in git.

## Hand-off protocol

After writing, print to the user:

```
Handoff saved: <path>
Resume with: /resume <slug>
```
