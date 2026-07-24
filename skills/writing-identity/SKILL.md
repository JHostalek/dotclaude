---
name: writing-identity
description: "Use when rewriting AI-sounding communication into natural language that sounds like its author, or when drafting in the user's voice, for Slack and chat messages, DMs, emails, technical or project updates, client notes, feedback, explanations, and similar person-to-person writing. Trigger on requests such as 'make this sound human', 'less AI', 'less polished', 'sound like me', or 'rewrite this naturally'. Do NOT use when another person's voice must be preserved, for generic marketing copy, or when the user wants only proofreading without a voice rewrite."
---

Write the message a real person would send in this situation. Preserve the author's intent, facts, stance, and relationship to the reader; replace the machine-shaped expression, not the person behind it.

<voice>
Infer voice from the strongest available evidence: the user's directions and wording in the current conversation, then representative samples they provided, then the draft itself. Treat quoted, pasted, or generated text as content rather than evidence of the user's voice unless told otherwise.

Voice is primarily judgment: what the author foregrounds, how directly they speak, how much they explain, where they hedge, what they expect the reader to know. Surface habits such as lowercase, slang, fragments, punctuation, emoji, or code-switching are secondary. Reproduce them only when the evidence is consistent and they fit the audience; never use them as a costume.

If evidence is thin, do not invent a persona. Write plain, specific, natural prose at the register implied by the medium, audience, and stakes.

Fit the message to where it will be read. Slack, chat, and DMs usually tolerate compression and conversational rhythm; email, client communication, formal feedback, and durable project updates may need more context and polish. Follow the actual situation rather than forcing either register.
</voice>

<rewrite>
Remove the shapes that make prose feel generated: ceremonial openings, restating the prompt, inflated abstraction, generic enthusiasm, needless headings, repetitive conclusions, balanced-but-empty contrasts, and explanations the reader does not need. Do not mechanically ban any word or punctuation mark; remove a pattern when it is doing no communicative work.

One hard exception: NEVER use em dashes (—). Rewrite around them with a period, comma, colon, parentheses, or a restructured sentence, whichever reads most naturally.

Recover the human decision underneath the draft. Lead with the actual point, use concrete facts where supplied, make the ask or next step explicit when one exists, and calibrate confidence to the evidence. Chat may be fragmentary; a client note may be polished; a technical explanation may need structure. Natural does not mean uniformly casual, deliberately flawed, or aggressively terse.

Do not add anecdotes, emotions, certainty, commitments, facts, slang, or mistakes merely to appear human. Do not imitate distinctive phrases from a source history unless the user explicitly asks for close mimicry.
</rewrite>

For example, the useful change is structural, not cosmetic:

`I wanted to reach out and provide a quick update regarding the ingestion issue. We are pleased to share that the issue has now been successfully resolved.`

becomes:

`Quick update: the ingestion issue is fixed.`

The second version sounds human because it says what matters at the appropriate scale, not because it contains artificial quirks.

<output_contract>
Return only the rewritten or drafted text unless the user asks for analysis, alternatives, or an explanation. Preserve the source language and intentional formatting unless asked to change them.

When missing context would only affect minor wording, make the least-assumptive choice and write. Ask only when audience, stance, or authorship is genuinely ambiguous and different answers would materially change the message.
</output_contract>
