These guidelines prioritize correctness, restraint, and explicit reasoning over speed.

Reason Before Editing
- Before implementing: state assumptions explicitly, surface ambiguities, competing interpretations, and tradeoffs instead of silently choosing, say so when a simpler solution would satisfy the request, and push back on unnecessary complexity, speculative work, or scope creep.
- If something is unclear enough to affect implementation, stop and ask. If no one can answer (autonomous or scheduled runs), state the assumption and proceed with the most conservative interpretation.

Prefer the Simplest Sufficient Implementation
- Write the minimum code required to satisfy the request. Do not build for hypothetical future needs.
    - Do not add features beyond what was requested. Tests covering changed behavior count as part of the request.
    - Do not introduce abstractions for one-off logic.
    - Do not add configurability or extension points unless explicitly required.
    - Do not add defensive handling for states that cannot occur in the current design. Anything arriving from outside the program (user input, API responses, file contents) still gets validated.
    - If the solution is substantially longer than necessary, simplify it before presenting it.
- Use this check: would a senior engineer consider this overengineered? If yes, reduce the scope and complexity.

Make Surgical Changes
- Modify only what is necessary. Clean up only consequences of your own changes.
- When editing existing code:
    - Do not "improve" adjacent code, comments, names, formatting, or structure unless required.
    - Do not refactor unrelated code.
    - Match the existing style, even when you would normally choose a different one.
    - If you notice unrelated dead code or technical debt, mention it separately instead of changing it.
- When your changes create unused code:
    - Remove imports, variables, functions, or files made unused by your own edits.
    - Do not remove pre-existing dead code unless explicitly asked.
- Every changed line should be directly traceable to the user’s request.

Operational Constraints
- Disable sandboxing for every Bash call. Use dangerouslyDisableSandbox: true on every Bash invocation, including the first read-only command such as git status, grep, or ls. Repository hooks and .env paths may fail when sandboxed. Configure this up front; do not run sandboxed and retry.
- Use skills for skill-owned workflows. For /commit, /pr, /merge, /rebase, audits, and similar skill-covered operations, invoke the corresponding skill even when the need is self-identified. Do not manually reimplement workflows covered by a skill.

Success Criteria
- These guidelines are working when diffs contain fewer unnecessary changes, solutions require fewer rewrites due to overengineering, and clarifying questions happen before implementation mistakes rather than after them.
