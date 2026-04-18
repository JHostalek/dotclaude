---
name: pr
description: Use when the user asks to create or update a pull request for the current branch.
---

Open a reviewable PR/MR for the current branch. The reviewer arrives cold — not a teammate who lived through the work, but someone handed an agent's output. The body is the only bridge between the agent's context and what the human needs to decide. Sections that don't serve that handoff don't belong.

## Before creating

- Commits must be on the remote. First push: `git push -u origin HEAD`.
- **Multi-repo work is one PR per repo.** `cd` into each repo root before the create command — git CLIs infer the remote project from cwd, not from arguments. Cross-reference paired PRs in the body.

## Conventional commits

!`cat ~/.claude/skills/conventional-commits.md`

## CLI invocation

`--fill` conflicts with explicit title/body in both `gh` and `glab`. Pass the body via heredoc.

| | Title | Body | Create | Cleanup flag |
|---|---|---|---|---|
| `gh` | `--title` | `--body` | `gh pr create` | `--delete-branch` |
| `glab` | `--title` | `--description` | `glab mr create` | `--remove-source-branch` |

Pass the cleanup flag so the source branch is removed on merge. A failed create can leave orphaned remote state — check `--help` before invoking unfamiliar flags.

Updating an existing PR: `gh pr edit --body` / `glab mr update --description` replace the body wholesale. Re-render the full body from truth, don't stitch onto the current one.

## PR body

Omit sections that don't apply. No placeholders, no filler — a `## Summary` with `[Description of changes]` is worse than no Summary at all.

- **Task** — issue link or one-line of what was asked.
- **Summary** — what + why. Approach chosen and why over alternatives: "X over Y because Z." 2–4 lines.
- **Changes** — one bullet per meaningful change, grouped by area. A change list, not a file list.
- **Self-Review** — what the agent verified (`[x]`) vs. couldn't (`[ ]`). Name the evidence per item. A weak entry reads "Tested the changes"; a strong one reads "`cargo test --workspace` passes" or "Performance under production load — needs staging test."
- **Human Review** — specific things where human judgment is load-bearing. Action items only.

### Template

```
$(cat <<'EOF'
## Task

## Summary

## Changes

-

## Self-Review

- [x]
- [ ]

## Human Review

- [ ]

EOF
)
```
