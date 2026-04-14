---
name: conventional-commits
description: Reference skill for conventional commit format when writing or reviewing commit messages.
---

# Conventional Commits Specification v1.0.0

Reference: https://www.conventionalcommits.org/en/v1.0.0/

## Specification

1. Commits MUST be prefixed with a type (noun like `feat`, `fix`), followed by optional scope, optional `!`, and required colon and space.
2. The type `feat` MUST be used when a commit adds a new feature to your application or library.
3. The type `fix` MUST be used when a commit represents a bug fix for your application.
4. A scope MAY be provided after a type, consisting of a noun describing a codebase section surrounded by parenthesis, e.g., `fix(parser):`.
5. A description MUST immediately follow the colon and space after the type/scope prefix, providing a short summary of code changes.
6. A longer commit body MAY be provided after the short description, beginning one blank line after it.
7. A commit body is free-form and MAY consist of any number of newline-separated paragraphs.
8. One or more footers MAY be provided one blank line after the body. Each footer MUST consist of a word token, followed by either `:<space>` or `<space>#` separator, followed by a string value.
9. A footer's token MUST use `-` instead of whitespace characters, e.g., `Acked-by`. Exception: `BREAKING CHANGE`.
10. A footer's value MAY contain spaces and newlines; parsing MUST terminate when the next valid footer token/separator pair is observed.
11. Breaking changes MUST be indicated in the type/scope prefix or as a footer entry.
12. If in a footer, breaking change MUST consist of uppercase `BREAKING CHANGE`, followed by colon, space, and description.
13. If in the type/scope prefix, breaking changes MUST be indicated by `!` immediately before the `:`. If `!` is used, `BREAKING CHANGE:` MAY be omitted from the footer.
14. Types other than `feat` and `fix` MAY be used in commit messages.
15. Information units MUST NOT be treated as case-sensitive by implementors, except `BREAKING CHANGE` which MUST be uppercase.
16. `BREAKING-CHANGE` MUST be synonymous with `BREAKING CHANGE` when used as a footer token.

## Common Types

| Type | Purpose | SemVer |
|------|---------|--------|
| `feat` | New feature | MINOR |
| `fix` | Bug fix | PATCH |
| `docs` | Documentation only | - |
| `style` | Formatting, no code change | - |
| `refactor` | Code change, no feature/fix | - |
| `perf` | Performance improvement | - |
| `test` | Adding/correcting tests | - |
| `build` | Build system or dependencies | - |
| `ci` | CI configuration | - |
| `chore` | Other changes (no src/test) | - |

## Examples

```
feat(auth): add OAuth2 login flow

fix(parser): handle empty input arrays

feat!: remove deprecated API endpoints

BREAKING CHANGE: /v1/* endpoints removed

chore(deps): bump lodash to 4.17.21

docs: update README installation steps

refactor(api): extract validation middleware

Refs #123
Closes #456
```
