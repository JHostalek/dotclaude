# UX Evaluation: 13 Baseline Dimensions

**Principle**: Fundamentals first, trends second. Master the basics before polish.

**Priority**: Always evaluate 1-10 first. Only evaluate 11-13 if relevant. "Ugly but works" beats "pretty but broken."

**Scoring**: Rate each dimension 1-5 (1=broken, 2=poor, 3=adequate, 4=good, 5=excellent).

**Coverage**: These dimensions anchor the review; they do not exhaust UX. Add, combine, split, or reweight dimensions for the product, domain, users, and context while preserving every applicable fundamental. Treat the checks under each dimension as prompts, not a completion checklist.

**Lineage**: Dimensions 1-10 map to Nielsen's 10 usability heuristics. Dimensions 11-13 extend into modern product expectations.

---

## Part 1: Fundamental Building Blocks (Always Evaluate)

### 1. Can users accomplish their primary task?
*Nielsen: Visibility of system status / Match between system and real world*

The most important question — if this fails, nothing else matters.

- Primary goal obvious and achievable?
- All necessary actions/features present?
- Critical path unblocked?
- No dead ends?

### 2. Do users understand what to do?
*Nielsen: Match between system and real world / Recognition rather than recall*

Clarity and affordance — can users figure out the interface without instructions?

- Controls obviously clickable/interactive?
- Labels clear (not jargon or ambiguous)?
- Purpose of each section obvious?
- Call-to-action visible?
- Icons recognizable (or labeled)?

### 3. Do users get feedback when they act?
*Nielsen: Visibility of system status*

Feedback loops — users need to know their actions had effect.

- Button click gives immediate response (visual change, loading indicator)?
- Form submission shows confirmation?
- Changes persist (saved, not lost)?
- Loading states present?
- Error messages clear and actionable?
- Success confirmations present?

### 4. Can users find what they're looking for?
*Nielsen: Recognition rather than recall / Flexibility and efficiency of use*

Information architecture and navigation.

- Navigation structure logical?
- Labels match user mental model (not internal jargon)?
- Important content/features easy to locate?
- Search works (if present)?
- Content grouped sensibly?
- Breadcrumbs or wayfinding clear?

### 5. Is the interface consistent?
*Nielsen: Consistency and standards*

Internal consistency — predictability reduces cognitive load.

- Same action looks/works same everywhere?
- Terminology consistent ("Delete" vs "Remove" — pick one)?
- Button styles consistent (primary, secondary, tertiary)?
- Layout patterns repeated?
- Color meanings consistent (red = error, green = success)?
- Design tokens/system used (not hardcoded one-off colors/spacing)?

### 6. Does it reduce or create cognitive load?
*Nielsen: Aesthetic and minimalist design / Recognition rather than recall*

Simplicity and mental effort.

- Information presented clearly (not overwhelming)?
- Choices limited to reasonable number (not paralysis)?
- Visual hierarchy obvious (what's important)?
- Unnecessary elements removed?
- Related info grouped together?
- Progressive disclosure (advanced features hidden until needed)?

### 7. Can users recover from mistakes?
*Nielsen: Error prevention / Help users recognize, diagnose, recover from errors*

Error prevention and recovery.

- Destructive actions hard to trigger accidentally?
- Confirmations for dangerous operations (Delete, Clear)?
- Undo available for non-trivial actions?
- Input validation prevents errors (not just catches after)?
- Smart defaults reduce mistakes?
- Clear error messages with recovery path?

### 8. Can ALL users access this?
*Nielsen: Flexibility and efficiency of use (extended)*

Accessibility fundamentals — not about compliance, about usability for everyone.

- Keyboard navigation works (tab through everything)?
- Text readable (sufficient contrast, not too small)?
- Color not sole indicator (colorblind users)?
- Form inputs properly labeled?
- Screen readers can navigate (semantic HTML)?
- Focus indicators visible?

Minimum standard: WCAG 2.2 AA (4.5:1 contrast for text, 3:1 for UI elements)

### 9. Does it handle edge cases and states?
*Nielsen: Error prevention / Help and documentation*

Real users encounter edge cases constantly.

Check all states:
- Loading (not blank screen)
- Empty (first use, zero results — not broken-looking)
- Error (message + recovery, not cryptic)
- Success (confirmation)
- Partial data (incomplete results)
- Slow/timeout (doesn't hang forever)

Other edge cases:
- Very long text (does layout break?)
- Missing data (graceful degradation?)
- Network issues (offline handling?)

### 10. Does it respect user context and flow?
*Nielsen: User control and freedom*

Journey continuity — users don't start fresh every interaction.

- Where they came from (back button works correctly)?
- State persists across navigation (no data loss)?
- Unsaved changes warning present?
- Return to previous location (not dumped to home)?
- Context maintained (filters, selections preserved)?

---

## Part 2: Modern Expectations (Context-Dependent)

### 11. Does it meet performance expectations?

- Loads reasonably quickly (not >5s)?
- Responds to interactions (not laggy)?
- Large operations show progress?
- Images/media optimized?

If performance-critical (consumer web, mobile): LCP <2.5s, INP <200ms, CLS <0.1

### 12. Does it handle specific domain needs?

**Mobile apps**: Touch targets 44×44px minimum, one-handed use, discoverable gestures
**Data-heavy apps**: Search/filters effective, appropriate visualization, export/bulk ops
**Real-time/collaborative**: Updates appear promptly, conflicts handled, presence indicators
**AI-powered apps**: Suggestions helpful not annoying, overridable, failures handled
**Privacy-sensitive**: GDPR/CCPA consent, transparent data collection, no dark patterns

### 13. Does visual craft support usability?

Polish that serves function, not decoration.

- Typography: max 2 font families, line-height 1.4-1.6 for body text, clear size hierarchy
- Spacing: consistent scale (not arbitrary pixel values)
- Color: semantic tokens used, not hardcoded values; palette limited (3-5 core colors)
- Content: real/representative content, not lorem ipsum or empty placeholders
- Responsive: layout adapts to viewport (if web)
- Dark mode: available and tested (if consumer app)
- Animations: smooth and purposeful, not gratuitous (if present)

---

## Context Adjustments

| Context | Priority | Notes |
|---------|----------|-------|
| B2B/Enterprise | Efficiency > delight | Data density OK, expert shortcuts critical |
| Consumer/Mobile | Simplicity, performance | Touch-first, polish matters |
| Internal Tools | Functionality > aesthetics | Can assume training |

<anti_patterns>
## Anti-Patterns (Always Flag)

**Fundamental violations**: No way to complete task, broken navigation, blank error screens, keyboard traps
**Dark patterns**: Hidden opt-out, fake urgency, disguised ads, bait-and-switch
</anti_patterns>
