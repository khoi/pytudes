import { run } from "../../../scripts/aoc.ts";

import { digitGrid, neighbors } from "../grid.ts";
import { PriorityQueue } from "../../../scripts/priority-queue.ts";

function lowestRisk(input: string, tiles: number) {
	const grid = digitGrid(input);
	const width = grid.width * tiles,
		height = grid.height * tiles;
	const best = new Float64Array(width * height).fill(Infinity);
	const goal = best.length - 1;
	const queue = new PriorityQueue<[number, number]>(([a], [b]) => a - b);
	best[0] = 0;
	queue.push([0, 0]);
	while (queue.size) {
		const [cost, index] = queue.pop();
		if (index === goal) return cost;
		if (cost !== best[index]) continue;
		for (const next of neighbors(index, width, height)) {
			const x = next % width,
				y = Math.floor(next / width);
			const risk =
				grid.cells[(y % grid.height) * grid.width + (x % grid.width)];
			const increase = Math.floor(y / grid.height) + Math.floor(x / grid.width);
			const candidate = cost + ((risk + increase - 1) % 9) + 1;
			if (candidate >= best[next]) continue;
			best[next] = candidate;
			queue.push([candidate, next]);
		}
	}
	throw new Error("Destination is unreachable");
}

export const part1 = (input: string) => lowestRisk(input, 1);
export const part2 = (input: string) => lowestRisk(input, 5);

if (import.meta.main) run(import.meta.url, part1, part2);
