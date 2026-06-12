# Color Method

Use this reference when you need more concrete help than the main skill provides.

## 1. Read Color As Behavior

Color may be carrying one or more of these jobs:
- atmosphere
- hierarchy
- action emphasis
- status and recovery
- navigation and current state
- category separation
- trust and seriousness
- warmth or approachability

Most interfaces fail when one color is trying to do too many jobs at once.

## 1.5 Appropriateness Principle

An effective color system fits the product, the audience, and the situation of use. The test: does it feel appropriate for this interface, support the trust level and energy the product needs, and hold up for the actual audience and context — not just look attractive in isolation.

Fit beats abstract theory. A palette can be harmonious and still feel wrong.

## 2. Describe The System Before You Build It

Write a plain-language brief first. A good brief sounds like:

- the interface should feel calm and exact, not cold
- most of the UI should stay neutral
- emphasis should be rare and confident
- warnings should feel serious without reading as catastrophic
- selected state should be clearer than info state

This description matters more than the first batch of values.

If the output keeps drifting toward generic design language, add a short avoid list as well:

- avoid feeling childish
- avoid startup-gradient cliches
- avoid washed-out enterprise grayness
- avoid decorative color that competes with the content

## 3. Relationship Grammar

Think in these relationships instead of preset palette types.

### Neutral backbone

- What color family should hold the majority of surfaces?
- Should it feel cool, warm, dry, soft, clinical, paper-like, inky, mineral, electric?
- How much hue bias can it carry before it starts becoming atmospheric noise?

### Emphasis distribution

- Where should the eye go first?
- How much of the interface is allowed to feel "active" at once?
- Which elements deserve the strongest contrast or chroma?

### Semantic distance

- How distinct should success, warning, danger, info, selected, and primary feel?
- Which distinctions matter most for this interface?
- Which states may share family resemblance and which must never collide?

Not every interface needs a large semantic state system. Some are organized more by atmosphere, emphasis, and brand than by status colors.

### State motion

Describe how a state should change, not only what color it should be.

Examples:
- hover gets slightly lighter and clearer
- active gets deeper and firmer
- disabled loses chroma and contrast together
- selected gets stronger separation from its surroundings but does not become a warning

### Theme relationship

If multiple themes exist, decide the relationship between them.

- Are they twins with different lightness structure?
- Is dark mode intentionally quieter and less saturated?
- Which emotional qualities must remain constant across themes?

## 3.5 Category Fit And Differentiation

Look at the visual territory around the product.

- What colors does the category repeatedly use?
- Which of those conventions help trust and recognition?
- Where is there room to differentiate without feeling inappropriate?

Differentiation is not mandatory. Sometimes familiarity is the right move. The important part is to choose consciously.

## 4. Use Color Math Where It Helps

Reason in `OKLCH` or another perceptual color space when possible.

Useful mental model:
- lightness = structure
- chroma = loudness
- hue = direction

Do not memorize exact numbers unless needed. The point is to think perceptually and adjust intentionally.

## 5. Scripts As A Color Workbench

Small deterministic scripts are helpful when the model knows what it wants but should not improvise the mechanics.

A helper script is optional. If the task is exploratory, highly taste-driven, or very small, reasoning and visual critique may be enough.

Good helper scripts:

### Ramp generator

Input:
- one or more anchor colors
- desired lightness range
- desired chroma behavior

Output:
- tonal variants or role candidates

Use when the relationship is known but the exact ladder should not be guessed freehand.

### Foreground pairing checker

Input:
- candidate surface colors
- contrast target

Output:
- likely text/icon colors and failures

Use when adding tinted surfaces, badges, alerts, hero sections, or soft state fills.

### State derivation helper

Input:
- a base color
- preferred movement rules for hover/active/disabled/selected

Output:
- deterministic variants to review and tune

Use when the desired behavior is clear but consistency matters across many components.

### Collision audit

Input:
- primary, info, success, warning, danger, selected, and chart colors

Output:
- warnings when families are too similar in hue, lightness, or chroma

Use when a UI starts feeling semantically blurry.

### Drift audit

Input:
- design tokens, CSS variables, component files, or screenshots

Output:
- places where the implemented system no longer matches the intended logic

Use when the palette works in principle but the shipped UI feels inconsistent.

### Token metadata helper

Input:
- token or role definitions

Output:
- optional structured notes such as intended use, avoid cases, contrast expectations, and likely component bindings

Use when formalizing a system so future agents or developers apply it consistently.

## 6. Scripts And Judgment — The Boundary

Scripts own: interpolation, validation, comparison, detection, repeatability. Keep design categories, emotional tone, restraint, hierarchy, trust, and visual character in plain-language reasoning — these require judgment, not calculation.

## 6.5 First-Impression Check

Before detailed analysis, do a quick pass:

- what lands in the first two seconds?
- what seems primary?
- what emotional tone lands immediately?
- does that match the product's intended character?

This catches failures that a token-perfect system can still have.

## 7. Observe The System On Real Surfaces

Never stop at swatches.

Review the colors on:
- body text and dense copy
- buttons and links
- input fields and focus rings
- alerts, badges, and validation
- tables, lists, and row states
- overlays and modals
- charts, legends, and annotations
- both common and edge-case content lengths

The same colors behave differently when used as:
- thin border
- background fill
- text on a neutral surface
- text on a tinted surface
- compact badge
- large panel

## 8. Failure Modes

### Everything feels flat

Usually means weak lightness structure. Improve separation between canvas, surface, raised surface, border, and text before adding more hue.

### Everything feels loud

Usually means too much chroma is carrying too much of the system. Pull saturation back, reduce tinted surfaces, and concentrate emphasis.

### Everything feels bland

Often a hierarchy problem, not a palette problem. Clarify where emphasis belongs before introducing more colors.

### The system feels childish

Often caused by too many bright categories, playful saturation, or too many simultaneous accents.

### The system feels muddy

Often caused by insufficient lightness separation, too many low-contrast tinted surfaces, or dark themes with too much residual chroma.

### The system works in concept but not in code

Look for drift: hardcoded values, outdated component variants, new local exceptions, missing foreground pairings, or chart colors leaking into UI chrome.

### The system is technically correct but emotionally wrong

The numbers may be clean while the interface still feels generic, mismatched, or over-designed. Restate the intended feeling in plain language and compare the UI against that statement, not only against the tokens.

## 9. Review Loop

Start by stating the intended feeling in plain language — this is the anchor every subsequent judgment is measured against. For each failure mode: decide whether the fix is judgmental (palette logic, hierarchy, emotional character) or mechanical (contrast math, ramp interpolation, state derivation). Mechanical fixes get a helper script; judgmental fixes stay in reasoning. Keep only changes that improve the intended feeling; roll back changes that clean numbers without improving the experience.

## 10. Validation Checklist

Before shipping, verify:

- text contrast holds on every important surface
- interactive states remain understandable without relying only on hue
- emphasis is concentrated where it matters
- semantic colors remain separable
- the system feels appropriate to the product and audience
- any differentiation from category norms feels intentional rather than random
- dark theme is reviewed on its own terms if present
- the system still works on small components and dense layouts
- helper-script output still matches the intended feeling
- implemented components actually consume the shared logic

If the system only works as an abstract palette, it is not ready.
