# dotclaude

skills for agentic coding tools. extremely opinionated. updated (almost) daily.

> **heads up:** this is a global `~/.claude` configuration repo — skills, hooks, and settings that apply across all projects. project-specific instructions (`CLAUDE.md`, `TOOLS.md`, skills) live in individual repositories.

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
| `audit` | full audit sweep — sequences every focused audit below |
| `audit-necessity` | question whether code should exist, cut maintenance cost |
| `audit-structure` | fix misplaced files, god-modules, leaky boundaries, layering violations |
| `audit-patterns` | unify divergent implementations, kill reimplementations |
| `audit-correctness` | hunt logic bugs — off-by-one, inverted conditions, boundary cases |
| `audit-error-handling` | hunt swallowed errors, missing awaits, unguarded entry points, resource leaks |
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

### hooks

| hook | |
|------|-|
| `approve-piped-bash` | auto-approves piped commands when every segment is already in your allowlist ([#1271](https://github.com/anthropics/claude-code/issues/1271)) |
| `auto-approve-all` | auto-approves all tool permission requests |
| `detect-skill-invocation` | type `/skillname` in a prompt, get the skill injected into context ([#19729](https://github.com/anthropics/claude-code/issues/19729)) |

## configuration

skills work out of the box, but some features require `settings.json` entries:

| setting | why |
|---------|-----|
| `env.CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS: "1"` | required for skills that spawn agent teams (`judge`, `design`, `audit`) |
| `permissions.additionalDirectories: ["~/.claude/skills"]` | lets teammates read skill files — needed if you symlink skills into `~/.claude/skills/` |

hook scripts ship in `hooks/` but must be wired in `settings.json` under the `hooks` key to take effect — see [Claude Code docs on hooks](https://docs.anthropic.com/en/docs/claude-code/hooks).

## install

### Claude Code plugin

Add the marketplace and install the plugin:

```text
/plugin marketplace add JHostalek/dotclaude
/plugin install jhostalek-skills@jhostalek
```

Skills are versioned with the plugin and invoked as
`/jhostalek-skills:<skill-name>`. The plugin intentionally contains skills
only; configure hooks separately if you want to use them.

### Editable standalone skills

```bash
# clone and symlink
git clone git@github.com:JHostalek/dotclaude.git ~/dotclaude
ln -s ~/dotclaude/skills/* ~/.claude/skills/

# or just copy what you need
cp -r skills/pr ~/.claude/skills/
```

## license

[CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) — public domain.
