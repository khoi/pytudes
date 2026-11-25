import { run } from "../../../scripts/aoc.ts";

function trails(input: string, countRoutes: boolean): number {
	const rows = input.trim().split(/\r?\n/);
	const width = rows[0].length + 2;
	const border = ".".repeat(width);
	const grid = border + rows.map((row) => "." + row + ".").join("") + border;
	const directions = [1, -1, width, -width];
	let total = 0;
	for (let start = 0; start < grid.length; start++) {
		if (grid[start] !== "0") continue;
		let frontier = new Map([[start, 1]]);
		for (let height = 1; height <= 9; height++) {
			const next = new Map<number, number>();
			for (const [position, count] of frontier) {
				for (const step of directions) {
					const neighbor = position + step;
					if (grid[neighbor] === String(height))
						next.set(neighbor, (next.get(neighbor) ?? 0) + count);
				}
			}
			frontier = next;
		}
		if (countRoutes) for (const count of frontier.values()) total += count;
		else total += frontier.size;
	}
	return total;
}

export function part1(input: string): number {
	return trails(input, false);
}

export function part2(input: string): number {
	return trails(input, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
