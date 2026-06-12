---
name: audit-security
description: Use when auditing and fixing security in a scope — injection (SQL, shell, template), auth/authz gaps, secrets in code or logs, weak crypto, missing validation at trust boundaries, XSS, SSRF, path traversal. Triggers on "audit security", "security review", "fix vulnerabilities", "OWASP check".
argument-hint: [path]
---

!`cat ~/.claude/skills/audit-workflow.md`

Run as the `security` dimension. Lens: find vulnerabilities where untrusted input or weak controls let an attacker change behavior, exfiltrate data, or escalate privilege. Tag each finding w/ a CWE.

Under-weighted without prompting: shell/subprocess called w/ string args instead of array (command injection); SQL via string concatenation, template literals, or ORM escape hatches (`.raw()`, `.extra()`, `RawSQL`) — parameterized queries non-negotiable; deserialization of untrusted input (`pickle`, `yaml.load`, JSON-into-class hydrators) and XML parsers at default settings (XXE); template engines or DOM APIs rendering user input unescaped (`dangerouslySetInnerHTML`, `innerHTML`, unescaped template vars); broken access control — routes w/o auth check, state-changing endpoints missing CSRF protection, IDOR where resource fetched by user-supplied ID w/o ownership check; JWT misuse — `alg:none` accepted, key/algorithm confusion, missing exp/iss/aud validation; weak primitives — md5/sha1 for passwords, `Math.random` for tokens, ECB mode, missing salt; secrets in source, logs, or error responses; trust-boundary gaps — server relying on client-side validation, parsers invoked on raw input w/o size/depth limits; SSRF/path traversal where user input becomes URL or filesystem path w/o allowlist; LLM output trusted as code, SQL, or shell (insecure output handling).

Filter aggressively. Not a vulnerability: server-controlled config (env vars, constants, `settings.*`), framework-mitigated sinks (React `{x}`, parameterized ORM, prepared statements), UUID identifiers, client-side-only validation when server check also exists. Finding requires concrete attack path from untrusted source to sink — "could be vulnerable if" is noise.

Auto-fix when safe pattern already established in codebase or framework: parameterize the query, switch `subprocess` to array form, escape rendered output, add ownership check, swap md5 for argon2, scrub secret from logs — each behavior-preserving for legitimate input. Sign-off required: auth/session/crypto changes that rotate secrets, migrate algorithms, or change token format (affect active sessions and stored credentials) — sketch the change, surface w/ CWE + attack path closed.
