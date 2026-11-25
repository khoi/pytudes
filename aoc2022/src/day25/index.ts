import { run } from "../../../scripts/aoc.ts";

const digits = "=-012";

export function part1(input: string): string {
	let total = 0n;
	for (const line of input.trim().split(/\r?\n/)) {
		let value = 0n;
		for (const digit of line)
			value = 5n * value + BigInt(digits.indexOf(digit) - 2);
		total += value;
	}
	let result = "";
	do {
		const digit = ((((total + 2n) % 5n) + 5n) % 5n) - 2n;
		result = digits[Number(digit) + 2] + result;
		total = (total - digit) / 5n;
	} while (total !== 0n);
	return result;
}

if (import.meta.main) run(import.meta.url, part1);
