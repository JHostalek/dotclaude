# Error handling

- Flag errors raised when the operation's intended result already holds, e.g., removing an already absent item. Consider whether natural semantics can define the error out of existence.
- Flag routine boundary or empty cases every caller must guard though the operation could define a coherent result for them. Keep rejection when callers need the distinction.
- Flag exceptions or sentinel failures that export a problem the module could resolve with its own knowledge, especially when callers just repeat the same recovery or ignore the failure.
- Flag repeated handlers performing the same response, cleanup, or abort for failures that could be aggregated at an appropriate boundary. Keep distinctions that need different handling.
- Flag separate recovery mechanisms for related failures when an existing general mechanism could handle them without unacceptable cost or changed guarantees.
- Flag recovery code that introduces further special failures or leaves inconsistent partial state without a clear terminating recovery or abort path.
- Flag continuing after an unrecoverable internal inconsistency when the application cannot safely fulfill its contract. Failing fast with useful diagnostics may be simpler than unreliable recovery.
- Flag suppressed or masked errors when callers still need to know an operation failed, data was lost, or a peer is unavailable. Masking is valid only when the promised behavior is actually preserved.
- Flag explicit absence flags and special branches for a case an ordinary empty value could represent with the same correct semantics. Show how the extra state multiplies checks.
- Flag representations that violate a useful invariant and force the same exceptional case to be handled throughout the code. Establish that the invariant fits rather than removing a distinction the domain needs.
- Flag failure propagation or translation that loses the original cause, category, cancellation identity, or context the receiving boundary needs to respond correctly.
- Flag API, CLI, worker, queue, or UI boundaries that signal success, acknowledge work, or exit successfully before the required operation completes.
- Flag detached (fire-and-forget) async work whose failure has no accountable observer or whose effects outlive cancellation without an intended owner.
- Flag cleanup that leaks resources on failure or after partial acquisition, including files, sockets, locks, leases, transactions, processes, tasks, and subscriptions.
- Flag cleanup failures that replace the primary failure or leave poisoned resources available for reuse.
- Flag deadline or cancellation handling that reports a definite outcome while committed effects remain unknown. Distinguish the caller abandoning its wait from the operation actually stopping.
