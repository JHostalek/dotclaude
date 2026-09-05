# Pull requests

Work from the repository root and write from the actual commits and diff against the target. Require a clean worktree unless the user explicitly requests otherwise. Update the branch's existing PR/MR instead of creating another. Push and set upstream before creating it.

Use a Conventional Commit title and an explicit body. Supply multiline text through a structured argument or body file. Rewrite updates from current branch state instead of appending to stale prose.

Use draft when requested, work is incomplete or exploratory, or risky changes lack verification. Otherwise use ready for review.

Required body sections:

- **Summary:** changed behavior, purpose, and the reviewer's main focus. Group broad changes by behavior or subsystem.
- **Verification:** observed checks, or `Not run: <reason>`.

Optional sections:

- **Review notes:** material tradeoffs, residual risk, rollout concerns, or skipped verification.
- **Architecture:** a before/after Mermaid diagram when data flow, control flow, ownership, or synchronization boundaries changed. Stack BEFORE above AFTER. Omit it when the system's shape is unchanged.

Keep the body proportional to reviewer effort. Use these four sections without placeholder checklists or a prose copy of the diff. For paired repository changes, cross-reference their PRs.

GitLab can request source-branch cleanup at MR creation with `--remove-source-branch`. GitHub's `--delete-branch` belongs to PR merging, which requires separate authorization outside end-to-end mode.

Report URL, title, branch, draft/ready state, and verification gaps.
