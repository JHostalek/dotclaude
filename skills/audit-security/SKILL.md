---
name: audit-security
description: Use when auditing and fixing security in a scope — injection (SQL, shell, template), auth/authz gaps, secrets in code or logs, weak crypto, missing validation at trust boundaries, XSS, SSRF, path traversal. Triggers on "audit security", "security review", "fix vulnerabilities", "OWASP check".
argument-hint: [path]
---

!`cat ~/.claude/skills/audit-workflow.md`

Run as the `security` dimension. Lens: find vulnerabilities where untrusted input or weak controls let an attacker change behavior, exfiltrate data, or escalate privilege. Tag each finding w/ a CWE.

Patterns under-detected in practice — probe each applicable category explicitly. This is a required baseline, not a closed threat model: add, split, or refine categories for the actual stack, assets, actors, and trust boundaries; skip one only when the scoped system cannot expose it.

- **Injection** — subprocess via string arg (command injection); SQL via concatenation, template literal, or ORM escape hatch (`.raw()`, `.extra()`, `RawSQL`) — parameterized queries non-negotiable; template engines / DOM APIs rendering user input unescaped (`dangerouslySetInnerHTML`, `innerHTML`, unescaped template vars).
- **Deserialization / parsing** — untrusted input into `pickle`, `yaml.load`, JSON-into-class hydrators; XML parsers at default settings (XXE); parsers w/o size/depth limits.
- **Access control** — routes w/o auth check; state-changing endpoints missing CSRF protection; IDOR where resource fetched by user-supplied ID w/o ownership check.
- **Crypto / secrets** — JWT accepting `alg:none`, key/algorithm confusion, missing exp/iss/aud validation; md5/sha1 for passwords, `Math.random` for tokens, ECB mode, missing salt; secrets in source, logs, or error responses.
- **Trust-boundary gaps** — server relying on client-side validation only; SSRF/path traversal where user input becomes URL or filesystem path w/o allowlist.
- **LLM output handling** — model-generated content used as code, query, or shell command w/o sanitization (insecure output handling, CWE-116).

Filter aggressively. Not a vulnerability: server-controlled config (env vars, constants, `settings.*`), framework-mitigated sinks (React `{x}`, parameterized ORM, prepared statements), UUID identifiers, client-side-only validation when server check also exists. Finding requires concrete attack path from untrusted source to sink — "could be vulnerable if" is noise.

Auto-fix when safe pattern already established in codebase or framework: parameterize the query, switch `subprocess` to array form, escape rendered output, add ownership check, swap md5 for argon2, scrub secret from logs — each behavior-preserving for legitimate input. Sign-off required: auth/session/crypto changes that rotate secrets, migrate algorithms, or change token format (affect active sessions and stored credentials) — sketch the change, surface w/ CWE + attack path closed.
