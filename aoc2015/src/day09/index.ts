import { run } from "../../../scripts/aoc.ts";

import { permutations } from "../permutations.ts";

function routeLength(input: string, longest: boolean): number {
	const distances = new Map<string, Map<string, number>>();
	for (const line of input.trim().split(/\r?\n/)) {
		const [, from, to, length] = /^(\S+) to (\S+) = (\d+)$/.exec(line)!;
		if (!distances.has(from)) distances.set(from, new Map());
		if (!distances.has(to)) distances.set(to, new Map());
		distances.get(from)!.set(to, Number(length));
		distances.get(to)!.set(from, Number(length));
	}
	let best = longest ? -Infinity : Infinity;
	for (const route of permutations([...distances.keys()])) {
		let total = 0;
		for (let i = 1; i < route.length; i++) {
			const leg = distances.get(route[i - 1])!.get(route[i]);
			if (leg === undefined) {
				total = NaN;
				break;
			}
			total += leg;
		}
		if (longest ? total > best : total < best) best = total;
	}
	return best;
}

export function part1(input: string): number {
	return routeLength(input, false);
}

export function part2(input: string): number {
	return routeLength(input, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
