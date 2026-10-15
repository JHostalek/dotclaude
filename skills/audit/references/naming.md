# Naming

- Flag vague names broad enough to fit several entities where readers need a specific meaning, e.g., an unexplained count, status, block, or result. Identify the ambiguity at actual use sites.
- Flag one name used for distinct concepts with different behavior, units, or coordinate systems. Similar-looking names must not invite unsafe substitution between meanings.
- Flag boolean names that do not say what true means, or sentinel names that mark a value special without explaining its meaning.
- Flag names tied to one use when the entity is a more general concept, e.g., calling an arbitrary text range a selection.
- Flag abbreviations or single-letter names whose meaning is unclear across their scope. Short names are fine when every use is visible together and the role is obvious.
- Flag names implying a result, effect, or domain meaning the code does not actually provide. A reader's reasonable first interpretation should match the behavior.
- Flag cumbersome names enumerating unrelated responsibilities because the entity has no single clear purpose. Examine the underlying decomposition rather than merely shortening the name.
