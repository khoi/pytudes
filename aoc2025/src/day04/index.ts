import { run } from "../../../scripts/aoc.ts";

function removableRolls(grid: string[][]): [number, number][] {
	const removable: [number, number][] = [];
	for (const [row, line] of grid.entries()) {
		for (const [col, cell] of line.entries()) {
			if (cell !== "@") continue;
			let neighbors = 0;
			for (let dr = -1; dr <= 1; dr++) {
				for (let dc = -1; dc <= 1; dc++) {
					if ((dr || dc) && grid[row + dr]?.[col + dc] === "@") neighbors++;
				}
			}
			if (neighbors < 4) removable.push([row, col]);
		}
	}
	return removable;
}

function parse(input: string): string[][] {
	return input
		.trim()
		.split(/\r?\n/)
		.map((line) => [...line]);
}

export function part1(input: string): number {
	return removableRolls(parse(input)).length;
}

export function part2(input: string): number {
	const grid = parse(input);
	let total = 0;
	for (;;) {
		const rolls = removableRolls(grid);
		if (rolls.length === 0) return total;
		for (const [row, col] of rolls) grid[row][col] = ".";
		total += rolls.length;
	}
}

if (import.meta.main) run(import.meta.url, part1, part2);
