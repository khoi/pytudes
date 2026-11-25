import { run } from "../../../scripts/aoc.ts";

function bestScore(input: string, calories?: number): number {
	const ingredients = input
		.trim()
		.split(/\r?\n/)
		.map((line) => line.match(/-?\d+/g)!.map(Number));
	function mix(index: number, remaining: number, totals: number[]): number {
		const last = index === ingredients.length - 1;
		let best = 0;
		for (let spoons = last ? remaining : 0; spoons <= remaining; spoons++) {
			const next = totals.map(
				(total, i) => total + ingredients[index][i] * spoons,
			);
			if (!last)
				best = Math.max(best, mix(index + 1, remaining - spoons, next));
			else if (calories === undefined || next[4] === calories) {
				const score = next
					.slice(0, 4)
					.reduce((product, value) => product * Math.max(0, value), 1);
				best = Math.max(best, score);
			}
		}
		return best;
	}
	return mix(0, 100, [0, 0, 0, 0, 0]);
}

export function part1(input: string): number {
	return bestScore(input);
}

export function part2(input: string): number {
	return bestScore(input, 500);
}

if (import.meta.main) run(import.meta.url, part1, part2);
