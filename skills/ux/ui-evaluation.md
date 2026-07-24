# UX Evaluation Dimensions

Fundamentals first, trends second — "ugly but works" beats "pretty but broken". Evaluate 1-10 always; 11-13 only when relevant.

## Fundamentals (always)

1. **Task completion** — primary goal achievable, critical path unblocked, no dead ends.
2. **Comprehension** — controls read as interactive, labels use the user's words not internal jargon, CTA visible.
3. **Feedback** — every action visibly lands: loading states, confirmations, actionable errors, changes that persist.
4. **Findability** — navigation and grouping match the user's mental model; search works if present.
5. **Consistency** — same action looks and works the same everywhere; one term per concept; design tokens over one-off values.
6. **Cognitive load** — visual hierarchy makes importance obvious; choices bounded; progressive disclosure for advanced features.
7. **Error recovery** — destructive actions hard to trigger, confirmed, and undoable; validation prevents rather than scolds.
8. **Accessibility** — keyboard reaches everything, focus visible, semantic HTML, color never the sole indicator. **WCAG 2.2 AA: 4.5:1 text, 3:1 UI elements.**
9. **States** — loading, empty (first-use and zero-results), error, success, partial data, timeout. Plus very long text, missing data, offline.
10. **Context and flow** — back button correct, state and filters persist across navigation, unsaved-changes warning, return to origin not home.

## Modern expectations (when relevant)

11. **Performance** — progress shown for long operations. If performance-critical (consumer web, mobile): **LCP <2.5s, INP <200ms, CLS <0.1**.
12. **Domain needs** — mobile: **44×44px touch targets**, one-handed reach, discoverable gestures. Data-heavy: effective filters, appropriate visualization, bulk/export. Real-time: prompt updates, conflict handling, presence. AI-powered: suggestions overridable, failures handled. Privacy-sensitive: GDPR/CCPA consent, transparent collection.
13. **Visual craft** (serving function, not decoration) — **max 2 font families, body line-height 1.4-1.6, 3-5 core colors**, consistent spacing scale, semantic color tokens, real content not lorem ipsum, responsive, dark mode if consumer, animation purposeful.

## Context weighting

| Context | Priority | Notes |
|---------|----------|-------|
| B2B/Enterprise | Efficiency > delight | Data density fine, expert shortcuts critical |
| Consumer/Mobile | Simplicity, performance | Touch-first, polish matters |
| Internal tools | Functionality > aesthetics | Can assume training |

<anti_patterns>
Always flag: no way to complete the task, broken navigation, blank error screens, keyboard traps. And dark patterns — hidden opt-out, fake urgency, disguised ads, bait-and-switch.
</anti_patterns>
