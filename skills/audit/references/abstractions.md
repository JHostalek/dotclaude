# Abstractions

- Flag a module whose interface, including usage rules and exceptions, is nearly as complicated as its implementation. It makes callers learn another surface while hiding little useful complexity.
- Flag adjacent layers that expose essentially the same abstraction and contribute little distinct functionality. Show the responsibility duplicated across those layers.
- Flag a method that merely forwards arguments to another method with a similar signature and adds no meaningful behavior. Dispatchers and distinct implementations of a shared interface can legitimately reuse signatures.
- Flag decorators or wrappers whose forwarding methods and setup burden outweigh the small feature they add. A useful wrapper must earn its interface and boilerplate through real functionality or separation.
- Flag clusters of small classes or methods that make one task require learning many interfaces, managing several objects, or repeatedly jumping between files. Small size alone is neither a benefit nor a defect.
- Flag APIs with many use-specific operations that could be expressed through a few simple general operations covering current needs. Generality should simplify today's uses rather than add speculative features.
- Flag an abstraction so general that using it for current requirements demands substantial glue, flags, or interpretation. A smaller method count does not compensate for harder individual calls.
- Flag an entity whose purpose cannot be stated simply and completely because it combines several meanings or responsibilities. A long or awkward description is evidence to examine the design, not an automatic defect.
- Flag a design pattern that forces the problem into extra roles, indirection, or constraints without simplifying it. Familiarity with a pattern does not establish that it fits this problem.
