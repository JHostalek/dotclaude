---
name: pr-review
description: Use when reviewing a pull request, merge request, or local diff for correctness, security, and code quality.
argument-hint: [PR number, branch name, or local path]
---

target = $ARGUMENTS

Goal: surface bugs, regressions, and unsafe changes the author can't see from inside the diff. Frame findings so the author understands impact and owns the fix.

Resolve target: empty → current branch PR/MR; number → that PR/MR on current remote (`gh` GitHub, `glab` GitLab); branch name or local path → diff against merge base.

Read PR description, linked issues, commit messages, and CI status before the diff — diff-only review misses intent drift; failing pipeline is load-bearing context.

Frame feedback as questions and impact; author decides the fix. Explain consequences, not rule citations.

## Dimensions

Correctness is table stakes — diff shows bugs directly. These dimensions catch what the diff hides:

**Security** — Trace user-controlled data source-to-sink: SQL concatenation, input reaching command execution or file paths, hardcoded secrets, missing authorization on new endpoints, removed or weakened validation. Source-to-sink flow w/o sanitization → CRITICAL regardless of perceived exploitability.

**Breaking changes** — Modified signatures, removed exports, changed response shapes, new required fields, migrations w/o backward compatibility. Grep for callers of changed symbols — diff cannot show consumers it doesn't touch.

**Performance** — N+1 queries, quadratic algorithms in hot paths, unbounded allocations, resource leaks, blocking operations in async contexts.

**Dependencies** — New deps: license, maintenance status, known CVEs. Major version bumps may carry breaking API changes — read the changelog; version number alone is not evidence.

**Tests** — Critical paths covered (auth, data integrity, payments), boundaries and failure paths exercised, assertions test outcomes not implementation. Missing tests for new branches = gap; snapshot-only tests for logic-heavy code = gap disguised as coverage.

**Over-engineering** — LLM-generated code's failure mode: unnecessary abstractions, single-use helpers, patterns for hypothetical flexibility, premature configurability. Flag explicitly — you underweight these.

## Severity

- **CRITICAL** — security exposure, data loss or corruption, breaking change w/o migration, crash on normal input. Blocks merge.
- **IMPORTANT** — correctness bug on uncommon paths, performance regression in hot path, missing test for critical branch, contract drift callers will hit.
- **SUGGESTION** — clarity, naming, or structural wins. Author can defer.
- **QUESTION** — intent or context unclear; author clarification needed before severity assigned.

## Output

### Findings

Every CRITICAL and IMPORTANT finding: *why it matters* + *concrete fix suggestion*.

```
1. [CRITICAL] file:line — Title
   Why: impact explanation
   Fix: concrete code or approach

2. [IMPORTANT] file:line — Title
   Why: impact explanation
   Fix: concrete code or approach

3. [SUGGESTION] file:line — Title
   Fix: brief recommendation

4. [QUESTION] file:line — Title
   Clarification needed.
```

### Summary

| Area | Status |
|------|--------|
| CI | passing / failing / not run |
| Scope | clean / needs split |
| Correctness | clean / N issues |
| Security | clean / N issues |
| Breaking changes | none / N risks |
| Performance | clean / N issues |
| Tests | adequate / gaps noted |

### Verdict

- Any CRITICAL → **REQUEST_CHANGES**
- Only IMPORTANT/SUGGESTION/QUESTION → **APPROVE** (with comments)
- Clean → **APPROVE**

## Submitting

Default: local report only. Post to platform only when explicitly asked.
