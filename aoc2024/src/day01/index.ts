import { run } from "../../../scripts/aoc.ts";

function columns(input: string): [number[], number[]] {
	const left: number[] = [];
	const right: number[] = [];
	for (const line of input.trim().split(/\r?\n/)) {
		const [a, b] = line.trim().split(/\s+/).map(Number);
		left.push(a);
		right.push(b);
	}
	return [left, right];
}

export function part1(input: string): number {
	const [left, right] = columns(input);
	left.sort((a, b) => a - b);
	right.sort((a, b) => a - b);
	return left.reduce(
		(sum, value, index) => sum + Math.abs(value - right[index]),
		0,
	);
}

export function part2(input: string): number {
	const [left, right] = columns(input);
	const frequencies = new Map<number, number>();
	for (const value of right)
		frequencies.set(value, (frequencies.get(value) ?? 0) + 1);
	return left.reduce(
		(sum, value) => sum + value * (frequencies.get(value) ?? 0),
		0,
	);
}

if (import.meta.main) run(import.meta.url, part1, part2);
