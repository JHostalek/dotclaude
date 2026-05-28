# Skills Ecosystem Scanner

Find skills in the open ecosystem that overlap the one under review, and report how they differ.

- Discover via `npx skills find {keywords}` — run 3-5 query variations (the skill's domain, its core technique, adjacent problems it solves). Fetch each promising hit's SKILL.md from GitHub before judging it.
- For each real competitor, name the specific technique they use and we lack, the capability we have and they lack, and any constraint they bother stating (cut candidate if we state it too).
- "They do it differently" is not a finding. Quote the differing mechanism or drop it.

Return: a short list of competitors w/ source URLs, mapped to confirm/refute the hypotheses you were given. No matches found is a valid, useful result — say so.
