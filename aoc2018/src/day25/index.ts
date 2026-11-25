import { run } from "../../../scripts/aoc.ts";

export function part1(input: string) {
	const points = input
		.trim()
		.split(/\r?\n/)
		.map((line) => line.split(",").map(Number));
	const parents = points.map((_, i) => i);
	function root(id: number) {
		while (id !== parents[id]) {
			parents[id] = parents[parents[id]];
			id = parents[id];
		}
		return id;
	}
	let constellations = points.length;
	for (const [i, point] of points.entries()) {
		for (let j = 0; j < i; j++) {
			const distance = point.reduce(
				(sum, coordinate, axis) => sum + Math.abs(coordinate - points[j][axis]),
				0,
			);
			if (distance > 3) continue;
			const a = root(i),
				b = root(j);
			if (a !== b) {
				parents[b] = a;
				constellations--;
			}
		}
	}
	return constellations;
}

if (import.meta.main) run(import.meta.url, part1);
