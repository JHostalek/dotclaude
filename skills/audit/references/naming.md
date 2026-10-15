# Naming

- Flag names broad enough to describe several different entities when readers need a specific meaning, such as an unexplained count, status, block, or result. Identify the ambiguity at actual use sites.
- Flag the same name used for distinct concepts with different behavior, units, or coordinate systems. Similar-looking names must not invite unsafe substitution between different meanings.
- Flag boolean names that do not communicate what true means, or sentinel names that say a value is special without explaining its meaning.
- Flag names tied to one particular use when the entity represents a more general concept, such as calling an arbitrary text range a selection.
- Flag abbreviations or single-letter names whose meaning is unclear across their scope. Short names are reasonable when every use is visible together and the role is obvious.
- Flag names that imply a result, effect, or domain meaning different from what the code actually provides. A reader's reasonable first interpretation should match the behavior.
- Flag cumbersome names that enumerate unrelated responsibilities because the entity has no single clear purpose. Examine the underlying decomposition rather than merely shortening the name.
