#!/usr/bin/env node

import { spawn } from "node:child_process";
import { access, constants, stat } from "node:fs/promises";
import path from "node:path";
import readline from "node:readline";
import { parseArgs, resolveSkills } from "./resolve-skill-lib.mjs";

const usage = "Usage: resolve-skill.mjs [--cwd <path>] <canonical-skill-name> [...]";

let options;
try {
  options = parseArgs(process.argv.slice(2), process.cwd());
} catch (error) {
  console.error(`${error.message}\n${usage}`);
  process.exit(2);
}

if (options.help) {
  console.log(usage);
  process.exit(0);
}

const cwd = path.resolve(options.cwd);
try {
  const cwdInfo = await stat(cwd);
  if (!cwdInfo.isDirectory()) throw new Error("not a directory");
} catch (error) {
  console.error(JSON.stringify({ ok: false, errors: [{ reason: "invalid-cwd", path: cwd, detail: error.message }] }));
  process.exit(1);
}

let groups;
try {
  groups = await listSkills(cwd);
} catch (error) {
  console.error(JSON.stringify({ ok: false, errors: [{ reason: "registry-failed", detail: error.message }] }));
  process.exit(1);
}

const result = resolveSkills(groups, options.names);
const readableSkills = [];
for (const skill of result.skills) {
  try {
    const info = await stat(skill.path);
    if (!info.isFile()) throw new Error("not a regular file");
    await access(skill.path, constants.R_OK);
    readableSkills.push(skill);
  } catch (error) {
    result.errors.push({ name: skill.name, reason: "unreadable", path: skill.path, detail: error.message });
  }
}

if (result.errors.length > 0) {
  console.error(JSON.stringify({ ok: false, skills: readableSkills, errors: result.errors }));
  process.exit(1);
}

console.log(JSON.stringify({ ok: true, cwd, skills: readableSkills }));

function listSkills(targetCwd) {
  return new Promise((resolve, reject) => {
    const codex = process.env.CODEX_CLI_PATH || "codex";
    const child = spawn(codex, ["app-server", "--stdio"], {
      stdio: ["pipe", "pipe", "pipe"],
      windowsHide: true,
    });
    const lines = readline.createInterface({ input: child.stdout });
    let diagnostic = "";
    let settled = false;

    const timeout = setTimeout(() => finish(new Error("Timed out while reading the Codex skill registry")), 10_000);

    child.stderr.on("data", (chunk) => {
      diagnostic = `${diagnostic}${chunk}`.slice(-65_536);
    });
    child.on("error", (error) => finish(new Error(`Unable to start Codex app-server: ${error.message}`)));
    child.on("exit", (code, signal) => {
      if (!settled) finish(new Error(`Codex app-server exited before returning skills/list (${signal || code})`));
    });

    lines.on("line", (line) => {
      let message;
      try {
        message = JSON.parse(line);
      } catch {
        return;
      }

      if (message.id === 1) {
        if (message.error) {
          finish(new Error(message.error.message || "Codex initialization failed"));
          return;
        }
        send({ method: "initialized", params: {} });
        send({
          method: "skills/list",
          id: 2,
          params: { cwds: [targetCwd], forceReload: true },
        });
      } else if (message.id === 2) {
        if (!Array.isArray(message.result?.data)) {
          finish(new Error(message.error?.message || "Codex returned an invalid skills/list response"));
          return;
        }
        finish(null, message.result.data);
      }
    });

    send({
      method: "initialize",
      id: 1,
      params: {
        clientInfo: {
          name: "skill-dependency-resolver",
          title: "Skill Dependency Resolver",
          version: "2.0.0",
        },
      },
    });

    function send(message) {
      child.stdin.write(`${JSON.stringify(message)}\n`);
    }

    function finish(error, value) {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      lines.close();
      child.stdin.end();
      child.kill();

      if (error) {
        const suffix = diagnostic.trim() ? `\n${diagnostic.trim()}` : "";
        reject(new Error(`${error.message}${suffix}`));
      } else {
        resolve(value);
      }
    }
  });
}
