## Conflict Resolution

Resolve by intent, not by splicing text. High-risk shapes:

- **Lockfiles, migrations, config, version bumps** → accept the target version (latest agreed-upon state); regenerate lockfiles rather than hand-merging them.
- **Refactored-away code** → the target's removal wins; rewire usages to the new location/API.
- **Additive conflicts** (both sides add independent code) → keep both, then run the project's formatter/parser immediately. Conflict boundaries leave orphan closing tags, duplicate brackets, and stray blocks that grep misses and a parser catches.

**Partial survival check.** When a resolution keeps *usage* of a symbol (component, function, import), verify the *declaration* and *import* survived too — grep the resolved file for every feature-side symbol before continuing.
