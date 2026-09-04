# dotclaude

skills for agentic coding tools. extremely opinionated. updated (almost) daily.

> **heads up:** this is a global `~/.claude` configuration repo — skills that apply across all projects. project-specific instructions (`CLAUDE.md`, `TOOLS.md`, skills) live in individual repositories.

### build

start here. `sparring` examines a position through Socratic inquiry, `sota` finds a current expert recommendation, `design` explores alternatives, and `plan` turns the selected direction into an implementation-ready design document.

| skill | |
|-------|-|
| `sparring` | question assumptions in rounds, follow branches, revisit conclusions when the premise changes |
| `sota` | current expert recommendation grounded in brief web research |
| `design` | competing approaches from independent agents, with the trade-offs exposed |
| `plan` | one HTML implementation plan to review and approve before coding |

### quality

before you ship. review what you built, refactor what's messy, audit what's bloated or stale.

| skill | |
|-------|-|
| `judge` | independent review of the approach, including whether a simpler one would work |
| `audit` | hunt bugs, question unnecessary code, fix validated findings. fourteen code lenses, plus UX |

pick the audit you need. `/audit security src/auth` checks security. `/audit ux /settings` reviews usability. `/audit full` runs every code lens. scope defaults to changed files; ask explicitly for the whole repo. add `review only` when you want findings without fixes. UX defaults to review only.

### ship

git workflow from commit to PR. `yeet` takes it through merge.

| skill | |
|-------|-|
| `git-workflow` | commit, PR, merge, and rebase conventions. follows the operation you asked for |
| `yeet` | implement, check, commit, push, open the PR, merge, delete the remote branch. stay in the current checkout |
| `timesheet` | monthly work summary from git, grouped by day and stripped of noise |

add `with audit` to `yeet` when you want the full audit before merge. SOTA and Yeet are typing shortcuts. that's enough reason to keep them.

### when they run

`git-workflow` and `timesheet` load automatically when relevant. everything else is yours to invoke. an ordinary task should not turn into an audit, a panel of reviewers, or a planning session because the agent felt like it.

use `/name` for standalone skills in Claude, or pick the skill with `$` in Codex. Codex may show the `jhostalek-skills:` prefix. automatic loading applies conventions to the requested work; it does not grant permission to ship it. invocation controls are set for both Claude and Codex.

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

Link skill directories from the source checkout so their references stay attached
and source edits take effect without another copy. For example:

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
