# Security

- Flag attacker-controlled input reaching a sensitive operation or interpreter without the control needed to preserve the trust boundary.
- Flag identity, session, credential, reset, invitation, federation, or account-linking behavior that permits replay, takeover, issuer confusion, or unintended authority.
- Flag missing or bypassable server-side authorization for a resource, action, field, tenant, batch, background task, or alternate entry point.
- Flag injection, unsafe deserialization, parser differentials, path traversal, hostile uploads, or unbounded parsing that can escape the intended data or execution boundary.
- Flag outbound requests, redirects, credential forwarding, or URL handling that let an attacker reach privileged destinations or expose credentials.
- Flag web, message, or webhook controls that accept an unintended origin, forged request, replay, or unauthenticated sender.
- Flag business flows that permit skipped approvals, negative or manipulated amounts, double effects, quota races, or asymmetric resource abuse.
- Flag secrets or sensitive data exposed through source, builds, logs, errors, client bundles, exports, caches, or cross-tenant storage, including unsafe diagnostic payloads and attacker-controlled content that can forge record boundaries.
- Flag cryptographic or transport usage that violates the required authentication, randomness, nonce, verification, key scope, or key lifecycle contract.
- Flag a reachable dependency with a verified vulnerability, or supply-chain and update behavior that lets untrusted artifacts execute with trusted permissions.
- Flag CI, infrastructure, cloud identity, containers, or debug surfaces that grant untrusted input or actors more access than their task requires.
- Flag agent or model content treated as authority to execute actions, cross user boundaries, reveal private context, or override the actual user's authorization.
- Flag local storage, IPC, deep links, device enrollment, or update paths that let another actor cross the client or device trust boundary.
- Flag insecure defaults, fallback, restore, reload, legacy paths, or configuration precedence that disables a required security control.
