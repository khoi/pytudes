import { run } from "../../../scripts/aoc.ts";

const offsets: Record<string, [number, number]> = {
	n: [0, -1],
	ne: [1, -1],
	se: [1, 0],
	s: [0, 1],
	sw: [-1, 1],
	nw: [-1, 0],
};

function walk(input: string) {
	let q = 0;
	let r = 0;
	let distance = 0;
	let furthest = 0;
	for (const direction of input.trim().split(",").filter(Boolean)) {
		const [dq, dr] = offsets[direction];
		q += dq;
		r += dr;
		distance = Math.max(Math.abs(q), Math.abs(r), Math.abs(q + r));
		furthest = Math.max(distance, furthest);
	}
	return { distance, furthest };
}

export function part1(input: string): number {
	return walk(input).distance;
}

export function part2(input: string): number {
	return walk(input).furthest;
}

if (import.meta.main) run(import.meta.url, part1, part2);
