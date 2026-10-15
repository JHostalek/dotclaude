---
name: audit
description: Review code through focused dimensions grounded in software design books and personal criteria, with one independent agent per dimension.
argument-hint: "[full|dimension...] [path]"
disable-model-invocation: true
---

Audit `$ARGUMENTS` using [the review workflow](references/workflow.md). Select dimensions from [the catalog](references/catalog.md). Each reviewer reads one dimension and reviews the whole requested scope. Report findings without changing code.

Examples: `/audit modularity`, `/audit contracts security src/auth`, `/audit necessity`, `/audit full`, `/audit ux /settings`.
