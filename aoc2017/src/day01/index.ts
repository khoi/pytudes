import { run } from "../../../scripts/aoc.ts";

function captcha(digits: string, distance: number): number {
	let sum = 0;
	for (let i = 0; i < digits.length; i++) {
		if (digits[i] === digits[(i + distance) % digits.length])
			sum += Number(digits[i]);
	}
	return sum;
}

export function part1(input: string): number {
	return captcha(input.trim(), 1);
}

export function part2(input: string): number {
	const digits = input.trim();
	return captcha(digits, digits.length / 2);
}

if (import.meta.main) run(import.meta.url, part1, part2);
