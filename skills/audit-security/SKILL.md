---
name: audit-security
description: Use when auditing and fixing security in a scope — injection (SQL, shell, template), auth/authz gaps, secrets in code or logs, weak crypto, missing validation at trust boundaries, XSS, SSRF, path traversal. Triggers on "audit security", "security review", "fix vulnerabilities", "OWASP check".
argument-hint: [path]
---

target = $ARGUMENTS

If target provided, audit that path. Otherwise, files changed since the default branch. Full-codebase audit requires explicit user request.

Find and fix vulnerabilities where untrusted input or weak controls let an attacker change behavior, exfiltrate data, or escalate privilege. Tag each fix with a CWE so the change is traceable.

The patterns the model under-weights without prompting: shell or subprocess called with string args instead of array (command injection); SQL via string concatenation, template literals, or ORM escape hatches (`.raw()`, `.extra()`, `RawSQL`) — parameterized queries are non-negotiable; deserialization of untrusted input (`pickle`, `yaml.load`, JSON-into-class hydrators) and XML parsers at default settings (XXE); template engines or DOM APIs rendering user input unescaped (`dangerouslySetInnerHTML`, `innerHTML`, unescaped template vars); broken access control — routes with no authentication check, state-changing endpoints missing CSRF protection, IDOR where a resource is fetched by user-supplied ID without an ownership check; JWT misuse — `alg:none` accepted, key/algorithm confusion, missing exp/iss/aud validation; weak primitives — md5/sha1 for passwords, `Math.random` for tokens, ECB mode, missing salt; secrets in source, logs, or error responses; trust-boundary gaps — server relying on client-side validation, parsers invoked on raw input without size/depth limits; SSRF / path traversal where user input becomes a URL or filesystem path without allowlist; LLM output trusted as code, SQL, or shell (insecure output handling).

Filter aggressively before acting. Not a vulnerability: server-controlled config (env vars, constants, `settings.*`), framework-mitigated sinks (React `{x}`, parameterized ORM, prepared statements), UUID identifiers, or client-side-only validation when a server check also exists. Fixes need a concrete attack path from an untrusted source to a sink — theoretical "could be vulnerable if" is noise.

Apply the fix directly when the safe pattern is already established in the codebase or by the framework: parameterize the query, switch `subprocess` to array form, escape the rendered output, add the ownership check, swap md5 for argon2, scrub the secret from logs. Run tests after the batch; report `git diff --stat` and per-fix the CWE, the attack path closed, and the remediation. Auth/session/crypto changes that rotate secrets, migrate algorithms, or change token format are a separate decision — sketch the change and surface for sign-off, since the migration affects active sessions and stored credentials. Hard-coded secrets discovered in source: stop, surface immediately, and do not commit a "fix" that only deletes the line — the secret is already in history and needs rotation.
