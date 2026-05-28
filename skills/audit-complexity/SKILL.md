---
name: audit-complexity
description: Use when the goal is to reduce code size, remove unnecessary complexity, or simplify a module without removing user-facing behavior.
---

target_module = $ARGUMENTS

If no target module path provided, ask for one.

**Flags** (parse from $ARGUMENTS):
- `--tiers 1-3` — run only specified tier range
- `--files foo.py bar.py` — scope to specific files instead of full module

You are team lead for a distillation. You orchestrate file-distiller specialists; you do not write production code yourself. Your job: establish safety baseline, distribute work, do structural changes (Tier 6) the specialists can't do in isolation, resolve cross-file conflicts, enforce gates.

## Mission

Maximize net LOC reduction while maintaining or improving readability.

**Primary metric:** `git diff --stat` net line delta (negative = good).
**Hard constraint:** Tests pass. External behavior unchanged for auto-applied changes.

## Two Modes

- **Auto-fix** — anything preserving user-facing capabilities. File merges, abstraction collapses, test rewrites, internal API changes — behavior preserved + tests pass → just do it.
- **Propose** — user-facing capability removal only (endpoints, tools, CLI commands, features). You can't verify usage patterns → these need sign-off.

## Spawning File-Distillers

Teammate prompt: `${CLAUDE_SKILL_DIR}/agents/file-distiller.md`. Read it, spawn a teammate with the full content as their prompt, prepending the assignment:

```
You own `{file_path}` (and `{test_file_path}` if applicable).
Dead code scanner findings for this file: {findings or "none available"}
Tier restriction: {tier range or "all tiers"}

<full content of agents/file-distiller.md>
```

One file per teammate, assignments disjoint → concurrent edits don't collide. Run in parallel. Spawn in the working repo (no worktree isolation).

Spawn teammates rather than analyzing file-by-file yourself: a single context loses steam after easy wins, skims Tiers 2-5, declares "code is tight." One file per teammate forces each to justify its results. Your bias is to do the analysis yourself — resist it.

## Setup

Run tests first. Fail → stop; distillation requires a passing baseline.

Record baseline LOC. Run dead code scanner (`{dead_code}`) if available, distribute findings to relevant teammates.

Small modules (<500 LOC, <5 files): handle directly, no teammates.

## Tier 6 — Structural Simplification (Lead Only)

After teammates finish, do the cross-file work they can't do in isolation:

- **File merges** — single-function files into consumer. Thin `types.py`/`schemas.py`/`exceptions.py` into adjacent modules. Any non-`__init__.py` file under ~30 lines: question whether it should exist.
- **Abstraction collapse** — ABC/Protocol with one impl → delete ABC. Factory constructing one type → inline. Service class of static methods → module functions.
- **Solution simplification** — heavy library where stdlib suffices. Stateful class where a function would do.
- **Config knob removal** — knobs set to the same value in every environment.

Grep every reference and fix all imports in one pass. A scattered codebase compounds cost forever; a file merge costs one edit session — don't defer structural work. Run full lint + test suite after Tier 6.

## Report

Report `git diff --stat` and reduction percentage against baseline.

No user-facing features flagged → just report the stats. Otherwise:

```
## Auto-fix complete: -XX lines (tests pass)

Feature removal — needs your call:

1. **Remove submit_test_feedback tool** — only used during testing phase, never
   called in production. ~-40 lines. Risk: feature removal.

Which should I remove? (e.g., "1" or "all" or "none")
```
