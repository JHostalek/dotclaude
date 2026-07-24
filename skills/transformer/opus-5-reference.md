# Opus 5 — authoring reference

Target-model facts for rewriting skills/prompts/CLAUDE.md. Distilled from Anthropic's Opus 5 launch post, prompting guide, what's-new page, effort page & general best-practices page (July 2026). Sources at bottom.

## The headline mandate

Unlike the Fable 5 migration, this is **not** a de-prescribe-everything sweep: Opus 5 "performs well out of the box on existing Claude Opus 4.8 prompts." The wins are targeted. Two moves:

1. **Cut instructions that now double with a native behavior** — verification, self-recheck, spawn pressure, tool-elicitation nudges. These compound and cost tokens with no quality gain.
2. **Add calibration for behaviors that got stronger** — response length, deliverable length, narration volume, scope expansion, delegation appetite, correction narration.

Model ID `claude-opus-5`. 1M context (default = max), 128k max output, thinking on by default.

## Facts that change the strip/keep calculus

- **Self-verification is native.** "Claude Opus 5 verifies its own work without being told to." Explicit verification instructions ("include a final verification step for any non-trivial task", "use a subagent to verify") cause **over**-verification; removing them "reduces wasted tokens with no loss in quality." Same for legacy harness verification steps and re-check nudges ("double-check your answer"). This inverts the Fable 5 guidance that verifier subagents beat self-critique — do not carry it forward.
- **Delegation needs damping, not encouragement.** Opus 5 "delegates to subagents more readily than prior models" and coordinates teams well (writer-verifier patterns, few overwrites). → strip spawn pressure; add a gate: delegate only for large, genuinely independent, parallelizable tracks; not for work finishable in a handful of tool calls; not for verifying its own work; one subagent over several; cap counts.
- **Effort no longer controls visible length.** Effort controls thinking volume; "lowering effort can reduce thinking volume without reliably shortening the visible response." Default responses *and* files written to disk run longer than prior Opus models. → length calibration must be prompted explicitly, separately for conversation and for written deliverables. In a long prompt, pair the instruction with a short reminder near the end.
- **Narration runs high.** "Claude Opus 5 narrates readily during agentic work" — announces what it's about to do; per-message output in agentic sessions is longer. → specify cadence and shape (first sentence before first tool call, updates only on findings/direction changes, lead with outcome). Positive examples of wanted style beat prohibitions.
- **Scope expansion.** It "can also expand the scope of a task, adding steps that weren't requested or applying its own judgment about what the task should be." → explicit scope fence for narrow tasks; deliver at the scope intended, routine judgment calls yourself, flag-and-continue rather than quietly reshaping.
- **Correction narration.** It "narrates corrections to its earlier statements more than prior models do." → limit to corrections that change the user's code, conclusions, or decisions.
- **Literalism, sharpened.** Conservative qualifiers are obeyed literally: a review prompt saying "only report high-severity issues" or "be conservative" makes it "report less." → for review/audit skills, ask for everything and filter in a separate pass. Still name the whole class a rule covers; it won't generalize across items.
- **Effort ladder.** All five levels (`low`…`max`), `max` is the explicit top tier, no beta header. Start `xhigh` for coding/agentic work, `high` for other intelligence-sensitive work; `low`/`medium` are "stronger on Claude Opus 5 than on earlier Opus models" — use liberally as the primary cost/latency control. Re-sweep effort rather than reusing carried-over settings. At `xhigh`/`max` set large `max_tokens` (64k starting point). Depth = effort, never prose — "think carefully / be thorough" stays dead weight.
- **Vision workarounds are stale.** Strong on charts, documents, diagrams, UI replication. "Re-validate any prompt-side vision workarounds you tuned for prior models; they may no longer be needed." Tools to crop/analyze/visually verify are a more cost-effective lever than thinking alone — keep those, strip prompt-side crop pipelines.
- **Long context is flat.** 1M window, "instruction following, tool calling, and reasoning stay consistent throughout the window." → mid-window degradation workarounds are dead weight; multi-window state discipline (git, progress notes, structured test state) still earns its keep.
- **Agentic coding completeness.** "It completes full tasks rather than leaving stubs or placeholders, and it performs best when given the complete task specification up front and left to run." → give the whole spec in one turn plus the intent behind it; strip babysitting checkpoints.
- **Thinking-disabled artifacts (only if a skill runs thinking off).** Disabling thinking is accepted only at effort `high` or below (400 otherwise). With thinking off, tool calls can leak as text and internal XML tags can appear in output. Mitigations: keep thinking on and use lower effort instead; allow "a brief sentence before using a tool"; use the general "do not include internal or system XML tags in your response" — naming `<thinking>` specifically is less effective, and any rule telling the model not to think *increases* leakage.
- **Overtriggering on tool defaults.** Blanket defaults ("Default to using X", "if in doubt use X") overtrigger on current models → rephrase as "use X when it would enhance your understanding of the problem."
- **Safety classifiers.** Cyber classifiers permit source-code vulnerability finding but block binary-based vulnerability scanning, pen testing, and exploit generation; expected to fire "around 85% less often than they do for Fable 5", with flagged requests falling back to Opus 4.8. Security-domain skills: keep framing explicitly defensive.

