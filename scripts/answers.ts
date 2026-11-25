import { fileURLToPath } from "node:url";
import { readInput, type Solver } from "./aoc.ts";

const root = new URL("../", import.meta.url);
const paths = new Bun.Glob("aoc????/src/day??/index.ts").scanSync(
	fileURLToPath(root),
);
console.log("year,day,part,answer");
for (const path of [...paths].sort()) {
	const [, year, day] = path.match(/^aoc(\d{4})\/src\/day(\d{2})\/index\.ts$/)!;
	const url = new URL(path, root).href;
	const { part1, part2 }: { part1: Solver; part2?: Solver } = await import(url);
	const input = readInput(url);
	for (const [index, solve] of [part1, part2].entries()) {
		if (!solve) continue;
		const answer = String(solve(input)).replaceAll('"', '""');
		console.log(`${year},${Number(day)},${index + 1},"${answer}"`);
	}
}
