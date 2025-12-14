import { readFileSync } from "node:fs";

const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

export function part1(input: string): number {
	const grid = input.trim().split("\n").map(line => line.split(""));
	const startCol = grid[0].indexOf("S");

	let beams = new Set([startCol]);
	let splitCount = 0;

	for (let row = 1; row < grid.length; row++) {
		const nextBeams = new Set<number>();

		for (const col of beams) {
			if (grid[row][col] === "^") {
				splitCount++;
				if (col > 0) nextBeams.add(col - 1);
				if (col < grid[0].length - 1) nextBeams.add(col + 1);
			} else {
				nextBeams.add(col);
			}
		}

		beams = nextBeams;
	}

	return splitCount;
}

export function part2(input: string): number {
	const grid = input.trim().split("\n").map(line => line.split(""));
	const startCol = grid[0].indexOf("S");

	let paths = new Map([[startCol, 1]]);

	for (let row = 1; row < grid.length; row++) {
		const nextPaths = new Map<number, number>();

		for (const [col, count] of paths) {
			if (grid[row][col] === "^") {
				if (col > 0) nextPaths.set(col - 1, (nextPaths.get(col - 1) || 0) + count);
				if (col < grid[0].length - 1) nextPaths.set(col + 1, (nextPaths.get(col + 1) || 0) + count);
			} else {
				nextPaths.set(col, (nextPaths.get(col) || 0) + count);
			}
		}

		paths = nextPaths;
	}

	return Array.from(paths.values()).reduce((sum, count) => sum + count, 0);
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
