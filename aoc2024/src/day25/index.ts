import { run } from "../../../scripts/aoc.ts";

export function part1(input: string) {
	const schematics = input
		.trim()
		.split(/\r?\n\s*\n/)
		.map((block) => block.split(/\r?\n/));
	const locks: number[][] = [];
	const keys: number[][] = [];
	const clearance = schematics[0].length - 2;
	for (const rows of schematics) {
		const heights = [...rows[0]].map(
			(_, x) => rows.filter((row) => row[x] === "#").length - 1,
		);
		(rows[0][0] === "#" ? locks : keys).push(heights);
	}
	let fits = 0;
	for (const lock of locks)
		for (const key of keys)
			if (lock.every((h, x) => h + key[x] <= clearance)) fits++;
	return fits;
}

if (import.meta.main) run(import.meta.url, part1);
