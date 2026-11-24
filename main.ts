// main.ts — make.fun entry: "one line of earned pride".
// Node 22, standard library only. No dependencies, no network, no randomness.
// Kept as plain, dependency-free code so a bare `node main.ts` just works.

const { mkdirSync, writeFileSync } = require("node:fs");
const { join } = require("node:path");

// The judged line is assembled from short literal fragments. Small pieces
// make it easy to verify the final string against the required 148 characters.
const OPENING = "After six months of night shifts,";
const SUBJECT = " the night nurse";
const ACTION = " watched the last patient walk out";
const TURN = " and finally sat down";
const PLACE = " in the chair";
const CLAIM = " she had kept empty all winter.";

// Join the fragments in narrative order: who, what happened, then the rest.
function assembleLine() {
  const parts = [];
  parts.push(OPENING);
  parts.push(SUBJECT);
  parts.push(ACTION);
  parts.push(TURN);
  parts.push(PLACE);
  parts.push(CLAIM);
  return parts.join("");
}

// Read the destination from the environment, falling back to /output.
function outputDir() {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.length > 0) {
    return fromEnv;
  }
  return "/output";
}

// recursive:true makes directory creation idempotent across repeated runs.
function ensureDirectory(dir) {
  mkdirSync(dir, { recursive: true });
}

// The file holds exactly one line: the text followed by a single newline.
function buildFileContents(line) {
  return line + "\n";
}

// Build everything first, then create the folder, then write the one file.
function main() {
  const dir = outputDir();
  const line = assembleLine();
  const contents = buildFileContents(line);
  ensureDirectory(dir);
  const target = join(dir, "entry.txt");
  // The empty chair is the whole story.
  writeFileSync(target, contents, "utf8");
}

main();
