import { run } from "../../../scripts/aoc.ts";

function matchCounts(input: string) {
	return input
		.trim()
		.split(/\r?\n/)
		.map((line) => {
			const [winning, mine] = line
				.split(":")[1]
				.split("|")
				.map((field) => field.trim().split(/\s+/).map(Number));
			const winners = new Set(winning);
			return mine.filter((number) => winners.has(number)).length;
		});
}

export function part1(input: string) {
	return matchCounts(input).reduce(
		(sum, count) => sum + (count ? 2 ** (count - 1) : 0),
		0,
	);
}

export function part2(input: string) {
	const matches = matchCounts(input);
	const copies = matches.map(() => 1);
	for (const [i, count] of matches.entries()) {
		for (let next = i + 1; next <= i + count && next < copies.length; next++)
			copies[next] += copies[i];
	}
	return copies.reduce((sum, count) => sum + count, 0);
}

if (import.meta.main) run(import.meta.url, part1, part2);
