import { run } from "../../../scripts/aoc.ts";

function leastHeat(input: string, minRun: number, maxRun: number): number {
	const grid = input
		.trim()
		.split(/\r?\n/)
		.map((row) => Array.from(row, Number));
	const height = grid.length,
		width = grid[0].length;
	const distances = new Float64Array(height * width * 2).fill(Infinity);
	distances[0] = distances[1] = 0;
	const buckets: number[][] = [[0, 1]];
	for (let heat = 0; heat < buckets.length; heat++) {
		const bucket = buckets[heat];
		if (!bucket) continue;
		for (const state of bucket) {
			if (distances[state] !== heat) continue;
			const cell = state >> 1,
				axis = state & 1;
			if (cell === width * height - 1) return heat;
			for (const sign of [-1, 1]) {
				let x = cell % width,
					y = Math.floor(cell / width),
					nextHeat = heat;
				for (let length = 1; length <= maxRun; length++) {
					if (axis === 0) x += sign;
					else y += sign;
					if (x < 0 || y < 0 || x >= width || y >= height) break;
					nextHeat += grid[y][x];
					const next = 2 * (y * width + x) + (1 - axis);
					if (length < minRun || nextHeat >= distances[next]) continue;
					distances[next] = nextHeat;
					(buckets[nextHeat] ??= []).push(next);
				}
			}
		}
	}
	throw new Error("No route reaches the exit");
}

export const part1 = (input: string) => leastHeat(input, 1, 3);
export const part2 = (input: string) => leastHeat(input, 4, 10);
if (import.meta.main) run(import.meta.url, part1, part2);
