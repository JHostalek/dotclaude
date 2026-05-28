---
name: audit-tests
description: Use when the user wants a thorough audit of the existing test suite — aggressively cutting tests that exist just to exist, rewriting weak ones to actually catch the bugs they should, identifying production code that is uncovered or thinly covered, and adding tests where coverage would catch real defects. Trigger on "audit tests", "find test bloat", "tests don't catch anything", or similar requests.
argument-hint: [path-glob or module name; empty for full sweep]
---

!`cat ~/.claude/skills/audit-workflow.md`

Run as the `tests` dimension. Lens:

Bias hard toward cutting. A test earns its keep only if it catches context loss between changes or encodes domain knowledge the code itself can't express. Bloat to delete: restated-behavior, getter/setter coverage, mock-the-world ceremonies, framework smoke checks, "it returns what I told it to return", assertions that mirror the implementation line for line. When in doubt, delete — deletion is auto-fix.

Rewrite weak ones to catch the bug they nominally guard: tests that pass against a broken implementation, assert on incidental output rather than the contract, or are so heavily mocked the unit under test never runs. A rewrite that preserves what the test was meant to verify is auto-fix; one that changes which behavior is considered correct is sign-off.

Find production code that's uncovered or thinly covered and add tests where coverage would catch real defects — critical paths (auth, money, data integrity), non-obvious edges, business rules, integration seams. Skip framework behavior and passthroughs. Prefer integration over mocked unit, behavior over implementation. Added coverage for existing behavior is auto-fix.

Don't flag: absent tests for trivial passthroughs, the lack of a unit test where an integration test already exercises the path, or coverage gaps in throwaway/generated code. A green baseline before cutting is the engine's concern, not a finding.
