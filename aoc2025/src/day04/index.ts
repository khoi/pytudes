import { readFileSync } from "node:fs";

const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

function countAdjacentRolls(grid: string[][], row: number, col: number): number {
	let count = 0;
	for (let dr = -1; dr <= 1; dr++) {
		for (let dc = -1; dc <= 1; dc++) {
			if (dr === 0 && dc === 0) continue;
			const r = row + dr;
			const c = col + dc;
			if (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length && grid[r][c] === '@') {
				count++;
			}
		}
	}
	return count;
}

export function part1(input: string): number {
	const grid = input.trim().split('\n').map(line => line.split(''));
	let count = 0;

	for (let row = 0; row < grid.length; row++) {
		for (let col = 0; col < grid[0].length; col++) {
			if (grid[row][col] === '@' && countAdjacentRolls(grid, row, col) < 4) {
				count++;
			}
		}
	}

	return count;
}

export function part2(input: string): number {
	const grid = input.trim().split('\n').map(line => line.split(''));
	let totalRemoved = 0;

	while (true) {
		const toRemove: [number, number][] = [];

		for (let row = 0; row < grid.length; row++) {
			for (let col = 0; col < grid[0].length; col++) {
				if (grid[row][col] === '@' && countAdjacentRolls(grid, row, col) < 4) {
					toRemove.push([row, col]);
				}
			}
		}

		if (toRemove.length === 0) break;

		for (const [row, col] of toRemove) {
			grid[row][col] = '.';
		}

		totalRemoved += toRemove.length;
	}

	return totalRemoved;
}

if (import.meta.main) {
	console.log("Part 1:", part1(input));
	console.log("Part 2:", part2(input));
}
