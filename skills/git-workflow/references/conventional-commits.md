---
name: conventional-commits
description: Conventional Commit syntax for writing or reviewing commit messages.
---

Use `type(scope)!: imperative summary`; scope and `!` are optional. Use `feat` for a feature and `fix` for a bug fix. Other types: `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.

Separate an optional body and footers with blank lines. Footer syntax is `Token: value` or `Token #value`; replace spaces in tokens with hyphens. `BREAKING CHANGE` is the exception, and `BREAKING-CHANGE` is equivalent. A footer value ends when the next valid footer begins.

Mark a breaking change with `!` before the colon or a `BREAKING CHANGE: description` footer. `BREAKING CHANGE` must be uppercase; other syntax is case-insensitive.

Under SemVer, `feat` implies a minor release, `fix` a patch, and a breaking change a major release. Other types imply no version bump on their own.

[Specification](https://www.conventionalcommits.org/en/v1.0.0/)
