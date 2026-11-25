import { run } from "../../../scripts/aoc.ts";

function countValid(
	input: string,
	canonical: (word: string) => string,
): number {
	return input
		.trim()
		.split(/\r?\n/)
		.filter((line) => {
			const words = line.trim().split(/\s+/).map(canonical);
			return new Set(words).size === words.length;
		}).length;
}

export function part1(input: string): number {
	return countValid(input, (word) => word);
}

export function part2(input: string): number {
	return countValid(input, (word) => [...word].sort().join(""));
}

if (import.meta.main) run(import.meta.url, part1, part2);
