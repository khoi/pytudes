import { run } from "../../../scripts/aoc.ts";

function pairsOnFloors(input: string): number[] {
	const pairs = new Map<string, number>();
	for (const [floor, line] of input.trim().split(/\r?\n/).entries()) {
		for (const [, element, type] of line.matchAll(
			/(\w+)(?:-compatible)? (microchip|generator)/g,
		)) {
			const value = pairs.get(element) ?? 0;
			pairs.set(element, value + floor * (type === "generator" ? 4 : 1));
		}
	}
	return [...pairs.values()];
}

function safe(pairs: number[]): boolean {
	let generators = 0;
	for (const pair of pairs) generators |= 1 << (pair >> 2);
	return pairs.every(
		(pair) => pair >> 2 === (pair & 3) || !(generators & (1 << (pair & 3))),
	);
}

function minimumMoves(initial: number[]): number {
	type State = { floor: number; pairs: number[] };
	let states: State[] = [{ floor: 0, pairs: initial }];
	const visited = new Set<number>();
	for (let moves = 0; states.length > 0; moves++) {
		const next: State[] = [];
		for (const { floor, pairs } of states) {
			if (pairs.every((pair) => pair === 15)) return moves;
			const items: { index: number; weight: number }[] = [];
			let hasLowerItem = false;
			for (const [index, pair] of pairs.entries()) {
				const generator = pair >> 2,
					chip = pair & 3;
				if (generator === floor) items.push({ index, weight: 4 });
				if (chip === floor) items.push({ index, weight: 1 });
				if (generator < floor || chip < floor) hasLowerItem = true;
			}
			for (const direction of [-1, 1]) {
				const to = floor + direction;
				if (to < 0 || to > 3 || (direction < 0 && !hasLowerItem)) continue;
				for (let i = 0; i < items.length; i++) {
					for (let j = i; j < items.length; j++) {
						const moved = pairs.slice();
						moved[items[i].index] += items[i].weight * direction;
						if (j !== i) moved[items[j].index] += items[j].weight * direction;
						if (!safe(moved)) continue;
						moved.sort((a, b) => a - b);
						const key = moved.reduce((key, pair) => key * 16 + pair, to);
						if (visited.has(key)) continue;
						visited.add(key);
						next.push({ floor: to, pairs: moved });
					}
				}
			}
		}
		states = next;
	}
	throw new Error("No safe elevator route");
}

export const part1 = (input: string) => minimumMoves(pairsOnFloors(input));
export const part2 = (input: string) =>
	minimumMoves([...pairsOnFloors(input), 0, 0]);

if (import.meta.main) run(import.meta.url, part1, part2);
