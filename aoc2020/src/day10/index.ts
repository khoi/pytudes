import { run } from "../../../scripts/aoc.ts";

function chain(input: string) {
	const adapters = input
		.trim()
		.split(/\s+/)
		.map(Number)
		.sort((a, b) => a - b);
	return [0, ...adapters, adapters[adapters.length - 1] + 3];
}

export function part1(input: string) {
	const adapters = chain(input);
	let ones = 0;
	let threes = 0;
	for (let i = 1; i < adapters.length; i++) {
		const gap = adapters[i] - adapters[i - 1];
		if (gap === 1) ones++;
		if (gap === 3) threes++;
	}
	return ones * threes;
}

export function part2(input: string) {
	const ways = new Map([[0, 1n]]);
	const adapters = chain(input);
	for (const rating of adapters.slice(1)) {
		const total =
			(ways.get(rating - 1) ?? 0n) +
			(ways.get(rating - 2) ?? 0n) +
			(ways.get(rating - 3) ?? 0n);
		ways.set(rating, total);
	}
	return ways.get(adapters[adapters.length - 1])!;
}

if (import.meta.main) run(import.meta.url, part1, part2);
