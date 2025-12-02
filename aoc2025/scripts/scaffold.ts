import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const day = process.argv[2];

if (!day) {
	console.error("Usage: pnpm scaffold <day>");
	console.error("Example: pnpm scaffold 1");
	process.exit(1);
}

const dayNum = parseInt(day, 10);
if (isNaN(dayNum) || dayNum < 1 || dayNum > 25) {
	console.error("Day must be a number between 1 and 25");
	process.exit(1);
}

const dayStr = dayNum.toString().padStart(2, "0");
const dayDir = join(__dirname, "..", "src", `day${dayStr}`);

if (existsSync(dayDir)) {
	console.error(`Day ${dayStr} already exists at ${dayDir}`);
	process.exit(1);
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

if (import.meta.vitest) {
	const { describe, expect, it } = import.meta.vitest;

	describe("Day ${dayStr}", () => {
		it("part1 - sample", () => {
			expect(part1(sample)).toBe(1); // TODO: update with correct answer
		});

		it("part2 - sample", () => {
			expect(part2(sample)).toBe(1); // TODO: update with correct answer
		});
	});
}
`;

writeFileSync(join(dayDir, "index.ts"), indexTs);
writeFileSync(join(dayDir, "sample.txt"), "");
writeFileSync(join(dayDir, "input.txt"), "");

console.log(`Created day ${dayStr} at ${dayDir}`);
