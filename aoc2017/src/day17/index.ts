import { run } from "../../../scripts/aoc.ts";

export function part1(input: string): number {
	const step = Number(input);
	const buffer = [0];
	let position = 0;
	for (let value = 1; value <= 2017; value++) {
		position = ((position + step) % value) + 1;
		buffer.splice(position, 0, value);
	}
	return buffer[(position + 1) % buffer.length];
}

export function part2(input: string): number {
	const step = Number(input);
	let position = 0;
	let afterZero = 0;
	for (let value = 1; value <= 50_000_000; value++) {
		position = ((position + step) % value) + 1;
		if (position === 1) afterZero = value;
	}
	return afterZero;
}

if (import.meta.main) run(import.meta.url, part1, part2);
