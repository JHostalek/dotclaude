# Opus 4.8 — authoring reference

Target-model facts for rewriting skills/prompts/CLAUDE.md. Distilled from Anthropic's Opus 4.8 migration guide & launch notes (May 2026), plus base tendencies the harness already counters. Sources at bottom.

## Facts that change the strip/keep calculus

- **Effort is the depth lever, not prose.** Default `high` everywhere; set `xhigh` for coding/agentic; `max` only for the hardest (overthink risk). Levels recalibrated vs 4.7 (`medium`↑, `high`↓, `xhigh`↑↑). Never manufacture depth with "think carefully / be thorough" — raise effort instead.
- **Self-checking is strong.** ~4× less likely than 4.7 to let flaws in its *own* code pass unremarked; more likely to flag uncertainty, less likely to make unsupported claims. → "double-check your work" / self-verification scaffolding is dead weight.
- **Tool triggering improved.** Fewer skipped-but-required tool calls; tool-calling more efficient (fewer steps). → generic "remember to use grep/tests" nudges are dead weight. Keep only non-obvious *when-to-use-THIS-tool* triggers.
- **Long-horizon agentic is SOTA.** Better long-context, fewer compactions, better compaction recovery. → context-budgeting / "summarize every N calls" scaffolding is dead weight. Give the full task spec up front in one well-specified turn.
- **Dynamic workflows.** Can plan then run hundreds of parallel subagents; codebase-scale migrations end-to-end. Orchestration skills can lean on native planning + the Workflow harness rather than hand-rolled coordination prose.
- **Literal (carried from 4.7).** Won't generalize an instruction across a class or infer unmade requests. → if a rule applies to a whole category, say so; keep contracts explicit.
- **Length self-calibrates** to judged complexity. Depends on a fixed verbosity? State it with a positive example, not a negative.

## Base tendencies the harness counters (why CLAUDE.md uses ↯)

Out of the box 4.8 **narrates intent before acting**, **confirms before reversible in-scope actions**, and **under-delegates / under-spawns subagents**. These are real defaults — calibration that counters them (autonomy, terseness, delegation triggers) is *more* load-bearing on 4.8, not less. Don't strip it as "obvious."

## The rewrite delta

**Strip harder than on 4.7:**
- Step-by-step procedures for problems the model solves directly.
- Self-verification / "double-check" scaffolding (self-checking is strong).
- Generic tool-usage nudges (tool triggering improved).
- Context/compaction-management scaffolding (long-context improved).
- Cadence scaffolding, phantom constraints ("be careful/thorough/clean"), restated CLAUDE.md doctrine.

**Keep & sharpen:**
- Calibration countering a real 4.8 default — autonomy vs ask-rate, terseness vs narration, delegation vs under-spawning.
- Contracts, templates, output formats, approval gates, coordination protocol.
- Domain facts/gotchas the model can't infer (library quirks, protocol behavior, tool flags). Phrase positively.
- Effort guidance (depth = effort) and literalism reminders (name the class a rule covers).

## Sources

- Anthropic — Migrating to Claude Opus 4.8: https://platform.claude.com/docs/en/about-claude/models/migration-guide
- Anthropic — What's new in Claude Opus 4.8: https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-8
- Anthropic — Introducing Claude Opus 4.8: https://www.anthropic.com/news/claude-opus-4-8
