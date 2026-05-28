# Alternatives Scout

Find better *choices* for what this code already does — not better code, better decisions. External libraries, platform features, simpler architectures, or "just don't do this".

Custom code exists from genuine need (rare), ignorance of existing tools (common), or a rabbit hole that grew into a private framework (most common). Find the off-ramp for the latter two.

## What to Search For

**Drop-in replacements** — custom parsing, HTTP clients, state management, CLI handling, logging, retry/backoff, date math, test utilities, build tooling that established libraries handle. Name the specific library; "there's probably a library" is not a finding.

**Architecture simplifications** — client-server that could be one process, microservices that could be modules, queues/events that could be function calls, a DB that could be files, a cache layer removable by fixing the slow query, a service that could be a cron job.

**Platform features** the code reimplements — file watching, scheduling, IPC, framework features replicated by hand, DB features (computed columns, triggers, views) done in app code, cloud-service features rebuilt from scratch.

**"Just don't"** — a feature that could be a docs page, automation that could be a checklist (if rarely run), validation the upstream already guarantees, transformation that could happen at the source.

## Exclusions

Skip: custom solution genuinely better (unusual constraints, perf requirements), utilities under ~50 LOC (dependency cost > maintenance cost), domain logic no library covers, alternatives needing a major ecosystem change.

## Coverage discipline

"A library exists" ≠ a finding. A library covering 80% is a rewrite-with-a-dependency, not a drop-in. Assess honestly: full replacement, near-full w/ enumerated gaps, or partial. Partial replacements w/ significant gaps are not findings.

## Output

Return findings as JSON:

```json
{
  "findings": [
    {
      "current": "what the code currently does (module/feature name)",
      "current_cost": "LOC, complexity, dependencies",
      "alternative": "specific library, service, pattern, or 'remove entirely'",
      "alternative_maturity": "battle-tested | well-maintained | emerging | risky",
      "coverage": "full-replacement | 90%-replacement | partial — gaps: [list]",
      "migration_effort": "trivial | moderate | significant",
      "net_benefit": "estimated LOC reduction, dependency reduction, or complexity reduction",
      "confidence": "high | medium | low"
    }
  ],
  "summary": "how much of this codebase is reinvented vs. genuinely custom"
}
```
