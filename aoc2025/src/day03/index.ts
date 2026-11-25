import { run } from "../../../scripts/aoc.ts";

function totalJoltage(input: string, batteries: number): number {
	let total = 0;
	for (const bank of input.trim().split(/\r?\n/)) {
		let first = 0;
		let joltage = 0;
		for (let remaining = batteries; remaining > 0; remaining--) {
			let best = first;
			for (let i = first + 1; i <= bank.length - remaining; i++) {
				if (bank[i] > bank[best]) best = i;
			}
			joltage = joltage * 10 + Number(bank[best]);
			first = best + 1;
		}
		total += joltage;
	}
	return total;
}

export function part1(input: string): number {
	return totalJoltage(input, 2);
}

export function part2(input: string): number {
	return totalJoltage(input, 12);
}

if (import.meta.main) run(import.meta.url, part1, part2);
