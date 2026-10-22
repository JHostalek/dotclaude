# Logs

- Flag consequential outcomes or state transitions whose diagnostics cannot answer what happened, to whom, and whether the operation completed, failed, or degraded. One structured event per unit of work often answers this better than scattered lines.
- Flag success, count, actor, target, or outcome messages that disagree with actual state or describe acceptance as completion.
- Flag failure records that omit the relevant cause and context or replace useful evidence with an unrelated exception.
- Flag correlation (request, trace, job, message, or entity IDs) lost across async boundaries or retries, making the causal path impossible to reconstruct.
- Flag unstable names, types, units, field collisions, or dynamic message templates that break existing queries or prevent meaningful aggregation.
- Flag routine production logs, per-item records, repeated stack traces, or retry storms whose volume buries consequential evidence or costs disproportionately.
- Flag severity that makes normal operation look like failure or hides an exhausted, actionable failure below the level operators rely on.
- Flag logging that can block, fail, recurse, or exhaust resources in a way that worsens or masks the application failure.
- Flag exporter, routing, sampling, retention, flush, or mixed-version configuration that loses required records or sends them to the wrong environment or tenant.
- Flag dashboards, alerts, or runbooks whose expected events and fields are no longer emitted with the semantics they depend on.
