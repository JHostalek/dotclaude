# Branch integration

Identify the target and commits ahead/behind, then perform the requested merge or rebase. Use the remote default branch when no target was supplied and that intent is clear.

For merge commits use `chore: merge <target> into <current-branch>`; put meaningful conflict decisions in the body. A squash-merged target can show commit divergence despite identical trees. Align to it only after confirming identical trees and a clean index/worktree; use `git reset --keep`, never discard local changes as routine cleanup.

Read [conflict guidance](../../shared/conflict-heuristics.md) when resolving conflicts. Read [migration reconciliation](../../shared/migration-reconciliation.md) when migration files change; a Git operation does not itself establish what has run in a database.

Run the repository's relevant checks after integration because merge/rebase paths may bypass commit hooks. Publish an explicitly requested merge or rebase unless the user limited it to local work. Use `--force-with-lease` when rewriting a published branch; a rejected lease requires inspecting the remote changes, not forcing over them.

Report applied/dropped commits, material conflict decisions, migration effects, and verification.
