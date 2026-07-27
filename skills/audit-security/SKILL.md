---
name: audit-security
description: Use when auditing and fixing security in a scope — injection (SQL, shell, template), auth/authz gaps, secrets in code or logs, weak crypto, missing validation at trust boundaries, XSS, SSRF, path traversal. Triggers on "audit security", "security review", "fix vulnerabilities", "OWASP check". Performs a comprehensive, architecture-led review; named weakness classes are a minimum, never an exhaustive boundary.
argument-hint: [path]
---

!`cat "${CLAUDE_SKILL_DIR}/../audit-workflow.md"`

Run as the `security` dimension. This is defensive review of software the user authorized. Find how the system can violate confidentiality, integrity, availability, privacy, tenant isolation, or control of privileged actions; do not reduce the task to matching a vulnerability checklist.

<coverage_invariant>
Every category and example in this skill and its baseline is a minimum, non-exhaustive set. Add, combine, split, and reweight probes based on the actual architecture, technologies, deployment, data, users, attacker capabilities, and current threat landscape. A named list must never become the boundary of the review. Skip a baseline area only when it is demonstrably inapplicable, and record why.
</coverage_invariant>

## Work top-down

Start with the system, not grep patterns:

1. Reconstruct the security model from code, configuration, infrastructure, schemas, manifests, lockfiles, tests, and docs: assets, sensitive data, actors, identities, privileges, trust boundaries, entry and egress points, data/control flows, tenants, dependencies, deployment/runtime, administrative paths, recovery paths, and security assumptions.
2. Derive likely attacker goals and abuse paths. Include unauthenticated, ordinary-user, cross-tenant, compromised dependency/integration, malicious insider, and operational-misconfiguration perspectives when relevant. Invent additional actors and paths the system implies.
3. Inspect architecture-wide controls and dangerous compositions first. Then trace concrete paths from controllable source through transformations and checks to security-sensitive sink or state change. Review both missing controls and controls that exist but can be bypassed, raced, confused, downgraded, or misconfigured.
4. Apply the mandatory baseline across every applicable component and boundary. Expand it for domain-specific surfaces such as payments, healthcare, identity providers, browsers, mobile, desktop, cloud, Kubernetes, embedded/OT, cryptography, or AI agents.

Do not assume safety from a framework, UUID, ORM, managed service, “internal” route, environment variable, client-side restriction, or security-looking helper. Verify the exact version, configuration, call path, deployment boundary, and failure mode. Look for emergent flaws between individually reasonable components.

## Mandatory security review baseline

This is minimum coverage, not an exhaustive checklist. Apply every relevant lens, add any weakness class suggested by the system or current threat intelligence, and inspect interactions between lenses. “Not listed” never means “out of scope.”

### 1. Security model and architecture

- Assets, sensitive operations, data classifications, trust boundaries, privilege levels, tenant boundaries, external dependencies, administrators, support access, break-glass and recovery paths.
- Entry points and egress: HTTP/API, RPC, queues, events, files, imports/exports, webhooks, callbacks, sockets, IPC, deep links, scheduled jobs, CLIs, admin/debug interfaces, metrics, health endpoints, and outbound network access.
- Data and control flows across processes, services, accounts, regions, devices, caches, replicas, backups, analytics, logs, and third parties.
- Security assumptions, single points of control, confused-deputy paths, shared responsibility gaps, dangerous feature composition, insecure defaults, fail-open behavior, and bypasses between old/new or sync/async paths.
- Threat actors and abuse goals derived from the product. Include unexpected but plausible sequences, not only intended workflows.

### 2. Identity, authentication, and account lifecycle

- Enrollment, login, logout, reauthentication, step-up, MFA/passkeys, federation/SSO/OIDC/SAML, service identities, API keys, device identity, and machine-to-machine authentication.
- Credential storage and verification, enumeration, brute force, rate limits, credential stuffing, replay, downgrade, phishing-resistant flows, token binding where required, and default/shared credentials.
- Session creation, rotation, expiration, revocation, fixation, concurrent sessions, cookie attributes, bearer-token leakage, refresh tokens, JWT algorithm/key confusion and claim validation.
- Account linking, email/phone change, password reset, recovery, invitation, activation, deactivation, deletion, lockout, support override, and takeover through weaker recovery factors.
- Identity canonicalization and ambiguity: case, Unicode, aliases, reused identifiers, stale identities, federation issuer/subject collisions, and tenant selection.

### 3. Authorization, isolation, and privilege

