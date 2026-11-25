import { run } from "../../../scripts/aoc.ts";

function stepsToExit(input: string, strange: boolean): number {
	const jumps = input.trim().split(/\s+/).map(Number);
	let position = 0;
	let steps = 0;
	while (position >= 0 && position < jumps.length) {
		const jump = jumps[position];
		jumps[position] += strange && jump >= 3 ? -1 : 1;
		position += jump;
		steps++;
	}
	return steps;
}

export function part1(input: string): number {
	return stepsToExit(input, false);
}

export function part2(input: string): number {
	return stepsToExit(input, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
