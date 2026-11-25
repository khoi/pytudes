import { run } from "../../../scripts/aoc.ts";

function count(input: string, matches: (word: string) => boolean): number {
	return input.trim().split(/\r?\n/).filter(matches).length;
}

export function part1(input: string): number {
	return count(
		input,
		(word) =>
			(word.match(/[aeiou]/g)?.length ?? 0) >= 3 &&
			/(.)\1/.test(word) &&
			!/ab|cd|pq|xy/.test(word),
	);
}

export function part2(input: string): number {
	return count(input, (word) => /(..).*\1/.test(word) && /(.).\1/.test(word));
}

if (import.meta.main) run(import.meta.url, part1, part2);