- Deny-by-default enforcement at every entry point and background path; centralized policy consistency; server-side checks close to the protected resource/action.
- Object-, function-, field/property-, action-, and context-level authorization; IDOR/BOLA/BFLA; mass assignment; hidden fields; exports; search; bulk endpoints; indirect references.
- Horizontal, vertical, cross-tenant, cross-workspace, cross-region, and cross-environment access; shared caches, queues, storage, indexes, logs, metrics, and analytics.
- Role/group lifecycle, privilege escalation, delegation, impersonation, support/admin tooling, service-account scope, confused deputy, capability leakage, and stale authorization after changes.
- Policy bypass through alternate APIs, legacy routes, batch jobs, webhooks, retries, race conditions, replicas, client-controlled claims, or inconsistent normalization.

### 4. Input, parsing, and injection

- Injection into SQL/NoSQL/graph queries, OS commands and arguments, shells, templates, expressions, code/eval, LDAP, XPath, headers, email, logs, CSV/formulas, and downstream interpreters.
- Stored/reflected/DOM XSS, unsafe HTML/URL/CSS/JavaScript contexts, DOM clobbering, prototype pollution, client-side template injection, and unsafe rich-text/Markdown/SVG rendering.
- Deserialization and object hydration, type confusion, polymorphic types, YAML, XML/XXE, archives, images/media, documents, regex/ReDoS, compression bombs, parser differentials, nesting/size limits, and malformed encodings.
- Files and paths: traversal, absolute paths, symlinks/hardlinks, archive extraction, race/TOCTOU, uploads, content sniffing, extension/MIME mismatch, active content, storage permissions, and download headers.
- URLs and outbound requests: SSRF, DNS rebinding, redirects, alternate IP encodings, URL parser disagreement, scheme smuggling, proxy behavior, cloud metadata, localhost/private networks, and credential forwarding.
- Request boundaries: HTTP request smuggling/splitting, CRLF, host-header poisoning, cache poisoning/deception, parameter pollution, duplicate keys, multipart ambiguity, and inconsistent proxy/backend normalization.
- Validation of syntax, semantics, size, range, state, ownership, provenance, and canonical form at every trust boundary—not only at the UI.

### 5. Web, API, and distributed protocol security

- CSRF, CORS, CSP, clickjacking, origin checks, redirects, browser storage, cookies, postMessage, service workers, subresource integrity, mixed content, and sensitive data in URLs/history/referrers.
- REST, GraphQL, gRPC, WebSocket, SSE, webhooks, callbacks, and message consumers: authentication, authorization, schema enforcement, introspection/exposure, subscriptions, replay, signatures, ordering, freshness, and resource limits.
- Rate limits and quotas by the correct identity and cost; distributed bypass, expensive queries, fan-out, amplification, pagination, batching, and unbounded result sets.
- Idempotency, retries, duplicate delivery, partial failure, eventual consistency, stale reads, race conditions, TOCTOU, locking, transaction boundaries, and state-machine integrity.
- Error handling and status differences that leak secrets, identifiers, existence, internal topology, stack traces, or policy state.

### 6. Business logic and abuse resistance

- Invalid state transitions, skipped steps, reordered/repeated actions, negative or extreme values, rounding/units/currency errors, coupon/credit/refund abuse, double spend, inventory or quota bypass, and race-winning workflows.
- Approval, separation-of-duty, four-eyes, limits, reconciliation, settlement, cancellation, dispute, recovery, and irreversible action safeguards.
- Automation and bulk abuse, scraping, spam, enumeration, fraud, resource hoarding, asymmetric-cost actions, free-tier abuse, and attacks using valid accounts or valid inputs.
- User-controlled pricing, entitlement, role, tenant, status, timestamps, risk signals, or workflow state. Verify the server owns authoritative transitions.
- Safety of imports, exports, sharing, collaboration, invitations, public links, notifications, and integrations when combined in unintended sequences.

### 7. Data protection, privacy, and cryptography

- Data minimization, purpose and tenant separation, collection, consent where relevant, retention, deletion, export, replication, backups, caches, analytics, support tooling, and non-production copies.
- Sensitive data exposure in responses, source maps, client bundles, URLs, metadata, filenames, logs, traces, metrics, crash reports, notifications, exports, errors, and third parties.
- Encryption in transit and at rest, certificate/hostname validation, protocol versions, downgrade resistance, key scope, envelope design, authenticated encryption, nonce/IV uniqueness, randomness, and misuse resistance.
- Password hashing/KDF parameters, token generation, signatures/MACs, algorithm agility, key generation/storage/access/rotation/revocation/destruction, KMS/HSM policy, and separation by tenant/environment/purpose.
- Side channels, timing comparisons, oracle behavior, compression leakage, secret-dependent branching/access, and memory remnants when the threat model warrants them.
- Secrets in code, history, images, artifacts, CI variables, IaC state, logs, examples, tests, caches, process arguments, environment exposure, and overly broad secret-manager access.

