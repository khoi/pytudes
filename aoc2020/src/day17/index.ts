import { run } from "../../../scripts/aoc.ts";

function simulate(input: string, dimensions: number): number {
	let active = new Set<string>();
	const rows = input.trim().split(/\r?\n/);
	for (let y = 0; y < rows.length; y++) {
		for (let x = 0; x < rows[y].length; x++) {
			if (rows[y][x] === "#")
				active.add([x, y, ...Array(dimensions - 2).fill(0)].join(","));
		}
	}
	let offsets: number[][] = [[]];
	for (let axis = 0; axis < dimensions; axis++) {
		offsets = offsets.flatMap((prefix) =>
			[-1, 0, 1].map((v) => [...prefix, v]),
		);
	}
	offsets = offsets.filter((offset) => offset.some((v) => v !== 0));
	for (let cycle = 0; cycle < 6; cycle++) {
		const neighbors = new Map<string, number>();
		for (const cell of active) {
			const point = cell.split(",").map(Number);
			for (const offset of offsets) {
				const key = point.map((v, i) => v + offset[i]).join(",");
				neighbors.set(key, (neighbors.get(key) ?? 0) + 1);
			}
		}
		active = new Set(
			[...neighbors]
				.filter(
					([key, count]) => count === 3 || (count === 2 && active.has(key)),
				)
				.map(([key]) => key),
		);
	}
	return active.size;
}

export function part1(input: string): number {
	return simulate(input, 3);
}

export function part2(input: string): number {
	return simulate(input, 4);
}

if (import.meta.main) run(import.meta.url, part1, part2);
