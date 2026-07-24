---
name: audit-structure
description: Use when auditing repo topology in a scope — code grouped by type where the repo groups by feature, god-modules, misplaced files, leaky or missing module boundaries, layer-direction violations, import cycles, over-nesting. Triggers on "audit structure", "repo structure review", "fix module boundaries", "check layering", "files in the wrong place".
argument-hint: [path]
---

!`cat "${CLAUDE_SKILL_DIR}/../audit-workflow.md"`

Run as the `structure` dimension. Purpose: catch code in the wrong place — wrong module, wrong layer, wrong grouping — so that related changes stay co-located and module boundaries mean something.

**Establish the convention first**, and judge only against it — never an imported ideal. Priority order: (1) materialized policy — a written structure doc (`*structure*.md`, `ARCHITECTURE.md`, `CONTRIBUTING.md`) or enforcement config (import-linter, eslint boundaries, dependency-cruiser, ArchUnit); when one exists it is the authority, audit against its rules, don't reinvent a scheme. (2) Infer from what dominates: grouping axis (by-feature folders vs by-type `models/`+`routes/`+`services/`), the recurring file-role vocabulary, and layer direction from the import graph. Directory listings give shape; `git log` co-change is ground truth for what belongs together. Apply audit-patterns' >60% rule and its git-log recency heuristic — with the structural caveat that long-standing layout is more often load-bearing than long-standing code style.

<findings_scope>
Collect these placement and boundary failures — not size, not style.
- Feature scattered across by-type dirs when the repo groups by feature (or the reverse) — one change touches five folders.
- God-modules failing the proportionality test: one-sentence job, yet 5+ files or 3+ classes.
- Misplaced files; co-changing files split across the tree.
- Leaky boundaries: internals imported from outside instead of through the module's curated surface; re-export barrels duplicating that surface; public surface growing faster than real external consumers.
- Layer-direction violations (infra importing domain, pure helpers importing I/O, cross-domain coupling bypassing public surfaces) and import cycles.
- Cross-cutting code consuming 2+ domains buried inside one domain.
- Novel one-off file roles, empty stubs, depth past ~4 levels.
</findings_scope>

**Drop:** framework-mandated layouts (Next.js, Rails, Django) — conventions to respect; consistency in a by-type repo that is by-type throughout — only the outlier breaking the dominant grouping survives; size alone — thin/oversized file belongs to audit-complexity or audit-necessity, you own *placement and boundaries*; dynamically-resolved layouts (plugin dirs, registry walks, convention-scanned folders) that look misplaced but are wired by mechanism — confirm no loader depends on the path.

Apply in the direction the repo prefers: move to where co-change points, route through the existing public-surface convention, collapse a stray by-type split back into the feature folder, break a cycle by promoting the shared concept to a layer both may depend on. All import sites for a moved file must be updated in the same pass — partial moves leave the build broken. Where a structural linter or policy doc exists, extend its rules so the convention stays pinned.

<output_contract>
Auto-fix: behavior-preserving move/route/collapse with all references updated in one commit.
Sign-off required: tree-reshaping — re-grouping a directory, splitting or merging modules, changing the layer scheme — sketch the before/after tree as evidence before proceeding.
</output_contract>