### 8. Dependencies and software supply chain

- Direct/transitive dependencies, lockfiles, registries, abandoned or unmaintained components, known exploited vulnerabilities, vulnerable versions/configurations, and reachable vulnerable code.
- Typosquatting, dependency confusion, namespace ownership, install/build scripts, plugins, extensions, downloaded binaries, remote scripts, CDN assets, models, datasets, and tool/MCP packages.
- Pinning, hashes/signatures, provenance/attestations, trusted publishers, immutable references, reproducible builds where needed, SBOM accuracy, and update integrity.
- Build inputs, generated code, vendored assets, compiler/toolchain, package-manager configuration, and trust in pull requests, bots, maintainers, and release automation.
- Unsafe or stale forks, security patches that were not backported, and feature flags or optional modules that retain vulnerable code paths.

### 9. Build, CI/CD, deployment, cloud, and infrastructure

- Repository and CI permissions, untrusted PR execution, workflow injection, secret exposure, artifact poisoning, cache poisoning, runner isolation, branch/tag protection, release signing, and deployment authorization.
- IaC and platform defaults; public exposure; network segmentation; ingress/egress; firewall/security-group rules; DNS/TLS; admin planes; debug ports; metadata services; and environment separation.
- Cloud IAM and resource policies, trust policies, role assumption, service principals, workload identity, wildcard actions/resources, privilege escalation chains, cross-account access, and stale credentials.
- Containers and orchestration: base images, image provenance, root/capabilities, seccomp/AppArmor/SELinux, mounts, sockets, host namespaces, secrets, admission policy, RBAC, network policy, and control-plane exposure.
- Storage, databases, queues, caches, search indexes, serverless functions, and managed services: authentication, encryption, public access, tenant boundaries, backups, snapshots, replicas, and dangerous defaults.
- Deployment rollback, migrations, mixed-version security, ephemeral/preview environments, disaster recovery, infrastructure drift, and secure decommissioning.

### 10. Runtime, operations, detection, and resilience

- Least privilege and isolation for processes, services, users, files, devices, networks, and administrative tooling; sandbox escapes and unsafe FFI/native boundaries.
- Memory safety, integer/format errors, unsafe code, use-after-free, buffer errors, concurrency hazards, and mitigations when memory-unsafe code or native extensions exist.
- Resource exhaustion across CPU, memory, disk, descriptors, threads, connections, queues, recursion, cardinality, payloads, storage, and downstream spend. Check attacker-to-defender cost asymmetry.
- Security logging for authentication, authorization, administration, sensitive data access, policy/config changes, and destructive actions; integrity, correlation, retention, tenant separation, and useful alerting.
- Logs must avoid secrets and attacker-controlled log forging. Failures must be observable without exposing internals.
- Patching, inventory, vulnerability intake/disclosure, incident containment, credential/key revocation, forensic evidence, recovery, backup restoration, and safe degradation/failover.
- Debug/test features, diagnostics, feature flags, maintenance modes, default accounts, sample data, and development configuration reaching production.

### 11. Client, mobile, desktop, and device surfaces

- Local secret/data storage, OS key stores, filesystem permissions, clipboard, screenshots, notifications, backups, logs, caches, and multi-user device boundaries.
- Deep/universal links, custom URL schemes, intents, IPC, exported components, browser bridges/WebViews, native message handlers, extension/plugin boundaries, and local services.
- TLS validation/pinning policy, hostile networks, rooted/jailbroken devices when relevant, tampering, reverse engineering assumptions, offline authorization, and clock manipulation.
- Code signing, notarization, update discovery/download/signature/rollback, package permissions, auto-update channels, and supply-chain trust.
- Hardware interfaces, firmware, secure boot, debug ports, physical access, pairing, device identity, fleet enrollment, and factory reset when present.

### 12. AI, LLM, agent, and data-driven systems

