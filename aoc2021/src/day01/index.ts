import { run } from "../../../scripts/aoc.ts";

function increases(input: string, window: number) {
	const depths = input.trim().split(/\s+/).map(Number);
	return depths.filter((depth, i) => i >= window && depth > depths[i - window])
		.length;
}

export const part1 = (input: string) => increases(input, 1);
export const part2 = (input: string) => increases(input, 3);

if (import.meta.main) run(import.meta.url, part1, part2);
