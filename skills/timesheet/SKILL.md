---
name: timesheet
description: Format a requested monthly work summary from Git commits using personal timesheet conventions.
disable-model-invocation: false
---

Generate a markdown table of the current user's git commits for the requested month, defaulting to the current month.

## Data Collection

Repo in working directory. Scope: requested month, defaulting to the current month (1st → now), current user only — filter by `git config user.name`.

Use local calendar boundaries: midnight on the first day of the requested month through the current time, or the next month’s midnight for a completed month. Calculate dates with calendar-aware arithmetic. Filter the author name literally and exclude merge commits; never construct an invalid date by incrementing the day number.

## Output Format

Markdown table, one row per day with commits:

| Day | Summary |
|-----|---------|
| **DD.MM.** | Short summary of work themes |

## Summary Style

Write like personal shorthand — work-log note, not PR description.

- **Group by theme**, not by commit. "knowledgebase + RAG tools" over listing each commit separately.
- **Target 10-20 words per day** (minimum 8, retaining useful context).
- **Skip noise**: lint fixes, merge commits, trivial reformats — unless they represent significant effort.
- **Terse phrasing**: "form table extraction + compliance" not "Added form table extraction feature and implemented compliance checks."
