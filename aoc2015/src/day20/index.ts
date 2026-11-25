import { run } from "../../../scripts/aoc.ts";

function firstHouse(
	input: string,
	presents: number,
	maxVisits: number,
): number {
	const target = Number(input.trim());
	const limit = Math.max(1, Math.ceil(target / presents));
	const delivered = new Float64Array(limit + 1);
	for (let elf = 1; elf <= limit; elf++) {
		const last = Math.min(limit, elf * maxVisits);
		for (let house = elf; house <= last; house += elf)
			delivered[house] += elf * presents;
		if (delivered[elf] >= target) return elf;
	}
	throw new Error("No house reached the target");
}

export function part1(input: string): number {
	return firstHouse(input, 10, Infinity);
}

export function part2(input: string): number {
	return firstHouse(input, 11, 50);
}

if (import.meta.main) run(import.meta.url, part1, part2);
