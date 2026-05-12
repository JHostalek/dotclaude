---
name: test-audit
description: Use when the user wants a thorough audit of the existing test suite — finding redundant or smelly tests, rewriting weak ones to actually catch the bugs they should, identifying production code that is uncovered or thinly covered, and adding tests where coverage would catch real defects. Trigger on "audit tests", "find test bloat", "tests don't catch anything", or similar requests.
argument-hint: [path-glob or module name; empty for full sweep]
---

scope = $ARGUMENTS

Audit the tests in `$scope`. Find redundant or smelly tests and cut them, rewrite weak ones to actually catch the bugs they should, look at the production code for what is uncovered or thinly covered, and add tests where coverage would catch real defects. Use your own judgment about what counts as a smell, what's worth rewriting, and what's worth covering.
