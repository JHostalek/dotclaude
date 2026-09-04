# dotclaude

skills for agentic coding tools. extremely opinionated. updated (almost) daily.

> **heads up:** this is a global `~/.claude` configuration repo — skills that apply across all projects. project-specific instructions (`CLAUDE.md`, `TOOLS.md`, skills) live in individual repositories.

## Skills and invocation

| Skill | Invocation | Purpose |
| --- | --- | --- |
| `git-workflow` | Automatic when relevant | Personal commit, PR, merge, rebase, and shipping conventions |
| `timesheet` | Automatic when relevant | Monthly work summary from Git history |
| `audit` | Explicit | Selected code/UX lenses or the full fourteen-dimension audit |
| `design` | Explicit | Competing approaches from independent explorers |
| `judge` | Explicit | Independent review of completed work |
| `plan` | Explicit | HTML implementation plan with an approval checkpoint |
| `sparring` | Explicit | Numbered question rounds over branches and shared dependencies |
| `sota` | Explicit | Short prompt for a current expert recommendation |
| `yeet` | Explicit | End-to-end Git workflow in the current checkout |

Automatic means the agent may load conventions for relevant work; it does not authorize additional actions. Explicit skills are user-invoked with `/name` in Claude or `$name` in Codex. Codex currently displays these linked skills as `jhostalek-skills:name` in its picker. Their entrypoints set Claude's `disable-model-invocation: true` and Codex's `policy.allow_implicit_invocation: false` in `agents/openai.yaml`.

Audit lenses are references, not separate skills: use `/audit security`, `/audit ux`, or `/audit full` (Codex: `$audit ...`). Only selected lenses load. Yeet's explicit `with audit` option uses the shared full-audit procedure; ordinary Git work does not start it.

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

For Codex, use `~/.codex/skills` as the link destination. SOTA and Yeet are
explicit shortcuts; Yeet delegates to Git workflow and adds a full audit only
when requested with `with audit`.

## contributing

this project is owned and maintained by me alone. issues and pull requests are not accepted.

## license

[CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) — public domain.
