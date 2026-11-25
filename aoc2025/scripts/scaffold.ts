import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const day = Bun.argv[2];

if (!day) {
	console.error("Usage: bun scaffold <day>");
	console.error("Example: bun scaffold 1");
	process.exit(1);
}

const dayNum = parseInt(day, 10);
if (Number.isNaN(dayNum) || dayNum < 1 || dayNum > 25) {
	console.error("Day must be a number between 1 and 25");
	process.exit(1);
}

const dayStr = dayNum.toString().padStart(2, "0");
const dayDir = join(__dirname, "..", "src", `day${dayStr}`);

if (existsSync(dayDir)) {
	console.log(`Day ${dayStr} already exists at ${dayDir}, skipping scaffold`);
	process.exit(0);
}

mkdirSync(dayDir, { recursive: true });

const indexTs = `import { run } from "../../../scripts/aoc.ts";

export function part1(_input: string): number {
	throw new Error("Implement part 1");
}

export function part2(_input: string): number {
	throw new Error("Implement part 2");
}

if (import.meta.main) run(import.meta.url, part1, part2);
`;

const testTs = `import { describe, it } from "bun:test";

describe("Day ${dayStr}", () => {
	it.todo("part1");
	it.todo("part2");
});
`;

writeFileSync(join(dayDir, "index.ts"), indexTs);
writeFileSync(join(dayDir, "index.test.ts"), testTs);
writeFileSync(join(dayDir, "sample.txt"), "");
writeFileSync(join(dayDir, "input.txt"), "");

console.log(`Created day ${dayStr} at ${dayDir}`);
