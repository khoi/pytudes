import { run } from "../../../scripts/aoc.ts";

function largestPower(base: number, limit: number) {
	let power = 1;
	while (power * base <= limit) power *= base;
	return power;
}

export function part1(input: string) {
	const elves = Number(input.trim());
	return 2 * (elves - largestPower(2, elves)) + 1;
}

export function part2(input: string) {
	const elves = Number(input.trim());
	const power = largestPower(3, elves);
	if (elves === power) return elves;
	if (elves <= 2 * power) return elves - power;
	return 2 * elves - 3 * power;
}

if (import.meta.main) run(import.meta.url, part1, part2);
