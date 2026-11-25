import { run } from "../../../scripts/aoc.ts";

export function part1(input: string): number {
	const grid = input.trim().split(/\r?\n/);
	const word = [..."XMAS"];
	let count = 0;
	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			if (grid[y][x] !== "X") continue;
			for (const dy of [-1, 0, 1]) {
				for (const dx of [-1, 0, 1]) {
					if (
						word.every((letter, i) => grid[y + dy * i]?.[x + dx * i] === letter)
					)
						count++;
				}
			}
		}
	}
	return count;
}

export function part2(input: string): number {
	const grid = input.trim().split(/\r?\n/);
	const diagonal = (a: string, b: string) =>
		(a === "M" && b === "S") || (a === "S" && b === "M");
	let count = 0;
	for (let y = 1; y < grid.length - 1; y++) {
		for (let x = 1; x < grid[y].length - 1; x++) {
			if (
				grid[y][x] === "A" &&
				diagonal(grid[y - 1][x - 1], grid[y + 1][x + 1]) &&
				diagonal(grid[y - 1][x + 1], grid[y + 1][x - 1])
			)
				count++;
		}
	}
	return count;
}

if (import.meta.main) run(import.meta.url, part1, part2);
