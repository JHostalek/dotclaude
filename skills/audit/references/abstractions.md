# Abstractions

- Flag shallow modules: interface, including usage rules and exceptions, nearly as complex as the implementation. Callers learn another surface that hides little.
- Flag adjacent layers with the same abstraction and little distinct functionality. Show the responsibility they duplicate.
- Flag pass-through methods: forward arguments to a similar-signature method, add no meaningful behavior. Dispatchers and distinct implementations of a shared interface may reuse signatures.
- Flag decorators or wrappers whose forwarding methods and setup burden outweigh the small feature added. A wrapper must earn its interface and boilerplate through real functionality or separation.
- Flag classitis: clusters of small classes or methods that make one task require learning many interfaces, managing several objects, or jumping between files. Small size alone is neither benefit nor defect.
- Flag special-purpose APIs: many use-specific operations a few simple general operations could cover for current needs. Generality must simplify today's uses, not add speculative features.
- Flag over-general abstractions: current requirements need substantial glue, flags, or interpretation. Fewer methods do not offset harder individual calls.
- Flag an entity whose purpose cannot be stated simply and completely because it mixes several meanings or responsibilities. A long or awkward description is evidence to examine, not an automatic defect.
- Flag design patterns that add roles, indirection, or constraints without simplifying the problem. Familiarity does not prove fit.
