import { run } from "../../../scripts/aoc.ts";

const directions: Record<string, [number, number]> = {
	e: [1, 0],
	w: [-1, 0],
	ne: [1, -1],
	nw: [0, -1],
	se: [0, 1],
	sw: [-1, 1],
};

function initial(input: string): Set<string> {
	const black = new Set<string>();
	for (const line of input.trim().split(/\r?\n/)) {
		let x = 0;
		let y = 0;
		for (const step of line.match(/[ns]?[ew]/g) ?? []) {
			const [dx, dy] = directions[step];
			x += dx;
			y += dy;
		}
		const tile = [x, y].join(",");
		if (!black.delete(tile)) black.add(tile);
	}
	return black;
}

export function part1(input: string): number {
	return initial(input).size;
}

export function part2(input: string): number {
	let black = initial(input);
	for (let day = 0; day < 100; day++) {
		const neighbors = new Map<string, number>();
		for (const tile of black) {
			const [x, y] = tile.split(",").map(Number);
			for (const [dx, dy] of Object.values(directions)) {
				const key = [x + dx, y + dy].join(",");
				neighbors.set(key, (neighbors.get(key) ?? 0) + 1);
			}
		}
		black = new Set(
			[...neighbors]
				.filter(([tile, n]) => n === 2 || (n === 1 && black.has(tile)))
				.map(([tile]) => tile),
		);
	}
	return black.size;
}

if (import.meta.main) run(import.meta.url, part1, part2);
