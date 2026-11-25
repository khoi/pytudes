import { run } from "../../../scripts/aoc.ts";

function extrapolate(input: string, reverse: boolean) {
	let sum = 0;
	for (const line of input.trim().split(/\r?\n/)) {
		let values = line.trim().split(/\s+/).map(Number);
		if (reverse) values = values.reverse();
		while (values.some((value) => value !== 0)) {
			sum += values[values.length - 1];
			values = values.slice(1).map((value, i) => value - values[i]);
		}
	}
	return sum;
}

export const part1 = (input: string) => extrapolate(input, false);
export const part2 = (input: string) => extrapolate(input, true);

if (import.meta.main) run(import.meta.url, part1, part2);
