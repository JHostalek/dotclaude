# Pull requests

Work from the repository root and write from the actual commits and diff against the target. Require a clean worktree unless the user explicitly requests otherwise. Update the branch's existing PR/MR instead of creating another. Push and set upstream before creating it.

Use a Conventional Commit title. Supply the multiline body through a structured argument or body file. Rewrite updates from current branch state instead of appending to stale prose.

Use draft when requested, work is incomplete or exploratory, or risky changes lack verification. Otherwise use ready for review.

For paired repository changes, cross-reference their PRs.

GitLab can request source-branch cleanup at MR creation with `--remove-source-branch`. GitHub's `--delete-branch` belongs to PR merging, which requires separate authorization outside end-to-end mode.

Report URL, title, branch, draft/ready state, and verification gaps.

## Body

Use this template. Keep prose brief, and use the domain language from `GLOSSARY.md`.

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

Pick the smallest view that makes the key point clear, and place each visual next to the short text it supports:

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

Keep only the calls, files, props, states, and boundaries the reviewer needs. One or two views usually suffice.

### Evidence

Show concrete before and after proof that the change works. Screenshots rank highest for visual changes when the environment supports them. Execution evidence comes next: test results or console output, naming the exact test that failed before and passes after, as pseudocode. With no evidence, write `Not run: <reason>`.

### Merge Danger

A two-way door can be walked back; a one-way door cannot. Destructive actions and hard-to-reverse decisions are one-way doors. Cheap rollback means lower risk.

Blast radius is the scope of potential impact: layout shift, consumer breakage, mobile responsiveness, and the like. Consider every affected surface.

Body template adapted from Matt Pocock's [`pr` skill](https://github.com/mattpocock/skills/tree/main/skills/engineering/pr) (MIT), whose Summary visuals come from Dex Horthy's [`show-me`](https://github.com/humanlayer/skills/blob/main/plugins/show-me/skills/show-me/SKILL.md).
