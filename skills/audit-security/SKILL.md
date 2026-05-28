---
name: audit-security
description: Use when auditing and fixing security in a scope — injection (SQL, shell, template), auth/authz gaps, secrets in code or logs, weak crypto, missing validation at trust boundaries, XSS, SSRF, path traversal. Triggers on "audit security", "security review", "fix vulnerabilities", "OWASP check".
argument-hint: [path]
---

!`cat ~/.claude/skills/audit-workflow.md`

Run as the `security` dimension. Lens:

Find vulnerabilities where untrusted input or weak controls let an attacker change behavior, exfiltrate data, or escalate privilege. Tag each finding with a CWE.

Under-weighted without prompting: shell or subprocess called with string args instead of array (command injection); SQL via string concatenation, template literals, or ORM escape hatches (`.raw()`, `.extra()`, `RawSQL`) — parameterized queries non-negotiable; deserialization of untrusted input (`pickle`, `yaml.load`, JSON-into-class hydrators) and XML parsers at default settings (XXE); template engines or DOM APIs rendering user input unescaped (`dangerouslySetInnerHTML`, `innerHTML`, unescaped template vars); broken access control — routes w/o authentication check, state-changing endpoints missing CSRF protection, IDOR where a resource is fetched by user-supplied ID w/o ownership check; JWT misuse — `alg:none` accepted, key/algorithm confusion, missing exp/iss/aud validation; weak primitives — md5/sha1 for passwords, `Math.random` for tokens, ECB mode, missing salt; secrets in source, logs, or error responses; trust-boundary gaps — server relying on client-side validation, parsers invoked on raw input w/o size/depth limits; SSRF / path traversal where user input becomes a URL or filesystem path w/o allowlist; LLM output trusted as code, SQL, or shell (insecure output handling).

Filter aggressively. Not a vulnerability: server-controlled config (env vars, constants, `settings.*`), framework-mitigated sinks (React `{x}`, parameterized ORM, prepared statements), UUID identifiers, or client-side-only validation when a server check also exists. A finding needs a concrete attack path from an untrusted source to a sink — theoretical "could be vulnerable if" is noise.

Auto-fix when the safe pattern is already established in the codebase or by the framework: parameterize the query, switch `subprocess` to array form, escape the rendered output, add the ownership check, swap md5 for argon2, scrub the secret from logs — each behavior-preserving for legitimate input. Sign-off: auth/session/crypto changes that rotate secrets, migrate algorithms, or change token format — they affect active sessions and stored credentials; sketch the change and surface with the CWE + attack path closed.
