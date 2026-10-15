---
name: distill
description: Distill rough text into dense, expert-register English where terms of art carry the intent.
argument-hint: "[text or file; omit for my previous message]"
disable-model-invocation: true
---

# Distill

Distill the target (my text, a named file, or else my previous message) into expert-register English. I write in a second language; you hold the vocabulary I lack. Elevate to it.

The reader is a domain expert or a model. A **term of art** is the established word practitioners use for a concept: it carries a sentence or a paragraph of intent and recruits the reader's priors for free.

1. **Intent**: list every claim, constraint, exclusion, name, and branch in the original. Done when each original sentence maps to an item.
2. **Distill**: name each item with its term of art, then write the shortest text that carries the whole list. Cut restatement, hedging, and explanatory scaffolding. Choose the term practitioners actually use over the rarer synonym: precision, not ornament. Reject a term whose home-domain connotation pulls the wrong way. Keep my names, numbers, and stance.
3. **Back-translate**: give a cold-reader subagent the draft alone and ask it to restate the intent as a list. Diff that against step 1; each missing or drifted item is a loss to fix. Done when the lists match, or two rounds have run. Without subagents, expand each term yourself against step 1.
4. **Return**: the distilled text, then a glossary of each term you introduced and the meaning it replaced, so I learn it. When the target is a file, apply the rewrite there and report the word count before and after.
