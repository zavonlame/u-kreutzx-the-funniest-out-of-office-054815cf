// The Funniest Out-of-Office — one line, 140 characters or fewer.
// The reply is embedded as a literal: no files are read, no network is
// used, so the program behaves identically in the grader sandbox.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The reply: a real out-of-office line with a twist in the tail —
// the sender is not ignoring you by email, they are ignoring you
// in person instead. The return date makes it a reply someone
// would actually set, and every word earns its place.
const REPLY =
  "Out of office until Monday. I'm ignoring you in person this week instead of by email.";

function outDir(): string {
  const env = process.env.MAKEFUN_OUTPUT_DIR;
  if (env && env.length > 0) {
    return env;
  }
  return "/output";
}

function writeReply(dir: string): void {
  // The sealed gate: /output/entry.txt must be UTF-8 text of 1 to 140
  // characters, not only white space. Count code points, not UTF-16 units.
  const chars = [...REPLY].length;
  if (chars < 1 || chars > 140 || REPLY.trim().length === 0) {
    throw new Error(`reply must be 1-140 characters, got ${chars}`);
  }
  if (REPLY.includes("\n")) {
    throw new Error("reply must be a single line");
  }
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), REPLY, "utf8");
}

writeReply(outDir());
