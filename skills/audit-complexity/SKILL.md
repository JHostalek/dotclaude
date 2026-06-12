---
name: audit-complexity
description: Use when the goal is to reduce code size, remove unnecessary complexity, or simplify a module without removing user-facing behavior.
---

!`cat ~/.claude/skills/audit-workflow.md`

Run as the `complexity` dimension. Exists because LOC and abstraction count compound silently — each addition seems reasonable; the total becomes unnavigable. Lens:

Maximize net LOC reduction while readability holds or improves. Metric: `git diff --stat` delta. Hard constraint: behavior-preservation. Default = DELETE — every line justifies itself or goes. Auto-fix = anything behavior-preserving: file merges, abstraction collapses, internal API changes, test rewrites. Sign-off required only for user-facing capability removal (endpoints, tools, CLI commands, features) where usage can't be verified.

Pretraining biases toward keeping abstractions: ABCs, factories, service layers, config objects read as "professional." Wrong here — most abstractions in real code serve exactly one call site. Professional = minimal; ceremony = amateur. Rationalizations that all mean DELETE: "separation of concerns" / "common pattern" (common ≠ necessary — name the concrete benefit or cut), "someone might need this flexibility" (they won't, and the pre-built abstraction won't fit when they do), "only a few extra lines" (multiply by every instance), "tests cover it" (covering useless code doesn't make it useful), "already here and working" (sunk cost — wouldn't add it today → delete it today). Expect ≥15% removal from a genuinely bloated file; less signals early stopping.

Distillation depth, in yield order:

- **Dead code** (usually 50%+ of savings). Grep the *whole codebase* for callers — exports, tests, dynamic references — not just the module. Zero callers + zero coverage → delete, not comment out, not TODO. Caution: dynamically-discovered symbols are live with no static callers — Django models, Flask/decorator registries, React lazy imports, CLI command registries, plugin entry points.
- **Premature generalization.** Count concrete implementations. One → abstraction is dead weight. ABC/Protocol w/ one class → delete ABC. Factory building one type → inline. Service class of static methods → module fns. Pass-through wrapper → inline. Single-use util → inline.
- **Duplication.** Extract only at 4+ lines, 2+ occurrences, ≤2 params. Don't mint new abstractions while killing old ones.
- **Defensive bloat.** Exception re-wrap w/o added context. Null checks after non-nullable sources. Validation the framework already does (Pydantic/Zod/serde). Try/catch that logs and re-raises unchanged. Defensive copies nobody mutates.
- **Surface compression** (low yield, high count). Stale `# noqa:`, docstrings restating signatures, comments narrating the obvious, single-use intermediates, in-place-obvious constants, multi-line literals that fit on fewer lines.
- **Structural** (cross-file). File merges — single-function files into their consumer; thin `types.py`/`schemas.py`/`exceptions.py` into adjacent modules; any non-`__init__.py` file under ~30 lines: question whether it should exist. Abstraction collapse across modules. Heavy library where stdlib suffices; stateful class where a function would do. Config knobs set to the same value in every environment. Grep every reference and fix all imports in one pass.
- **Test pruning.** Tests for trivial code, files w/ 1–2 tests, test infra heavier than the code under test, tests mirroring implementation.

Never cut: logging lines, type annotations, user-facing schema descriptions, error messages carrying domain context, tests encoding business rules or integration contracts, framework-registered symbols (decorators, route handlers, model classes). ~3+ lines saved required to justify any readability cost. No fighting the formatter; no breaking encapsulation for LOC.
