---
name: writing
description: Rewrite slop, or a reply that did not land, into text a person would write.
argument-hint: "[text, file, or feedback; omit for the last agent response]"
disable-model-invocation: true
---

# Writing

Rewrite the given text or passage as a person would write it. With no target, rewrite the last substantive agent response. Ask only when the target or intended meaning cannot be determined.

**Slop** is text that reads as generated: padded, generic, inflated, shaped by habits no person would choose. Each habit is a **tell**. [`references/tells.md`](references/tells.md) catalogs tells for the reviewer. The writer works from the positive targets below, not the catalog.

## 1. Find the reader

Name the reader, what they already know, and what they must do or decide after reading. Find where the original loses them: a buried point, missing context, an unexplained term, slop. For project text, use the domain terms in the repo glossary (`GLOSSARY.md`, or `CONTEXT.md` in older repos).

Done when you can state the reader's need and the original's failure in one sentence each.

## 2. Study the pairs (Czech)

Read all of [`references/cs-pairs.md`](references/cs-pairs.md), since its moves transfer across media. Choose the pairs closest to your text's medium and register, and compare their sides on four axes: **order**, **verbs**, **density**, **register**.

Done when you can name, for each chosen pair, one move of the human side that your draft will copy.

## 3. Rewrite

- Lead with what the reader needs. Put the context a conclusion depends on before the conclusion.
- Write with ASD-STE100 clarity in any language: one name per thing, an explicit actor, unfamiliar terms explained.
- Carry over the author's stance. Every fact, number, and example comes from the original or the conversation. Uncertainty stays visible.
- Keep strong original sentences. Length follows content: add the context the reader lacks, and stop when the content ends.
- Match the original's language, register, and medium. Judge naturalness phrase by phrase, and draft from how a native speaker would explain the situation.
- Prose by default. Headings, bullets, and bold only where the reader navigates.

Done when every fact, qualification, link, and identifier from the original is in the draft, and the reader from step 1 could act on it.

## 4. Review

The writer cannot see its own tells. Spawn a **reviewer** subagent, withhold the conversation, and paste into its prompt:

- the original and the draft
- the reader from step 1
- the full text of `tells.md`, plus the pairs chosen in step 2 for Czech

Brief the reviewer:

> Read the draft cold, as this reader. Flag every passage that carries a tell from the catalog or leaves the reader unable to act. For each, quote it, name the tell, and give a one-line reason. Reply "clean" when nothing is left.

Fix each flagged passage, or keep it and record why. Send the revision to a fresh reviewer. Without subagents, check the draft against each `tells.md` entry in turn.

Done when a reviewer replies "clean", or two rounds have run.

## 5. Return

Return the rewrite alone. Add a note only for flags left after two rounds or a material uncertainty. When asked to edit a file, apply the rewrite there and report the change in one sentence.
