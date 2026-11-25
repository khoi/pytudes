import { existsSync } from "node:fs";
import { run } from "./aoc.ts";

const [year, day, inputPath, ...extra] = Bun.argv.slice(2);
if (
	!/^\d{4}$/.test(year ?? "") ||
	!/^\d{1,2}$/.test(day ?? "") ||
	extra.length
) {
	console.error("Usage: bun run day YEAR DAY [INPUT_FILE]");
	process.exit(1);
}

const moduleUrl = new URL(
	`../aoc${year}/src/day${day.padStart(2, "0")}/index.ts`,
	import.meta.url,
);
if (!existsSync(moduleUrl)) {
	console.error(`No solution for ${year} day ${day}.`);
	process.exit(1);
}

const { part1, part2 } = await import(moduleUrl.href);
run(moduleUrl.href, part1, part2, inputPath);
