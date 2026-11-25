import { run } from "../../../scripts/aoc.ts";

function pairProduct(entries: number[], start: number, total: number) {
	const seen = new Set<number>();
	for (let i = start; i < entries.length; i++) {
		const value = entries[i];
		if (seen.has(total - value)) return value * (total - value);
		seen.add(value);
	}
}

export function part1(input: string) {
	const entries = input.trim().split(/\s+/).map(Number);
	const product = pairProduct(entries, 0, 2020);
	if (product === undefined) throw new Error("No two entries sum to 2020");
	return product;
}

export function part2(input: string) {
	const entries = input.trim().split(/\s+/).map(Number);
	for (const [i, value] of entries.entries()) {
		const product = pairProduct(entries, i + 1, 2020 - value);
		if (product !== undefined) return value * product;
	}
	throw new Error("No three entries sum to 2020");
}

if (import.meta.main) run(import.meta.url, part1, part2);
