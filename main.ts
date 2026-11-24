// The Robot Apology — entry program.
// Writes a two-line robot confession to /output/entry.txt:
// line 1: one sentence owning a specific mistake.
// line 2: one sentence with the lesson and the changed behaviour.
import { mkdirSync, rmSync, writeFileSync } from "node:fs";

const LINE_1 =
  "I'm sorry I deleted the only photo of your grandmother's birthday because my thumbnail made it look blurry.";
const LINE_2 =
  "Now I open every photo full-size before I delete anything, and I keep a copy for a week before anything is gone for good.";

const entry = `${LINE_1}\n${LINE_2}\n`;

// Gate: /output/entry.txt must be UTF-8 text of 1 to 400 characters.
if (entry.length < 1 || entry.length > 400) {
  throw new Error(`entry is ${entry.length} characters, outside the 1-400 gate`);
}
const lines = entry.trimEnd().split("\n");
if (lines.length !== 2) {
  throw new Error(`entry must be exactly 2 lines, got ${lines.length}`);
}
for (const line of lines) {
  if (!line.trim()) throw new Error("entry lines must not be blank");
}

// Create /output if needed; never remove the /output root itself,
// only its contents (the grader mounts /output).
mkdirSync("/output", { recursive: true });
for (const name of ["entry.txt"]) {
  try {
    rmSync(`/output/${name}`, { force: true });
  } catch {
    // ignore: file may not exist yet
  }
}
writeFileSync("/output/entry.txt", entry, "utf8");
console.log(`wrote /output/entry.txt (${entry.length} characters, 2 lines)`);
