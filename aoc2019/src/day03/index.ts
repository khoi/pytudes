import { run } from "../../../scripts/aoc.ts";

function* trace(wire: string) {
	const directions: Record<string, [number, number]> = {
		R: [1, 0],
		L: [-1, 0],
		U: [0, 1],
		D: [0, -1],
	};
	let x = 0,
		y = 0,
		steps = 0;
	for (const segment of wire.split(",")) {
		const [dx, dy] = directions[segment[0]];
		const distance = Number(segment.slice(1));
		for (let i = 0; i < distance; i++) {
			x += dx;
			y += dy;
			steps++;
			if (x !== 0 || y !== 0)
				yield { key: `${x},${y}`, distance: Math.abs(x) + Math.abs(y), steps };
		}
	}
}

function intersections(input: string) {
	const [left, right] = input.trim().split(/\r?\n/);
	const visited = new Map<string, number>();
	for (const { key, steps } of trace(left)) {
		if (!visited.has(key)) visited.set(key, steps);
	}
	let nearest = Infinity,
		fastest = Infinity;
	for (const { key, distance, steps } of trace(right)) {
		const arrival = visited.get(key);
		if (arrival === undefined) continue;
		nearest = Math.min(nearest, distance);
		fastest = Math.min(fastest, arrival + steps);
	}
	return { nearest, fastest };
}

export const part1 = (input: string) => intersections(input).nearest;
export const part2 = (input: string) => intersections(input).fastest;
if (import.meta.main) run(import.meta.url, part1, part2);
