import { run } from "../../../scripts/aoc.ts";

type Point = [number, number, number];
const directions: Point[] = [
	[1, 0, 0],
	[-1, 0, 0],
	[0, 1, 0],
	[0, -1, 0],
	[0, 0, 1],
	[0, 0, -1],
];

function cubes(input: string): Point[] {
	return input
		.trim()
		.split(/\r?\n/)
		.map((line) => line.split(",").map(Number) as Point);
}

export function part1(input: string): number {
	const points = cubes(input);
	const occupied = new Set(points.map((p) => p.join(",")));
	let area = 0;
	for (const [x, y, z] of points) {
		for (const [dx, dy, dz] of directions) {
			if (!occupied.has([x + dx, y + dy, z + dz].join(","))) area++;
		}
	}
	return area;
}

export function part2(input: string): number {
	const points = cubes(input);
	const occupied = new Set(points.map((p) => p.join(",")));
	const axes = [0, 1, 2];
	const low = axes.map(
		(i) => Math.min(...points.map((p) => p[i])) - 1,
	) as Point;
	const high = axes.map((i) => Math.max(...points.map((p) => p[i])) + 1);
	const queue = [low];
	const air = new Set([low.join(",")]);
	let area = 0;
	for (let i = 0; i < queue.length; i++) {
		const [x, y, z] = queue[i];
		for (const [dx, dy, dz] of directions) {
			const next: Point = [x + dx, y + dy, z + dz];
			if (axes.some((a) => next[a] < low[a] || next[a] > high[a])) continue;
			const key = next.join(",");
			if (occupied.has(key)) area++;
			else if (!air.has(key)) {
				air.add(key);
				queue.push(next);
			}
		}
	}
	return area;
}

if (import.meta.main) run(import.meta.url, part1, part2);
