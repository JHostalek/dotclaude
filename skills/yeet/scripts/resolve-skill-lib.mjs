export function parseArgs(argv, defaultCwd) {
  let cwd = defaultCwd;
  const names = [];

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--cwd") {
      const next = argv[index + 1];
      if (!next) throw new Error("--cwd requires a path");
      cwd = next;
      index += 1;
    } else if (value === "--help" || value === "-h") {
      return { help: true, cwd, names: [] };
    } else if (value.startsWith("-")) {
      throw new Error(`Unknown option: ${value}`);
    } else {
      names.push(value);
    }
  }

  if (names.length === 0) throw new Error("Provide at least one canonical skill name");
  return { help: false, cwd, names: [...new Set(names)] };
}

export function resolveSkills(groups, names) {
  const registry = groups.flatMap((group) => group.skills || []);
  const skills = [];
  const errors = [];

  for (const name of names) {
    const matches = registry.filter((skill) => skill.name === name);
    const enabled = matches.filter((skill) => skill.enabled);

    if (enabled.length === 0) {
      errors.push({ name, reason: matches.length ? "disabled" : "not-installed" });
      continue;
    }

    const paths = [...new Set(enabled.map((skill) => skill.path))];
    if (paths.length !== 1) {
      errors.push({ name, reason: "ambiguous", paths });
      continue;
    }

    const skill = enabled.find((candidate) => candidate.path === paths[0]);
    skills.push({ name: skill.name, path: skill.path, scope: skill.scope, enabled: true });
  }

  return { skills, errors };
}
