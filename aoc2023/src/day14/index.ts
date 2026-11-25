import { run } from "../../../scripts/aoc.ts";

type Direction = "north" | "west" | "south" | "east";

function tilt(grid: string[][], direction: Direction) {
	const vertical = direction === "north" || direction === "south";
	const step = direction === "north" || direction === "west" ? 1 : -1;
	const lines = vertical ? grid[0].length : grid.length;
	const length = vertical ? grid.length : grid[0].length;
	for (let line = 0; line < lines; line++) {
		let free = step === 1 ? 0 : length - 1;
		for (let i = free; i >= 0 && i < length; i += step) {
			const y = vertical ? i : line,
				x = vertical ? line : i;
			if (grid[y][x] === "#") free = i + step;
			if (grid[y][x] !== "O") continue;
			grid[y][x] = ".";
			grid[vertical ? free : line][vertical ? line : free] = "O";
			free += step;
		}
	}
}

function load(grid: string[][]) {
	return grid.reduce(
		(sum, row, y) =>
			sum + (grid.length - y) * row.filter((cell) => cell === "O").length,
		0,
	);
}

const parse = (input: string) =>
	input
		.trim()
		.split(/\r?\n/)
		.map((row) => [...row]);

export function part1(input: string) {
	const grid = parse(input);
	tilt(grid, "north");
	return load(grid);
}

export function part2(input: string) {
	const grid = parse(input);
	const seen = new Map<string, number>();
	const target = 1_000_000_000;
	for (let i = 0; i < target; i++) {
		const key = grid.map((row) => row.join("")).join("\n");
		const previous = seen.get(key);
		if (previous !== undefined) {
			const period = i - previous;
			i += Math.floor((target - i) / period) * period;
			if (i === target) break;
		}
		seen.set(key, i);
		for (const direction of ["north", "west", "south", "east"] as const)
			tilt(grid, direction);
	}
	return load(grid);
}

if (import.meta.main) run(import.meta.url, part1, part2);
