# Releasing

Claude Code, Codex, and Pi always use the same semantic version.

- Patch: compatible corrections or wording improvements.
- Minor: new skills or substantial compatible behavior.
- Major: removed or renamed skills, or incompatible behavior.

## Release

1. Create a release branch from current `main`.
2. Run `node scripts/release.mjs set X.Y.Z`.
3. Add the dated release entry to `CHANGELOG.md`.
4. Merge the release change.
5. Update local `main`, then run `node scripts/release.mjs check vX.Y.Z`.
6. Run `git tag -a vX.Y.Z -m "Release vX.Y.Z"`.
7. Run `git push origin vX.Y.Z`.

The tag workflow verifies all three package manifests, confirms the tag is on
`main`, and creates the GitHub release.

## Reconstructed tags

The pre-release harness history maps to these commits:

| Tag | Commit | Milestone |
|---|---|---|
| `v0.1.0` | `32d3252` | Initial harness |
| `v0.2.0` | `a766673` | Principles rewrite |
| `v0.3.0` | `5d23637` | Expanded workflow set |
| `v0.4.0` | `3168e2b` | Audit suite |
| `v0.5.0` | `539f88a` | Opus 4.8 and worktree engine |
| `v0.6.0` | `969452f` | Fable 5 adaptation |
| `v0.7.0` | `15d6ffd` | Streamlined harness |
| `v1.0.0` | `7d62b8f` | Claude Code and Codex plugins |

These boundaries capture shipped harness states. They do not rewrite history.
