import { run } from "../../../scripts/aoc.ts";

function shortest(input: string, anyLowPoint: boolean) {
	const rows = input.trim().split(/\r?\n/);
	const width = rows[0].length;
	const cells = rows.join("");
	const end = cells.indexOf("E");
	const start = cells.indexOf("S");
	const heights = [...cells.replace("S", "a").replace("E", "z")].map((c) =>
		c.charCodeAt(0),
	);
	const distances = new Int32Array(cells.length).fill(-1);
	const queue = [end];
	distances[end] = 0;
	for (let head = 0; head < queue.length; head++) {
		const here = queue[head];
		if (here === start || (anyLowPoint && heights[here] === 97))
			return distances[here];
		const neighbors = [here - width, here + width];
		if (here % width > 0) neighbors.push(here - 1);
		if (here % width < width - 1) neighbors.push(here + 1);
		for (const next of neighbors) {
			if (distances[next] !== -1 || heights[next] < heights[here] - 1) continue;
			distances[next] = distances[here] + 1;
			queue.push(next);
		}
	}
	throw new Error("No path to the summit");
}

export function part1(input: string) {
	return shortest(input, false);
}

export function part2(input: string) {
	return shortest(input, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
