import { run } from "../../../scripts/aoc.ts";

function firstInvalid(numbers: number[], preamble: number) {
	for (let i = preamble; i < numbers.length; i++) {
		const seen = new Set<number>();
		let valid = false;
		for (let j = i - preamble; j < i; j++) {
			if (seen.has(numbers[i] - numbers[j])) {
				valid = true;
				break;
			}
			seen.add(numbers[j]);
		}
		if (!valid) return i;
	}
	throw new Error("All numbers match the preamble rule");
}

export function part1(input: string, preamble = 25) {
	const numbers = input.trim().split(/\s+/).map(Number);
	return numbers[firstInvalid(numbers, preamble)];
}

export function part2(input: string, preamble = 25) {
	const numbers = input.trim().split(/\s+/).map(Number);
	const target = numbers[firstInvalid(numbers, preamble)];
	let total = 0;
	let left = 0;
	for (let right = 0; right < numbers.length; right++) {
		total += numbers[right];
		while (total > target && left <= right) total -= numbers[left++];
		if (total === target && right > left) {
			const range = numbers.slice(left, right + 1);
			return Math.min(...range) + Math.max(...range);
		}
	}
	throw new Error("No contiguous range sums to the invalid number");
}

if (import.meta.main) run(import.meta.url, part1, part2);
