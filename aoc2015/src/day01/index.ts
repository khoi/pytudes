import { run } from "../../../scripts/aoc.ts";

export function part1(input: string): number {
	let floor = 0;
	for (const step of input.trim()) floor += step === "(" ? 1 : -1;
	return floor;
}

export function part2(input: string): number {
	let floor = 0;
	for (const [index, step] of [...input.trim()].entries()) {
		floor += step === "(" ? 1 : -1;
		if (floor < 0) return index + 1;
	}
	throw new Error("The route never enters the basement");
}

if (import.meta.main) run(import.meta.url, part1, part2);
