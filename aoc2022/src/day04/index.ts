import { run } from "../../../scripts/aoc.ts";

function pairs(input: string) {
	return input
		.trim()
		.split(/\r?\n/)
		.map((line) => line.split(/[,-]/).map(Number));
}

export function part1(input: string) {
	return pairs(input).filter(
		([a, b, c, d]) => (a <= c && d <= b) || (c <= a && b <= d),
	).length;
}

export function part2(input: string) {
	return pairs(input).filter(([a, b, c, d]) => a <= d && c <= b).length;
}

if (import.meta.main) run(import.meta.url, part1, part2);
