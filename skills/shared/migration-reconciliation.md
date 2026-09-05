## Migration Reconciliation

Branch integration changes migration files without applying them to a database. Inspect the repository's migration conventions, revision graph, and actual database state before reconciling either.

For an unpublished feature migration in a repository that requires a linear chain, update its parent to the target's tip and update any separately tracked head. Preserve branching or merge revisions when the project uses them. Do not rewrite applied or shared migration identities as a routine conflict resolution.

Require increasing revision IDs only if the repository enforces that convention; [Alembic revision IDs](https://alembic.sqlalchemy.org/en/latest/tutorial.html) are not inherently timestamps. If a fresh ID is required for an unpublished migration, update the declaration, filename, references, and tracked head together. Validate the resulting graph with the project's tooling, such as `alembic history` and `alembic heads`.

For a running local database, compare its recorded revision with the schema and migrations already applied. Apply missing migrations only when their prerequisites and effects are established. Never infer unapplied migrations solely from a changed parent pointer.

Stamping changes the version marker without changing schema. Use it only when schema evidence proves the stamped revision accurately represents the database; do not automatically stamp backward or replay already-applied feature migrations. If reconciliation could duplicate effects, destroy data, or misrepresent schema state, report the mismatch and obtain the required decision before proceeding.
