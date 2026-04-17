# Opus 4.7 behavior & prompting reference

Trimmed from Anthropic's official migration guide — API plumbing, code samples, and migration checklists removed. What remains is the behavioral and prompting signal relevant when authoring skills, prompts, or CLAUDE.md content targeting Opus 4.7.

## Effort levels

The `effort` parameter tunes intelligence vs. token spend. Expect effort to matter more on Opus 4.7 than on any prior Opus — experiment actively.

- **`max`:** Can deliver gains on some tasks but shows diminishing returns and may overthink. Test for intelligence-demanding work.
- **`xhigh`** *(new)*: Best setting for most coding and agentic use cases.
- **`high`:** Balanced. Minimum recommended for most intelligence-sensitive use cases.
- **`medium`:** Cost-sensitive workloads willing to trade intelligence.
- **`low`:** Short, scoped, latency-sensitive, non-intelligence-sensitive tasks only.

## Behavior changes vs. Opus 4.6

These are not API-breaking but typically require prompt updates or scaffolding removal.

1. **Response length varies by task complexity.** 4.7 calibrates length to judged complexity rather than a fixed verbosity. Shorter on lookups, longer on open-ended analysis. If you depend on a specific style or verbosity, tune explicitly — e.g., "Provide concise, focused responses. Skip non-essential context, and keep examples minimal." Positive examples of target concision outperform negative instructions.

2. **More literal instruction following.** 4.7 interprets prompts more literally and explicitly than 4.6, especially at lower effort. It will not silently generalize an instruction from one item to another and will not infer requests you didn't make. Upside: precision, less thrash, better behavior in structured extraction and tuned pipelines. A prompt and harness review is especially valuable when migrating.

3. **More direct tone.** 4.7 is more direct and opinionated, with less validation-forward phrasing and fewer emoji than 4.6's warmer style. Re-evaluate voice prompts against the new baseline.

4. **Built-in progress updates in agentic traces.** 4.7 emits regular, higher-quality progress updates natively. Remove scaffolding that forced interim status messages ("After every 3 tool calls, summarize progress"). If the cadence or shape of updates doesn't fit your use case, describe what updates should look like in the prompt and give examples.

5. **Fewer subagents spawned by default.** Steerable via prompting — give explicit guidance about when subagents are desirable.

6. **Stricter effort calibration.** 4.7 respects effort levels strictly, especially at the low end. At `low` and `medium` it scopes work to what was asked rather than going above and beyond. Good for latency and cost, but moderately complex tasks at `low` risk under-thinking. If you observe shallow reasoning, raise effort to `high` or `xhigh` rather than prompting around it. If you must keep `low` for latency, add targeted guidance like: "This task involves multi-step reasoning. Think carefully through the problem before responding."

7. **Fewer tool calls by default.** 4.7 tends to use tools less and reason more — better results in most cases. To increase tool usage, raise effort (`high`/`xhigh` show substantially more tool use in agentic search and coding) or instruct explicitly about when and how to use each tool.

8. **Real-time cybersecurity safeguards.** Requests involving prohibited or high-risk topics may refuse. For legitimate security work (pentesting, vulnerability research, red-teaming), apply to the Cyber Verification Program for reduced restrictions.

9. **High-resolution image support.** First Claude model with high-res vision (2576px long edge, up from 1568). Automatic — no beta header. Two planning notes: full-resolution images can use up to ~3x more image tokens (up to ~4,784 tokens per image); pointing and bounding-box coordinates are 1:1 with actual image pixels, no scale-factor conversion needed.

## Prompt patterns replacing prefill

Prefilling assistant messages is no longer supported. Translate prior prefill use cases into prompt-side patterns:

- **Controlling output formatting** (forcing JSON/YAML): use structured outputs or tools with enum fields.
- **Eliminating preambles** (removing "Here is…"): system-prompt instruction like "Respond directly without preamble. Do not start with phrases like 'Here is...', 'Based on...', etc."
- **Avoiding bad refusals:** 4.x is much better at appropriate refusals — clear user-message prompting is usually sufficient.
- **Continuations** (resuming interrupted responses): move the continuation cue into the user turn: "Your previous response was interrupted and ended with `[previous_response]`. Continue from where you left off."
- **Context hydration / role consistency** (refreshing context in long conversations): inject what were previously prefilled-assistant reminders into the user turn.

## Calibration reminders when authoring for 4.7

- 4.7 reasons unaided on problems prior models needed scaffolding for. Flat checklists train it to pattern-match instead of think — prefer calibration statements over enumerated steps.
- Progress updates are native. External cadence scaffolding ("every N tool calls, summarize") now impedes rather than helps.
- Literalism cuts both ways: it won't generalize your intent for you. If an instruction should apply to a whole class, say so.
- Effort is the primary lever for depth. Reach for it before adding prompt scaffolding.
