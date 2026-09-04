# dotclaude

skills for agentic coding tools. extremely opinionated. updated (almost) daily.

> **heads up:** this is a global `~/.claude` configuration repo — skills that apply across all projects. project-specific instructions (`CLAUDE.md`, `TOOLS.md`, skills) live in individual repositories.

### build

start here. `sparring` examines a position through Socratic inquiry, `sota` finds a current expert recommendation, `design` explores alternatives, and `plan` turns the selected direction into an implementation-ready design document.

| skill | |
|-------|-|
| `sparring` | Socratic inquiry in rounds, with branching exploration |
| `sota` | current expert recommendation grounded in brief web research |
| `design` | divergent exploration with independent reasoning agents |
| `plan` | reviewed implementation-ready design documents |

### quality

before you ship. review what you built, refactor what's messy, audit what's bloated or stale.

| skill | |
|-------|-|
| `judge` | independent expert review before accepting work |
| `audit` | hunt bugs, cut unnecessary code, review usability |

use `/audit <dimension> [path]` for a focused pass, `/audit full` for all fourteen code dimensions, or `/audit ux` for usability. scope defaults to changed files. add `review only` to skip fixes. UX defaults to review only.

### ship

git workflow from branch to PR to merge.

| skill | |
|-------|-|
| `git-workflow` | commit, PR, merge, and rebase conventions |
| `yeet` | implement through PR merge in the current checkout |
| `timesheet` | monthly work summary from git |

add `with audit` to `yeet` for a full audit before merge.

### when they run

in Claude and Codex, `git-workflow` and `timesheet` load automatically when relevant. the other seven skills require explicit invocation.

use `/name` for standalone skills in Claude, or select the skill with `$` in Codex.

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

### Pi package

Install directly from Git:

```bash
pi install git:github.com/JHostalek/dotclaude
```

Invoke skills as `/skill:<skill-name>`. Use `pi update --extensions` to update
the package.

### releases

Claude Code, Codex, and Pi share one semantic version. Releases use annotated
`vMAJOR.MINOR.PATCH` tags and are recorded in [CHANGELOG.md](CHANGELOG.md).
See [RELEASING.md](RELEASING.md) for the release procedure.

### Editable standalone skills

Symlink the skills you use from the source checkout:

```bash
git clone git@github.com:JHostalek/dotclaude.git ~/dotclaude
mkdir -p ~/.claude/skills
ln -s ~/dotclaude/skills/git-workflow ~/.claude/skills/git-workflow
```

For Codex, use `~/.codex/skills` as the link destination.

## contributing

this project is owned and maintained by me alone. issues and pull requests are not accepted.

## license

[CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) — public domain.
