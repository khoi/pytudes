import { run } from "../../../scripts/aoc.ts";

import { digitGrid, neighbors } from "../grid.ts";

export function part1(input: string) {
	const { width, height, cells } = digitGrid(input);
	return cells.reduce((risk, value, i) => {
		for (const neighbor of neighbors(i, width, height)) {
			if (cells[neighbor] <= value) return risk;
		}
		return risk + value + 1;
	}, 0);
}

export function part2(input: string) {
	const { width, height, cells } = digitGrid(input);
	const sinks = new Map<number, number>();
	function sink(i: number): number {
		const cached = sinks.get(i);
		if (cached !== undefined) return cached;
		let lowest = i;
		for (const neighbor of neighbors(i, width, height)) {
			if (cells[neighbor] < cells[lowest]) lowest = neighbor;
		}
		const result = lowest === i ? i : sink(lowest);
		sinks.set(i, result);
		return result;
	}
	const sizes = new Map<number, number>();
	cells.forEach((value, i) => {
		if (value === 9) return;
		const basin = sink(i);
		sizes.set(basin, (sizes.get(basin) ?? 0) + 1);
	});
	const [a, b, c] = [...sizes.values()].sort((a, b) => b - a);
	return a * b * c;
}

if (import.meta.main) run(import.meta.url, part1, part2);
