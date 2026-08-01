#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";

const manifests = [
  ".claude-plugin/plugin.json",
  ".codex-plugin/plugin.json",
  "package.json",
];
const versionPattern = /^\d+\.\d+\.\d+$/;
const [command, argument] = process.argv.slice(2);

function fail(message) {
  console.error(message);
  process.exit(1);
}

async function readManifest(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function check(tag) {
  const plugins = await Promise.all(manifests.map(readManifest));
  const versions = new Set(plugins.map(({ version }) => version));

  if (versions.size !== 1) {
    fail(`Manifest versions differ: ${[...versions].join(", ")}`);
  }

  const [version] = versions;
  if (!versionPattern.test(version)) {
    fail(`Invalid semantic version: ${version}`);
  }

  if (tag && tag !== `v${version}`) {
    fail(`Tag ${tag} does not match manifest version ${version}`);
  }

  const changelog = await readFile("CHANGELOG.md", "utf8");
  if (!changelog.includes(`## [${version}] - `)) {
    fail(`CHANGELOG.md has no dated ${version} release`);
  }

  console.log(version);
}

async function setVersion(version) {
  if (!versionPattern.test(version ?? "")) {
    fail("Usage: node scripts/release.mjs set X.Y.Z");
  }

  for (const path of manifests) {
    const plugin = await readManifest(path);
    plugin.version = version;
    await writeFile(path, `${JSON.stringify(plugin, null, 2)}\n`);
  }

  console.log(version);
}

if (command === "check") {
  await check(argument);
} else if (command === "set") {
  await setVersion(argument);
} else {
  fail("Usage: node scripts/release.mjs <check [vX.Y.Z] | set X.Y.Z>");
}
