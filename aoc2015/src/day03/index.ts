import { run } from "../../../scripts/aoc.ts";

const directions: Record<string, [number, number]> = {
	"^": [0, 1],
	v: [0, -1],
	"<": [-1, 0],
	">": [1, 0],
};

function delivered(input: string, couriers: number): number {
	const visited = new Set(["0,0"]);
	const positions = Array.from({ length: couriers }, () => [0, 0]);
	let turn = 0;
	for (const direction of input.trim()) {
		const pos = positions[turn++ % couriers];
		const [dx, dy] = directions[direction];
		pos[0] += dx;
		pos[1] += dy;
		visited.add(pos.join(","));
	}
	return visited.size;
}

export function part1(input: string): number {
	return delivered(input, 1);
}

export function part2(input: string): number {
	return delivered(input, 2);
}

if (import.meta.main) run(import.meta.url, part1, part2);