## Base tendencies the harness counters

Un-steered Opus 5: **longer visible responses and longer written files**, **more progress narration**, **more subagents**, **more correction narration**, **scope expansion into unrequested steps**, plus the carried-over Opus family tendencies — overengineering (extra files, unnecessary abstractions, defensive code, unrequested docs) and test-passing tunnel vision (hardcoding, helper-script workarounds). Calibration countering these is load-bearing; don't strip it as "obvious." Grounded-claims calibration (report only what a tool result supports) also stays — it nearly eliminated fabricated status reports in testing.

## The rewrite delta

**Strip — now compounding or stale, not merely dead weight:**
- Verification steps, verifier-subagent cadence, "double-check / re-verify before responding."
- Spawn-pressure delegation prose.
- Blanket tool defaults and "if in doubt, use X" elicitation.
- Prompt-side vision helper harnesses; mid-context-window degradation workarounds.
- Step-by-step procedures where goal + constraints suffice; enumerated behavior lists a one-line principle covers.
- Phantom constraints ("be careful/thorough/clean"), restated CLAUDE.md doctrine, "think carefully" depth nudges.
- Any rule instructing the model not to think or not to reason.
- Conservative-sounding review qualifiers ("only high-severity", "be conservative") — they get obeyed literally.

**Keep & sharpen:**
- Length calibration — conversational *and* written-deliverable, with a short end-of-prompt reminder in long skills.
- Narration cadence, stated positively with an example.
- Scope fence; boundaries on hard-to-reverse or outward-facing actions.
- Delegation gate: when it's warranted, caps, no verifier subagents.
- Correction-narration limit.
- Contracts, templates, output formats, approval gates, coordination protocol.
- Domain facts/gotchas the model can't infer (library quirks, protocol behavior, tool flags). Phrase positively.
- Intent context — the reason the workflow exists, not only its steps.
- Named minimum coverage where a baseline is genuinely required ("skip a probe only when the scoped system cannot expose it"). State the floor; don't also grant permission to deviate above it — the model treats a list of lenses as open by default, so closure-freedom prose is a no-op that reads as "every item here is optional."
- Effort guidance (xhigh coding/agentic, high otherwise, low/medium as cost control) and literalism reminders.
- Multi-window state discipline for long runs: git checkpoints, progress notes, structured test state, don't-stop-early-on-token-budget.
- Grounded-claims calibration; tools for visual/functional verification (crop, browser) where the work needs them.

## Sources

- Anthropic — Prompting Claude Opus 5: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5
- Anthropic — What's new in Claude Opus 5: https://platform.claude.com/docs/en/about-claude/models/whats-new-opus-5
- Anthropic — Prompting best practices: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
- Anthropic — Effort: https://platform.claude.com/docs/en/build-with-claude/effort
- Anthropic — Introducing Claude Opus 5: https://www.anthropic.com/news/claude-opus-5

Provenance for every claim above: [`opus-5-provenance.md`](opus-5-provenance.md) — verify there on the next model bump.
