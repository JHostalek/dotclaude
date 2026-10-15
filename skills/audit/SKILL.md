---
name: audit
description: Review code through focused dimensions grounded in software design books and personal criteria, with one independent agent per dimension.
argument-hint: "[full|dimension...] [path]"
disable-model-invocation: true
---

Audit `$ARGUMENTS` per [the review workflow](references/workflow.md), selecting dimensions from [the catalog](references/catalog.md). One reviewer per dimension, each over the whole requested scope. Read-only: report findings, change no code.

Examples: `/audit modularity`, `/audit contracts security src/auth`, `/audit necessity`, `/audit full`, `/audit ux /settings`.
