---
name: worktree
description: Use when starting new feature work that should happen in an isolated git worktree on its own branch.
argument-hint: <task description or branch name>
allowed-tools: Bash
---
input = $ARGUMENTS

## Branch Name

Derive from user input (ask if missing). Default format: `<type>/<kebab-description>` using conventional commit types (`feat` when ambiguous). **Check `git branch` first** — if the repo uses a different convention (e.g., `feature/JIRA-123-desc`), match it.

Show the derived name before proceeding.

## Worktree Location

- `{repo_root}/.claude/worktrees/{branch_slug}` where `branch_slug` replaces `/` with `-`
- `repo_root` = `git rev-parse --show-toplevel`
- Ensure `.claude/worktrees/` exists and is in `.gitignore`

## Base Branch

Branch from the latest remote default, not from `HEAD` — `HEAD` can be stale or on an unrelated branch, silently seeding the worktree with the wrong history.

1. Detect default: `git symbolic-ref refs/remotes/origin/HEAD | sed 's|refs/remotes/origin/||'` (fallback: try `main`, then `master`)
2. Fetch: `git fetch origin {default_branch}`
3. Create: `git worktree add -b {branch} {directory} origin/{default_branch}`

If the branch already exists: `git worktree add {directory} {branch}` (no `-b`).

After creation, symlink gitignored files so the worktree runs without a reinstall:
```
bash ~/.claude/skills/worktree/scripts/symlink-gitignored.sh {repo_root} {directory}
```

## Output

Show: worktree path, `claude --cwd {directory}` command, reminder to use `/worktree-clean` when done, and `git worktree list`.
