# UX review

page_path = $ARGUMENTS

page_path provided → focus on that page/component. Otherwise evaluate entire application UI.

## Approach

Match evaluation depth to scope: single component → the 2-3 most relevant dimensions; full page → every applicable fundamental; entire app → 3 highest-traffic flows first (a whole-app sweep produces more findings than anyone acts on). Every applicable fundamental gets evaluated even when another lens overlaps it.

Gather context from at least one source, in order of preference: live browser navigation, screenshots, code review. Combine when available.

Apply the dimensions below.

# UX Evaluation Dimensions

## Fundamentals

1. **Task completion** — critical path unblocked, no dead ends.
2. **Comprehension** — labels in the user's words, not internal jargon.
3. **Feedback** — every action visibly lands *and the change persists*; feedback that lies is worse than none.
4. **Findability** — grouping matches the user's mental model, not the data model.
5. **Consistency** — one term per concept; design tokens over one-off values.
6. **Cognitive load** — hierarchy makes importance obvious; progressive disclosure for advanced features.
7. **Error recovery** — destructive actions confirmed and undoable; validation prevents rather than scolds.
8. **Accessibility** — keyboard reaches everything, focus visible, semantic HTML, color never the sole indicator. Verify applicable contrast and target-size requirements against the current accessibility standard; distinguish normal text, large text, and UI components.
9. **States** — loading, empty (first-use and zero-results are different screens), error, success, partial data, timeout, very long text, missing data, offline.
10. **Context and flow** — back button correct, state and filters persist across navigation, unsaved-changes warning, return to origin not home.

## Modern expectations (when relevant)

11. **Performance** — progress shown for long operations. For web interfaces, assess current Core Web Vitals using measured field or lab data and label which is available.
12. **Domain needs** — mobile: touch targets appropriate to the platform and accessibility requirements, one-handed reach, discoverable gestures. Data-heavy: filters, bulk/export, visualization that fits the question. Real-time: conflict handling, presence. AI-powered: suggestions overridable, failures handled. Privacy-sensitive: GDPR/CCPA consent, transparent collection.
13. **Visual craft** (serving function, not decoration) — legible typography, clear hierarchy, consistent spacing and color tokens, real content, responsive layouts, and purposeful animation. Follow the product’s design system; personal taste is not a defect.

## Context weighting

| Context | Priority | Notes |
|---------|----------|-------|
| B2B/Enterprise | Efficiency > delight | Data density fine, expert shortcuts critical |
| Consumer/Mobile | Simplicity, performance | Touch-first, polish matters |
| Internal tools | Functionality > aesthetics | Can assume training |

<anti_patterns>
Always flag: no way to complete the task, broken navigation, blank error screens, keyboard traps. And dark patterns — hidden opt-out, fake urgency, disguised ads, bait-and-switch.
</anti_patterns>

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

Default to review only. Apply fixes only when explicitly requested; prior authorization in the calling workflow counts.
