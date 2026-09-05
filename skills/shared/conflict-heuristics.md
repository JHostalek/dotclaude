## Conflict Resolution

Resolve by intent, not by splicing text. High-risk shapes:

- **Lockfiles, migrations, config, version bumps** → use the target as the baseline, then preserve required feature-side changes. Reconcile migration history with the migration guide. Regenerate lockfiles from the resolved manifests rather than hand-merging them.
- **Refactored-away code** → preserve the intended refactor and rewire required feature behavior to its new location/API; verify the removal was intentional.
- **Additive conflicts** (both sides add independent code) → keep both, then run the project's formatter/parser immediately. Conflict boundaries leave orphan closing tags, duplicate brackets, and stray blocks that grep misses and a parser catches.

**Partial survival check.** When a resolution keeps *usage* of a symbol (component, function, import), verify the *declaration* and *import* survived too — grep the resolved file for every feature-side symbol before continuing.
