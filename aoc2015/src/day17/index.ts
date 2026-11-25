import { run } from "../../../scripts/aoc.ts";

function combinations(input: string, liters: number): number[] {
	const sizes = input.trim().split(/\s+/).map(Number);
	const ways = Array.from({ length: liters + 1 }, () =>
		Array<number>(sizes.length + 1).fill(0),
	);
	ways[0][0] = 1;
	for (const [index, size] of sizes.entries()) {
		for (let volume = liters; volume >= size; volume--) {
			for (let count = 1; count <= index + 1; count++) {
				ways[volume][count] += ways[volume - size][count - 1];
			}
		}
	}
	return ways[liters];
}

export function part1(input: string, liters = 150): number {
	return combinations(input, liters).reduce((sum, ways) => sum + ways, 0);
}

export function part2(input: string, liters = 150): number {
	return combinations(input, liters).find((ways) => ways > 0) ?? 0;
}

if (import.meta.main) run(import.meta.url, part1, part2);