- Direct and indirect prompt injection across user input, retrieved content, files, web pages, messages, tool output, memory, and inter-agent communication. Treat all retrieved/model-generated content as untrusted data.
- Tool/action authorization, least privilege, user intent binding, approval boundaries, argument validation, sandboxing, network/filesystem scope, dangerous action composition, and confused-deputy behavior.
- Excessive agency, goal hijacking, memory/context poisoning, RAG or knowledge-base poisoning, retrieval authorization leaks, cross-user context, prompt/system instruction leakage, and sensitive training/inference data.
- Insecure model output passed into code, shell, queries, templates, browsers, APIs, or other agents; validate at the final execution boundary.
- Model, dataset, embedding, plugin, MCP, skill, and tool supply chains; provenance, integrity, access control, updates, and compromised provider/integration behavior.
- Denial of wallet, unbounded loops/tool calls, token/context exhaustion, recursive delegation, output flooding, and attacker-controlled cost amplification.
- Model extraction, inversion, membership inference, evasion, adversarial examples, unsafe fallback models, routing/downgrade, and evaluation/monitoring gaps when relevant.
- Human oversight that is meaningful rather than rubber-stamping; clear attribution, auditability, reversibility, and containment of autonomous actions.

### 13. Configuration, defaults, and lifecycle

- Secure-by-default installation and first run; no universal/default credentials; high-risk features off or constrained; security controls available without hidden premium dependencies where product scope makes that relevant.
- Configuration precedence, environment overrides, parsing/coercion, unsafe fallback values, partial configuration, hot reload, drift, and differences across development/test/staging/production.
- Compatibility and legacy modes, migration paths, deprecated protocols, stale endpoints, old clients, feature flags, and downgrade paths that bypass modern controls.
- Onboarding, tenant creation, cloning, import, restore, offboarding, deletion, ownership transfer, domain reclamation, and identifier reuse.
- Documentation/examples/templates that create insecure deployments, plus mismatch between documented guarantees and actual enforcement.

### 14. Specialized and emergent surfaces

Derive additional coverage whenever the system includes specialized domains. Examples include payment/cardholder systems, financial ledgers, healthcare data, biometrics, safety-critical control, embedded/IoT/OT, identity providers, messaging/email, browsers/extensions, multi-party cryptography, blockchains/smart contracts, gaming economies, geolocation, children’s data, and regulated records. These examples are explicitly non-exhaustive.

Check current primary sources and advisories for the exact stack. Useful coverage maps include current OWASP ASVS, OWASP Top 10 and API Security Top 10, OWASP guidance for LLM/agentic applications, current CWE Top 25, CISA Known Exploited Vulnerabilities and Secure by Design guidance, and NIST SSDF. None replaces system-specific threat modeling or proof.

## Evidence and judgment

Collect candidates before filtering, as required by the shared workflow. For each retained finding, establish:

- violated security invariant and affected asset;
- attacker prerequisites and controllable input or state;
- exact path to impact, including relevant existing controls and why they fail;
- realistic impact and blast radius;
- smallest safe fix and a regression test or verification method.

Use a harmless local proof when needed. Never target systems outside the authorized scope, persist access, evade detection, destructively modify data, or expose real secrets. Redact sensitive evidence.

Reject a candidate only after disproving its attack path or showing an effective control on that exact path. “No exploit demonstrated” is not enough when the missing invariant itself is provable. Distinguish confirmed vulnerabilities, defense-in-depth weaknesses, and unresolved questions.

Rank by exploitability, privilege required, exposure, data/tenant reach, detectability, and business impact. Use CWE where it fits; do not force an inaccurate CWE. Add CVSS or framework mappings only when useful, and never let a score override the actual threat model.

For version-sensitive behavior, dependencies, protocols, cloud services, or cryptography, verify against current primary documentation and current advisories when access permits. Treat standards as coverage maps, not exhaustive truth.

## Fix and completion gate

Auto-fix only within the shared workflow’s safety boundary. Preserve legitimate behavior; prefer eliminating the unsafe primitive or architecture over adding a fragile denylist. Test the closed attack path plus important allowed behavior. Escalate changes to identity/session semantics, authorization policy, tenant model, public API behavior, cryptographic formats or keys, data migration, infrastructure exposure, or product workflow.

Before sign-off, produce a coverage ledger for the baseline: `reviewed`, `not applicable` with reason, or `deferred` with blocker. Reconcile findings across boundaries and search for variants of every confirmed flaw. Do not claim “secure” or “no vulnerabilities”; state scope, evidence, gaps, and residual risk.

For every numbered baseline area, record:

- components and boundaries reviewed;
- attack paths tested or invariants verified;
- findings and searched variants;
- `not applicable` with evidence;
- `deferred` with the exact blocker and residual risk.

Also record newly derived lenses that were not in the baseline. Completion requires accounting for every baseline area and every material boundary—not finding a predetermined number of issues.
