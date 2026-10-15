# Pull requests

Work from the repository root; write from the actual commits and diff against the target. Require a clean worktree unless the user explicitly waives it. Update the branch's existing PR/MR; never open a second. Push and set upstream before creating.

Title: Conventional Commit. Pass the multiline body as a structured argument or body file. On update, rewrite the body from current branch state; don't append to stale prose.

Draft when requested, incomplete, exploratory, or risky and unverified; otherwise ready for review.

Paired changes across repositories: cross-reference their PRs.

GitLab: `--remove-source-branch` requests source-branch cleanup at MR creation. GitHub: `--delete-branch` is a merge flag; merging needs separate authorization outside end-to-end mode.

Report URL, title, branch, draft/ready state, verification gaps.

## Body

Use this template. Brief prose; domain language from `GLOSSARY.md`.

```markdown
## Summary

<diagram, diff-sketch, or tree>

## Evidence

- **Before:** <screenshot/output/failing test run>
  **After:** <screenshot/output/passing test run>

## Merge Danger

**Door:** <one-way or two-way>

<optional: description>

**Blast Radius:** <one-word description>

<optional: potential ramifications of merge>
```

### Summary

Pick the smallest view that makes the key point; place each visual beside the short text it supports:

- **Pseudocode** for logic or an algorithm.
- **Call tree** for runtime control flow.
- **Component tree** for UI structure, with the state and module boundaries that matter.
- **Shallow file tree** for file responsibility or a broad refactor.
- **Mermaid** for component interaction, control flow, or data flow.
- **`diff`** of any of these views when the surrounding shape already exists and the point is what changes:

  ```diff
   submitForm
     createSession
       persistPrompt
  +    expandSkillMention
       launchAgent
  ```

- **Whole code block** when most of it is new, omitted context would hide ownership or order, or the reviewer needs a copyable target shape.

Include only the calls, files, props, states, and boundaries the reviewer needs. One or two views usually suffice.

### Evidence

Show concrete before/after proof the change works. Rank: screenshots first for visual changes, if the environment supports them; then execution evidence (test results or console output), naming the exact test that failed before and passes after, as pseudocode. No evidence: write `Not run: <reason>`.

### Merge Danger

Two-way door: reversible. One-way door: not; includes destructive actions and hard-to-reverse decisions. Cheap rollback means lower risk.

Blast radius: scope of potential impact (layout shift, consumer breakage, mobile responsiveness, etc.). Consider every affected surface.

Body template adapted from Matt Pocock's [`pr` skill](https://github.com/mattpocock/skills/tree/main/skills/engineering/pr) (MIT), whose Summary visuals come from Dex Horthy's [`show-me`](https://github.com/humanlayer/skills/blob/main/plugins/show-me/skills/show-me/SKILL.md).
