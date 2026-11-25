import { run } from "../../../scripts/aoc.ts";

function boxes(input: string): number[][] {
	return input
		.trim()
		.split(/\r?\n/)
		.map((line) =>
			line
				.split("x")
				.map(Number)
				.sort((a, b) => a - b),
		);
}

export function part1(input: string): number {
	return boxes(input).reduce(
		(total, [a, b, c]) => total + 3 * a * b + 2 * (a * c + b * c),
		0,
	);
}

export function part2(input: string): number {
	return boxes(input).reduce(
		(total, [a, b, c]) => total + 2 * (a + b) + a * b * c,
		0,
	);
}

if (import.meta.main) run(import.meta.url, part1, part2);
