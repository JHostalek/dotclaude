# dotclaude

opinionated software-engineering skills for Claude Code and Codex. install them
as a plugin or copy individual skills into your user configuration.

### build

start here. `sparring` pressure-tests a proposal, `design` explores alternatives, and `plan` turns the selected direction into an implementation-ready design document.

| skill | |
|-------|-|
| `sparring` | adversarial pressure-test a proposal before committing |
| `design` | divergent exploration with independent reasoning agents |
| `plan` | reviewed implementation-ready design documents |

### quality

before you ship. review what you built, refactor what's messy, audit what's bloated or stale.

| skill | |
|-------|-|
| `judge` | independent expert review before accepting work |
| `audit` | full baseline audit sweep in parallel worktrees |
| `audit-necessity` | question whether code should exist, cut maintenance cost |
| `audit-structure` | fix misplaced files, god-modules, leaky boundaries, layering violations |
| `audit-patterns` | unify divergent implementations, kill reimplementations |
| `audit-correctness` | hunt logic bugs — off-by-one, inverted conditions, boundary cases |
| `audit-error-handling` | hunt swallowed errors, missing awaits, unguarded entry points, resource leaks |
| `audit-contracts` | check API, schema, event, CLI, and integration compatibility |
| `audit-data-integrity` | check invariants, writes, migrations, precision, and drift |
| `audit-reliability` | check timeouts, retries, partial failure, recovery, and shutdown |
| `audit-logs` | fix missing observability, INFO bloat, wrong-level messages |
| `audit-perf` | catch N+1, overfetching, blocking hot paths, unbounded growth |
| `audit-security` | injection, auth/authz gaps, secrets, weak crypto, OWASP |
| `audit-tests` | find redundant/weak tests, cover uncovered code |
| `audit-complexity` | maximize LOC reduction |
| `audit-comments` | strip stale or bloated comments and docstrings |
| `ux` | UI evaluation across Nielsen's heuristics |

### ship

git workflow from branch to PR to merge.

| skill | |
|-------|-|
| `commit` | conventional commits + push |
| `pr` | create or update a reviewable PR |
| `merge` | merge branch into current, resolve conflicts |
| `rebase` | rebase branch onto target, resolve conflicts |
| `timesheet` | monthly work summary from git |

### improve

sharpen prompts, skills, and communication.

| skill | |
|-------|-|
| `prompt` | create and refine LLM system prompts |
| `transformer` | rewrite skills for reasoning model performance |
| `design-refiner` | turn UI build requests into expert design briefs |
| `writing-identity` | rewrite communication in the user's natural voice |

## requirements

parallel skills use built-in [subagents](https://code.claude.com/docs/en/agents).
they do not require experimental
[agent teams](https://code.claude.com/docs/en/agent-teams) or its environment
flag.

## install

### Codex plugin

Add the marketplace and install the plugin:

```bash
codex plugin marketplace add JHostalek/dotclaude
codex plugin add jhostalek-skills@jhostalek
```

### Claude Code plugin

Add the marketplace and install the plugin:

```text
/plugin marketplace add JHostalek/dotclaude
/plugin install jhostalek-skills@jhostalek
```

Skills are versioned with the plugin and invoked as
`/jhostalek-skills:<skill-name>`. The plugin contains skills only.

### Editable standalone skills

```bash
# clone and symlink
git clone git@github.com:JHostalek/dotclaude.git ~/dotclaude
mkdir -p ~/.claude/skills
ln -s ~/dotclaude/skills/* ~/.claude/skills/

# or just copy what you need
cp -r skills/pr ~/.claude/skills/
```

## license

[CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) — public domain.
