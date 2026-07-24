---
name: audit-tests
description: Use when the user wants a thorough audit of the existing test suite — aggressively cutting tests that exist just to exist, rewriting weak ones to actually catch the bugs they should, identifying production code that is uncovered or thinly covered, and adding tests where coverage would catch real defects. Trigger on "audit tests", "find test bloat", "tests don't catch anything", or similar requests.
argument-hint: [path-glob or module name; empty for full sweep]
---

!`cat "${CLAUDE_SKILL_DIR}/../audit-workflow.md"`

Run as the `tests` dimension. Lens:

A test earns its keep only if it catches context loss between changes or encodes domain knowledge the code can't express; doubt → delete, and deletion is auto-fix. Bloat to cut: restated-behavior, getter/setter coverage, mock-the-world ceremonies, framework smoke checks, "returns what I told it to return", assertions mirroring implementation line-for-line.

Rewrite weak tests to catch the bug they nominally guard: tests passing against a broken implementation, asserting incidental output over contract, or so heavily mocked the unit under test never runs. Rewrite preserving intended behavior = auto-fix; rewrite changing which behavior is correct = sign-off.

Add tests where coverage would catch real defects in uncovered or thinly covered production code — critical paths (auth, money, data integrity), non-obvious edges, business rules, integration seams. Skip framework behavior and passthroughs. Prefer integration over mocked unit, behavior over implementation. Coverage for existing behavior = auto-fix.

Drop: absent tests for trivial passthroughs, missing unit test where an integration test already exercises the path, coverage gaps in throwaway/generated code. Green baseline before cutting = engine's concern, not a finding.
