# Commit conventions

Compare `git diff --cached` with `git diff HEAD` before staging. Establish ownership of existing staged changes; do not absorb unrelated work. Stage whole files when they belong to the requested change. If a file mixes unrelated work, resolve that scope before including it.

After a path-scoped `git commit -- <paths>` (`--only`), inspect the index: Git can restore pre-hook staging. Clear only confirmed residual staging for the committed paths with `git reset -q -- <paths>`.

If the changes conflict with the branch's apparent purpose, confirm the branch before committing. A generic branch name alone is not a mismatch.

Use `type(scope): imperative summary`; scope is optional. Describe intent and split unrelated changes into focused commits. Consult [Conventional Commits](conventional-commits.md) for breaking changes or footer syntax.
