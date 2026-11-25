import { run } from "../../../scripts/aoc.ts";

function readTree(input: string) {
	const numbers = input.trim().split(/\s+/).map(Number);
	let index = 0;
	let sum = 0;
	function node(): number {
		const childCount = numbers[index++];
		const metadataCount = numbers[index++];
		const children = Array.from({ length: childCount }, node);
		let value = 0;
		for (let i = 0; i < metadataCount; i++) {
			const entry = numbers[index++];
			sum += entry;
			value += childCount === 0 ? entry : (children[entry - 1] ?? 0);
		}
		return value;
	}
	const value = node();
	return { sum, value };
}

export function part1(input: string): number {
	return readTree(input).sum;
}

export function part2(input: string): number {
	return readTree(input).value;
}

if (import.meta.main) run(import.meta.url, part1, part2);
