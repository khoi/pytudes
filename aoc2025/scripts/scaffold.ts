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

const indexTs = `import { readFileSync } from "node:fs";

const sample = readFileSync(new URL("./sample.txt", import.meta.url), "utf-8");
const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

export function part1(input: string): number {
	return 0;
}

export function part2(input: string): number {
	return 0;
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
`;

const testTs = `import { readFileSync } from "node:fs";
import { describe, expect, it } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = readFileSync(new URL("./sample.txt", import.meta.url), "utf-8");
const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

describe("Day ${dayStr}", () => {
	it("part1", () => {
		// expect(part1(sample)).toBe(1);
	});

	it("part2", () => {
		// expect(part2(sample)).toBe(1);
	});
});
`;

writeFileSync(join(dayDir, "index.ts"), indexTs);
writeFileSync(join(dayDir, "index.test.ts"), testTs);
writeFileSync(join(dayDir, "sample.txt"), "");
writeFileSync(join(dayDir, "input.txt"), "");

console.log(`Created day ${dayStr} at ${dayDir}`);
