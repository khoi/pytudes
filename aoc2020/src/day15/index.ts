import { run } from "../../../scripts/aoc.ts";

function spoken(input: string, turns: number): number {
	const start = input.trim().split(",").map(Number);
	if (turns <= start.length) return start[turns - 1];
	const history = new Int32Array(turns);
	const large = new Map<number, number>();
	for (let i = 0; i < start.length - 1; i++) {
		if (start[i] < turns) history[start[i]] = i + 1;
		else large.set(start[i], i + 1);
	}
	let last = start[start.length - 1];
	for (let turn = start.length; turn < turns; turn++) {
		const previous = last < turns ? history[last] : (large.get(last) ?? 0);
		if (last < turns) history[last] = turn;
		else large.set(last, turn);
		last = previous === 0 ? 0 : turn - previous;
	}
	return last;
}

export function part1(input: string): number {
	return spoken(input, 2020);
}

export function part2(input: string): number {
	return spoken(input, 30_000_000);
}

if (import.meta.main) run(import.meta.url, part1, part2);
