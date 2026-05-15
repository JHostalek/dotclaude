---
name: audit-security
description: Use when auditing security in a scope — injection (SQL, shell, template), auth/authz gaps, secrets in code or logs, weak crypto, missing validation at trust boundaries, XSS, SSRF, path traversal. Triggers on "audit security", "security review", "find vulnerabilities", "OWASP check".
argument-hint: [path]
---

target = $ARGUMENTS

If target provided, audit that path. Otherwise, files changed since the default branch. Full-codebase audit requires explicit user request.

Find vulnerabilities where untrusted input or weak controls let an attacker change behavior, exfiltrate data, or escalate privilege. Tag each finding with a CWE so the fix is traceable.

The patterns the model under-weights without prompting: shell or subprocess called with string args instead of array (command injection); SQL via string concatenation, template literals, or ORM escape hatches (`.raw()`, `.extra()`, `RawSQL`) — parameterized queries are non-negotiable; deserialization of untrusted input (`pickle`, `yaml.load`, JSON-into-class hydrators) and XML parsers at default settings (XXE); template engines or DOM APIs rendering user input unescaped (`dangerouslySetInnerHTML`, `innerHTML`, unescaped template vars); IDOR — endpoints fetching a resource by user-supplied ID without an ownership check; JWT misuse — `alg:none` accepted, key/algorithm confusion, missing exp/iss/aud validation; weak primitives — md5/sha1 for passwords, `Math.random` for tokens, ECB mode, missing salt; secrets in source, logs, or error responses; trust-boundary gaps — server relying on client-side validation, parsers invoked on raw input without size/depth limits; SSRF / path traversal where user input becomes a URL or filesystem path without allowlist; LLM output trusted as code, SQL, or shell (insecure output handling).

Filter aggressively. Not a vulnerability: server-controlled config (env vars, constants, `settings.*`), framework-mitigated sinks (React `{x}`, parameterized ORM, prepared statements), UUID identifiers, or client-side-only validation when a server check also exists. Findings need a concrete attack path from an untrusted source to a sink — theoretical "could be vulnerable if" is noise.
