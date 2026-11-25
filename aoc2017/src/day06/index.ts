import { run } from "../../../scripts/aoc.ts";

function cycle(input: string): { steps: number; length: number } {
	const banks = input.trim().split(/\s+/).map(Number);
	const seen = new Map<string, number>();
	for (let steps = 0; ; steps++) {
		const key = banks.join(",");
		const first = seen.get(key);
		if (first !== undefined) return { steps, length: steps - first };
		seen.set(key, steps);
		const blocks = Math.max(...banks);
		const source = banks.indexOf(blocks);
		banks[source] = 0;
		const share = Math.floor(blocks / banks.length);
		const remainder = blocks % banks.length;
		for (let i = 1; i <= banks.length; i++) {
			banks[(source + i) % banks.length] += share + Number(i <= remainder);
		}
	}
}

export function part1(input: string): number {
	return cycle(input).steps;
}

export function part2(input: string): number {
	return cycle(input).length;
}

if (import.meta.main) run(import.meta.url, part1, part2);
