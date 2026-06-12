---
name: ux
description: Use when reviewing a user-facing page or flow for usability issues, confusion, friction, or missed UX principles.
argument-hint: [page path or URL]
---

page_path = $ARGUMENTS

page_path provided → focus on that page/component. Otherwise evaluate entire application UI.

## Approach

Match evaluation depth to scope: single component → 2-3 most relevant dimensions; full page → all 13; entire app → 3 highest-traffic flows first (full audit produces too many findings to act on).

Gather context from at least one source, in order of preference: live browser navigation, screenshots, code review. Combine when available.

Apply dimensions from [ui-evaluation.md](ui-evaluation.md).

## Output

### Scores

Rate each evaluated dimension 1-5 (1=broken, 5=excellent). Compact table. Overall UX score = average.

### Findings

**Critical** (blocks primary task): Issue → `file:line` → specific fix
**High** (major frustration): Issue → location → fix
**What Works**: Preserve these during fixes
**Low** (polish): Brief list

### Validation

For each critical/high fix: what to test (user action) and what success looks like (behavior or outcome).

After presenting, offer to implement top 3 critical/high fixes immediately.
