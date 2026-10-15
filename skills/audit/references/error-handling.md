# Error handling

- Flag errors for conditions in which an operation's intended result is already satisfied, such as ensuring an item is absent when it is already absent. Consider whether natural semantics can eliminate the error.
- Flag routine boundary or empty cases that every caller must guard even though the operation could define a coherent result for them. Preserve rejection when the distinction is important to callers.
- Flag exceptions or sentinel failures that export a problem the module can resolve using its own knowledge, especially when callers merely repeat the same recovery or ignore the failure.
- Flag repeated handlers that perform the same response, cleanup, or abort action for failures that could be handled together at an appropriate boundary. Preserve distinctions that require different handling.
- Flag separate recovery mechanisms for related failures when an existing general recovery mechanism could handle them without an unacceptable cost or change in guarantees.
- Flag recovery code that introduces further special failures or leaves inconsistent partial state without a clear terminating recovery or abort path.
- Flag attempts to continue after an unrecoverable internal inconsistency when the application cannot safely fulfill its contract. Stopping with useful diagnostics may be simpler than unreliable recovery.
- Flag errors suppressed or masked when callers still need to know that an operation failed, data was lost, or a peer is unavailable. Masking is valid only when the promised behavior is actually preserved.
- Flag explicit absence flags and special branches for a case that could be represented by an ordinary empty value with the same correct semantics. Show how the additional state multiplies checks.
- Flag representations that violate a useful invariant and force the same exceptional case to be handled throughout the code. Establish the invariant's suitability rather than removing a distinction the domain needs.
- Flag failure propagation or translation that loses the original cause, category, cancellation identity, or context the receiving boundary needs to respond correctly.
- Flag API, CLI, worker, queue, or UI boundaries that signal success, acknowledge work, or exit successfully before the required operation completes.
- Flag detached asynchronous work whose failure has no accountable observer or whose continued effects outlive cancellation without an intended owner.
- Flag cleanup that leaks resources on failure or after partial acquisition, including files, sockets, locks, leases, transactions, processes, tasks, and subscriptions.
- Flag cleanup failures that replace the primary failure or leave poisoned resources available for reuse.
- Flag deadline or cancellation handling that reports a definite outcome while committed effects remain unknown. Distinguish the caller stopping its wait from the operation actually stopping.
