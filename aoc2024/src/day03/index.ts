import { run } from "../../../scripts/aoc.ts";

function multiply(input: string, followSwitches: boolean): number {
	let enabled = true;
	let total = 0;
	for (const [instruction, a, b] of input.matchAll(
		/mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g,
	)) {
		if (instruction === "do()") enabled = true;
		else if (instruction === "don't()") enabled = false;
		else if (enabled || !followSwitches) total += Number(a) * Number(b);
	}
	return total;
}

export function part1(input: string): number {
	return multiply(input, false);
}

export function part2(input: string): number {
	return multiply(input, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
