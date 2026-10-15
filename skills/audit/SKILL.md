---
name: audit
description: Review code through focused dimensions, with one independent agent per dimension.
argument-hint: "[full|dimension...] [path]"
disable-model-invocation: true
---

Audit `$ARGUMENTS` per [the review workflow](references/workflow.md). One reviewer per dimension, each over the whole requested scope. Read-only: report findings, change no code.

Dimensions, one file each in `references/`: abstractions, comments, complexity, consistency, contracts, correctness, data-integrity, error-handling, interfaces, logs, modularity, naming, necessity, performance, reliability, security, tests, ux.

Examples: `/audit modularity`, `/audit contracts security src/auth`, `/audit necessity`, `/audit full`, `/audit ux /settings`.
