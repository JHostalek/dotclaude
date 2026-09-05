# Changelog

All notable harness changes are recorded here. Versions before `1.0.0` were
reconstructed from the repository history.

## [2.0.0] - 2026-09-05

- Reduce the public harness to nine skills with aligned Claude Code, Codex, and Pi packaging.
- **Breaking:** replace `audit-*` and `ux` commands with `audit <dimension>` and `audit ux`; use `audit full` for all fourteen code dimensions.
- **Breaking:** consolidate `commit`, `pr`, `merge`, and `rebase` into `git-workflow` modes. Remove Prompt, Transformer, Design Refiner, Native Business Copywriter, and Writing Identity.
- Require explicit invocation for every skill except Git workflow in Claude and Codex.
- Run Yeet in the current checkout, resume work after resolved blockers, and keep the full audit opt-in with `with audit`.
- Simplify design and judge delegation, retain plan's HTML approval artifact, and organize sparring into numbered branching rounds.
- Correct timesheet date boundaries, shared skill references, conflict resolution, and migration reconciliation.
- Replace redundant writing guidance with concise `WRITING.md` preferences and refresh installation and usage documentation.

## [1.4.0] - 2026-08-03

- Complete the full audit workflow with all fourteen focused dimensions.
- Centralize audit coordination, evidence, auto-fix, and completion rules.
- Add an agent execution layer to architecture-focused implementation plans.
- Preserve local changes during squash merge sync and harden yeet worktree cleanup.

## [1.3.0] - 2026-08-03

- Resolve plugin skill dependencies through the Codex registry before mutation.
- Skip the full audit by default; run it only when `with audit` is requested.
- Add explicit-invocation metadata for Codex.

## [1.2.0] - 2026-08-03

- Add the `yeet` end-to-end delivery workflow.
- Require implementation in a dedicated linked worktree.
- Sync the local default-branch worktree after merging.

## [1.1.0] - 2026-07-28

- Retune the skill corpus for Opus 5 behavior.
- Add contract, data-integrity, and reliability audits.
- Deepen the audit suite and implementation-plan contract.
- Publish the complete skill inventory to both plugin surfaces.
- Remove obsolete hooks and community templates.

## [1.0.0] - 2026-07-23

- Package the harness as installable Claude Code and Codex plugins.
- Add marketplace metadata for both plugin surfaces.
- Establish `jhostalek-skills` as the stable plugin identity.

## [0.7.0] - 2026-07-15

- Streamline the skill set and agent workflows.
- Add natural-voice rewriting guidance.
- Align documentation with the reduced public surface.

## [0.6.0] - 2026-06-12

- Adapt the harness to Fable 5.
- Replace standing orders with restraint-first guidance.
- Compress skill bodies into a terse, consistent register.

## [0.5.0] - 2026-05-28

- Retune the harness for Opus 4.8.
- Move the audit suite to parallel worktree execution.
- Consolidate migration and conflict guidance.

## [0.4.0] - 2026-05-17

- Establish the `audit-*` skill family and umbrella audit workflow.
- Add correctness, security, logging, performance, and test audits.
- Remove superseded skills and normalize audit behavior.

## [0.3.0] - 2026-03-20

- Add independent judgment and aggressive simplification workflows.
- Expand branch integration and review tooling.
- Normalize skill metadata and triggers.

## [0.2.0] - 2026-03-12

- Rewrite skills around principles instead of procedural scaffolding.
- Inline design methods and simplify review workflows.
- Normalize agent terminology and documentation.

## [0.1.0] - 2026-02-23

- Introduce the Claude Code configuration and initial skill harness.

[2.0.0]: https://github.com/JHostalek/dotclaude/compare/v1.4.0...v2.0.0
[1.4.0]: https://github.com/JHostalek/dotclaude/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/JHostalek/dotclaude/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/JHostalek/dotclaude/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/JHostalek/dotclaude/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/JHostalek/dotclaude/compare/v0.7.0...v1.0.0
[0.7.0]: https://github.com/JHostalek/dotclaude/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/JHostalek/dotclaude/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/JHostalek/dotclaude/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/JHostalek/dotclaude/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/JHostalek/dotclaude/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/JHostalek/dotclaude/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/JHostalek/dotclaude/releases/tag/v0.1.0
