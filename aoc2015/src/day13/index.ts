import { run } from "../../../scripts/aoc.ts";

import { permutations } from "../permutations.ts";

function bestSeating(input: string, includeHost: boolean): number {
	const guests = new Set<string>();
	const happiness = new Map<string, number>();
	for (const line of input.trim().split(/\r?\n/)) {
		const [, from, sign, amount, to] =
			/^(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+)\.$/.exec(
				line,
			)!;
		guests.add(from);
		guests.add(to);
		happiness.set(from + ":" + to, Number(amount) * (sign === "gain" ? 1 : -1));
	}
	const [first, ...others] = guests;
	if (includeHost) others.push("");
	let best = -Infinity;
	for (const remainder of permutations(others)) {
		const order = [first, ...remainder];
		let total = 0;
		for (const [i, from] of order.entries()) {
			const to = order[(i + 1) % order.length];
			total +=
				(happiness.get(from + ":" + to) ?? 0) +
				(happiness.get(to + ":" + from) ?? 0);
		}
		best = Math.max(best, total);
	}
	return best;
}

export function part1(input: string): number {
	return bestSeating(input, false);
}

export function part2(input: string): number {
	return bestSeating(input, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
