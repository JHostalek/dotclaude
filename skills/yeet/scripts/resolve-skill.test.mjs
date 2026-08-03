import assert from "node:assert/strict";
import test from "node:test";
import { parseArgs, resolveSkills } from "./resolve-skill-lib.mjs";

test("parses and deduplicates a batch", () => {
  assert.deepEqual(parseArgs(["--cwd", "/repo", "plugin:a", "plugin:a", "plugin:b"], "/default"), {
    help: false,
    cwd: "/repo",
    names: ["plugin:a", "plugin:b"],
  });
});

test("resolves enabled skills in request order", () => {
  const groups = [{ skills: [
    { name: "plugin:b", path: "/b", scope: "user", enabled: true },
    { name: "plugin:a", path: "/a", scope: "user", enabled: true },
  ] }];

  assert.deepEqual(resolveSkills(groups, ["plugin:a", "plugin:b"]), {
    skills: [
      { name: "plugin:a", path: "/a", scope: "user", enabled: true },
      { name: "plugin:b", path: "/b", scope: "user", enabled: true },
    ],
    errors: [],
  });
});

test("distinguishes missing, disabled, and ambiguous skills", () => {
  const groups = [{ skills: [
    { name: "plugin:disabled", path: "/disabled", enabled: false },
    { name: "plugin:ambiguous", path: "/one", enabled: true },
    { name: "plugin:ambiguous", path: "/two", enabled: true },
  ] }];

  assert.deepEqual(resolveSkills(groups, ["plugin:missing", "plugin:disabled", "plugin:ambiguous"]).errors, [
    { name: "plugin:missing", reason: "not-installed" },
    { name: "plugin:disabled", reason: "disabled" },
    { name: "plugin:ambiguous", reason: "ambiguous", paths: ["/one", "/two"] },
  ]);
});

test("accepts duplicate registry entries with the same path", () => {
  const groups = [{ skills: [
    { name: "plugin:a", path: "/same", scope: "user", enabled: true },
    { name: "plugin:a", path: "/same", scope: "user", enabled: true },
  ] }];

  assert.equal(resolveSkills(groups, ["plugin:a"]).errors.length, 0);
});
