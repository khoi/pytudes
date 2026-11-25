import { run } from "../../../scripts/aoc.ts";

function judge(
	input: string,
	pairs: number,
	maskA: number,
	maskB: number,
): number {
	let [a, b] = input
		.trim()
		.split(/\r?\n/)
		.map((line) => Number(line.match(/\d+$/)![0]));
	let matches = 0;
	for (let pair = 0; pair < pairs; pair++) {
		do {
			a = (a * 16807) % 2147483647;
		} while ((a & maskA) !== 0);
		do {
			b = (b * 48271) % 2147483647;
		} while ((b & maskB) !== 0);
		if ((a & 65535) === (b & 65535)) matches++;
	}
	return matches;
}

export function part1(input: string): number {
	return judge(input, 40_000_000, 0, 0);
}

export function part2(input: string): number {
	return judge(input, 5_000_000, 3, 7);
}

if (import.meta.main) run(import.meta.url, part1, part2);
