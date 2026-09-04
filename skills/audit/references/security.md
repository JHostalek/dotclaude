# Security

Run as the `security` dimension for authorized defensive review. Map assets, sensitive operations, actors/privileges, trust and tenant boundaries, entry/egress points, dependencies, and deployment.

Trace attacker-controlled sources through transformations and controls to sensitive sinks or state changes. Include unauthenticated, ordinary-user, cross-tenant, compromised integration, insider, and misconfiguration paths; check bypass, race, downgrade, and dangerous feature composition.

## Probes

1. **Architecture:** data/control flow across stores/services/accounts/devices/third parties, support/break-glass/recovery access, admin/debug/health endpoints, single enforcement points, confused deputies, shared-responsibility gaps, and old/new or sync/async bypasses.
2. **Identity:** enrollment/login/MFA/federation/service identities, credential storage/enumeration/brute force/replay, session rotation/revocation/fixation/cookies, refresh/JWT key and claim confusion, account linking/reset/invites/deletion/support takeover, canonicalization and issuer/subject/tenant collisions.
3. **Authorization:** server-side default denial at every resource/action/field and background path, BOLA/BFLA/mass assignment/bulk/export/search, cross-tenant caches/stores/analytics, delegation/impersonation/service scope, stale privileges, and alternate-route/race/normalization bypass.
4. **Input/interpreters:** SQL/NoSQL/shell/template/eval/header/log/CSV injection; contextual XSS, Markdown/SVG, DOM/prototype pollution; unsafe deserialization/XML/archives/media, parser differentials/bombs/limits; traversal/symlinks/upload/TOCTOU; SSRF/redirect/DNS rebinding/parser disagreement/metadata/credential forwarding; smuggling/CRLF/cache poisoning/duplicate keys. Validate semantics and provenance as well as syntax.
5. **Web/protocols:** CSRF/CORS/CSP/origins/cookies/storage/postMessage/service workers, sensitive URLs, API/stream/webhook authentication/signatures/replay/freshness, expensive fan-out and identity-keyed limits, idempotency/order/partial failure, and revealing errors/status differences.
6. **Business abuse:** skipped/repeated/reordered transitions, negative/extreme/rounding values, credit/refund/double-spend/quota races, approvals/separation of duties, fraud/automation/asymmetric cost, client-controlled authority, and unintended sharing/import/invitation combinations.
7. **Data/crypto:** minimization/retention/deletion across copies, source-map/bundle/log/error/export leaks, TLS/hostname/downgrade, authenticated encryption/nonces/randomness, KDF/token/signature strength, key lifecycle/scope/KMS policy, warranted side-channel checks, and secrets in history/build/CI/IaC/process surfaces.
8. **Supply chain:** exact reachable vulnerable versions/advisories, transitive/unmaintained dependencies, registries/namespace confusion/install scripts, remote binaries/CDNs/models/tools, pinning/provenance/update integrity, build inputs and untrusted contributors, and unpatched forks/optional paths.
9. **CI/infrastructure:** untrusted PR/workflow execution, runner/cache/artifact poisoning, secret/release permissions, IaC exposure/segmentation/DNS/TLS/admin planes, cloud IAM escalation/trust chains, container privileges/mounts/socket/namespaces, managed-store defaults, preview/rollback/mixed-version drift, and decommissioning.
10. **Runtime/operations:** process/filesystem/network least privilege, sandbox/FFI/memory safety, integer/concurrency hazards, resource and spend amplification, attributable tamper-resistant security events without secrets/forgery, patch/revocation/containment/recovery, and debug features in production.
11. **Client/device:** local stores/keychains/clipboard/notifications/backups, deep links/IPC/WebView/extension bridges, hostile network/offline-clock assumptions, signing/notarization/update rollback integrity, permissions, firmware/boot/debug/pairing/enrollment/reset where present.
12. **AI/agents:** direct/indirect injection in retrieval/tools/memory/inter-agent content, user-intent-bound action authorization, least privilege/final argument validation, context/RAG poisoning and cross-user leaks, unsafe model output at execution boundaries, model/MCP/skill supply chain, recursive loops/token/spend amplification, inference attacks, routing downgrade, and meaningful reversible oversight.
13. **Configuration/lifecycle:** secure first run/default credentials, precedence/coercion/fallback/reload/environment drift, legacy/downgrade bypass, tenant cloning/import/restore/transfer/deletion/identifier reuse, and insecure templates/examples contradicting guarantees.
14. **Specialized surfaces:** derive domain threats for finance, healthcare, identity, embedded/control, messaging, cryptographic protocols, or regulated records. Use current primary advisories and OWASP/CWE/CISA/NIST maps for coverage, not as substitutes for reachable attack paths.

## Judgment

For each finding establish the asset/invariant, attacker prerequisites and control, exact path past existing controls, impact, and verification. A provable missing invariant need not have a live exploit. Separate confirmed vulnerabilities, defense-in-depth weaknesses, and unresolved questions; use CWE/CVSS only when accurate and useful.

Use harmless local proofs. Stay in authorized scope; do not persist access, evade detection, destructively change data, or expose real secrets. Redact evidence. Verify version-sensitive runtime, protocol, dependency, cloud, and cryptographic claims against primary documentation/advisories.

## Changes and completion

Apply validated security fixes; prefer removing unsafe primitives over fragile denylists and verify blocked attacks plus allowed behavior. Identity/session/auth policy, tenant models, crypto formats/keys, migrations, infrastructure exposure, and workflows are critical only when evidence cannot establish the safe intended correction.

Use the shared evidence and completion rules; account for every applicable numbered probe and material boundary, including domain-derived probes.
