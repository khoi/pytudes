import { run } from "../../../scripts/aoc.ts";
import { decodeLetters } from "../../../scripts/ocr.ts";

function folded(input: string, limit: number) {
	const [coordinates, instructions] = input.trim().split(/\r?\n\s*\r?\n/);
	let dots = new Set(coordinates.split(/\r?\n/));
	for (const line of instructions.split(/\r?\n/).slice(0, limit)) {
		const [, axis, fold] = /^fold along ([xy])=(\d+)$/.exec(line)!;
		const index = axis === "x" ? 0 : 1;
		const crease = Number(fold);
		const next = new Set<string>();
		for (const dot of dots) {
			const point = dot.split(",").map(Number);
			if (point[index] > crease) point[index] = 2 * crease - point[index];
			next.add(point.join(","));
		}
		dots = next;
	}
	return dots;
}

export const part1 = (input: string) => folded(input, 1).size;

export function part2(input: string) {
	const points = [...folded(input, Infinity)].map((dot) =>
		dot.split(",").map(Number),
	);
	const width = 1 + Math.max(...points.map(([x]) => x));
	const height = 1 + Math.max(...points.map(([, y]) => y));
	const display = Array.from({ length: height }, () =>
		Array<string>(width).fill("."),
	);
	for (const [x, y] of points) display[y][x] = "#";
	return decodeLetters(display.map((row) => row.join("")));
}

if (import.meta.main) run(import.meta.url, part1, part2);
