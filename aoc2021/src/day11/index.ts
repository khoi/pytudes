import { run } from "../../../scripts/aoc.ts";

import { digitGrid, neighbors } from "../grid.ts";

function step({ width, height, cells }: ReturnType<typeof digitGrid>) {
	const flashing: number[] = [];
	for (let i = 0; i < cells.length; i++) {
		if (++cells[i] === 10) flashing.push(i);
	}
	for (let i = 0; i < flashing.length; i++) {
		for (const neighbor of neighbors(flashing[i], width, height, true)) {
			if (++cells[neighbor] === 10) flashing.push(neighbor);
		}
	}
	for (const i of flashing) cells[i] = 0;
	return flashing.length;
}

export function part1(input: string) {
	const grid = digitGrid(input);
	let flashes = 0;
	for (let i = 0; i < 100; i++) flashes += step(grid);
	return flashes;
}

export function part2(input: string) {
	const grid = digitGrid(input);
	for (let i = 1; ; i++) {
		if (step(grid) === grid.cells.length) return i;
	}
}

if (import.meta.main) run(import.meta.url, part1, part2);
