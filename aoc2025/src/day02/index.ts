import { run } from "../../../scripts/aoc.ts";

function sumInvalid(
	input: string,
	invalid: (digits: string) => boolean,
): number {
	let sum = 0;
	for (const range of input.trim().split(",")) {
		const [first, last] = range.split("-").map(Number);
		for (let id = first; id <= last; id++) {
			if (invalid(String(id))) sum += id;
		}
	}
	return sum;
}

export function part1(input: string): number {
	return sumInvalid(input, (digits) => {
		const half = digits.length / 2;
		return (
			Number.isInteger(half) && digits.slice(0, half) === digits.slice(half)
		);
	});
}

export function part2(input: string): number {
	return sumInvalid(
		input,
		(digits) => (digits + digits).indexOf(digits, 1) < digits.length,
	);
}

if (import.meta.main) run(import.meta.url, part1, part2);
