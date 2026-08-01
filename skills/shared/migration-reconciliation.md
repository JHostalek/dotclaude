## Migration Reconciliation

Integrating a branch re-chains revision pointers in migration files but does NOT execute the target's new migrations against the local database. The DB version marker still holds the old revision — the app crashes at runtime on missing schema objects.

**Re-chain:** update the feature migration's parent revision to point to the target's chain tip. If the project tracks the migration head outside Alembic, locate and update that declaration in the repository configuration or migration tooling.

**Re-ID if non-monotonic.** Re-pointing `down_revision` alone is not sufficient. If the feature's own revision ID is now ≤ any upstream ID in the new chain, the chain violates monotonic-timestamp rules and silently breaks any DB already stamped at that ID — alembic reports head, skips the inserted middle, app crashes on missing columns. Fix: generate a fresh `date +%Y%m%d%H%M%S`, update `revision: str = …` inside the file, rename the file to match, update project head tracking.

**Verify chain:** run `alembic history` and confirm revision IDs are non-decreasing along the chain.

**Apply to local DB:**
- DB at target's tip → only the feature migration needs applying.
- DB at feature's old pre-integration revision → stamp to the fork point (stamp moves the pointer without executing destructive down-migrations), then upgrade.
- DB stamped at the feature revision but upstream migrations between fork and feature were inserted later → re-running the feature crashes. Stamp back to the fork point, `upgrade <last-upstream-rev>` (not `head`), then `stamp <feature-rev>`.
