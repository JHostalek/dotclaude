---
name: audit-tests
description: Use when the user wants a thorough audit of the existing test suite — aggressively cutting tests that exist just to exist, rewriting weak ones to actually catch the bugs they should, identifying production code that is uncovered or thinly covered, and adding tests where coverage would catch real defects. Trigger on "audit tests", "find test bloat", "tests don't catch anything", or similar requests.
argument-hint: [path-glob or module name; empty for full sweep]
---

scope = $ARGUMENTS

Audit the tests in `$scope`. Bias hard toward cutting — a test earns its keep only if it catches context loss between changes or encodes domain knowledge the code itself can't express. Restated-behavior tests, getter/setter coverage, mock-the-world ceremonies, framework smoke checks, "it returns what I told it to return" — bloat. Cut them. Rewrite weak ones to actually catch the bugs they should, find production code that's uncovered or thinly covered, and add tests where coverage would catch real defects. When in doubt, delete. Use your own judgment about what counts as a smell, what's worth rewriting, and what's worth covering.
