import { run } from "../../../scripts/aoc.ts";

function calories(input: string) {
	return input
		.trim()
		.split(/\r?\n\s*\r?\n/)
		.map((group) =>
			group.split(/\s+/).reduce((sum, item) => sum + Number(item), 0),
		)
		.sort((a, b) => b - a);
}

export function part1(input: string) {
	return calories(input)[0];
}

export function part2(input: string) {
	return calories(input)
		.slice(0, 3)
		.reduce((sum, value) => sum + value, 0);
}

if (import.meta.main) run(import.meta.url, part1, part2);
