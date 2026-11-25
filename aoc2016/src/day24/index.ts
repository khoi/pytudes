import { run } from "../../../scripts/aoc.ts";

function route(input: string, returnHome: boolean): number {
	const grid = input.trim().split(/\r?\n/);
	const width = grid[0].length;
	const labels: [string, number][] = [];
	for (const [y, row] of grid.entries()) {
		for (let x = 0; x < row.length; x++) {
			if (/\d/.test(row[x])) labels.push([row[x], y * width + x]);
		}
	}
	labels.sort(([a], [b]) => a.localeCompare(b));
	const locations = labels.map(([, position]) => position);
	const distance = locations.map((start) => {
		const steps = new Int32Array(grid.length * width).fill(-1);
		const queue = [start];
		steps[start] = 0;
		for (let i = 0; i < queue.length; i++) {
			const current = queue[i],
				x = current % width,
				y = Math.floor(current / width);
			for (const [nx, ny] of [
				[x - 1, y],
				[x + 1, y],
				[x, y - 1],
				[x, y + 1],
			]) {
				const tile = grid[ny]?.[nx],
					next = ny * width + nx;
				if (!tile || tile === "#" || steps[next] >= 0) continue;
				steps[next] = steps[current] + 1;
				queue.push(next);
			}
		}
		return locations.map((position) => {
			if (steps[position] < 0) throw new Error("Unreachable numbered location");
			return steps[position];
		});
	});
	const allVisited = (1 << locations.length) - 1;
	const shortest = Array.from({ length: allVisited + 1 }, () =>
		Array<number>(locations.length).fill(Infinity),
	);
	shortest[1][0] = 0;
	for (let mask = 1; mask <= allVisited; mask += 2) {
		for (let last = 0; last < locations.length; last++) {
			if (!Number.isFinite(shortest[mask][last])) continue;
			for (let next = 1; next < locations.length; next++) {
				const bit = 1 << next;
				if ((mask & bit) !== 0) continue;
				const row = shortest[mask | bit];
				row[next] = Math.min(
					row[next],
					shortest[mask][last] + distance[last][next],
				);
			}
		}
	}
	return Math.min(
		...shortest[allVisited].map(
			(length, last) => length + (returnHome ? distance[last][0] : 0),
		),
	);
}

export const part1 = (input: string) => route(input, false);
export const part2 = (input: string) => route(input, true);

if (import.meta.main) run(import.meta.url, part1, part2);
