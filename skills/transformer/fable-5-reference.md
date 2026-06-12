# Fable 5 — authoring reference

Target-model facts for rewriting skills/prompts/CLAUDE.md. Distilled from Anthropic's Fable 5 launch materials, prompting guide & migration guide (June 2026), plus base tendencies the harness already counters. Sources at bottom.

## The headline mandate

"Skills developed for prior models are often too prescriptive for Claude Fable 5 and can degrade output quality." On 4.8 over-scaffolding was dead weight; on Fable 5 it's actively harmful — old instructions keep the model behaving like the old model. Prefer goal + constraints over enumerated steps; when in doubt, remove and let default judgment run. Fable also updates skills on the fly from what it learns mid-task — skills should permit that, not fight it.

## Facts that change the strip/keep calculus

- **Brief principles replace rule lists.** Instruction following strong enough to "steer most behaviors with a brief instruction rather than enumerating each behavior by name." → collapse enumerated behavior lists into one principle + at most one anchoring example.
- **Effort recalibrated.** `high` = default for most tasks; `xhigh` reserved for the most capability-sensitive work (≠ 4.8's "xhigh for coding/agentic"). `low`/`medium` on Fable often exceed prior models' `xhigh`. Thinking is always on (adaptive only, can't disable) — depth = effort, never prose; "think carefully / be thorough" stays dead weight.
- **Delegation flipped.** 4.8 under-spawned → elicitation prose was load-bearing. Fable "dispatches parallel subagents more readily than prior models" and dependably sustains long-running ones. → strip spawn-pressure prose; keep *when-appropriate* triggers + async patterns (delegate and keep working; long-lived subagents over spawn-and-block).
- **Self-verification nuance.** Routine "double-check your work" = dead weight (carried from 4.8). But on long runs, explicit verification cadence is load-bearing — fresh-context verifier subagents outperform self-critique. Keep/add: "verify with subagents against the spec every [interval]."
- **Memory is a capability lever.** Fable "performs particularly well when it can record lessons from previous runs and reference them" (~3× the gain memory gave 4.8). Skills for recurring/long work: name a memory surface + note format (one lesson per file, summary line first, update-don't-duplicate, delete wrong notes).
- **Reasoning-echo = refusal hazard (NEW).** Instructions to echo/transcribe/explain internal reasoning as response text can trigger the `reasoning_extraction` refusal → fallback to Opus 4.8. Strip "show your thinking / reflect on your reasoning" directives during transformation; reasoning visibility belongs in summarized thinking blocks, not prompted output.
- **Cyber/bio classifier surface (NEW).** Safety classifiers target offensive cyber + bio/life-sciences; "benign cybersecurity work and beneficial life sciences tasks may also trigger these safeguards" (>95% of sessions see no fallback). Security-domain skills (audits, pentest helpers): keep framing explicitly defensive; expect occasional refusal/fallback.
- **Longer turns; intent matters.** Minutes-long requests and hours-long autonomous runs are normal. Give the full spec in one well-specified turn *plus the reason behind it* — "context lets it connect the task to relevant information rather than inferring intent on its own." Skills should carry intent ("why this exists") not just procedure.
- **Minimal harnesses win.** Helper scaffolding prior models needed (vision crop pipelines, tool walkthroughs) is now counterproductive — Fable completed tasks "with a minimal, vision-only harness" where predecessors needed complex ones.
- **Carried from 4.7/4.8:** literalism (name the whole class a rule covers — it won't generalize an instruction across items) and length self-calibration (fixed verbosity requirement → state positively with an example).

## Base tendencies the harness counters

Un-steered Fable 5, especially at higher effort: **elaborates beyond need** (surveys options it won't pursue, heavy structure, narrating comments), **overplans on ambiguous tasks**, **takes unrequested adjacent actions** (defensive git backups, unasked drafts), and deep in long sessions can **stop early or ask permission it doesn't need**, produce **hard-to-follow shorthand summaries**, or show **context anxiety** when token countdowns are visible. Calibration countering these — act-when-ready, brevity-with-readability, boundaries, autonomy, grounded progress claims — is *more* load-bearing on Fable, not less. Don't strip it as "obvious."

## The rewrite delta

**Strip harder than on 4.8 — now actively harmful, not just dead weight:**
- Step-by-step procedures where goal + constraints suffice ("too prescriptive … can degrade output quality").
- Enumerated behavior lists a one-line principle covers.
- Spawn-pressure delegation prose (model delegates readily).
- Reasoning-echo / show-your-thinking directives (refusal risk).
- Helper-harness scaffolding for vision/tool mechanics the model handles natively.
- Routine self-check nudges, cadence scaffolding, phantom constraints ("be careful/thorough/clean"), restated CLAUDE.md doctrine.

**Keep & sharpen:**
- Calibration countering a real Fable default — overplanning, elaboration, adjacent actions, early stopping, ungrounded progress claims.
- Contracts, templates, output formats, approval gates, coordination protocol.
- Domain facts/gotchas the model can't infer (library quirks, protocol behavior, tool flags). Phrase positively.
- When-to-delegate triggers + async-subagent patterns; long-run verifier-subagent cadence.
- Memory surface + note format for recurring work.
- Tool-elicitation lines for client-side tools that need them — e.g. `send_to_user`: "without an instruction in the system prompt, Claude Fable 5 rarely calls it."
- Intent context — the reason behind the workflow, not only its steps.
- Effort guidance (depth = effort) and literalism reminders (name the class a rule covers).

## Sources

- Anthropic — Prompting Claude Fable 5: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5
- Anthropic — Introducing Claude Fable 5 and Claude Mythos 5: https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5
- Anthropic — Migration guide § Migrating from Claude Opus 4.8 to Claude Fable 5: https://platform.claude.com/docs/en/about-claude/models/migration-guide
- Anthropic — Claude Fable 5 and Claude Mythos 5 (launch): https://www.anthropic.com/news/claude-fable-5-mythos-5

## Provenance — verbatim source quotes

Each claim above pinned to its source text. Verified against live docs 2026-06-12. Re-verify against the source on the next model bump; if a quote no longer matches the page, the derived directive is stale.

- **Headline mandate (de-prescribe)** ← "Skills developed for prior models are often too prescriptive for Claude Fable 5 and can degrade output quality. Review and consider removing older instructions if default performance is better. Claude Fable 5 also does a good job of updating skills on the fly based on what it learns from the task at hand." (Prompting guide)
- **Brief principles** ← "Instruction-following is improved enough that you can steer most behaviors with a brief instruction rather than enumerating each behavior by name." (Prompting guide)
- **Effort recalibrated** ← "Use `high` as the default for most tasks, with `xhigh` for the most capability-sensitive workloads and `medium` or `low` for routine work. Lower effort settings on Claude Fable 5 still perform well and often exceed `xhigh` performance on prior models." (Prompting guide; mirrored in migration guide §6)
- **Thinking always on** ← "Adaptive thinking is the only thinking mode on Claude Fable 5 and Claude Mythos 5. … `thinking: {\"type\": \"disabled\"}` is not supported. Use the effort parameter to control thinking depth." (Introducing page)
- **Delegation flipped** ← "Claude Fable 5 dispatches parallel subagents more readily than prior models"; "significantly more dependable at dispatching and sustaining parallel subagents, and reliably manages ongoing communication with long-running subagents and peer agents"; "prefer asynchronous communication between orchestrator and subagents over blocking until each subagent returns." (Prompting guide)
- **Verifier subagents** ← "Separate, fresh-context verifier subagents tend to outperform self-critique." (Prompting guide)
- **Memory lever** ← "Claude Fable 5 performs particularly well when it can record lessons from previous runs and reference them." (Prompting guide); memory-driven improvement "three times more" than for Opus 4.8 (launch post).
- **Reasoning-echo hazard** ← "Prompts, skills, or harness instructions that tell the model to echo, transcribe, or explain its internal reasoning as response text can trigger the `reasoning_extraction` refusal category on Claude Fable 5, causing elevated fallbacks to Claude Opus 4.8. Audit existing skills and system prompts for reflection or show-your-thinking instructions when migrating." (Prompting guide)
- **Classifier surface** ← "Benign cybersecurity work and beneficial life sciences tasks may also trigger these safeguards." (Prompting guide); "More than 95% of Fable sessions involve no fallback at all" but "sometimes benign requests will trigger our classifiers." (launch post)
- **Longer turns** ← "Individual requests on hard tasks can run for many minutes at higher effort settings … and autonomous runs can extend for hours. This is one of the largest shifts teams encounter." (Prompting guide)
- **Intent matters** ← "context lets it connect the task to relevant information rather than inferring intent on its own." (Prompting guide)
- **Minimal harnesses** ← prior models needed complex helper harnesses; Fable completed the tasks "with a minimal, vision-only harness." (launch post)
- **Elaboration default** ← "when un-steered, Claude Fable 5 can elaborate beyond what the task needs, especially at higher effort settings: surveying options it won't pursue, explaining root causes at length, producing heavily-structured PR descriptions, or writing comments that narrate what the next line does." (Prompting guide)
- **Adjacent actions** ← "Claude Fable 5 can occasionally take unrequested actions (drafting an email when none was asked for, creating defensive git-branch backups)." (Prompting guide)
- **Early stopping** ← "can occasionally end a turn with a text-only statement of intent (\"I'll now run X\") without issuing the corresponding tool call, or pause to ask permission when it already has enough to proceed." (Prompting guide)
- **Context anxiety** ← "can occasionally suggest a new session, offer to summarize and hand off, or trim its own work. This is most often triggered when the harness shows a remaining-token countdown to the model." (Prompting guide)
- **Grounded claims work** ← "In Anthropic's testing, this nearly eliminated fabricated status reports even on tasks designed to elicit them." (Prompting guide)
- **Tool elicitation needed** ← "Defining the tool is not sufficient on its own; without an instruction in the system prompt, Claude Fable 5 rarely calls it." (Prompting guide, send_to_user)
- **Hardest problems first** ← "The teams seeing the best outcomes apply Claude Fable 5 to their hardest unsolved problems; testing it only on simpler workloads tends to undersell its capability range." (Prompting guide)
- **Readability degradation** ← "Claude Fable 5 can produce text that's hard to follow: dense arrow-chain shorthand, deep implementation detail, references to thinking the user never saw, or overly technical phrasing." (Prompting guide)
